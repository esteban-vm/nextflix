import { isEmail, isStrongPassword } from 'validator'
import { z } from 'zod'
import { profileImages } from '@/lib/constants'

export type FormSchema = LoginSchema | RegisterSchema | ProfileSchema
export type LoginSchema = z.infer<typeof loginSchema>
export type ProfileSchema = z.infer<typeof profileSchema>
export type RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .superRefine((value, context) => {
      if (value.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El correo electrónico no puede estar vacío',
          fatal: true,
        })

        return z.NEVER
      }

      if (!isEmail(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El correo electrónico no es válido',
        })
      }
    }),

  password: z
    .string()
    .trim()
    .superRefine((value, context) => {
      if (value.length === 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La contraseña no puede estar vacía',
          fatal: true,
        })

        return z.NEVER
      }

      if (!isStrongPassword(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La contraseña no es lo suficientemente segura',
        })
      }
    }),
})

export const profileSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa 2 caracteres como mínimo').max(50, 'Ingresa 50 caracteres como máximo'),
  avatar: z.enum(profileImages),
})

export const registerSchema = loginSchema
  .extend({ repeatPassword: z.string() })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Las contraseñas deben coincidir',
  })
