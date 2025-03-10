import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Avatar } from '@prisma/client'
import Image from 'next/image'
import { FormControl, FormError, FormField, FormItem, FormLabel, RadioGroup, RadioGroupItem } from '@/components/ui'
import { avatars } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function FormRadioButton({ avatar, isActive }: FormRadioButtonProps) {
  return (
    <FormItem className='translate-x-0'>
      <FormLabel>
        <Image
          alt='profile avatar'
          height={1}
          src={avatars[avatar]}
          width={1}
          className={cn(
            'size-14 cursor-pointer rounded-sm border-2',
            isActive ? 'border-primary' : 'border-transparent'
          )}
        />
      </FormLabel>
      <FormControl>
        <RadioGroupItem className='border-primary-foreground' value={avatar} />
      </FormControl>
    </FormItem>
  )
}

export interface FormRadioButtonProps {
  avatar: Avatar
  isActive: boolean
}

export function FormRadioGroup<T extends Validations.Profile>({ label, control, name }: FormRadioGroupProps<T>) {
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
                {Object.values(Avatar).map((avatar) => (
                  <FormRadioButton key={avatar} avatar={avatar} isActive={value === avatar} />
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
