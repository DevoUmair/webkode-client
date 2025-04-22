// components/FullPageLoader.tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // optional sparkle icon
import { Link } from "react-router-dom";

export default function FullPageLoader() {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-background to-blue-50 dark:to-blue-950/30">
      {/* Animated logo */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo mark */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-6 select-none"
        >
          {/* Replace SVG below with your real logo if you have one */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-[1.5] stroke-blue-600 dark:stroke-cyan-400"
          >
            <path
              d="M3 12h18M12 3v18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          FinConnect
        </motion.h1>

        {/* Sub‑copy */}
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading...&hellip;
        </motion.p>
      </motion.div>
    </section>
  );
}
