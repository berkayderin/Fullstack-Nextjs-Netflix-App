import React, { useEffect, useState } from 'react'

import PlayButton from './PlayButton'
import { PlayIcon } from '@heroicons/react/24/solid'
import useInfoModalStore from '@/hooks/useInfoModalStore'
import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/router'

interface InfoModalProps {
	visible?: boolean
	onClose: () => void
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
	const [isVisible, setIsVisible] = useState<boolean>(!!visible) // visible ilk renderda undefined olabilir

	const router = useRouter()

	const { movieId } = useInfoModalStore()
	const { data } = useMovie(movieId as string)

	console.log(data)

	useEffect(() => {
		setIsVisible(!!visible)
	}, [visible])

	return (
		<div
			className={`fixed inset-0 text-white bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
				isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			<div className="flex items-center justify-center h-full">
				<div className="bg-black p-6 rounded-lg w-[30rem]">
					<video className="w-full rounded-lg" controls>
						<source src={data?.videoUrl} type="video/mp4" />
					</video>
					<div className="flex flex-col justify-start items-start gap-3">
						<div className="flex flex-col gap-1">
							<h1 className="text-2xl font-bold">{data?.title}</h1>
							<p className="text-sm text-gray-400">
								{data?.genre} - {data?.duration}
							</p>
						</div>
						<p className="text-sm text-justify text-gray-400">{data?.description}</p>
					</div>
					<div className="flex justify-end items-center mt-3">
						<button
							onClick={() => router.push(`/movie/${movieId}`)}
							className="bg-white text-black font-bold px-2 py-2 rounded-md flex items-center hover:bg-opacity-50 transition-all duration-300"
						>
							<PlayIcon className="h-4 w-4 mr-2" />
							Oynat
						</button>
						<button
							onClick={() => {
								setIsVisible(false)
								onClose()
							}}
							className="bg-gray-500 text-white font-bold px-2 py-2 rounded-md flex items-center hover:bg-opacity-50 transition-all duration-300 ml-2"
						>
							Kapat
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoModal
