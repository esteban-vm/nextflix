import { Avatar } from '@prisma/client'
import { isEmail, isStrongPassword } from 'validator'
import { z } from 'zod'

const EmailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          fatal: true,
          code: z.ZodIssueCode.custom,
          message: 'Este campo es requerido',
        })

        return z.NEVER
      }

      if (!isEmail(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El correo electrónico debe ser válido',
        })
      }
    }),
})

export const LoginSchema = EmailSchema.extend({
  password: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Este campo es requerido',
        })
      }
    }),
})

export const ProfileSchema = z.object({
  name: z.string().trim().min(2, { message: '2 caracteres como mínimo' }),
  avatar: z.nativeEnum(Avatar),
})

export const RegisterSchema = EmailSchema.extend({
  password: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (!isStrongPassword(value, { minLength: 5 })) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '5 caracteres como mínimo, una minúscula, una mayúscula, un número y un símbolo',
        })
      }
    }),

  repeatPassword: z.string().trim(),
}).refine((value) => value.password === value.repeatPassword, {
  path: ['repeatPassword'],
  message: 'Las contraseñas deben coincidir',
})

export const WithID = z.object({ id: z.string() })
