import { FC } from 'react'

import Line from '@/components/ui/Line'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import MostPopularVideo from './most-popular-video/MostPopularVideo'
import TopChannels from './top-channels/TopChannels'

const RightSide: FC<{ topVideo: IVideo; topChannels: IUser[] }> = (props) => {
	return (
		<div className='right_side'>
			<MostPopularVideo video={props.topVideo} />
			<Line />
			<TopChannels channels={props.topChannels} />
		</div>
	)
}

export default RightSide
