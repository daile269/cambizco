"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    // Add initial styles to all sections
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      // Add initial hidden state
      (section as HTMLElement).style.opacity = "0";
      (section as HTMLElement).style.transform = "translateY(50px)";
      (section as HTMLElement).style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            const element = entry.target as HTMLElement;
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Also animate cards with stagger effect
    const cards = document.querySelectorAll(".group");
    cards.forEach((card, index) => {
      const element = card as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = `opacity 0.4s ease-out ${
        index * 0.1
      }s, transform 0.4s ease-out ${index * 0.1}s`;

      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
              cardObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      cardObserver.observe(card);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
