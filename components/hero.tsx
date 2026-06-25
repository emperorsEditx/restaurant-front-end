"use client";

import { ArrowDown, FastArrowRight, Phone } from "iconoir-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />

      {/* Glowing orbs - decorative */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />

      {/* Burger - Background Hero Image */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none">
        <div
          className="relative w-full h-full"
          style={{
            opacity: 1,
            transform: "translateX(10%) scale(1.1)",
          }}
        >
          <Image
            src="/graphics/tasty burger.svg"
            alt=""
            fill
            className="object-contain object-right opacity-100 md:opacity-100 lg:opacity-100 transition-opacity duration-700"
            style={{
              filter: "drop-shadow(0 0 120px rgba(251,191,36,0.25))",
              animation: "float 6s ease-in-out infinite",
            }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
          />
        </div>
      </div>

      {/* Tablet overlay for burger */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/0 to-black/50 md:via-black/30 lg:via-black/0 pointer-events-none" />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 md:via-black/50 lg:via-black/30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col items-start justify-center min-h-[calc(100vh-6rem)]">
          {/* Content container - left aligned with max width */}
          <div className="w-full max-w-2xl lg:max-w-3xl space-y-8 md:space-y-10">
            {/* Halal Badge */}
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-auto md:h-16">
                <Image
                  src="/graphics/halal logo.svg"
                  alt="100% Halal Certified"
                  fill
                  className="object-contain"
                  priority
                  sizes="80px"
                />
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.05]">
                <span className="text-primary">THE FOODIE</span>
                <br />
                <span className="text-white">WAGON</span>
              </h1>

              {/* Tagline */}
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/60 font-light tracking-wide pt-1">
                Where Flavor Hits The Road
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-lg leading-relaxed tracking-wide">
              Premium halal burgers, crispy fried chicken, and authentic
              currywurst — straight from the food truck to you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <a
                href="tel:+4917622245627"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-black font-bold text-sm tracking-wider rounded-xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out w-full sm:w-auto"
              >
                <Phone className="w-5 h-5" />
                +49 176 22245627
              </a>
              <Link
                href="#menu"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-wider rounded-xl hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out w-full sm:w-auto shadow-lg shadow-black/20"
              >
                VIEW MENU
                <FastArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Location Card - Premium Glassmorphism */}
            <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-5 sm:p-6 md:p-7 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0">
                  <Image
                    src="/graphics/truck.svg"
                    alt="Food Truck Location"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-primary font-black text-xl sm:text-2xl md:text-3xl leading-tight">
                    Every Saturday
                  </p>
                  <p className="text-white font-semibold text-base sm:text-lg md:text-xl leading-tight">
                    Am Westpark 7, Ingolstadt
                  </p>
                  <p className="text-white/50 text-sm sm:text-base mt-0.5">
                    11:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Stats - Premium Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg w-full">
              <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl px-4 py-3 sm:py-4 text-center hover:bg-white/10 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">
                  11+
                </p>
                <p className="text-xs sm:text-sm text-white/40 font-medium tracking-widest uppercase">
                  BURGER
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl px-4 py-3 sm:py-4 text-center hover:bg-white/10 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">
                  10+
                </p>
                <p className="text-xs sm:text-sm text-white/40 font-medium tracking-widest uppercase">
                  DIPS
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl px-4 py-3 sm:py-4 text-center hover:bg-white/10 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">
                  100%
                </p>
                <p className="text-xs sm:text-sm text-white/40 font-medium tracking-widest uppercase">
                  HALAL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary/60" />
        </div>
      </div>

      {/* Global animation styles via style tag */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
        }
      `}</style>
    </section>
  );
}
