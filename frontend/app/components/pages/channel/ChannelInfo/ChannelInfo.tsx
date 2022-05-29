import { FC } from 'react'

import ChannelInfoShort from '@/components/ui/ChannelInfoShort/ChannelInfoShort'

import { IUser } from '@/types/user.interface'

import styles from './ChannelInfo.module.scss'

const ChannelInfo: FC<{ channel: IUser }> = ({ channel }) => {
	return (
		<div>
			<ChannelInfoShort channel={channel} />
			<article className={styles.article}>{channel.description}</article>
			{/*TODO: User statistics */}
			{/*<VideoStatistics
				views={item.views}
				likes={isLarge ? item.likes : undefined}
				createdAt={item.createdAt}
			/>*/}
		</div>
	)
}

export default ChannelInfo
