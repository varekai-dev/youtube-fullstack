import React, { FC } from 'react'

import VideoItem from '@/components/ui/video-item/VideoItem'

import { IVideo } from '@/types/video.interface'

export const Recommended: FC<{ newVideos: IVideo[] }> = ({ newVideos }) => {
	return (
		<div id='recommended'>
			<div className='top_block'>
				<div className='left_title title_gray'>
					<h2>Newest video</h2>
					<div className='showmore'>Show More</div>
				</div>
				<div className='sort'>By View Trending</div>
			</div>

			<div className='catalog'>
				{newVideos.map((video) => (
					<VideoItem item={video} key={video._id} isAvatar />
				))}
			</div>
		</div>
	)
}
