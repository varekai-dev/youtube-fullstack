import { FC } from 'react'
import { BiLike } from 'react-icons/bi'
import { useMutation } from 'react-query'
import { formatNumberToK } from 'utils/FormatNumberToK'

import ChannelInfoShort from '@/components/ui/ChannelInfoShort/ChannelInfoShort'
import VideoStatistics from '@/components/ui/video-item/VideoStatistics/VideoStatistics'

import { VideoService } from '@/services/VideoService'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import styles from './VideoDetail.module.scss'

const VideoDetail: FC<{ video: IVideo; channel: IUser }> = ({
	video,
	channel
}) => {
	const { mutateAsync, data } = useMutation(['like', video._id], () =>
		VideoService.updateLikes(video._id)
	)
	return (
		<div className={styles.detail}>
			<div className={styles.wrapper}>
				<div className={styles.text}>
					<h1>{video.name}</h1>
					<VideoStatistics
						createdAt={video.createdAt}
						views={video.views}
						subscribers={channel.subscribersCount}
					/>
				</div>
				<div>
					<button className={styles.likeButton}>
						<BiLike className={styles.likeIcon} onClick={() => mutateAsync()} />
						<span>{formatNumberToK(data?.data.likes ?? video.likes)}</span>
					</button>
				</div>
			</div>
			<article className={styles.article}>{video.description}</article>
			<ChannelInfoShort channel={channel} />
		</div>
	)
}

export default VideoDetail
