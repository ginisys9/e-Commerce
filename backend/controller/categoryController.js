const Category = require("../schema/category.schema");
const path = require("path");
const fs = require("fs");
const createCategory = async (req, res) =>{
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({message: "No file uploaded"});
    }
    const { name } = req.body;
    const image = req.files.image;
    image.name = Date.now() + "-" + image.name;
    const upoladDirectory = path.join(__dirname,"..","uploads","category");
    if (!fs.existsSync(upoladDirectory)) {
      fs.mkdirSync(upoladDirectory, { recursive: true});
    }
    const category_log =`${process.env.BASE_URL}/category/${image.name}`;
    image.mv(path.join(upoladDirectory, image.name), (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
    });
    const category = await Category.create({name, image:category_log});
    res.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getCategoryList = async (req, res) => {
  try {
    const{limit=10,offset=1} = req.query;
    // offset => pageNumber 
    // limit => pageSize
    const skip = (offset - 1) * limit;
    const categories = await Category.find().skip(skip).limit(limit);
    res.status(200).json({categories,pagination:{
        total:categories.length,
        limit,
        offset
    }});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createCategory,
  getCategoryList
};


