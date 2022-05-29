import { FC, useEffect } from 'react'
import { useMutation } from 'react-query'

import Layout from '@/components/layout/Layout'

import { VideoService } from '@/services/VideoService'

import { IUser } from '@/types/user.interface'

import Comments from './comments/Comments'
import VideoDetail from './video-detail/VideoDetail'
import VideoPlayer from './video-player/VideoPlayer'
import { IVideoPage } from './video.interface'

const Video: FC<IVideoPage> = ({ video }) => {
	const { mutate } = useMutation(['update views', video._id], () =>
		VideoService.updateViews(video._id)
	)
	useEffect(() => {
		mutate()
	}, [])
	return (
		<Layout title={video.name}>
			<div>
				<VideoPlayer videoPath={video.videoPath} />
				<div id='wrapper_content'>
					<div className='left_side'>
						<VideoDetail video={video} channel={video.user || ({} as IUser)} />
					</div>
					<div className='right_side'>
						<Comments videoId={video._id} />
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Video
