const express = require("express");
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//params
router.param("userId", getUserById );
// getCategoryById
router.param("categoryId", getCategoryById)
//actual routers 
//create
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory );

//read 
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory)
/*
{"host":"localhost:8000","connection":"keep-alive","content-length":"14","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36","content-type":"text/plain;charset=UTF-8","accept":"**","origin":"http://localhost:3000","sec-fetch-site":"same-site","sec-fetch-mode":"no-cors","sec-fetch-dest":"empty","referer":"http://localhost:3000/admin/category/update/5ec1b7d5d8a1860530a6eb3d","accept-encoding":"gzip, deflate, br","accept-language":"en-GB,en-US;q=0.9,en;q=0.8"}

*/

//update
router.put("/category/:categoryId/:userId", 
isSignedIn, isAuthenticated, isAdmin, 
updateCategory);

//delete
router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin,  removeCategory);


module.exports = router;