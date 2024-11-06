'use client'

import type { LoginData } from '@/app/(auth)/validations'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/app/(auth)/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormError, Button, Input } from '@/components/ui'

export function LoginForm() {
  const methods = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    console.log(data)
  }

  const onError: SubmitErrorHandler<LoginData> = (errors) => {
    console.log(errors)
  }

  return (
    <Form {...methods}>
      <form
        autoComplete='off'
        className='flex flex-col gap-3'
        spellCheck={false}
        noValidate
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        <FormField
          control={methods.control}
          name='email'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tu correo electrónico:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='correo@ejemplo.com' type='email' />
                </FormControl>
                <FormError />
              </FormItem>
            )
          }}
        />

        <FormField
          control={methods.control}
          name='password'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tu contraseña:</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormError />
              </FormItem>
            )
          }}
        />

        <Button className='bg-rose-700 text-white hover:bg-rose-600' type='submit'>
          Iniciar sesión
        </Button>
      </form>
    </Form>
  )
}
