import { Avatar } from '@prisma/client'
import { isEmail, isStrongPassword } from 'validator'
import { z } from 'zod'

export type FormSchemaType = LoginSchemaType | RegisterSchemaType | ProfileSchemaType

export const LoginSchema = z.object({
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

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const ProfileSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa 2 caracteres como mínimo').max(50, 'Ingresa 50 caracteres como máximo'),
  avatar: z.nativeEnum(Avatar),
})

export type ProfileSchemaType = z.infer<typeof ProfileSchema>

export const RegisterSchema = LoginSchema.extend({ repeatPassword: z.string() }).refine(
  (data) => data.password === data.repeatPassword,
  { path: ['repeatPassword'], message: 'Las contraseñas deben coincidir' }
)

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
