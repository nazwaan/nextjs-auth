require('dotenv').config();
import jwt from 'jsonwebtoken';

export interface Payload {
  id: number;
  username: string;
  name: string;
}

export interface SignedPayload {
  id: number;
  username: string;
  name: string;
  iat: number;
  exp: number;
}

export function signToken(payload: Payload): string {
  const jwtSecret = process.env.JWT_SECRET as string
  const expiresIn = process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']

  return jwt.sign(
    payload,
    jwtSecret,
    { expiresIn }
  );
}

export function verifyToken(token: string) {
  const jwtSecret = process.env.JWT_SECRET as string
  const decodedString = jwt.verify(token, jwtSecret)

  return decodedString
}