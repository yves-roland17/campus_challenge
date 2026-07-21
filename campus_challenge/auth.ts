import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "./lib/validation"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
   session: { strategy: "jwt" },
  callbacks: {
      async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString()
        token.name = user.name
        token.email= user.email
        token.role = (user as any).role 
      }
      return token
    },
    async  session({ session, token }) {
      if (session.user && token.role) {
        session.user.id = token.id as string
        session.user.role = token.role as "ADMIN" | "USER"
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    }
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
 authorize: async (credentials) => {
  try {
    const { email, password } = await loginSchema.parseAsync(credentials);
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return null;
    }
     const isPasswordValide = await bcrypt.compare(password, user.password);
    if (!isPasswordValide){
       return null;
    }
    return {
      
          id: user.id.toString(), 
          name: user.name,
          email: user.email,
          role: user.role as Role,
          
    };
    
  } catch (error) {
    if (error instanceof Error) {
      error.message = "❌ Erreur lors de la connexion : " + error.message;
      console.error("❌ Erreur inconnue lors de la connexion :", error);
    }
    return null; 
  }
}

}),
  ],
})