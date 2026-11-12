import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  prefersReducedMotion: boolean,
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Continuous vertical signal spine tracking scroll progress.
      const spine = root.querySelector('[data-scroll-spine]');
      if (spine) {
        gsap.to(spine, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      }

      // Hero entry choreography.
      const heroLines = root.querySelectorAll('[data-hero-line]');
      if (heroLines.length > 0) {
        gsap.from(heroLines, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power4.out',
          clearProps: 'transform,opacity',
        });
      }

      const heroRule = root.querySelector('[data-hero-rule]');
      if (heroRule) {
        gsap.from(heroRule, {
          scaleX: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'expo.out',
          clearProps: 'transform',
        });
      }

      // Subtle scroll parallax on the hero barcode pattern.
      const barcode = root.querySelector('[data-hero-barcode]');
      if (barcode) {
        gsap.to(barcode, {
          y: 56,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Vertical section heading & editorial block reveals.
      const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
      revealEls.forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });

      // Alternating lateral reveal for flagship dossier rows.
      const dossierRows = gsap.utils.toArray<HTMLElement>('[data-dossier-row]', root);
      dossierRows.forEach((row, index) => {
        gsap.from(row, {
          x: index % 2 === 0 ? -24 : 24,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            once: true,
          },
        });
      });

      // Staggered capability matrix columns.
      const skillCols = root.querySelectorAll('[data-skill-col]');
      if (skillCols.length > 0) {
        gsap.from(skillCols, {
          y: 24,
          opacity: 0,
          duration: 0.68,
          stagger: 0.12,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 86%',
            once: true,
          },
        });
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef, prefersReducedMotion]);
}
