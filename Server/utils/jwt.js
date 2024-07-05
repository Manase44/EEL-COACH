import jwt from "jsonwebtoken";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (id) => {
  jwt.sign(
    {
      userId: id,
    },
    accessTokenSecret,
    {
      expiresIn: "10m",
    },
  );
};
res.cookie("token", generateToken);

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
  jwt.verify(token, accessTokenSecret);
};

//after login or regiter, generate the token and the refresh token. the id is the user id. the code is just a unique code. Store the refresh token in the database(a good practice when harshed)/or in a cookie
//when the user makes a request, we first get the token from them, verify it, then we compare it to the existing refresh token in the databse. if they match we give the services and generate a new token, otherwise the user is unauhorized.
