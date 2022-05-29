import { FC } from 'react'
import { BiLike } from 'react-icons/bi'
import { formatNumberToK } from 'utils/FormatNumberToK'

import ChannelInfoShort from '@/components/ui/ChannelInfoShort/ChannelInfoShort'
import VideoStatistics from '@/components/ui/video-item/VideoStatistics/VideoStatistics'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import styles from './VideoDetail.module.scss'

const VideoDetail: FC<{ video: IVideo; channel: IUser }> = ({
	video,
	channel
}) => {
	return (
		<div>
			<div>
				<div>
					<h1>{video.name}</h1>
					<VideoStatistics
						createdAt={video.createdAt}
						views={video.views}
						subscribers={channel.subscribersCount}
					/>
				</div>
				<div>
					<button className={styles.likeButton}>
						<BiLike className={styles.likeIcon} />
						<span>{formatNumberToK(video.likes)}</span>
					</button>
				</div>
			</div>
			<article>{video.description}</article>
			<ChannelInfoShort channel={channel} />
		</div>
	)
}

export default VideoDetail
