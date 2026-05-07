import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          console.log("--- Authorize Step ---");
          const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
          const response = await axios.post(`${baseURL}/hms/v1/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data;

          if (user && user.access_token) {
            const decoded = jwtDecode<DecodedToken>(user.access_token);
            console.log("Decoded Username:", decoded.username);
            
            return {
              id: decoded.sub,
              name: decoded.username,
              email: decoded.sub,
              accessToken: user.access_token,
              role: decoded.role,
            };
          }
          return null;
        } catch (error: any) {
          console.error("Login error details:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("--- JWT Callback (New Login) ---");
        const u = user as any;
        console.log("User Name from Authorize:", u.name);
        token.accessToken = u.accessToken;
        token.role = u.role;
        token.name = u.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("--- Session Callback ---");
        console.log("Token Name:", token.name);
        session.accessToken = token.accessToken as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
