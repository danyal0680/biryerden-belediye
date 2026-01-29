import multer from 'multer';
import path from 'path';
import fs from 'fs';

const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları yükleyebilirsiniz!'));
  }
};

const mixedFileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif|webp/;
  const documentTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  
  const isImage = imageTypes.test(ext);
  const isDocument = documentTypes.test(ext);
  
  if (isImage || isDocument) {
    return cb(null, true);
  } else {
    cb(new Error('Desteklenmeyen dosya formatı! Resim (jpeg, jpg, png, gif, webp) veya doküman (pdf, doc, docx, xls, xlsx, ppt, pptx) yükleyebilirsiniz.'));
  }
};

const createUploader = (moduleName) => {
  const uploadDir = `uploads/${moduleName}`;

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${moduleName}-${uniqueSuffix}${ext}`);
    }
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter: imageFilter
  });
};

const createMixedUploader = (moduleName) => {
  const uploadDir = `uploads/${moduleName}`;

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${moduleName}-${uniqueSuffix}${ext}`);
    }
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
    fileFilter: mixedFileFilter
  });
};

export { createMixedUploader, createUploader };