import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import Image from 'next/image'
import React, { FC } from 'react'
import { formatNumberToK } from 'utils/FormatNumberToK'

import { IVideo } from '@/types/video.interface'

import VideoDuration from './VideoDuration'
import styles from './VideoItem.module.scss'

dayjs.extend(relativeTime)

const VideoItem: FC<{ item: IVideo }> = ({ item }) => {
	return (
		<div className={styles.video_item}>
			<div className={styles.thumbnail}>
				<Image
					src={item.thumbnailPath}
					alt={item.name}
					width={244}
					height={125}
				/>

				<VideoDuration videoPath={item.videoPath} />
			</div>
			<div className={styles.author}>{item.user?.name}</div>
			<div className={styles.name}>{item.name}</div>
			<div className={styles.number_info}>
				<div className={styles.views}>VIEWS {formatNumberToK(item.views)}</div>
				<div className={styles.date}> {dayjs(item.createdAt).fromNow()}</div>
			</div>
		</div>
	)
}

export default VideoItem
