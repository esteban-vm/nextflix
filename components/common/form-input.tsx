import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormError, Input } from '@/ui'

export function FormInput<T extends FormSchemas.Forms>({ label, control, name, ...rest }: FormInputProps<T>) {
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

export type FormInputBaseProps = Omit<Parameters<typeof Input>[number], 'ref' | 'name' | 'children'>

export interface FormInputProps<T extends FieldValues> extends FormInputBaseProps {
  label: string
  control: Control<T>
  name: FieldPath<T>
}
