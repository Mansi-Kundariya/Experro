export interface ForgotPassword {
  email: string
}

export interface SetNewPassword {
  password: string,
  emailToken: string
}
