import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay } from 'swiper/modules'
import FavoriteMovies from './FavoriteMovies'
import InfoModal from './InfoModal'
import MovieCard from './MovieCard'
import { MovieInterface } from '../types/index'
import React from 'react'
import useFavoriMovie from '@/hooks/useFavorites'
import useInfoModalStore from '@/hooks/useInfoModalStore'

interface MovieListProps {
	data: MovieInterface[]
	title: string
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
	const { isOpen, closeModal } = useInfoModalStore()
	const { data: favoriMovie } = useFavoriMovie()

	if (!data) {
		return null
	}
	return (
		<div className="px-4 space-y-6">
			<p className="text-2xl font-bold text-white mt-5">{title}</p>
			<div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
				{data.map((movie) => (
					<MovieCard key={movie.id} data={movie} />
				))}
			</div>

			<p className="text-2xl font-bold text-white mt-5">Yeni Çıkanlar</p>
			<Swiper
				slidesPerView={1}
				spaceBetween={10}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false
				}}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 40
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 50
					}
				}}
				modules={[Autoplay]}
				className="mySwiper"
			>
				{data.map((movie, index) => (
					<SwiperSlide key={index}>
						<MovieCard data={movie} />
					</SwiperSlide>
				))}
			</Swiper>

			<FavoriteMovies favoriMovie={favoriMovie} />

			<InfoModal visible={isOpen} onClose={closeModal} />
		</div>
	)
}

export default MovieList
