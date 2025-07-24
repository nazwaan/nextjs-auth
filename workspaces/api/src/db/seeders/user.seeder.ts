import { users } from '../schema/user';

type User = typeof users.$inferInsert

export const userSeeds: User[] = [
  { username: 'alice', name: 'Alice Johnson', password: 'password123' },
  { username: 'bob', name: 'Bob Smith', password: 'securepass456' },
  { username: 'charlie', name: 'Charlie Lee', password: 'charlie789' },
  { username: 'david', name: 'David Kim', password: 'davidpass321' },
  { username: 'eva', name: 'Eva Brown', password: 'evapass999' },
  { username: 'frank', name: 'Frank White', password: 'franklypass' },
  { username: 'grace', name: 'Grace Green', password: 'graceful123' },
  { username: 'harry', name: 'Harry Potter', password: 'hogwarts2024' },
  { username: 'irene', name: 'Irene Adler', password: 'ireneSecure!' },
  { username: 'jack', name: 'Jack Black', password: 'jackPass77' },
]
