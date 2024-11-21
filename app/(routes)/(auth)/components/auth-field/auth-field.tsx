import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormError, Input } from '@/components/ui'

export function AuthField<T extends FieldValues>({
  label,
  control,
  name,
  placeholder = '***********',
  type = 'password',
  ...rest
}: AuthFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { invalid } }) => {
        return (
          <FormItem>
            <FormLabel>{label}:</FormLabel>
            <FormControl>
              <Input {...field} {...rest} aria-invalid={invalid} placeholder={placeholder} type={type} />
            </FormControl>
            <FormError />
          </FormItem>
        )
      }}
    />
  )
}

export interface AuthFieldProps<T extends FieldValues>
  extends Omit<Parameters<typeof Input>[number], 'ref' | 'name' | 'children'> {
  label: string
  control: Control<T>
  name: FieldPath<T>
}
