'use client'

import type { RegisterData } from '@/app/(auth)/validations'
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from '@/app/(auth)/validations'
import { Form, FormControl, FormField, FormItem, FormLabel, FormError, Button, Input } from '@/components/ui'

export function RegisterForm() {
  const methods = useForm<RegisterData>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  })

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    console.log(data)
  }

  const onError: SubmitErrorHandler<RegisterData> = (errors) => {
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

        <FormField
          control={methods.control}
          name='repeatPassword'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Repite tu contraseña:</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormError />
              </FormItem>
            )
          }}
        />

        <Button className='bg-rose-700 text-white hover:bg-rose-600' type='submit'>
          Regístrate
        </Button>
      </form>
    </Form>
  )
}
