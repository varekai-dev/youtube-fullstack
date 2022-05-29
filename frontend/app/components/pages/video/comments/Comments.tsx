import { FC } from 'react'
import { useQuery } from 'react-query'

import Loader from '@/components/ui/Loader'

import { CommentService } from '@/services/CommentService'

import { useAuth } from '@/hooks/useAuth'

import AddCommentForm from './AddCommentForm'
import CommentItem from './CommentItem/CommentItem'
import styles from './Comments.module.scss'

const Comments: FC<{ videoId: string }> = ({ videoId }) => {
	const { user } = useAuth()
	const { refetch, data, isLoading } = useQuery(
		['get comments', videoId],
		() => CommentService.getCommentsByVideo(videoId),
		{
			select: ({ data }) => data
		}
	)
	return (
		<>
			{user && <AddCommentForm videoId={videoId} refetch={refetch} />}
			{isLoading ? (
				<Loader count={4} />
			) : data?.length ? (
				<>
					<div className={styles.grid}>
						{data.map((comment) => (
							<CommentItem comment={comment} key={comment._id} />
						))}
					</div>
				</>
			) : (
				<p>Comments not found!</p>
			)}
			<h2></h2>
		</>
	)
}

export default Comments
