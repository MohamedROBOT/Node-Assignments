import { Logs } from "../../DB/index.js";

export const addLog = async (logData) => {
  try {
    const result = await Logs.insertOne(logData);
    return result;
  } catch (error) {
    throw error;
  }
};
