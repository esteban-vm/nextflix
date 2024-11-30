import type { FormSchemaType } from '@/lib/validations'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormError, Input } from '@/ui'

export type BaseFormInputProps = Omit<Parameters<typeof Input>[number], 'ref' | 'name' | 'children'>

export function FormInput<T extends FormSchemaType>({ label, control, name, ...rest }: FormInputProps<T>) {
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

export interface FormInputProps<T extends FieldValues> extends BaseFormInputProps {
  label: string
  control: Control<T>
  name: FieldPath<T>
}
