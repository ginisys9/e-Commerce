const Product = require("../schema/product.schema");
const path = require("path");
const fs = require("fs");
const createProduct = async (req, res) => {
  try {
    const { name, price,description, perPriceQuantity, quantity,category } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const image = req.files.image;
    image.name = Date.now() + "-" + image.name;
    const upoladDirectory = path.join(__dirname, "..", "uploads", "product");
    if (!fs.existsSync(upoladDirectory)) {
      fs.mkdirSync(upoladDirectory, { recursive: true });
    }
    const product_log = `/product/${image.name}`;
    image.mv(path.join(upoladDirectory, image.name),(err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
    });
    const product = await Product.create({
      name,
      price,
      perPriceQuantity,
      category,
      quantity,
      description,
      image: product_log,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const productList = async (req, res) => {
  try {
    const{limit=10,offset=1} = req.query;
    const products = await Product.find().populate("category").skip((offset-1)*limit).limit(limit);
    return res.status(200).json({products,pagination:{
      total:products.length,
      limit,
      offset
    }});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
const editProduct = async (req, res) => {
  try {
    const { name, price,description, perPriceQuantity, quantity,category } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      perPriceQuantity,
      category,
      quantity,
      description,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const productDetail = async (req, res) => {
  try {
    const{id} = req.params;
    const product = await Product.findById(id).populate("category");
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createProduct,
  productList,
  editProduct,
  productDetail
};
