import multer from 'multer';
import path from 'path';

const customerProfileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../public`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        'PROFILE' +
          '_' +
          Date.now() +
          Math.round(Math.random() * 1000) +
          '.' +
          file.mimetype.split('/')[1],
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const checkExt = allowedExtensions.includes(
      file.mimetype.split('/')[1].toLowerCase(),
    );

    if (checkExt) {
      cb(null, true);
    } else {
      cb(new Error('File format not supported'));
    }
  };

  const limits = {
    fileSize: 1024 * 1024,
  };

  return multer({ storage, fileFilter, limits });
};

export { customerProfileUpload };
