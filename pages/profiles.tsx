import { NextPageContext } from 'next'
import React from 'react'
import { getSession } from 'next-auth/react'

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

const profiles = () => {
	return <div>profiles</div>
}

export default profiles
