import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/router'

const Watch = () => {
	const router = useRouter()
	const { movieId } = router.query

	const { data } = useMovie(movieId as string)

	return (
		<div className="flex flex-col h-screen w-screen bg-black">
			<nav className="flex items-center justify-between p-4 z-10 bg-opacity-100 bg-black fixed w-full">
				<ArrowLeftIcon
					onClick={() => router.push('/')}
					className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors duration-300"
				/>
				<p className="text-white font-medium text-lg">
					<span className="font-light mr-2">İzleniyor:</span>
					{data?.title}
				</p>
			</nav>

			<div className="flex-grow relative">
				<video src={data?.videoUrl} controls className="absolute inset-0 w-full h-full object-cover" />
			</div>
		</div>
	)
}

export default Watch
