/**
 * =============================================================================
 * GSAP ANIMATION PRESETS
 * =============================================================================
 *
 * Standardised animation presets for use across all projects.
 * Foundation: GSAP v3 — https://gsap.com/docs/v3/
 *
 * Each preset is a plain object with { from, to, duration, ease } properties
 * designed to be spread into gsap.fromTo() calls.
 *
 * Usage:
 *   import { ENTRANCE, EXIT, HOVER, applyPreset } from "./presets";
 *   gsap.fromTo(element, ENTRANCE.fadeIn.from, ENTRANCE.fadeIn.to);
 *   // — or —
 *   applyPreset(element, "fadeIn");
 *
 * IMPORTANT: All presets respect prefers-reduced-motion via the
 * getReducedMotionDuration() helper. Use applyPreset() for automatic handling.
 * =============================================================================
 */

// ---------------------------------------------------------------------------
// Reduced motion helper
// ---------------------------------------------------------------------------

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionDuration(normalDuration) {
  return prefersReducedMotion() ? 0 : normalDuration;
}

// ---------------------------------------------------------------------------
// ENTRANCE PRESETS — elements appearing on screen
// ---------------------------------------------------------------------------

export const ENTRANCE = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.3, ease: "power2.out" },
  },

  slideInUp: {
    from: { y: 24, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
  },

  slideInDown: {
    from: { y: -24, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
  },

  slideInLeft: {
    from: { x: -24, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
  },

  slideInRight: {
    from: { x: 24, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
  },

  scaleIn: {
    from: { scale: 0.95, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
  },

  expandIn: {
    from: { scaleY: 0, opacity: 0, transformOrigin: "top" },
    to: { scaleY: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
  },
};

// ---------------------------------------------------------------------------
// EXIT PRESETS — elements leaving the screen
// ---------------------------------------------------------------------------

export const EXIT = {
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0, duration: 0.2, ease: "power2.in" },
  },

  slideOutUp: {
    from: { y: 0, opacity: 1 },
    to: { y: -24, opacity: 0, duration: 0.3, ease: "power2.in" },
  },

  slideOutDown: {
    from: { y: 0, opacity: 1 },
    to: { y: 24, opacity: 0, duration: 0.3, ease: "power2.in" },
  },

  slideOutLeft: {
    from: { x: 0, opacity: 1 },
    to: { x: -24, opacity: 0, duration: 0.3, ease: "power2.in" },
  },

  slideOutRight: {
    from: { x: 0, opacity: 1 },
    to: { x: 24, opacity: 0, duration: 0.3, ease: "power2.in" },
  },

  scaleOut: {
    from: { scale: 1, opacity: 1 },
    to: { scale: 0.95, opacity: 0, duration: 0.2, ease: "power2.in" },
  },
};

// ---------------------------------------------------------------------------
// HOVER / INTERACTION PRESETS
// ---------------------------------------------------------------------------

export const HOVER = {
  lift: {
    to: { y: -4, duration: 0.2, ease: "power2.out" },
    reset: { y: 0, duration: 0.2, ease: "power2.out" },
  },

  press: {
    to: { scale: 0.97, duration: 0.1, ease: "power2.out" },
    reset: { scale: 1, duration: 0.1, ease: "power2.out" },
  },

  glow: {
    // Brand grass-green (#3DC683) glow — use on brand-colored elements
    to: {
      boxShadow: "0 0 20px 4px rgba(61, 198, 131, 0.35)",
      duration: 0.2,
      ease: "power2.out",
    },
    reset: {
      boxShadow: "0 0 0px 0px rgba(61, 198, 131, 0)",
      duration: 0.2,
      ease: "power2.out",
    },
  },
};

// ---------------------------------------------------------------------------
// SCROLL-TRIGGERED PRESETS (use with ScrollTrigger — see scroll-triggers.js)
// ---------------------------------------------------------------------------

export const SCROLL = {
  revealUp: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    trigger: { start: "top 85%", toggleActions: "play none none none" },
  },

  revealLeft: {
    from: { x: -40, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    trigger: { start: "top 85%", toggleActions: "play none none none" },
  },

  revealRight: {
    from: { x: 40, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    trigger: { start: "top 85%", toggleActions: "play none none none" },
  },

  parallax: {
    from: { y: 0 },
    to: { y: -50 },
    trigger: { start: "top bottom", end: "bottom top", scrub: true },
  },

  staggerReveal: {
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 },
    trigger: { start: "top 85%", toggleActions: "play none none none" },
  },
};

// ---------------------------------------------------------------------------
// LOGO REVEAL — timeline factory
// ---------------------------------------------------------------------------

/**
 * Creates a GSAP timeline that reveals a logo with icon + wordmark.
 *
 * Expected DOM structure:
 *   <div class="logo">
 *     <span class="logo-icon">...</span>
 *     <span class="logo-wordmark">...</span>
 *   </div>
 *
 * @param {object} gsap - The gsap instance
 * @param {object} [options] - Override defaults
 * @returns {gsap.core.Timeline}
 */
export function createLogoReveal(gsap, options = {}) {
  const defaults = {
    iconSelector: ".logo-icon",
    wordmarkSelector: ".logo-wordmark",
    delay: 0.2,
    iconDuration: 0.5,
    wordmarkDuration: 0.4,
  };
  const config = { ...defaults, ...options };

  const tl = gsap.timeline({ delay: config.delay });

  if (prefersReducedMotion()) {
    // Instant reveal — no motion
    tl.set(config.iconSelector, { opacity: 1, scale: 1 });
    tl.set(config.wordmarkSelector, { opacity: 1, x: 0 });
    return tl;
  }

  tl.from(config.iconSelector, {
    scale: 0,
    opacity: 0,
    duration: config.iconDuration,
    ease: "back.out(1.7)",
  }).from(
    config.wordmarkSelector,
    {
      x: -12,
      opacity: 0,
      duration: config.wordmarkDuration,
      ease: "power2.out",
    },
    "-=0.1"
  );

  return tl;
}

// ---------------------------------------------------------------------------
// HELPER — apply a named preset to a target
// ---------------------------------------------------------------------------

/**
 * Apply a preset animation to a target element.
 * Automatically handles reduced motion.
 *
 * @param {object} gsap - The gsap instance
 * @param {string|Element} target - GSAP target (selector or element)
 * @param {string} presetName - Name from ENTRANCE, EXIT, or SCROLL (e.g. "fadeIn", "slideOutUp")
 * @param {object} [overrides] - Properties to override in the preset's `to` object
 * @returns {gsap.core.Tween}
 */
export function applyPreset(gsap, target, presetName, overrides = {}) {
  // Search all categories for the preset
  const categories = [ENTRANCE, EXIT, SCROLL];
  let preset = null;

  for (const category of categories) {
    if (category[presetName]) {
      preset = category[presetName];
      break;
    }
  }

  if (!preset) {
    console.warn(`[design-system] Unknown animation preset: "${presetName}"`);
    return null;
  }

  const duration = getReducedMotionDuration(preset.to.duration || 0.3);
  const toProps = { ...preset.to, ...overrides, duration };

  if (preset.from) {
    return gsap.fromTo(target, { ...preset.from }, toProps);
  }
  return gsap.to(target, toProps);
}
