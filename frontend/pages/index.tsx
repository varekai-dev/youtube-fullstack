import { axiosClassic } from 'api/interceptors'
import type { GetStaticProps, NextPage } from 'next'

import Home from '@/components/pages/home/Home'
import { IHome } from '@/components/pages/home/home.interface'

import { VideoService } from '@/services/VideoService'

const HomePage: NextPage<IHome> = (props) => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: newVideo } = await VideoService.getAll()
		const randomVideo = {}
		const topVideo = {}
		const topChannels: never[] = []
		return {
			props: {
				newVideo,
				weeklyVideos: newVideo.sort(() => Math.random() - 0.5),
				topVideo,
				randomVideo,
				topChannels
			},
			revalidate: 60
		}
	} catch (error) {
		return {
			props: {
				newVideo: {},
				weeklyVideos: [],
				topVideo: {},
				randomVideo: {},
				topChannels: []
			}
		}
	}
}

export default HomePage
