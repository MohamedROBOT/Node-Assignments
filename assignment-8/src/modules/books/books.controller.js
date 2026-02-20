import { Router } from "express";
import {
  addBook,
  addBooks,
  DeleteBooksByYear,
  findBookByTitle,
  findBookByYear,
  findBooksByExcludingGenres,
  findBooksUsingAggregationFilter,
  findBookYearAsInt,
  skipLimitBooks,
  updateBookYear,
} from "./books.service.js";
import { Logs } from "../../DB/index.js";
import { ObjectId } from "mongodb";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const response = await addBook(req.body);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});
router.post("/batch", async (req, res, next) => {
  try {
    const response = await addBooks(req.body);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.patch("/future", async (req, res, next) => {
  try {
    const { bookTitle, year } = req.body;
    const response = await updateBookYear(bookTitle, { year });
    const { acknowledged, matchedCount, modifiedCount } = response;
    return res.status(201).json({ acknowledged, matchedCount, modifiedCount });
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.get("/title", async (req, res, next) => {
  try {
    const { title } = req.query;
    const response = await findBookByTitle(title);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.get("/year", async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const filter = { year: { $gte: +from, $lte: +to } };
    const response = await findBookByYear(filter);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});
router.get("/genre", async (req, res, next) => {
  try {
    const { genre } = req.query;

    const filter = { genres: { $in: [genre] } };
    const response = await findBookByYear(filter);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.get("/skip-limit", async (req, res, next) => {
  try {
    const response = await skipLimitBooks();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});
router.get("/year-integer", async (req, res, next) => {
  try {
    const response = await findBookYearAsInt({ year: { $type: "int" } });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.get("/exclude-genres", async (req, res, next) => {
  try {
    const response = await findBooksByExcludingGenres({
      genres: { $nin: ["Horror", "Science Fiction"] },
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.delete("/before-year", async (req, res, next) => {
  const { year } = req.query;

  try {
    const response = await DeleteBooksByYear({ year: { $lt: year } });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.get("/aggregate1", async (req, res, next) => {
  const pipeline = [
    {
      $match: { year: { $gt: 2000 } },
    },
    {
      $sort: { year: -1 },
    },
  ];
  try {
    const response = await findBooksUsingAggregationFilter(pipeline);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.get("/aggregate2", async (req, res, next) => {
  const pipeline = [
    {
      $match: { year: { $gt: 1950 } },
    },
    {
      $project: { title: 1, author: 1, year: 1, _id: 0 },
    },
  ];
  try {
    const response = await findBooksUsingAggregationFilter(pipeline);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.get("/aggregate3", async (req, res, next) => {
  const pipeline = [
    {
      $unwind: { path: "$genres" },
    },
  ];
  try {
    const response = await findBooksUsingAggregationFilter(pipeline);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});
router.get("/aggregate4", async (req, res, next) => {
  const pipeline = [
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "book_id",
        as: "logs",
      },
    },
  ];
  try {
    const response = await findBooksUsingAggregationFilter(pipeline);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});
export default router;
