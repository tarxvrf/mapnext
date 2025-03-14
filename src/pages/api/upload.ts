import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method is allowed' });
  }
 
  
  const data = await new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', chunk => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });

    req.on('error', (err) => {
      reject(err);
    });
  });

  // Define upload folder
  const uploadFolder = path.resolve('./public/uploads');
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }
  

 const contentdis = req.headers['content-disposition'];
 const filename =contentdis && contentdis.split('filename="')[1].split('"')[0];
  const filePath = path.join(uploadFolder, `${filename as string}.png`); // Modify the filename as needed

  // Write the image to the filesystem
  fs.writeFile(filePath, Buffer.from(data as Buffer), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to upload image' });
    }

    res.status(200).json({ message: 'Image uploaded successfully', filePath });
  });
};

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default uploadHandler;