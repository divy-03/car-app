import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { emailSchema, passwordSchema } from "./app/schema/credentialSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new CredentialsSignin("Email and password are required");
        }

        const emailValidation = emailSchema.safeParse(email);
        if (!emailValidation.success) {
          throw new Error("Invalid email format");
        }
        const passwordValidation = passwordSchema.safeParse(password);
        if (!passwordValidation.success) {
          throw new Error(passwordValidation.error.issues[0].message);
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: emailValidation.data },
        });

        if (existingUser) {
          if (existingUser && existingUser.password) {
            const isPasswordCorrect = await compare(
              passwordValidation.data,
              existingUser.password
            );
            if (!isPasswordCorrect) {
              throw new Error("Invalid credentials");
            }
          }
          return existingUser;
        }
        // New user registration
        const hashedPassword = await hash(passwordValidation.data, 10);
        const newUser = await prisma.user.create({
          data: {
            email: emailValidation.data,
            password: hashedPassword,
          },
        });

        return newUser;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
