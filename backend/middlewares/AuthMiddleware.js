const joi = require('joi');
const jwt = require('jsonwebtoken');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const signUpValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
    }),
    pic: joi.object().optional(),
  })

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400)
      .json({ message: "Bad Request", error: error, success: false })
  }

  if (req.file) {
    const file = req.file;
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.mimetype)) {
      return res.status(400)
        .json({ message: "Invalid file type. Only JPG, JPEG and PNG are allowed.", success: false });
    }

    if (file.size > maxSize) {
      return res.status(400)
        .json({ message: "File size exceeds 2 MB.", success: false });
    }
    req.body.pic = file;
  } 
  // else {
  //   return res.status(400)
  //     .json({ message: "Profile picture is required.", success: false });
  // }

  next();
}

const signInValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
  })

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400)
      .json({ message: "Bad Request", error: error, success: false })
  }
  next();
}

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access', success: false, error: 'Unauthorized access' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userData;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token', success: false, error: 'Invalid or expired token' });
  }
};

module.exports = { signUpValidation, signInValidation, authenticate, upload }