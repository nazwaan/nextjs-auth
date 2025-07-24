import bcrypt from 'bcrypt';

export async function hashString(input: string): Promise<string> {
  const saltRounds = 13;
  return await bcrypt.hash(input, saltRounds);
}

export async function comparePassword(plainText: string, hashedPassword: string) {
  return await bcrypt.compare(plainText, hashedPassword);
}