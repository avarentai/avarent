# Design — Avarent

A locked design system for the Avarent marketing and trust site.

## Genre

modern-minimal

## Macrostructure family

- Marketing pages: asymmetric evidence-led narrative with one product specimen.
- Trust pages: long document with status-led evidence rows.
- Legal pages: restrained long document with a narrow reading measure.

## Theme

Color strategy: restrained, using midnight petrol for institutional structure, cool mineral surfaces for document clarity, and signal iris for memorable actions and analytical emphasis.

- `--color-paper`: oklch(97% 0.007 230)
- `--color-paper-2`: oklch(93% 0.013 230)
- `--color-ink`: oklch(22% 0.028 238)
- `--color-ink-2`: oklch(43% 0.03 238)
- `--color-rule`: oklch(82% 0.02 232)
- `--color-accent`: oklch(53% 0.17 275)
- `--color-focus`: oklch(61% 0.18 275)

## Typography

- Display: system UI sans, weight 650, normal
- Body: system UI sans, weight 400
- Mono: system UI monospace, weight 500
- Display tracking: -0.045em
- Type scale anchor: `--text-display = clamp(3rem, 7.4vw, 7.4rem)`

## Spacing

Four-point named scale in `src/styles.css`. Pages use tokens instead of one-off spacing values.

## Motion

- Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- Reveal pattern: no scroll choreography; direct rendering is the trust signal.
- Reduced motion: transforms and smooth scrolling disabled.

## Microinteractions stance

- Immediate, quiet states.
- Underlines and small translations only.
- No celebratory effects, cursor effects, parallax, or animated metrics.

## CTA voice

- Primary: compact full-radius pill with signal-iris fill and specific action copy.
- Secondary: compact full-radius pill, transparent with a quiet petrol border.
- Interaction: pill controls retain the licensed `motion-press` response; no glow, shimmer, or looping animation.

## Identity mark

The Avarent mark frames a central decision diamond with two open evaluation brackets. The brackets represent a documented review boundary; the diamond represents the decision under inspection. The mark must remain geometric, flat, and legible at favicon scale. Do not add shields, checkmarks, scales, sparkles, letterforms, gradients, or enclosing badges.

## What pages MUST share

- Wordmark, accent, type, header, footer, CTA geometry, status vocabulary, and disclosure voice.

## What pages MAY differ on

- Content density, evidence tables, product specimen, and page-specific calls to action.
