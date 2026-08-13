import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import contactHandler from "../api/contact.js";
import eventHandler from "../api/event.js";

const port = Number(process.env.PORT || 4173);
const root = join(process.cwd(), "public");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".pdf": "application/pdf", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
};

async function asFetchRequest(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 16_384) throw new Error("Request too large");
    chunks.push(chunk);
  }
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  return new Request(`http://localhost${request.url || "/"}`, {
    method: request.method,
    headers: request.headers,
    body,
  });
}

async function sendFetchResponse(fetchResponse, response) {
  const headers = { ...securityHeaders, ...Object.fromEntries(fetchResponse.headers.entries()) };
  response.writeHead(fetchResponse.status, headers);
  response.end(Buffer.from(await fetchResponse.arrayBuffer()));
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent((request.url || "/").split("?")[0]);
  if (pathname === "/api/contact" || pathname === "/api/event") {
    try {
      const fetchRequest = await asFetchRequest(request);
      const fetchResponse = pathname === "/api/contact" ? await contactHandler(fetchRequest) : await eventHandler(fetchRequest);
      await sendFetchResponse(fetchResponse, response);
    } catch (error) {
      const tooLarge = error?.message === "Request too large";
      response.writeHead(tooLarge ? 413 : 500, { ...securityHeaders, "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: tooLarge ? "Request too large" : "Unable to process request" }));
    }
    return;
  }

  const urlPath = pathname;
  const relative = urlPath === "/" ? "index.html" : extname(urlPath) ? urlPath.slice(1) : join(urlPath.slice(1), "index.html");
  const target = normalize(join(root, relative));
  if (!target.startsWith(root)) { response.writeHead(403, securityHeaders); response.end("Forbidden"); return; }
  try {
    const body = await readFile(target);
    response.writeHead(200, { ...securityHeaders, "Content-Type": types[extname(target)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { ...securityHeaders, "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "0.0.0.0", () => console.log(`Avarent site listening on port ${port}`));
