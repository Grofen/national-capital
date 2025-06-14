"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px", amount: 0.1 };

export function FadeIn(
  props: React.ComponentPropsWithoutRef<typeof motion.div>
) {
  let shouldReduceMotion = useReducedMotion();
  let isInStaggerGroup = useContext(FadeInStaggerContext);
  let [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: isMounted ? 0.1 : 0,
      }}
      {...props}
    />
  );
}

export function FadeInStagger({
  faster = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { faster?: boolean }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        variants={{
          hidden: {},
          visible: {},
        }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
