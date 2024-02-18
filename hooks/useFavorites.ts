import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

const useFavoriMovie = () => {
	const { data, error, isLoading, mutate } = useSWR('/api/favoriteList', fetcher, {
		revalidateIfStale: false, // stale olan veriyi tekrar getirme
		revalidateOnFocus: false, // focus olduğunda tekrar getirme
		revalidateOnReconnect: false // reconnect olduğunda tekrar getirme
	})

	return {
		data,
		error,
		isLoading,
		mutate
	}
}

export default useFavoriMovie
