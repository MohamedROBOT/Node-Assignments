import Books from "../../DB/models/books.model.js";

export const addBook = async (bookData) => {
  try {
    const response = await Books.insertOne(bookData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addBooks = async (booksData) => {
  try {
    const response = await Books.insertMany(booksData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateBookYear = async (bookTitle, year) => {
  try {
    const result = await Books.updateOne({ title: bookTitle }, { $set: year });

    return result;
  } catch (error) {
    throw error;
  }
};

export const findBookByTitle = async (title) => {
  try {
    const result = await Books.findOne({ title });
    if (!result) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};

export const findBookByYear = async (filter) => {
  try {
    const result = await Books.find(filter).toArray();
    if (!result) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};
export const findBookByGenre = async (filter) => {
  try {
    const result = await Books.find(filter).toArray();
    if (!result) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};

export const skipLimitBooks = async () => {
  try {
    const result = Books.find().skip(2).limit(3).sort({ year: -1 }).toArray();
    if (!result) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};

export const findBookYearAsInt = async (filter) => {
  try {
    const result = Books.find(filter).toArray();
    if (!result) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};
export const findBooksByExcludingGenres = async (filter) => {
  try {
    const result = Books.find(filter).toArray();
    if (!result) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};

export const DeleteBooksByYear = async (filter) => {
  try {
    const result = Books.deleteMany(filter);
    if (!result) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};

export const findBooksUsingAggregationFilter = async (pipeline) => {
  try {
    const result = await Books.aggregate(pipeline).toArray();
    if (result.length === 0) throw new Error("Book not found", { cause: 404 });

    return result;
  } catch (error) {
    throw error;
  }
};
