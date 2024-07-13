"use client"

import { useState, useRef } from "react";
import Image from "next/image";
import Dropzone from "../components/dropzone/dropzone";
import Particle from "@/components/ui/Particle";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [file, setFile] = useState(null);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      messageRef.current.innerHTML = message;
      console.log(message);
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    setLoaded(true);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const transcode = async () => {
    if (!file) return;

    const ffmpeg = ffmpegRef.current;
    const inputFile = 'input.mp4';
    const outputFile = 'output.webm';

    await ffmpeg.FS('writeFile', inputFile, await fetchFile(file));
    await ffmpeg.run('-i', inputFile, outputFile);

    const data = await ffmpeg.FS('readFile', outputFile);
    videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/webm' }));
  };

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
        <div>
          {loaded ? (
            <>
              <input type="file" onChange={handleFileChange} accept="video/mp4" />
              <button onClick={transcode} disabled={!file}>Transcode Video</button>
              
              <p ref={messageRef}></p>
              <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
            </>
          ) : (
            <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
          )}
        </div>
      </div>
    </main>
  );
}
