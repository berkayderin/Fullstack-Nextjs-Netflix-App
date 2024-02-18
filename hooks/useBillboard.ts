import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

// random film getirme
const useBillboard = () => {
	const { data, error, isLoading, mutate } = useSWR('/api/randomMovie', fetcher, {
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

export default useBillboard
