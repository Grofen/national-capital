"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/app/components/Container";
import { FadeIn } from "@/app/components/FadeIn";
import { GridPattern } from "../GridPattern";
import { Testimonial } from "@/app/components/Testimonial";
import { useState } from "react";

// Sample testimonials data - replace with your actual data source
const testimonialsData = [
  {
    id: 1,
    content:
      "Working with this team has been an absolute game-changer for our business. Their attention to detail and innovative approach exceeded all our expectations.",
    client: {
      name: "Sarah Johnson",
      company: "TechCorp Solutions",
      logo: "/api/placeholder/120/60", // Replace with actual logo path
    },
  },
  {
    id: 2,
    content:
      "The level of professionalism and expertise demonstrated throughout our project was remarkable. They delivered on time and beyond what we envisioned.",
    client: {
      name: "Michael Chen",
      company: "Digital Innovations Inc",
      logo: "/api/placeholder/120/60", // Replace with actual logo path
    },
  },
  {
    id: 3,
    content:
      "From concept to execution, every step was handled with precision and creativity. The results speak for themselves - our ROI increased by 300%.",
    client: {
      name: "Emily Rodriguez",
      company: "Growth Dynamics",
      logo: "/api/placeholder/120/60", // Replace with actual logo path
    },
  },
  {
    id: 4,
    content:
      "Incredible service and outstanding results. The team's ability to understand our vision and bring it to life was truly impressive.",
    client: {
      name: "David Thompson",
      company: "Future Enterprises",
      logo: "/api/placeholder/120/60", // Replace with actual logo path
    },
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1;
      }
    });
  };

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 sm:py-24">
      <FadeIn>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                  What our clients say
                </h2>
                <p className="mt-4 text-lg text-neutral-600">
                  Don't just take our word for it — hear from some of our
                  satisfied clients.
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(-1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-neutral-600" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-neutral-600" />
                </button>
              </div>
            </div>
          </Container>

          {/* Carousel Container */}
          <div className="bg-neutral-50 overflow-hidden relative">
            <GridPattern
              className="absolute inset-0 -z-10 h-full w-full mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)] fill-neutral-100 stroke-neutral-950/5"
              yOffset={-256}
            />
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
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
                className="cursor-grab active:cursor-grabbing"
              >
                <Testimonial
                  client={{
                    logo: testimonialsData[currentIndex].client.logo,
                    name: `${testimonialsData[currentIndex].client.name}, ${testimonialsData[currentIndex].client.company}`,
                  }}
                  className="bg-white shadow-xl ring-1 ring-neutral-950/5"
                >
                  {testimonialsData[currentIndex].content}
                </Testimonial>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-primary-900"
                    : "bg-neutral-300 hover:bg-primary-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play toggle (optional) */}
          {/* <div className="flex justify-center mt-6">
            <p className="text-sm text-neutral-500">
              Swipe or use the arrows to navigate • {currentIndex + 1} of{" "}
              {testimonialsData.length}
            </p>
          </div> */}
        </div>
      </FadeIn>
    </section>
  );
};

export default Testimonials;
