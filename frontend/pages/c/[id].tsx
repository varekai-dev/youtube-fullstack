import shuffle from 'lodash/shuffle'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Channel from '@/components/pages/channel/Channel'
import { IChannel } from '@/components/pages/channel/channel.interface'

import { UserService } from '@/services/UserService'
import { VideoService } from '@/services/VideoService'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

const ChannelPage: NextPage<IChannel> = (props) => {
	return <Channel {...props} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const users = await UserService.getAll().then(({ data }) => data)
		const paths = users.map((user) => ({
			params: {
				id: user._id
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
		const userId = String(params?.id)

		const { data: videos } = await VideoService.getVideosByUser(userId)
		const channel = await UserService.getUser(userId).then(
			({ data }) => data || ({} as IUser)
		)

		return {
			props: {
				channel,
				videos,
				randomVideo: shuffle(videos)[0]
			} as IChannel,
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				channel: {} as IUser,
				randomVideo: {} as IVideo,
				videos: []
			} as IChannel
		}
	}
}

export default ChannelPage
