import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({
  src,
  alt,
  className,
  strength = 60,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-strength, strength]);
  const fullBleed = typeof className === "string" && className.includes("absolute");

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className, fullBleed && "h-full")}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        style={{ y, scale: 1.18 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }

    const animation = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => animation.stop();
  }, [inView, reduceMotion, to]);

  return (
    <span ref={ref} aria-live="off">
      {value.toLocaleString("en-US")}
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
          initial={{ opacity: 0, y: 30 }}
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
