import type { InputProps } from '@/components/ui'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormError, Input } from '@/components/ui'

export function FormInput<T extends Validations.Forms>({ label, control, name, ...rest }: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { invalid } }) => {
        return (
          <FormItem>
            <FormLabel>{label}:</FormLabel>
            <FormControl>
              <Input {...field} {...rest} aria-invalid={invalid} />
            </FormControl>
            <FormError />
          </FormItem>
        )
      }}
    />
  )
}

export interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'ref' | 'name' | 'children'> {
  label: string
  control: Control<T>
  name: FieldPath<T>
}
