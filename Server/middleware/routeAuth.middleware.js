import { verifyToken } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({ ok: false, message: "You are not authenticated" });
  }
  try {
    const decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ ok: false, message: "invalid token" });
  }
};

export default authenticate;
