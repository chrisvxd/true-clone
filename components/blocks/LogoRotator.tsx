"use client";

import { useEffect, useState } from "react";

export type Logo = { name: string; src: string };

// One cell of the hero logo wall. Cells cross-fade through their logos on a
// staggered timer so the wall never changes all at once.
export function LogoRotator({
  logos,
  index,
  interval = 3200,
}: {
  logos: Logo[];
  index: number;
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (logos.length < 2) return;
    let timer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      timer = setInterval(() => setActive((i) => (i + 1) % logos.length), interval);
    }, index * 450);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [logos.length, index, interval]);

  return (
    <div className="relative flex h-[60px] items-center justify-center md:h-[80px]">
      {logos.map((logo, i) => (
        <div
          key={logo.src + i}
          className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            opacity: i === active ? 1 : 0,
            transform: i === active ? "translateY(0)" : "translateY(6px)",
          }}
          aria-hidden={i !== active}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.name}
            className="max-h-11 max-w-[120px] min-w-0 object-contain opacity-90 brightness-0 invert md:max-h-12 md:max-w-[150px]"
          />
        </div>
      ))}
    </div>
  );
}
