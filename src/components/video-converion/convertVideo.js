import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaDownload } from "react-icons/fa";

export default function Home() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("mp4");
  const [downloadLink, setDownloadLink] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("to", format);

    try {
      const response = await axios.post("https://video-morph-transcoder.onrender.com/convert", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Error during conversion:", error);
    }
  };

  return (
    <div className="container w-full flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Convert Videos Online</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <FaUpload className="text-4xl text-gray-400 mx-auto mb-2" />
          {isDragActive ? (
            <p className="text-gray-600">Drop the files here...</p>
          ) : (
            <p className="text-gray-600">Drag & drop a file here, or click to select a file</p>
          )}
          {file && <p className="mt-2 text-gray-700">{file.name}</p>}
        </div>
        <div className="form-group mt-4">
          <label htmlFor="to" className="block mb-2">
            Convert To:
          </label>
          <select
            name="to"
            className="w-full p-2 border rounded-md text-[#111]"
            value={format}
            onChange={handleFormatChange}
          >
            <option value="mp4">mp4</option>
            <option value="flv">flv</option>
            <option value="avi">avi</option>
            <option value="webm">webm</option>
            <option value="mov">mov</option>
          </select>
        </div>
        <div className="form-group mt-4">
          <button className="w-full bg-blue-500 text-white p-2 rounded-md" type="submit">
            Convert
          </button>
        </div>
      </form>
      {downloadLink && (
        <div className="form-group mt-4">
          <button className="flex items-center bg-red-500 text-white p-2 rounded-md">
            <FaDownload className="mr-2" />
            <a
              className="text-white"
              href={downloadLink}
              download="converted_video"
            >
              Download Converted Video
            </a>
          </button>
        </div>
      )}
    </div>
  );
}
