import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import prismadb from '@/libs/prismadb'

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession(req, res, authOptions)

	if (!session?.user?.email) {
		throw new Error('Uygulamaya giriş yapmalısınız.')
	}

	const currentUser = await prismadb.user.findUnique({
		where: {
			email: session.user.email
		}
	})

	if (!currentUser) {
		throw new Error('Kullanıcı bulunamadı.')
	}

	return { currentUser }
}

export default serverAuth
