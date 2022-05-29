import shuffle from 'lodash/shuffle'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Video from '@/components/pages/video/Video'
import { IVideoPage } from '@/components/pages/video/video.interface'

import { VideoService } from '@/services/VideoService'

import { IVideo } from '@/types/video.interface'

const VideoPage: NextPage<IVideoPage> = (props) => {
	return <Video {...props} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const videos = await VideoService.getAll().then(({ data }) => data)
		const paths = videos.map((video) => ({
			params: {
				id: video._id
			}
		}))

		return {
			paths,
			fallback: 'blocking'
		}
	} catch {
		return {
			paths: [],
			fallback: false
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const videoId = String(params?.id)

		const { data: video } = await VideoService.getVideoById(videoId)

		return {
			props: {
				video
			} as IVideoPage,
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				video: {} as IVideo
			} as IVideoPage
		}
	}
}

export default VideoPage
