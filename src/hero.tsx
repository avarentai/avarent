import { createRoot } from "react-dom/client";
import { CTASection } from "../components/ui/hero-dithering-card";

const root = document.querySelector<HTMLElement>("#avarent-hero-root");

if (root) {
  createRoot(root).render(<CTASection />);
}
