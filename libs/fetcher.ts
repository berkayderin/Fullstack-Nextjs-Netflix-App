import axios from 'axios'

export const fetcher = async (url: string) => {
	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		console.log('fetcher: ', error)
		throw error
	}
}

export default fetcher
