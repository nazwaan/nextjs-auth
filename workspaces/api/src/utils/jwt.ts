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

export function signToken(
  payload: Payload,
  expiresIn: string = process.env.JWT_EXPIRES_IN || '1h',
): string {
  const jwtSecret = process.env.JWT_SECRET as string

  return jwt.sign(
    payload,
    jwtSecret,
    { expiresIn } as { expiresIn: jwt.SignOptions['expiresIn'] }
  );
}

export function verifyToken(token: string) {
  const jwtSecret = process.env.JWT_SECRET as string
  const decodedString = jwt.verify(token, jwtSecret)

  return decodedString
}