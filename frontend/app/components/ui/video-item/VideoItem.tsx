import cn from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { formatNumberToK } from 'utils/FormatNumberToK'

import VideoDuration from './VideoDuration'
import styles from './VideoItem.module.scss'
import { IVideoItem } from './video-item.interface'

dayjs.extend(relativeTime)

const VideoItem: FC<IVideoItem> = ({
	item,
	isLarge,
	isAvatar,
	tag,
	removeHandler,
	isUpdateLink
}) => {
	const { push } = useRouter()
	return (
		<div className={styles.video_item}>
			{!!removeHandler && (
				<button
					className={styles.removeButton}
					onClick={() => removeHandler(item._id)}
				>
					<BiTrash className={styles.removeIcon} />
				</button>
			)}
			{isUpdateLink && (
				<button
					className={styles.editButton}
					onClick={() => push(`/video/edit/${item._id}`)}
				>
					<BiEdit className={styles.editIcon} />
				</button>
			)}
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
							{tag && <div className={styles.hot}>{tag}</div>}
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
					<div
						className={cn(styles.author, {
							verified: item?.user?.isVerified
						})}
					>
						{item.user?.name}
					</div>
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
