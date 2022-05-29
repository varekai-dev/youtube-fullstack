import { FC } from 'react'

import VideoItem from '@/components/ui/video-item/VideoItem'

import { IVideo } from '@/types/video.interface'

const MostPopularVideo: FC<{ video: IVideo }> = ({ video }) => {
	return (
		<div id='live'>
			<div className='title_gray mb-5'>
				<h2>Live</h2>
			</div>
			<VideoItem item={video} tag={'🔥 Hot'} />
		</div>
	)
}

export default MostPopularVideo
