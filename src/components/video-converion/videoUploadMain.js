import { useState } from 'react';
import uploadVideo from './videoUpload';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('mp4');
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const url = await uploadVideo(file, format);
        setVideoUrl(url);
      } catch (error) {
        console.error('Failed to upload video', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <select value={format} onChange={handleFormatChange}>
        <option value="mp4">MP4</option>
        <option value="webm">WebM</option>
      </select>
      <button onClick={handleUpload}>Upload Video</button>
      {videoUrl && (
        <div>
          <p>Video uploaded successfully. Download from the link below:</p>
          <a href={videoUrl} download>
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
