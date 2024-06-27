"use client";

import Image from "next/image";
import Dropzone from "../components/dropzone/dropzone";
import Particle from "@/components/ui/Particle";

export default function Home() {
  return (
    <main className="p-4 relative h-screen">
     <Particle />
      <div className=" flex flex-col justify-center items-center z-20">
        <div className="flex flex-col justify-center items-center">
          <p className="text-4xl my-24">
            Convert your Video Format Online Easily
          </p>
          <div className="w-[80%] py-20">
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,
            </p>
          </div>
        </div>
        <Dropzone />
      </div>
    </main>
  );
}

// https://ffmpegwasm.netlify.app/docs/api/ffmpeg/classes/FFmpeg
// https://ffmpegwasm.netlify.app/docs/api/util/
