import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { formatNumberToK } from 'utils/FormatNumberToK'

import VideoDuration from './VideoDuration'
import styles from './VideoItem.module.scss'
import { IVideoItem } from './video-item.interface'

dayjs.extend(relativeTime)

const VideoItem: FC<IVideoItem> = ({ item, isLarge, isAvatar }) => {
	return (
		<div className={styles.video_item}>
			<Link href={`/v/${item._id}`}>
				<a className='block'>
					{item.thumbnailPath && (
						<div className={styles.thumbnail}>
							<Image
								src={item.thumbnailPath}
								alt={item.name}
								width={185}
								height={103}
								layout='responsive'
							/>
							<VideoDuration videoPath={item.videoPath} />
							{isAvatar && (
								<div className={styles.avatar}>
									<Image
										width={50}
										height={50}
										alt={item.user?.name}
										src={item.user?.avatarPath || ''}
									/>
								</div>
							)}
						</div>
					)}
					<div className={styles.author}>{item.user?.name}</div>
					<div className={styles.name}>{item.name}</div>
				</a>
			</Link>
			{isLarge && <div className={styles.description}>{item.description}</div>}
			<div className={styles.number_info}>
				<div className={styles.views}>VIEWS {formatNumberToK(item.views)}</div>
				{isLarge && (
					<div className={styles.likes}>
						LIKES {formatNumberToK(item.likes)}
					</div>
				)}
				<div className={styles.date}>{dayjs(item.createdAt).fromNow()}</div>
			</div>
		</div>
	)
}

export default VideoItem
