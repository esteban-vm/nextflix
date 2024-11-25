export function FormWrapper(props: FormWrapperProps) {
  return <form {...props} autoComplete='off' spellCheck={false} noValidate />
}

export type FormWrapperProps = Omit<React.JSX.IntrinsicElements['form'], 'autoComplete' | 'spellCheck' | 'noValidate'>
