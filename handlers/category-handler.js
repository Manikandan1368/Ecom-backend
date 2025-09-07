const Category = require("../db/category");

async function addCategory(model) {
  const category = new Category({
    name: model.name,
  });
  await category.save();
  return category;
}

async function getCategory() {
  let categories = await Category.find();
  return categories.map((category) => category.toObject());
};

async function getCategoryById(id) {
  let category = await Category.findById(id);
  return category.toObject();
};

async function updateCategory(id, model) {
  const category = await Category.findByIdAndUpdate({ _id: id }, model, { new: true } );

  return category;
}

async function deleteCategory(id) {
  await Category.findByIdAndDelete(id);
  return;
}

module.exports = { addCategory, updateCategory, deleteCategory, getCategory, getCategoryById };
