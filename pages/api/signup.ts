import type { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "../../lib/mongoConnect";
import User from "../../model/User";
import bcrypt from "bcrypt";

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  username: string,
  email: string,
  password: string
) => {
  if (username?.length < 3) {
    return { error: "Username must have 3 or more characters" };
  }

  await mongoConnect();
  const emailUser = await User.findOne({ email: email });

  if (emailUser) {
    return { error: "Email already exists" };
  }

  if (password?.length < 5) {
    return { error: "Password must have 5 or more characters" };
  }

  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // get and validate body variables
  const { username, email, password } = req.body;

  const errorMessage = await validateForm(username, email, password);
  if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // create new User on MongoDB
  const newUser = new User({
    name: username,
    email,
    hashedPassword,
  });

  newUser
    .save()
    .then(() =>
      res.status(200).json({ msg: "Successfuly created new User: " + newUser })
    )
    .catch((err: string) =>
      res.status(400).json({ error: "Error on '/api/signup': " + err })
    );
}
