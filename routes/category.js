const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();
const Category = require('../db/category');
const { addCategory, updateCategory, deleteCategory, getCategory, getCategoryById } = require('../handlers/category-handler');

router.post('/', async (req, res) => {

    try {
        const model = req.body;
        let category = await addCategory(model);
        res.send({ message: "Category created successfully", category: category.toObject() });
    } catch (err) {
        res.status(500).send({ error: 'Failed to save category' });
    }
});

router.get('/', async (req, res) => {
        let category = await getCategory();
        res.send({ message: "Category got successfully", category });
   
});

    router.get('/:id', async (req, res) => {
            let id = req.params["id"];
            let category = await getCategoryById(id);
            res.send({ message: "Category got successfully", category });
    
    });

router.put('/:id', async (req, res) => {
    let id = req.params["id"];
    try {
        const model = req.body;
        const category = await updateCategory(id, model);       

        res.send({ message: "Category updated successfully", category });

    } catch (err) {
        res.status(500).send({ error: 'Failed to update category' });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    
    try {
        await deleteCategory(id);
        let category = await getCategory();
        res.send({ message: "Category deleted successfully", category });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete category' });
    }
});

module.exports = router;
