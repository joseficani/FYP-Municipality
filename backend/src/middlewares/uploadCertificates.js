const multer = require("multer");
const path = require("path");
const fs = require("fs");
 
const certificatePath = path.join(__dirname, "../../uploads/certificates");
const requestPath = path.join(__dirname, "../../uploads/requests");
 
if (!fs.existsSync(certificatePath)) {
  fs.mkdirSync(certificatePath, { recursive: true });
}
 
if (!fs.existsSync(requestPath)) {
  fs.mkdirSync(requestPath, { recursive: true });
}
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const serviceType = req.body.serviceType;
 
    if (serviceType === "certificate") {
      cb(null, certificatePath);
    } else {
      cb(null, requestPath);
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
 
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];
 
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, PNG, JPG, JPEG files are allowed"), false);
  }
};
 
const uploadCertificates = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});
 
module.exports = uploadCertificates;
 