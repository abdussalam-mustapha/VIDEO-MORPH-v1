import nextConnect from 'next-connect';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({ dest: 'uploads/' });

const handler = nextConnect()
  .use(upload.single('video'))
  .post(async (req, res) => {
    const filePath = req.file.path;
    const { name, description } = req.body;

    try {
      const formData = new FormData();
      formData.append('video', fs.createReadStream(filePath));
      formData.append('name', name);
      if (description) {
        formData.append('description', description);
      }

      const response = await axios.post('https://video-morph.onrender.com/video/upload', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      const originalFileName = req.file.originalname.split('.').slice(0, -1).join('.');
      const convertedFileName = `${uuidv4()}-${originalFileName}.webm`; // Always convert to webm
      const convertedFilePath = path.join(process.cwd(), 'public', 'converted', convertedFileName);
      
      fs.writeFileSync(convertedFilePath, response.data);

      fs.unlinkSync(filePath);

      res.status(200).json({ convertedFileUrl: `/converted/${convertedFileName}` });
    } catch (error) {
      console.error('Error during conversion:', error);
      res.status(500).json({ error: 'Error during conversion' });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
