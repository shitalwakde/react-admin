import Company from "../models/companyModel.js";


export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(company[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(200).json(company);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateCompany = async (req, res) => {
  try {
    await Company.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Company Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const deleteCompany = async (req, res) => {
  try {
    await Company.destroy({
      where: {
        id: req.params.id,
      },
    });


    res.json({
      message: "Company Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const handleFileUpload = (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // You can save the file information in your database or perform other actions here
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const imageUrl = `${baseUrl}/uploads/${file.filename}`;
  res.json({ imageUrl });
};




