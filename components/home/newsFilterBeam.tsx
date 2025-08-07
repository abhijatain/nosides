"use client";

import React from "react";
import { motion } from "framer-motion";
import { TopojsonMap } from "../worldMap";
import RotatingText from "./rotatingText";

// NewsFilterBeam Component
export default function NewsFilterBeam() {

    return (
        <div className="p-2 bg-white text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                We{' '}
                <span className="pr-2">
                    <RotatingText
                    texts={['collect', 'cluster', 'analyse']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-[#27548A] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                />
                </span>
                news 
                <br />
                articles to reduce{' '}
                <span className="relative">
                    <span className="text-red-500 bg-red-100 px-2 py-1 rounded-lg">noise</span>
                    <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-red-200 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    />
                </span>
            </h2>
            <div>
                <TopojsonMap height={200} width="90vw" initialYear={2020} />
            </div>

        </div>
    );
}