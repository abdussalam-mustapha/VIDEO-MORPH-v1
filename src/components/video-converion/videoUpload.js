import axios from 'axios';

const uploadVideo = async (file, format) => {
  const formData = new FormData();
  formData.append('video', file);
  formData.append('format', format); // Include the desired format in the request

  try {
    const response = await axios.post('https://video-morph.onrender.com/video/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.video && response.data.video.url) {
      return response.data.video.url;
    } else {
      throw new Error('Failed to get video URL');
    }
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export default uploadVideo;
