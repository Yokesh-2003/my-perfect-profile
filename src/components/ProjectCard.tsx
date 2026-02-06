import { motion } from "framer-motion";

interface ProjectCardProps {
  tag: string;
  title: string;
  images: string[];
  className?: string;
}

const ProjectCard = ({ tag, title, images, className = "" }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-card p-6 ${className}`}
    >
      <div className="relative z-10">
        <span className="inline-block rounded border border-border px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {tag}
        </span>
        <h3 className="mt-2 text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
          {title}
        </h3>
      </div>
      <div className="mt-4 flex items-end justify-end gap-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={title}
            className="h-24 w-auto rounded-lg object-contain sm:h-32"
            loading="lazy"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
