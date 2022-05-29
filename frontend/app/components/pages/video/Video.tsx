import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import { IUser } from '@/types/user.interface'

import Comments from './comments/Comments'
import VideoDetail from './video-detail/VideoDetail'
import VideoPlayer from './video-player/VideoPlayer'
import { IVideoPage } from './video.interface'

const Video: FC<IVideoPage> = ({ video }) => {
	return (
		<Layout title={video.name}>
			<div>
				<VideoPlayer videoPath={video.videoPath} />
				<div id='wrapper_content'>
					<div className='left_side'>
						<VideoDetail video={video} channel={video.user || ({} as IUser)} />
					</div>
					<div className='right_side'>
						<Comments />
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Video
