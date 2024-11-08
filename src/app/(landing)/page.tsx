"use client";

import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

export default function Component() {
  return (
    <main className="container relative mx-auto flex min-h-[70vh] flex-col items-center justify-center overflow-hidden">
      {/* Animated SVG elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/4 top-1/4"
      >
        <Star className="h-8 w-8 text-violet-500" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-1/4 right-1/4"
      >
        <CheckCircle className="h-8 w-8 text-violet-500" />
      </motion.div>

      {/* Main text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:400%_400%] bg-clip-text text-4xl font-bold text-transparent sm:text-6xl md:text-7xl">
          Easiest way to
        </h1>
        <h1 className="animate-gradient mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:400%_400%] bg-clip-text text-4xl font-bold text-transparent sm:text-6xl md:text-7xl">
          organize your tasks
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xl text-gray-300"
        >
          Streamline your workflow with our intuitive task management system
        </motion.p>
      </motion.div>

      {/* Call to action button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8"
      >
        <Button
          className="py-8 text-2xl font-bold"
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
        >
          I want to manage my tasks
        </Button>
      </motion.div>
    </main>
  );
}
