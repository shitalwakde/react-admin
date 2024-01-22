import express from "express";

import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  handleFileUpload,
} from "../controllers/companyControllers.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), handleFileUpload);
router.get("/getAllCompanies", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/createCompany", upload.none(), createCompany);
router.put("/updateCompany/:id", updateCompany);
router.delete("/deleteCompany/:id", deleteCompany);

export default router;
