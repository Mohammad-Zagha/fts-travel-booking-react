import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  snapAlign?: "start" | "center" | "end";
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  itemClassName,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "gap-4",
  snapAlign = "start",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [currentItemsPerView, setCurrentItemsPerView] = useState(
    itemsPerView.desktop || 3
  );
  const [isMobile, setIsMobile] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);

  const totalItems = children.length;

  const getMaxIndex = useCallback(() => {
    if (isMobile) {
      return Math.max(0, totalItems - 1);
    }
    return Math.max(0, totalItems - currentItemsPerView);
  }, [totalItems, currentItemsPerView, isMobile]);

  const maxIndex = getMaxIndex();

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);

      const isMobileView = window.innerWidth < 640;
      const isTabletView = window.innerWidth >= 640 && window.innerWidth < 1024;

      setIsMobile(isMobileView);

      let itemsPerViewCurrent;
      if (isMobileView) {
        itemsPerViewCurrent = itemsPerView.mobile || 1;
      } else if (isTabletView) {
        itemsPerViewCurrent = itemsPerView.tablet || 2;
      } else {
        itemsPerViewCurrent = itemsPerView.desktop || 3;
      }

      setCurrentItemsPerView(itemsPerViewCurrent);

      const gapValue = 16;
      const totalGapWidth = (itemsPerViewCurrent - 1) * gapValue;
      const calculatedItemWidth = (width - totalGapWidth) / itemsPerViewCurrent;

      setItemWidth(calculatedItemWidth);
    }
  }, [itemsPerView]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    if (autoPlay && !isHovered && totalItems > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const newIndex = prev + 1;
          return newIndex > maxIndex ? 0 : newIndex;
        });
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isHovered, maxIndex, autoPlayInterval, totalItems]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
  };

  useEffect(() => {
    if (carouselRef.current && itemWidth > 0) {
      const carousel = carouselRef.current;
      let scrollPosition;

      if (isMobile) {
        scrollPosition = currentIndex * (itemWidth + 16); // 16px gap
      } else {
        scrollPosition = currentIndex * (itemWidth + 16); // 16px gap
      }

      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex, itemWidth, isMobile]);

  const getDotCount = () => {
    if (isMobile) {
      return totalItems;
    }
    return Math.max(1, totalItems - currentItemsPerView + 1);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsHovered(false);
    }
  };

  if (!children || children.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className={cn(
            "flex overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide py-3",
            gap
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={(e) => e.stopPropagation()}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(`snap-${snapAlign} shrink-0`, itemClassName)}
              style={{
                width:
                  itemWidth > 0
                    ? `${itemWidth}px`
                    : isMobile
                    ? "100%"
                    : `${100 / currentItemsPerView}%`,
                minWidth:
                  itemWidth > 0
                    ? `${itemWidth}px`
                    : isMobile
                    ? "100%"
                    : `${100 / currentItemsPerView}%`,
              }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && totalItems > currentItemsPerView && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 z-10",
                "bg-white/90 hover:bg-white shadow-lg hover:shadow-xl",
                "rounded-full p-2 transition-all duration-300",
                "opacity-0 group-hover:opacity-100",
                "hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>

            <button
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 z-10",
                "bg-white/90 hover:bg-white shadow-lg hover:shadow-xl",
                "rounded-full p-2 transition-all duration-300",
                "opacity-0 group-hover:opacity-100",
                "hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {showDots && totalItems > currentItemsPerView && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          {Array.from({ length: getDotCount() }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                currentIndex === index
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
