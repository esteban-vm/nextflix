import type { AvatarUrl } from '@/lib/constants'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import Image from 'next/image'
import { FormControl, FormError, FormField, FormItem, FormLabel, RadioGroup, RadioGroupItem } from '@/components/ui'
import { cn } from '@/lib/utils'

export function FormRadioButton({ avatarUrl, isActive }: FormRadioButtonProps) {
  return (
    <FormItem className='translate-x-0'>
      <FormLabel>
        <Image
          alt='Imagen de avatar'
          height={1}
          src={avatarUrl}
          width={1}
          className={cn(
            'size-14 cursor-pointer rounded-sm border-2',
            isActive ? 'border-primary' : 'border-transparent'
          )}
        />
      </FormLabel>
      <FormControl>
        <RadioGroupItem className='border-primary-foreground' value={avatarUrl} />
      </FormControl>
    </FormItem>
  )
}

export interface FormRadioButtonProps {
  avatarUrl: AvatarUrl
  isActive: boolean
}

export function FormRadioGroup<T extends Validations.Profile>({
  label,
  control,
  name,
  children,
}: FormRadioGroupProps<T>) {
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
                {/* {Object.values(Avatar).map((avatar) => (
                  <FormRadioButton key={avatar} avatar={avatar} isActive={value === avatar} />
                ))} */}
                {children}
              </RadioGroup>
            </FormControl>
            <FormError />
          </FormItem>
        )
      }}
    />
  )
}

export interface FormRadioGroupProps<T extends FieldValues> extends Props.WithChildren {
  label: string
  control: Control<T>
  name: FieldPath<T>
}
