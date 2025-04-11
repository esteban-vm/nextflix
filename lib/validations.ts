import { isEmail, isStrongPassword } from 'validator'
import { z } from 'zod'

export const EmailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          fatal: true,
          code: z.ZodIssueCode.custom,
          message: 'El correo electrónico es requerido',
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

export const FavoriteMovieSchema = z.object({
  profileId: z.string(),
  movieId: z.string(),
})

export const LoginSchema = EmailSchema.extend({
  password: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La contraseña es requerida',
        })
      }
    }),
})

export const ProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'El nombre debe tener 2 caracteres como mínimo' })
    .max(10, { message: 'El nombre debe tener hasta 10 caracteres como máximo' })
    .transform((value) => {
      return value
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }),

  avatarUrl: z.string(),
})

export const RegisterSchema = EmailSchema.extend({
  password: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (!isStrongPassword(value, { minLength: 5 })) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'La contraseña debe tener 5 caracteres como mínimo, una minúscula, una mayúscula, un número y un símbolo',
        })

        return z.NEVER
      }

      if (value.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La contraseña debe tener 15 caracteres como máximo',
        })
      }
    }),

  repeatPassword: z.string().trim(),
}).refine((value) => value.password === value.repeatPassword, {
  path: ['repeatPassword'],
  message: 'Las contraseñas deben coincidir',
})

export const SchemaWithID = z.object({ id: z.string() })
