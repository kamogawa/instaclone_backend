import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client"

export default {
  Mutation: {
    login: async(_, {username, password}) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not fount"
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect Password"
        };
      }
      const token = await jwt.sign({id: user.id}, process.env.SECRER_KEY);
      return {
        ok: true,
        token
      };
    },
  }
}