import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8];

const ScrollingGallery = () => {
  return (
    <div className="overflow-hidden">
      <div className="animate-scroll-left flex gap-4" style={{ width: "fit-content" }}>
        {[...images, ...images].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Gallery photo ${(i % images.length) + 1}`}
            className="h-48 w-72 flex-shrink-0 rounded-xl object-cover sm:h-64 sm:w-96"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollingGallery;
