import { motion } from "framer-motion";
import SocialBar from "@/components/SocialBar";
import ProjectCard from "@/components/ProjectCard";
import PhotoCard from "@/components/PhotoCard";
import ScrollingGallery from "@/components/ScrollingGallery";

import profilePhoto from "@/assets/profile-photo.jpg";
import projProjection from "@/assets/project-projection.png";
import projTouchdesigner from "@/assets/project-touchdesigner.png";
import projZara from "@/assets/project-zara.png";
import projLead1 from "@/assets/project-lead1.png";
import projLead2 from "@/assets/project-lead2.png";
import projBallot1 from "@/assets/project-ballot1.png";
import projBallot2 from "@/assets/project-ballot2.png";
import projSrishti1 from "@/assets/project-srishti1.png";
import projSrishti2 from "@/assets/project-srishti2.png";
import projBb1 from "@/assets/project-bb1.png";
import projMoneymap1 from "@/assets/project-moneymap1.png";
import projMoneymap2 from "@/assets/project-moneymap2.png";
import projSahyagri from "@/assets/project-sahyagri.png";
import projLeafpect from "@/assets/project-leafpect.png";
import photoAstro from "@/assets/photo-astro.jpg";
import photoLongexp from "@/assets/photo-longexp.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Social Bar */}
      <div className="flex justify-center pt-8">
        <SocialBar />
      </div>

      {/* Hero / Intro */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-12 lg:py-24">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1">
            <motion.p {...fadeUp()} className="text-xl text-muted-foreground sm:text-2xl">
              Hello, I am
            </motion.p>
            <motion.h1
              {...fadeUp(0.1)}
              className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-6xl"
            >
              BUNYAN USMAN
            </motion.h1>
            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              A design student specializing in <strong className="text-foreground">Human Centered Design</strong>. Navigating the intersection of creativity and functionality. Proficient in <strong className="text-foreground">UI/UX, 3D modeling</strong>, <strong className="text-foreground">Projection Mapping</strong> and <strong className="text-foreground">Motion graphics</strong>, I bring a multifaceted skill set to every project. My passion extends beyond the digital realm including Astrophotography, where I capture the cosmic beauty that inspires my artistic vision.
            </motion.p>
          </div>
          <motion.div {...fadeUp(0.3)} className="flex-shrink-0">
            <img
              src={profilePhoto}
              alt="Bunyan Usman"
              className="h-64 w-64 rounded-full object-cover grayscale sm:h-80 sm:w-80"
            />
          </motion.div>
        </div>
      </section>

      {/* Immersive Design */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
        <motion.h2 {...fadeUp()} className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Immersive Design
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...fadeUp()}>
            <ProjectCard tag="Immersive" title="Projection Mapping" images={[projProjection]} />
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <ProjectCard tag="Interactive" title="TouchDesigner" images={[projTouchdesigner]} />
          </motion.div>
        </div>
      </section>

      {/* Interface Design */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
        <motion.h2 {...fadeUp()} className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Interface Design
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div {...fadeUp()}>
            <ProjectCard tag="Redesign" title="Zara Redesign" images={[projZara]} />
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <ProjectCard tag="Internship" title="Lead Management System" images={[projLead1, projLead2]} className="md:col-span-1 lg:col-span-2" />
          </motion.div>
          <motion.div {...fadeUp(0.15)}>
            <ProjectCard tag="Application" title="Ballot Book" images={[projBallot1, projBallot2]} />
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <ProjectCard tag="Application" title="Srishti Marketplace" images={[projSrishti1, projSrishti2]} />
          </motion.div>
          <motion.div {...fadeUp(0.25)}>
            <ProjectCard tag="Redesign" title="Blackboard Redesign" images={[projBb1]} />
          </motion.div>
        </div>
        <motion.div {...fadeUp()} className="mt-6">
          <ProjectCard tag="Application" title="MoneyMap" images={[projMoneymap1, projMoneymap2]} />
        </motion.div>
      </section>

      {/* Graphic Design */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
        <motion.h2 {...fadeUp()} className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Graphic Design
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...fadeUp()}>
            <ProjectCard tag="Logo" title="Sahyagri" images={[projSahyagri]} />
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <ProjectCard tag="Logo" title="Leafpect" images={[projLeafpect]} />
          </motion.div>
        </div>
      </section>

      {/* Photography */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
        <motion.h2 {...fadeUp()} className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Photography
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div {...fadeUp()}>
            <PhotoCard image={photoAstro} title="Astrophotography" className="h-72 sm:h-96" />
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <PhotoCard image={photoLongexp} title="Long Exposures" className="h-72 sm:h-96" />
          </motion.div>
        </div>
      </section>

      {/* Scrolling Gallery */}
      <section className="py-12">
        <motion.h2 {...fadeUp()} className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Photo Gallery
        </motion.h2>
        <ScrollingGallery />
      </section>

      <div className="h-16" />
    </div>
  );
};

export default Portfolio;
