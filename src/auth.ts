// // auth.ts
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         // 自定义认证逻辑（数据库验证 + JWT 签发）
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.roles = user.roles; // 注入角色信息到 JWT
//         token.permissions = await getPermissionsByRole(user.roles);
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.roles = token.roles;
//       session.user.permissions = token.permissions;
//       return session;
//     }
//   }
// });
