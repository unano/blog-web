


import userModel from "../models/userModel";
import categoryModel from "../models/categoryModel";
import blogModel from "../models/blogModel";
import { users } from "./user";
import { categories } from "./category";

export async function reloadUsers() {
  try {
    console.log("Cleaning User Data");
    await userModel.deleteMany();
    console.log("User Data cleaned");
    console.log("Loading User Data");
    await users.forEach((user) => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Unload/Load user Data: ${err}`);
  }
}

export async function reloadCategories() {
  try {
    console.log("Cleaning Category Data");
    await categoryModel.deleteMany();
    console.log("Category Data cleaned");
    console.log("Loading Category Data");
    await categories.forEach((category) => categoryModel.create(category));
    console.info(`${categories.length} categories were successfully stored.`);
  } catch (err) {
    console.error(`failed to Unload/Load category Data: ${err}`);
  }
}

export async function reloadBlogs() {
  try {
    console.log("Cleaning Blog Data");
    await blogModel.deleteMany();
    console.log("Blog Data cleaned");
    //console.log("Load Blog Data");
  } catch (err) {
    console.error(`failed to Unload/Load blog Data: ${err}`);
  }
}