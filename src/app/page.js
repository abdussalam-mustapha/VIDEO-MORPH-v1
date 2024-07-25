"use client";

import { useState } from "react";
import Particle from "@/components/ui/Particle";
import ConvertVideo from "@/components/video-converion/convertVideo";

export default function Home() {
  return (
    <main className="p-4 relative h-screen">
      <Particle />
      <div className="relative z-[1000] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-4xl my-24 text-center">
            VIDEO MORPH
          </p>
          <div className="w-[80%] py-20">
            <p className="text-center">
              Transform Your Videos with Ease Experience the future of video
              conversion with our cutting-edge transcoding service. 
            </p>
          </div>
        </div>

        <ConvertVideo />
      </div>
    </main>
  );
}
