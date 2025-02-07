const Book = require('./book.model');

const postABook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook})
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create book"})
    }
}


// get all books

const getAllBooks= async(req, res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1});
        res.status(200).send(books)
    }catch(error){
        console.error("error in fetching books",error)
        res.status(500).send({message:"failed to fetch books"})
    }
}

// get a book 

const getSingleBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const book=await Book.findById(id)
        if(!book){
            return res.status(404).send({message:"book not found"})
        }
        res.status(200).send(book)
    }catch(error){
        console.error("error in fetching book",error)
        res.status(500).send({message:"failed to fetch book"})
    }
}

// update book data

const updateBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const updatedBook=await Book.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedBook){
            return res.status(404).send({message:"book is not found"});
        }
        res.status(200).send({message:"book updated successfully",book:updatedBook})
    }catch(error){
        console.error("error in updating book",error)
        res.status(500).send({message:"failed to update book"})
    }
}

// delete a book

const deleteBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedBook=await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).send({message:"book is not found"})
        }
        res.status(200).send({message:"book deleted successfully",book:deletedBook})
    }catch(error){
        console.error("error in deleting book",error)
        res.status(500).send({message:"failed to delete book"})
    }
}




module.exports={postABook, getAllBooks,getSingleBook,updateBook,deleteBook,deleteBook}
