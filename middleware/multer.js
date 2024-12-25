const { existsSync, mkdirSync } = require("fs");
const multer = require("multer");
const path = require("path");

const ensureExistDirect = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const avatarStorage = multer.memoryStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../upload/avatar");
    ensureExistDirect(uploadPath);
    cb(null, uploadPath);
  },
})

module.exports.uploadUserAvatar = multer({
  storage: avatarStorage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|png|jpeg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extnameValid = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extnameValid) {
      return cb(null, true);
    }
    cb(
      new Error(
        "File upload only supports the following filetypes - " + fileTypes
      )
    );
  },
}).single("avatar");

const imageStorage = multer.memoryStorage(); // Using memory storage for in-memory buffers

// Set up multer instance to handle specific fields
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|png|jpeg/; // Allowed file types
    const mimeType = fileTypes.test(file.mimetype); // Check mimetype
    const extnameValid = fileTypes.test(
      path.extname(file.originalname).toLowerCase() // Check file extension
    );

    if (mimeType && extnameValid) {
      return cb(null, true); // Accept file
    }
    cb(
      new Error(
        "File upload only supports the following filetypes - " + fileTypes
      )
    );
  },
}).fields([
  { name: "mainImage", maxCount: 1 }, // Handle single main image
  { name: "multiImage", maxCount: 5 }, // Handle up to 5 additional images
]);

module.exports = { uploadImage };
