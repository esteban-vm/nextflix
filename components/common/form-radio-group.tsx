import type { FormSchema } from '@/lib/validations'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import Image from 'next/image'
import { profileImages } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { FormControl, FormError, FormField, FormItem, FormLabel, RadioGroup, RadioGroupItem } from '@/ui'

export function FormRadioGroup<T extends FormSchema>({ label, control, name }: FormRadioGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem className='flex flex-col justify-center'>
            <FormLabel>{label}:</FormLabel>
            <FormControl>
              <RadioGroup
                className='flex w-full items-center justify-around text-center'
                defaultValue={value}
                onValueChange={onChange}
              >
                {profileImages.map((image) => (
                  <FormItem key={image} className='translate-x-0'>
                    <FormLabel>
                      <Image
                        alt='profile'
                        height={50}
                        src={image}
                        width={50}
                        className={cn(
                          'size-14 cursor-pointer rounded-sm border-2',
                          value === image ? 'border-primary' : 'border-transparent'
                        )}
                      />
                    </FormLabel>
                    <FormControl>
                      <RadioGroupItem className='border-primary-foreground' value={image} />
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormError />
          </FormItem>
        )
      }}
    />
  )
}

export interface FormRadioGroupProps<T extends FieldValues> {
  label: string
  control: Control<T>
  name: FieldPath<T>
}
