import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axiosInstance from "./axios";

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
          console.log("Attempting login for:", credentials.email);
          const response = await axiosInstance.post("/hms/v1/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data;
          console.log("Login response data:", user);

          if (user && user.access_token) {
            return {
              id: user.id || credentials.email, // Fallback if id is missing
              name: user.name || "User",
              email: user.email || (credentials.email as string),
              accessToken: user.access_token,
              role: user.role || "USER",
            };
          }
          console.warn("Login failed: access_token not found in response");
          return null;
        } catch (error: any) {
          console.error("Login error details:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).accessToken = token.accessToken;
        (session as any).user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
