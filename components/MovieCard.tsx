import { ChevronDownIcon, PlayIcon } from '@heroicons/react/24/solid'

import FavoriButton from './FavoriButton'
import Image from 'next/image'
import { MovieInterface } from '../types/index'
import React from 'react'
import useInfoModalStore from '@/hooks/useInfoModalStore'
import { useRouter } from 'next/router'

interface MovieCardProps {
	data: MovieInterface
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
	const router = useRouter()
	const { openModal } = useInfoModalStore()

	const redirectToWatch = () => {
		router.push(`/watch/${data.id}`)
	}

	return (
		<div className="group bg-zinc-800 col-span-1 relative h-52 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg overflow-hidden">
			<Image
				src={data.thumbnailUrl.startsWith('/') ? data.thumbnailUrl : `/${data.thumbnailUrl}`}
				alt={data.title}
				layout="fill"
				objectFit="cover"
			/>
			<div
				className="absolute inset-0 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900 bg-opacity-75"
				onClick={() => openModal(data.id)}
			>
				<div>
					<p className="text-white font-bold">{data.title}</p>
					<p className="text-white text-sm">
						{data.genre} - {data.duration}
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<FavoriButton movieId={data.id} />
					<PlayIcon className="h-6 w-6 text-white" onClick={redirectToWatch} />
					<ChevronDownIcon className="h-6 w-6 text-white" />
				</div>
			</div>
		</div>
	)
}

export default MovieCard
