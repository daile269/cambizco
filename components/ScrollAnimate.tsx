"use client";

import { useInView } from "@/hooks/useInView";

interface ScrollAnimateProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale";
  delay?: number;
}

export default function ScrollAnimate({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: ScrollAnimateProps) {
  const { ref, isInView } = useInView();

  const animationClass = `scroll-${animation}`;
  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isInView ? "in-view" : ""} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
}
