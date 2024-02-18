import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).json({ message: 'Method not allowed' })
		}

		await serverAuth(req, res)

		// prismadb.movie.findMany() ile tüm filmleri getiriyoruz
		const movieList = await prismadb.movie.findMany()

		return res.status(200).json(movieList)
	} catch (error) {
		return res.status(500).end()
	}
}
