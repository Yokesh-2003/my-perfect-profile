import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Fluid background */}
      <iframe
        src="/fluid.html"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 0,
        }}
      />

      {/* Overlay content */}
      <div className="relative z-20 flex flex-col items-center text-center pointer-events-none">
        {/* SVG liquid distortion */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="liquid-font-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.04"
                numOctaves={3}
                result="turbulence"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale={12}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* NAME + REFLECTION */}
        <div className="relative">
          {/* MAIN OVERLAY NAME */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-30 text-5xl font-extrabold tracking-wider sm:text-7xl md:text-8xl"
            style={{
              filter: "url(#liquid-font-filter)",
              color: "#ffffff",
              textShadow:
                "0 0 20px rgba(255,215,120,0.35), 0 0 60px rgba(255,180,80,0.25)",
            }}
          >
            YUGAN RAJA
          </motion.h1>

          {/* REFLECTION (projects into fluid) */}
          <motion.h1
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-0 top-full w-full text-5xl font-extrabold tracking-wider sm:text-7xl md:text-8xl"
            style={{
              transform: "scaleY(-1)",
              filter: "blur(8px) url(#liquid-font-filter)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
              color: "rgba(212, 175, 55, 0.45)",
            }}
          >
            YUGAN RAJA
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-sm font-medium tracking-[0.3em] text-neutral-300"
        >
          MARKETER
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16 pointer-events-auto"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
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
