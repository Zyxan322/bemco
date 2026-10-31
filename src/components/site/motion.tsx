import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver !== "undefined") setMotionReady(true);
  }, []);

  const visible = reduce || isMobile || !motionReady || inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: reduce || isMobile ? 0 : 0.6,
        ease,
        delay: reduce || isMobile ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  eager?: boolean;
}) {
  const fullBleed = typeof className === "string" && /(^|\s)absolute(\s|$)/.test(className);
  const containerClassName = cn("relative overflow-hidden", className, fullBleed && "h-full");

  return (
    <div className={containerClassName}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full scale-[1.08] object-cover"
      />
    </div>
  );
}

export function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const completed = useRef(false);

  useEffect(() => {
    if (!inView) return;

    const element = ref.current;
    if (!element) return;

    const decimals = Math.max(0, `${to}`.split(".")[1]?.length ?? 0);
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const format = (value: number) => `${prefix}${formatter.format(value)}${suffix}`;
    if (reduceMotion || isMobile || completed.current) {
      element.textContent = format(to);
      completed.current = true;
      return;
    }

    const duration = 1500;
    let startTime: number | null = null;
    let frame = 0;

    const update = (timestamp: number) => {
      startTime ??= timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      element.textContent = format(to * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        element.textContent = format(to);
        completed.current = true;
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [inView, isMobile, prefix, reduceMotion, suffix, to]);

  const decimals = Math.max(0, `${to}`.split(".")[1]?.length ?? 0);
  const initialValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(to);

  return (
    <span ref={ref} aria-live="off">
      {prefix}
      {initialValue}
      {suffix}
    </span>
  );
}

export function ArrowLink({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "text";
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-ink px-6 py-3.5 rounded-full",
    outline:
      "glass border border-border text-foreground hover:border-primary px-6 py-3.5 rounded-full",
    text: "text-primary px-0 py-1",
  }[variant];
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${styles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`eyebrow flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-brand-green" />
        {eyebrow}
      </div>
      <h2 className="display mt-5 text-4xl text-ink md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  img,
}: {
  eyebrow: string;
  title: string;
  text: string;
  img: string;
}) {
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-ink pb-20 pt-40">
      <Parallax src={img} alt="" className="absolute inset-0" strength={80} eager />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
      <div className="container-x relative">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <div className="eyebrow flex items-center gap-3 !text-brand-green">
            <span className="h-px w-8 bg-brand-green" />
            {eyebrow}
          </div>
          <h1 className="display mt-6 text-5xl text-white md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
        </motion.div>
      </div>
    </section>
  );
}
