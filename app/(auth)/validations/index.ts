import { isEmail, isStrongPassword } from 'validator'
import { z } from 'zod'

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>

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

export const registerSchema = loginSchema
  .extend({ repeatPassword: z.string() })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Las contraseñas deben coincidir',
  })
