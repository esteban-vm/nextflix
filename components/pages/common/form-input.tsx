import type { InputProps } from '@/components/ui'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { IconType } from 'react-icons/lib'
import { FormControl, FormField, FormItem, FormLabel, FormError, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

export function FormInput<T extends Validations.Forms>({
  label,
  control,
  name,
  icon: Icon,
  onIconClick,
  ...rest
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { invalid } }) => {
        return (
          <FormItem>
            <FormLabel className='select-none'>{label}:</FormLabel>
            <div className='relative size-full'>
              <FormControl>
                <Input {...rest} {...field} aria-invalid={invalid} />
              </FormControl>
              {Icon && (
                <Icon
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 stroke-muted-foreground',
                    !!onIconClick && 'cursor-pointer'
                  )}
                  onClick={onIconClick}
                />
              )}
            </div>
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
  icon?: IconType
  onIconClick?: () => void
}
