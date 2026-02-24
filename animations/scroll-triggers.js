/**
 * =============================================================================
 * GSAP SCROLLTRIGGER PATTERNS
 * =============================================================================
 *
 * Factory functions that return ScrollTrigger-powered animations.
 * Requires: gsap + ScrollTrigger plugin.
 *
 * Usage:
 *   import gsap from "gsap";
 *   import { ScrollTrigger } from "gsap/ScrollTrigger";
 *   import { revealUp, staggerReveal, parallax } from "./scroll-triggers";
 *
 *   gsap.registerPlugin(ScrollTrigger);
 *   revealUp(gsap, ".section-title");
 *   staggerReveal(gsap, ".card-grid > *");
 *   parallax(gsap, ".hero-bg");
 *
 * All functions respect prefers-reduced-motion automatically.
 * =============================================================================
 */

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ---------------------------------------------------------------------------
// revealUp — fade + slide up when element enters viewport
// ---------------------------------------------------------------------------

/**
 * @param {object} gsap - The gsap instance (with ScrollTrigger registered)
 * @param {string|Element|Element[]} targets - Elements to reveal
 * @param {object} [options] - Override defaults
 * @returns {gsap.core.Tween}
 */
export function revealUp(gsap, targets, options = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    start: "top 85%",
    toggleActions: "play none none none",
    markers: false,
  };
  const config = { ...defaults, ...options };

  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0 });
  }

  return gsap.from(targets, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    scrollTrigger: {
      trigger: typeof targets === "string" ? targets : targets[0] || targets,
      start: config.start,
      toggleActions: config.toggleActions,
      markers: config.markers,
    },
  });
}

// ---------------------------------------------------------------------------
// staggerReveal — reveal multiple elements with stagger
// ---------------------------------------------------------------------------

/**
 * @param {object} gsap - The gsap instance (with ScrollTrigger registered)
 * @param {string|Element[]} targets - Elements to reveal (selector or array)
 * @param {object} [options] - Override defaults
 * @returns {gsap.core.Tween}
 */
export function staggerReveal(gsap, targets, options = {}) {
  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.08,
    start: "top 85%",
    toggleActions: "play none none none",
    markers: false,
  };
  const config = { ...defaults, ...options };

  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0 });
  }

  // Use the parent of the first element as the trigger
  const triggerEl =
    typeof targets === "string"
      ? targets
      : targets[0]?.parentElement || targets[0] || targets;

  return gsap.from(targets, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    scrollTrigger: {
      trigger: triggerEl,
      start: config.start,
      toggleActions: config.toggleActions,
      markers: config.markers,
    },
  });
}

// ---------------------------------------------------------------------------
// parallax — subtle vertical parallax movement linked to scroll
// ---------------------------------------------------------------------------

/**
 * @param {object} gsap - The gsap instance (with ScrollTrigger registered)
 * @param {string|Element} target - Element to apply parallax to
 * @param {object} [options] - Override defaults
 * @returns {gsap.core.Tween}
 */
export function parallax(gsap, target, options = {}) {
  const defaults = {
    yPercent: -15,
    ease: "none",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    markers: false,
  };
  const config = { ...defaults, ...options };

  // Parallax is purely decorative — disable entirely for reduced motion
  if (prefersReducedMotion()) {
    return null;
  }

  return gsap.to(target, {
    yPercent: config.yPercent,
    ease: config.ease,
    scrollTrigger: {
      trigger: target,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      markers: config.markers,
    },
  });
}

// ---------------------------------------------------------------------------
// pinSection — pin an element during scroll through a section
// ---------------------------------------------------------------------------

/**
 * @param {object} gsap - The gsap instance (with ScrollTrigger registered)
 * @param {string|Element} trigger - The section that controls the pin
 * @param {string|Element} pinTarget - The element to pin (often same as trigger)
 * @param {object} [options] - Override defaults
 * @returns {ScrollTrigger}
 */
export function pinSection(gsap, trigger, pinTarget, options = {}) {
  const { ScrollTrigger } = gsap.plugins || {};

  const defaults = {
    start: "top top",
    end: "bottom bottom",
    pin: pinTarget || true,
    markers: false,
  };
  const config = { ...defaults, ...options };

  if (prefersReducedMotion()) {
    return null;
  }

  return gsap.to({}, {
    scrollTrigger: {
      trigger: trigger,
      start: config.start,
      end: config.end,
      pin: config.pin,
      markers: config.markers,
    },
  });
}
