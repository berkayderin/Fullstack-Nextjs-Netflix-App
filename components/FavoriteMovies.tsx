// FavoriteMovies.tsx

import MovieCard from './MovieCard'
import { MovieInterface } from '../types/index'
import React from 'react'

interface FavoriteMoviesProps {
	favoriMovie: MovieInterface[]
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ favoriMovie }) => {
	return (
		<div>
			<p className="text-2xl font-bold text-white mt-5">Favorilerim</p>
			<div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
				{favoriMovie && favoriMovie.length > 0 ? (
					favoriMovie.map((movie) => <MovieCard key={movie.id} data={movie} />)
				) : (
					<p className="text-white">Favori film bulunmamaktadır.</p>
				)}
			</div>
		</div>
	)
}

export default FavoriteMovies
