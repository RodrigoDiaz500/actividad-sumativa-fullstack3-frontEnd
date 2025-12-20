
import { UserRole } from '../../auth/registro/user-role.type';
export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: UserRole;
  telefono: string;
}