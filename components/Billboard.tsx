import PlayButton from './PlayButton'
import React from 'react'
import useBillboard from '@/hooks/useBillboard'

const Billboard = () => {
	const { data, error } = useBillboard()

	return (
		<div className="relative h-[32rem] lg:h-[44rem] w-full">
			<div className="absolute inset-0">
				<video
					className="w-full h-full object-cover"
					src={data?.videoUrl}
					poster={data?.backdrop_path}
					autoPlay
					muted
					loop={false}
				/>
			</div>
			<div className="absolute inset-0 bg-black bg-opacity-50" />

			<div className="absolute inset-0 flex flex-col justify-end items-start bottom-10 left-10">
				<div className="flex flex-col items-start gap-2 lg:gap-3">
					<h1 className="text-3xl lg:text-6xl font-bold text-white">{data?.title}</h1>
					<p className="text-xs lg:text-2xl w-64 lg:w-[40rem] text-white mt-4">{data?.description}</p>
				</div>
				<div className="flex mt-4 lg:mt-8">
					<PlayButton movieId={data?.id} />
					<button className="ml-3 bg-white text-white font-bold px-4 py-2 rounded-md bg-opacity-50 hover:bg-opacity-25 transition-all duration-300">
						Daha Fazla Bilgi
					</button>
				</div>
			</div>
		</div>
	)
}

export default Billboard
