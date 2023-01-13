import { IUserRegister } from "./TypeScript" 

export const validRegister = (data: IUserRegister) => {
    const { name, account, password, cf_password } = data
    const errors: string[] = []

    if (!name) {
      errors.push("Please add your name");
    } else if (name.length > 20) {
      errors.push("Your name is up to 20 chars long");
    }

    if (!account) {
      errors.push("Please add your email");
    } else if (!validateEmail(account)) {
      errors.push("Email format incorrect");
    }

    if (password.length < 6) {
      errors.push("Password must be at least 6 chars");
    } else if (password !== cf_password) {
        errors.push("Confirm password did not match")
    }

    return {
        errMsg: errors,
        errLength: errors.length
    }
}


export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};