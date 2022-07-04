import {
  UseFormRegister,
  UseFormHandleSubmit,
  FormState
} from 'react-hook-form'

export type FormProps = {
  register: UseFormRegister<FormInput>,
  handleSubmit: UseFormHandleSubmit<FormInput>,
  formState: FormState<FormInput>,
  onSubmit: (input: FormInput) => Promise<void>
  isDisabled: boolean
}

export type FormInput = {
  email: string
  password: string
}