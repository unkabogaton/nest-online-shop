import { UUID } from 'crypto';

export class User {
  userId: UUID;
  username: string;
  password: string;
}
