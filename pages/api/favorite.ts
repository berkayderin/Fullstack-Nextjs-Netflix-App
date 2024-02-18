import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'POST') {
			const { currentUser } = await serverAuth(req, res)

			const { movieId } = req.body

			const exitingMovie = await prismadb.movie.findUnique({
				where: {
					id: movieId
				}
			})

			if (!exitingMovie) {
				return res.status(404).json({ message: 'Movie not found' })
			}

			const user = await prismadb.user.update({
				where: {
					email: currentUser.email || ''
				},
				data: {
					favoriteIds: {
						push: movieId
					}
				}
			})

			return res.status(200).json(user)
		}

		if (req.method === 'DELETE') {
			const { currentUser } = await serverAuth(req, res)

			const { movieId } = req.body

			const user = await prismadb.user.update({
				where: {
					email: currentUser.email || ''
				},
				data: {
					favoriteIds: {
						set: currentUser.favoriteIds.filter((id: string) => id !== movieId)
					}
				}
			})

			return res.status(200).json(user)
		}

		return res.status(405).json({ message: 'Method not allowed' })
	} catch (error) {
		return res.status(500).end()
	}
}
