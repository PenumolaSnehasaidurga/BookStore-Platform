import Book from "../model/book.model.js"; // Adjust this if your model file is named differently!

export const getBook = async (req, res) => {
  try {
    // This fetches all books from your MongoDB collection
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
