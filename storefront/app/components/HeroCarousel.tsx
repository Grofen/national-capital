"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./Button";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import { cn } from "@/app/utils/cn";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  cta?: {
    text: string;
    href: string;
  };
}

interface HeroCarouselProps {
  slides?: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    image:
      "https://cdn.sanity.io/media-libraries/mlQdQk3EEvUS/images/d7ab999900770ad9dcd2fc923081fa5981073367-1440x837.jpg",
    title: "Welcome to Our Platform",
    subtitle: "Discover Excellence",
    description:
      "Experience the future of digital innovation with our cutting-edge solutions designed to transform your business.",
    cta: {
      text: "Get Started",
      href: "/get-started",
    },
  },
  {
    id: "2",
    image:
      "https://cdn.sanity.io/media-libraries/mlQdQk3EEvUS/images/d7ab999900770ad9dcd2fc923081fa5981073367-1440x837.jpg",
    title: "Innovation at Its Best",
    subtitle: "Leading Technology",
    description:
      "Join thousands of satisfied customers who have revolutionized their workflow with our innovative platform.",
    cta: {
      text: "Learn More",
      href: "/about",
    },
  },
  {
    id: "3",
    image:
      "https://cdn.sanity.io/media-libraries/mlQdQk3EEvUS/images/d7ab999900770ad9dcd2fc923081fa5981073367-1440x837.jpg",
    title: "Built for the Future",
    subtitle: "Next Generation",
    description:
      "Scalable, secure, and designed with tomorrow's challenges in mind. Experience the difference today.",
    cta: {
      text: "Explore Features",
      href: "/features",
    },
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 15000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function HeroCarousel({
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: HeroCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const imageIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const goToSlide = (slideIndex: number) => {
    const direction = slideIndex > imageIndex ? 1 : -1;
    setPage([slideIndex, direction]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [page, isPlaying, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        paginate(1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying]);

  const currentSlide = slides[imageIndex];

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary-900 rounded-t-[40px] mt-16",
        className
      )}
    >
      <div className="relative h-screen min-h-[600px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <Container className="relative z-10">
            <FadeIn key={`content-${page}`} className="max-w-2xl text-white">
              <p className="text-lg font-medium text-neutral-200 mb-4">
                {currentSlide.subtitle}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
                {currentSlide.title}
              </h1>
              <p className="text-lg text-neutral-300 mb-8 max-w-xl">
                {currentSlide.description}
              </p>
              {currentSlide.cta && (
                <div className="mt-6">
                  <Button href={currentSlide.cta.href} invert>
                    {currentSlide.cta.text}
                  </Button>
                </div>
              )}
            </FadeIn>
          </Container>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <button
            onClick={() => paginate(-1)}
            className="rounded-full bg-black/20 backdrop-blur-sm p-3 text-white transition-all duration-200 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center">
          <button
            onClick={() => paginate(1)}
            className="rounded-full bg-black/20 backdrop-blur-sm p-3 text-white transition-all duration-200 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-3 w-3 rounded-full transition-all duration-200",
                index === imageIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Control */}
        <div className="absolute bottom-8 right-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full bg-black/20 backdrop-blur-sm p-3 text-white transition-all duration-200 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
