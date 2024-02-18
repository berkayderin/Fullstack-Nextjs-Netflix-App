import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useMemo, useState } from 'react'

import axios from 'axios'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavoriMovie from '@/hooks/useFavorites'

interface FavoriButtonProps {
	movieId: string
}

const FavoriButton: React.FC<FavoriButtonProps> = ({ movieId }) => {
	const { data: favoriMovieData, mutate: mutateFavoriMovie } = useFavoriMovie()
	const { data: user } = useCurrentUser()

	const [isFavori, setIsFavori] = useState<boolean>(false)

	useMemo(() => {
		const list = user?.favoriteIds || []
		setIsFavori(list.includes(movieId))
	}, [user, movieId])

	const handleFavori = async () => {
		try {
			if (isFavori) {
				await axios.delete('/api/favorite', {
					data: { movieId }
				})
			} else {
				await axios.post('/api/favorite', { movieId })
			}
			setIsFavori(!isFavori)
			mutateFavoriMovie() // Veriyi yenilemek için mutate fonksiyonunu çağır
		} catch (error) {
			console.error('favori btn: ', error)
		}
	}

	const Icon = isFavori ? CheckIcon : PlusIcon

	return (
		<div
			onClick={handleFavori}
			className="p-2 bg-zinc-900 bg-opacity-75 rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-opacity-100"
		>
			<Icon className="h-6 w-6 text-white" />
		</div>
	)
}

export default FavoriButton
