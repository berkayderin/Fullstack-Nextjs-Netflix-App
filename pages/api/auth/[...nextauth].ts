import nextAuth, { AuthOptions } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import prismadb from '@/libs/prismadb'

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || ''
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		}),
		Credentials({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text'
				},
				password: {
					label: 'Password',
					type: 'password'
				}
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Email yada şifre zorunludur.')
				}

				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if (!user || !user.hashedPassword) {
					throw new Error('Kullanıcı bulunamadı.')
				}

				const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

				if (!isCorrectPassword) {
					throw new Error('Şifre yanlış.')
				}

				return user
			}
		})
	],
	pages: {
		signIn: '/auth'
	},
	debug: process.env.NODE_ENV === 'development',
	adapter: PrismaAdapter(prismadb),
	session: {
		strategy: 'jwt'
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET
	},
	secret: process.env.NEXTAUTH_SECRET
}

export default nextAuth(authOptions)
