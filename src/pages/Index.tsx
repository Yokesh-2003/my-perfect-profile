import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/30" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold tracking-wider text-foreground sm:text-7xl md:text-8xl"
        >
          BUNYAN USMAN
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-sm font-medium tracking-[0.3em] text-muted-foreground sm:text-base"
        >
          MULTIDISCIPLINARY DESIGNER
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-foreground/10 hover:border-foreground/40"
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
