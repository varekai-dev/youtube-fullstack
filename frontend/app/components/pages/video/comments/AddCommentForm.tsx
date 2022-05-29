import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'
import { useMutation } from 'react-query'

import styles from '@/components/layout/header/auth-form/AuthForm.module.scss'
import Field from '@/components/ui/Field/Field'

import { CommentService } from '@/services/CommentService'

import { ICommentDto } from '@/types/comment.interface'

const AddCommentForm: FC<{ videoId: string; refetch: any }> = ({
	videoId,
	refetch
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ICommentDto>({
		mode: 'onChange'
	})

	const { mutateAsync } = useMutation(
		'create comment',
		(data: ICommentDto) => CommentService.createComment({ ...data, videoId }),
		{
			onSuccess() {
				reset()
				refetch()
			}
		}
	)

	const onSubmit = async (data: ICommentDto) => {
		await mutateAsync(data)
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className='relative'>
				<Field
					{...register('message', {
						required: 'Message is required'
					})}
					// @ts-ignore
					placeholder='Add public comment'
					error={errors.message}
				/>

				<button
					className='text-xl absolute top-0 right-0'
					onClick={handleSubmit(onSubmit)}
				>
					<MdSend />
				</button>
			</div>
		</form>
	)
}

export default AddCommentForm
