import { motion } from "framer-motion";

interface PhotoCardProps {
  image: string;
  title: string;
  className?: string;
}

const PhotoCard = ({ image, title, className = "" }: PhotoCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4">
        <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
