import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});
const secret = process.env.jwtSecret;
const fetchuser = async (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    res
      .status(401)
      .json({ message: "Please Provide A Valid Token To Access This Route" });
  }

  try {
    const data = jwt.verify(token, secret);

    req.user = data;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Please Provide A Valid Token To Access This Route" });
  }
};

export default fetchuser;
