import { getSession, signOut } from 'next-auth/react'

import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import { NextPageContext } from 'next'
import React from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import useMovieList from '@/hooks/useMovieList'

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context)

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}

const Home = () => {
	const { data, error } = useCurrentUser()
	const { data: movies } = useMovieList()

	return (
		<div>
			<Navbar />
			<Billboard />
			<MovieList data={movies} title="Trend Filmler" />
		</div>
	)
}

export default Home
