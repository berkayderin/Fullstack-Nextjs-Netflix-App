import { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from 'bcrypt'
import prismadb from '@/libs/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'POST') {
			return res.status(405).json({ message: 'Method not allowed' })
		}

		const { email, name, password } = req.body

		const existingUser = await prismadb.user.findUnique({
			where: {
				email
			}
		})

		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		const user = await prismadb.user.create({
			data: {
				email,
				name,
				hashedPassword,
				image: '',
				emailVerified: new Date()
			}
		})

		return res.status(201).json({ message: 'User created', user })
	} catch (error) {
		return res.status(500).json({ message: `Internal server error: ${error}` })
	}
}
