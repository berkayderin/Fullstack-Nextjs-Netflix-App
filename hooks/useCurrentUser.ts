import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

// kullanıcı bilgilerini getirir
const useCurrentUser = () => {
	const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)

	return {
		data,
		error,
		isLoading,
		mutate
	}
}

export default useCurrentUser
