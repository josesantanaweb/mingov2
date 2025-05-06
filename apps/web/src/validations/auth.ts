import { object, string } from 'zod';

export const loginSchema = object({
  email: string({ required_error: 'Correo Electrónico es requerido' })
    .min(1, 'Correo Electrónico es requerido')
    .email('Correo Electrónico inválido'),
  password: string({ required_error: 'Contraseña es requerida' })
    .min(1, 'Contraseña es requerida')
    .min(8, 'Contraseña debe tener más de 8 caracteres')
    .max(32, 'Contraseña debe tener menos de 32 caracteres'),
});

export const registerSchema = loginSchema.extend({
  username: string({ required_error: 'Username es requerido' }).min(
    3,
    'Username debe tener más de 3 caracteres'
  ),
  referredCode: string().optional(),
});

export const schema = (isRegister: boolean) =>
  isRegister ? registerSchema : loginSchema;
