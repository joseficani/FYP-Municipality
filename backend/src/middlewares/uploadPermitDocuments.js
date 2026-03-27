const multer = require("multer");

const path = require("path");

const fs = require("fs");
 
const uploadPath = path.join(__dirname, "../../uploads/permits");
 
if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath, { recursive: true });

}
 
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, uploadPath);

  },

  filename: function (req, file, cb) {

    const uniqueName = `${Date.now()}-${Math.round(

      Math.random() * 1e9

    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);

  },

});
 
const fileFilter = (req, file, cb) => {

  const allowed = [

    "application/pdf",

    "image/png",

    "image/jpeg",

    "image/jpg",

  ];
 
  if (allowed.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(new Error("Only PDF, PNG, JPG, JPEG files are allowed."), false);

  }

};
 
const uploadPermitDocuments = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 10 * 1024 * 1024,

    files: 10,

  },

});
 
module.exports = uploadPermitDocuments;
 