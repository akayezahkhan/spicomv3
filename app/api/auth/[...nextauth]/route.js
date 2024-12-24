import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "37999786419-8p06dgbvighns7p5ic833lfai920lohe.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ]
})

export {handler as GET, handler as POST}
