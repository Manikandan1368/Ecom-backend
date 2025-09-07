const Brand = require('../db/brand');

async function getBrand(){
    let brands = await Brand.find();
    return brands.map((brand) => brand.toObject());
}

async function getBrandById(id) {
    console.log('id: ', id);
    let brand = await Brand.findById(id);
    console.log('brand: ', brand);
    return brand.toObject();
}

async function addBrand(model) {
    console.log('model: ', model);
    const brand = new Brand({
        name: model.name,
    });
    await brand.save();
    return brand;
}

async function updateBrand(id, model) {
    const brand = await Brand.findByIdAndUpdate({ _id: id },
        model,
        { new: true }
    );
    return brand.toObject();
}

async function deleteBrand(id) {
    await Brand.findByIdAndDelete(id);
    return;
}

module.exports = { getBrand, getBrandById, addBrand, updateBrand, deleteBrand };