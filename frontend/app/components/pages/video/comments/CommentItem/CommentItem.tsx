import React, { FC } from 'react'

import ChannelInfoShort from '@/components/ui/ChannelInfoShort/ChannelInfoShort'

import { IComment } from '@/types/comment.interface'

import styles from './CommentItem.module.scss'

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
	return (
		<div className={styles.commentItem}>
			<ChannelInfoShort channel={comment.user} />
			<p>{comment.message}</p>
		</div>
	)
}

export default CommentItem
