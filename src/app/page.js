"use client";

import { useState } from 'react';
import axios from 'axios';
import Particle from '@/components/ui/Particle';
import Dropzone from "../components/dropzone/dropzone"

export default function Home() {
 
  

  return (
    <main className="p-4 relative h-screen">
      <Particle />
      <div className="relative z-[1000] flex flex-col justify-center items-center">
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
