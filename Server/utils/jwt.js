import jwt from "jsonwebtoken";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign(
    {
      payload,
    },
    accessTokenSecret,
    {
      expiresIn: "10m",
    },
  );

  return token;
};

const generateRefreshToken = (id, code) => {
  const refreshToken = jwt.sign(
    {
      userId: id,
      code,
    },
    accessTokenSecret,
    {
      expiresIn: "8h",
    },
  );

  return refreshToken;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    return decoded;
  } catch (error) {
    return "Invalid token!";
  }
};

export default { generateRefreshToken, generateToken, verifyToken };
