"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    reverse?: boolean;
}


const Container = ({children, className, delay = 0.2, reverse}: Props) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: reverse ? -20 : 20}}
        whileInView={{opacity:1, y:0}}
        viewport={{ once: false}}
        transition={{delay:delay, duration: 0.4, ease: "easeInOut" }}
        className={cn("w-full h-full", className)}
    
    >
        {children}
    </motion.div>
  )
};

export default Container
