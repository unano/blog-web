import { IUserRegister } from "./TypeScript";
import { IBlog } from "./TypeScript";
export const validRegister = (data: IUserRegister) => {
  const { name, account, password, cf_password } = data;
  const errors: string[] = [];

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

  const msg = checkPassword(password, cf_password);
  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars";
  } else if (password !== cf_password) {
    return "Confirm password did not match";
  }
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const ValidCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const err: string[] = [];

  if (title.trim().length < 5) {
    err.push("Title should have at least 5 characters");
  } else if (title.trim().length > 50) {
    err.push("Title is up to 50 characters long");
  }

  if (content.trim().length < 100) {
    err.push("Content should have at least 100 characters");
  }

  if (description.trim().length < 10) {
    err.push("Description should have at least 10 characters");
  } else if (description.trim().length > 200) {
    err.push("Description is up to 200 characters long");
  }

  if (!thumbnail) err.push("Thumbnail cannot be blank");

  if (!category) err.push("Category cannot be blank");

  return {
    errMsg: err,
    errLength: err.length,
  };
};

export const shallowRqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}