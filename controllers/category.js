const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if(err) {
            return res.status(400).json({
                error: "Category not found in DB"                
            });
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
        }
        res.json({category});
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "NO categories found"
            });
        }
        res.json(categories);
    });
};


    // Category.update(
    //     {_id : req.body.categoryId},
    //     {$set : { name: req.body.name}},
    //     (err, order) => {
    //         if(err) {
    //             return res.status(400).json({
    //                 error : "Cannot update category"
    //             });
    //         }
    //         res.json(category);
    //     }
    // ); 
exports.updateCategory = (req, res) => {

    console.log(req.body);

    const category = req.category;
    // console.log(category);
    category.name = req.body.name;
    // category.name = "Long";
    // console.log(category);
    console.log(req.body.name);

    category.save((err, updatedCategory) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to save category"
            });
        }
        res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this category"
            });
        }
        res.json({
            message: "Successfully deleted"
        });
    });
};