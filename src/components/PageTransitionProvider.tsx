"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProviderProps = {
  children: React.ReactNode;
};

export function PageTransitionProvider({
  children
}: PageTransitionProviderProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="min-h-screen w-full overflow-x-clip"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
