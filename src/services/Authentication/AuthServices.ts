import jwt from "jsonwebtoken";
import {prisma} from "../../lib/prisma"
import argon2 from "argon2";

export const AuthenticationService = {

async LoginService(data: any) {

  // Check required fields first
  if (!data.email || !data.password) {
    throw new Error("Please enter email and password");
  }

  // Find the user
  const userDetails = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (!userDetails) {
    throw new Error("Invalid email or password");
  }

  // Check password
const passwordMatch = await argon2.verify(
    userDetails.password, data.password
)

if (!passwordMatch){
    throw new Error ("Invalid email or passworf")
}

// Generate the jwt
const token = jwt.sign(
  {
    id: userDetails.id,
    email: userDetails.email,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "1d",
  }
);


return {
  token,
  user: {
    id: userDetails.id,
    userName: userDetails.userName,
    email: userDetails.email,
  },
};
}

}