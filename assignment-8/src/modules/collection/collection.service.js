import { Authors, Books, db } from "../../DB/index.js";

export const createExplicitCollection = async () => {
  try {
    const exists = await db.listCollections({ name: "books" }).toArray();
    if (exists.length > 0) {
      return {
        success: false,
        message: "Collection 'books' already exists",
      };
    }

    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "Title must be not empty",
            },
          },
        },
      },
    });

    return {
      ok: 1,
    };
  } catch (error) {
    throw error;
  }
};

export const createImplicitCollection = (data) => {
  try {
    const result = Authors.insertOne(data);

    return result;
  } catch (error) {
    throw error;
  }
};

export const createCappedCollection = async () => {
  try {
    const exists = await db.listCollections({ name: "logs" }).toArray();
    if (exists.length > 0) {
      return {
        success: false,
        message: "Collection 'logs' already exists",
      };
    }
    await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });
    return {
      ok: 1,
    };
    return;
  } catch (error) {
    throw error;
  }
};

export const createBooksCollIndex = async() => {
  try {
    const result =await Books.createIndex({ title: 1 });

    if (!result) throw new Error("index not created");

    return result;
  } catch (error) {
    throw error;
  }
};
