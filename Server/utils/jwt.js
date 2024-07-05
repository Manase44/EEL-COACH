import jwt from "jsonwebtoken";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (payload) => {
  jwt.sign(
    {
      payload,
    },
    accessTokenSecret,
    {
      expiresIn: "10m",
    },
  );

  return res.cookie("token", generateToken);
};

const generateRefreshToken = (id, code) => {
  jwt.sign(
    {
      userId: id,
      code,
    },
    accessTokenSecret,
    {
      expiresIn: "8h",
    },
  );
};

const verifyToken = (token) => {
  jwt.verify(token, accessTokenSecret, (error, decoded) => {
    if (error) {
      return "invalid token";
    } else {
      return decoded;
    }
  });
};
