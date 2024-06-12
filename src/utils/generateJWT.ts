import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  role: string;
}

const generateJWT = (data: Payload, secret: string, expireIn: string) => {
  return jwt.sign(data, secret, {
    expiresIn: expireIn,
  });
};

export default generateJWT;
