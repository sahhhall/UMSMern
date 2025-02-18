import JWT from "jsonwebtoken";

const generateAccessToken = (res, userId, role) => {
  console.log(role)
  try {
    const payload = {
      id: userId,
      role
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "10d",
      issuer: "sahal.com",
    };
    const token = JWT.sign(payload, secret, options);
    res.cookie(role, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error("Error generating access token:", error);
    res.status(500).send("Error generating access token");
  }
};

export default generateAccessToken;
