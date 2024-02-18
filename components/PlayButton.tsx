import { PlayIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useRouter } from 'next/router'

interface PlayButtonProps {
	movieId: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
	const router = useRouter()
	return (
		<button
			onClick={() => router.push(`/movie/${movieId}`)}
			className="bg-white text-black font-bold px-2 py-2 lg:px-5 lg:py-3 rounded-md flex items-center hover:bg-opacity-50 transition-all duration-300"
		>
			<PlayIcon className="h-4 w-4 mr-2" />
			Oynat
		</button>
	)
}

export default PlayButton
