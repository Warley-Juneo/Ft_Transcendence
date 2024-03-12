// multer.config.ts
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const multerConfig: MulterModuleOptions = {
  dest: './src/avatarUploads',
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/avatarUploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
};
