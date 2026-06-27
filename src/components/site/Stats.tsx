import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { useI18n } from "@/i18n/context";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t, lang } = useI18n();
  return (
    <section className="relative py-14 md:py-20 border-y border-border bg-[oklch(0.1_0.03_260)]">
      <div className="absolute inset-0 opacity-30 mesh-bg" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:divide-x divide-border">
        {t.stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center px-4 lg:px-6"
          >
            <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-brand mb-2 leading-none">
              <CountUp key={`${lang}-${i}`} target={s.value} suffix={s.suffix} />
            </div>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
