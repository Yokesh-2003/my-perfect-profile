import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Fluid background */}
      <iframe
        src="/fluid.html"
        className="absolute inset-0 h-full w-full"
        style={{ border: "none", zIndex: 0 }}
      />

      {/* Overlay */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ pointerEvents: "none" }}
      >
        {/* NAME – 3D + INVERTED */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.4, y: 0 }} // Increased opacity
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="tracking-wider text-5xl sm:text-7xl md:text-8xl font-black"
          style={{
            color: "#ffffff",                // REQUIRED for inversion
            mixBlendMode: "difference",       // TRUE inversion
            fontFamily: "'Inter', system-ui, sans-serif",
            willChange: "transform",

            /* 3D DEPTH (dark-only shadows so inversion still works) */
            textShadow: `
              0 1px 0 rgba(0,0,0,0.35),
              0 2px 0 rgba(0,0,0,0.3),
              0 3px 0 rgba(0,0,0,0.25),
              0 6px 12px rgba(0,0,0,0.6)
            `,
          }}
        >
          YUGAN RAJA
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-sm font-medium tracking-[0.3em]"
          style={{
            color: "rgba(255,255,255,0.7)",
            mixBlendMode: "overlay",
          }}
        >
          MARKETER
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16"
          style={{ pointerEvents: "auto" }}
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full
              border border-white/30 px-8 py-3 text-sm font-medium text-white
              transition-all hover:border-white/50"
            style={{
              background: "transparent",
              mixBlendMode: "overlay",
            }}
          >
            Portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
