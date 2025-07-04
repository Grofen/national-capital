import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { FadeIn, FadeInStagger } from "@/app/components/FadeIn";
import {
  Media,
  Page,
  ServicesSection as ServicesSectionType,
} from "@/sanity.types";
import { useEffect, useState } from "react";

import { Container } from "@/app/components/Container";
import PortableText from "@/app/components/PortableText";
import { PortableTextBlock } from "next-sanity";
import ResolvedLink from "../ResolvedLink";
import { SectionIntro } from "@/app/components/SectionIntro";
import { cn } from "@/app/utils/cn";
import { motion } from "motion/react";

interface ResolvedService {
  _id: string;
  title: string;
  description: string;
  media: Media & {
    url: string | null;
    metadata: any;
    dimensions: any;
  };
  page: Page;
}

interface Props {
  block: ServicesSectionType;
  className?: string;
}

// Swipe configuration
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ServicesSection = ({ block, className }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  const services = block.services as unknown as ResolvedService[];
  const totalSlides =
    services.length > itemsPerView
      ? Math.ceil(services.length / itemsPerView)
      : 1;

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Reset currentIndex if it goes out of bounds
  useEffect(() => {
    const newTotalSlides =
      services.length > itemsPerView
        ? Math.ceil(services.length / itemsPerView)
        : 1;
    if (currentIndex >= newTotalSlides) {
      setCurrentIndex(0);
    }
  }, [itemsPerView, services.length, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <FadeInStagger>
      <SectionIntro
        eyebrow={block.eyebrow}
        title={
          <PortableText
            value={block.heading as PortableTextBlock[]}
            headingClassName={cn(
              "block font-display tracking-tight text-balance text-neutral-950 text-4xl font-medium sm:text-5xl mb-6"
            )}
            paragraphClassName="text-xl text-neutral-600"
          />
        }
        className="mt-24 sm:mt-32 lg:mt-40"
      />
      <Container className={cn("mt-16", className)}>
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <motion.button
                onClick={prevSlide}
                className="absolute right-18 -translate-y-16 top-0 z-10 cursor-pointer hover:shadow-lg p-3 rounded-full transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                <ArrowLeftIcon className="w-6 h-6 text-neutral-900" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute right-4 -translate-y-16 top-0 z-10 cursor-pointer hover:shadow-lg p-3 rounded-full transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                <ArrowRightIcon className="w-6 h-6 text-neutral-900" />
              </motion.button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(
                _: any,
                {
                  offset,
                  velocity,
                }: {
                  offset: { x: number; y: number };
                  velocity: { x: number; y: number };
                }
              ) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide();
                }
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const slideServices = services.slice(
                  slideIndex * itemsPerView,
                  (slideIndex + 1) * itemsPerView
                );

                // Only render slides that have services
                if (slideServices.length === 0) return null;

                return (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
                      {slideServices.map((resolvedService, serviceIndex) => (
                        <FadeIn
                          key={`${resolvedService._id}-${slideIndex}-${serviceIndex}`}
                          className="flex cursor-pointer"
                        >
                          <ResolvedLink
                            link={resolvedService.page}
                            className="w-full"
                          >
                            <motion.article
                              className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:ring-neutral-950/10 sm:p-8 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: resolvedService.media?.url
                                  ? `url(${resolvedService.media.url})`
                                  : "none",
                                minHeight: "450px",
                              }}
                              role="img"
                              aria-label={
                                resolvedService.media?.alt ||
                                resolvedService.title
                              }
                              // whileHover={{ scale: 1.02 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                            >
                              <div className="absolute inset-0 bg-black/50 hover:bg-black/70 transition-all duration-300 rounded-3xl" />
                              <div className="relative z-10">
                                <h3 className="font-display text-2xl font-semibold text-white">
                                  {resolvedService.title}
                                </h3>
                                <p className="mt-4 text-lg text-white">
                                  {resolvedService.description}
                                </p>
                              </div>
                              <div className="absolute bottom-3 right-3 p-2 rounded-full flex items-center justify-center border-2 border-white bg-primary-900">
                                <ArrowRightIcon
                                  className="w-5 h-5 text-white"
                                  aria-label="Read More"
                                />
                              </div>
                            </motion.article>
                          </ResolvedLink>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-200",
                    currentIndex === index
                      ? "bg-neutral-900"
                      : "bg-neutral-300 hover:bg-neutral-400"
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </FadeInStagger>
  );
};

export default ServicesSection;
