import { verifyToken } from "./token.utils.js";

export const getId = (headers)=>{
    const { token } = headers;
      const { id } = verifyToken(token);
      return id
}