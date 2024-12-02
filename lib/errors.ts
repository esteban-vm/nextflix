import { CredentialsSignin } from 'next-auth'

export class CustomAuthError extends CredentialsSignin {
  code = 'custom_auth_error'
}
