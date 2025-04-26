import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ClientLogo {
  id: number;
  src: string;
  alt: string;
  width?: number;
}

const clientLogos: ClientLogo[] = [
  { id: 1, src: "/images/logos/logo-1.png", alt: "ABIDI Group" },
  { id: 2, src: "/images/logos/logo-2.png", alt: "PGPIC" },
  { id: 3, src: "/images/logos/logo-3.png", alt: "Mehr Petrochemical" },
  { id: 5, src: "/images/logos/logo-5.png", alt: "Book City" },
  { id: 6, src: "/images/logos/logo-6.png", alt: "MobinNet" },
  { id: 7, src: "/images/logos/logo-7.png", alt: "DigiKala" },
  { id: 9, src: "/images/logos/logo-9.png", alt: "Behestan Darou" },
  { id: 10, src: "/images/logos/logo-10.png", alt: "Iran Khodro" },
  { id: 11, src: "/images/logos/logo-11.png", alt: "Saipa" },
  { id: 12, src: "/images/logos/logo-12.png", alt: "Vanda" },
  { id: 13, src: "/images/logos/logo-13.png", alt: "Cobel Darou" },
  { id: 14, src: "/images/logos/logo-14.png", alt: "Snapp" },
];

export default function ClientCarousel() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [duplicatedLogos, setDuplicatedLogos] = useState<ClientLogo[]>([]);

  useEffect(() => {
    // Duplicate logos to create infinite scroll effect
    setDuplicatedLogos([...clientLogos, ...clientLogos, ...clientLogos]);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [duplicatedLogos]);

  return (
    <div className="relative overflow-hidden py-10 glass-pattern mb-10 mt-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">مشتریان ما</h2>
        
        <div className="w-full overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex py-4"
            animate={{
              x: [-width, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="mx-8 min-w-[120px] flex items-center justify-center glass rounded-xl p-4 border border-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-10 md:h-14 w-auto object-contain" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Gradient overlays for seamless infinite effect */}
      <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10"></div>
    </div>
  );
}