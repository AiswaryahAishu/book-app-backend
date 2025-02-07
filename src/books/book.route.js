const express = require('express')
const router=express.Router()
const { postABook, getAllBooks, getSingleBook, updateBook,deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');



// from fronted request to the backend server this req go to the controller first and the based on the logic it will call the schema and based on the schema if this reqest is valid it will request to database and it will send a data to the server and it will back to the frontend
// req from frontend=> backend server => controller=>book.schema=>database=>send response(data)to server=>back to frontend
// post : when submit something from frontend to database
// get : when we want to get data from database to frontend
// put/patch:when edit or upadate data 
// delete : when delete data from database

// post a book
router.post("/create-book",verifyAdminToken,postABook)

// get all books

router.get("/",getAllBooks)

// get a single book

router.get("/:id",getSingleBook)

// update a book 

router.put("/edit/:id",verifyAdminToken,updateBook)

// delete a book

router.delete("/:id",verifyAdminToken,deleteBook)



  module.exports = router;

