import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return res.status(405).json({ message: 'Method not allowed' })
		}

		await serverAuth(req, res)

		const { movieId } = req.query
		if (typeof movieId !== 'string') {
			return res.status(400).json({ message: 'Invalid movieId' })
		}

		if (!movieId) {
			return res.status(400).json({ message: 'Missing movieId' })
		}

		const movie = await prismadb.movie.findUnique({
			where: {
				id: movieId
			}
		})

		if (!movie) {
			return res.status(404).json({ message: 'Movie not found' })
		}

		return res.status(200).json(movie)
	} catch (error) {
		return res.status(500).end()
	}
}
