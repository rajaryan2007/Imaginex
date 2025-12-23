import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'


export const {} = NextAuth({
    providers:[Google],
    callbacks:{
        async jwt({token,account}) {
            if(account?.id_token){
                token.idToken = account.id_token
            }

            return token;
        }
    },
    async session({session,token}){
        session.idToken = token.idToken;
        return session;
    }
})