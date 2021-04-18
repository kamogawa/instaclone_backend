import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const test = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(test);
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({where: { id }});
    if (user) {
      return user;
    } else {
      return null;
    }

  } catch {
    return null;
  }
}