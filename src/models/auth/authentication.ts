import { UserRole } from '../user/user';

export interface TokenPayload {
  userId?: string;
  cooperativeId?: string,
  role?: UserRole;
}
