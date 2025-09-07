const express = require('express');
const router = express.Router();

router.use(express.json());
const Brand = require('../db/brand');
const { addBrand, getBrand, updateBrand, deleteBrand, getBrandById } = require('../handlers/brand-handler');

router.post('/', async (req,res)=>{
    let model = req.body;
    try {
        let brand = await addBrand(model);
        res.send({ message: "Brand created successfully", brand: brand.toObject() });
    }
    catch (err) {
        res.status(500).send({ error: 'Failed to save brand' });
    }
})

router.get('/', async (req, res) => {
    try {
        let brands = await getBrand();
        res.send({ message: "Brands retrieved successfully", brands });
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve brands' });
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params["id"];
    try {
        let brand = await getBrandById(id);
        if (!brand) {
            return res.status(404).send({ error: 'Brands not found' });
        }
        res.send({ message: "Brand retrieved successfully", brand });
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve brand' });
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params["id"];
    let model = req.body;
    try {
        let brand = await updateBrand(id, model);
        if (!brand) {
            return res.status(404).send({ error: 'Brand not found' });
        }
        res.send({ message: "Brand updated successfully", brand });
    } catch (err) {
        res.status(500).send({ error: 'Failed to update brand' });
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        await deleteBrand(id);
        let brand = await getBrand();
        if (!brand) {
            return res.send({ error: 'Brand not found' });
        }
        res.send({ message: "Brand deleted successfully", brand });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete brand' });
    }
});

module.exports = router;