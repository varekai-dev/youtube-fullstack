import { FC } from 'react'
import { Controller } from 'react-hook-form'

import Field from '@/components/ui/Field/Field'
import TextArea from '@/components/ui/TextArea/TextArea'
import UploadField from '@/components/ui/UploadField/UploadField'

import { IMediaResponse } from '@/services/MediaService'

import styles from '../UploadVideo.module.scss'
import TogglePublic from '../upload-video-form/toggle-public/TogglePublic'

import SuccessMessage from './SuccessMessage'
import FooterForm from './footer-form/FooterForm'
import { useUploadVideoForm } from './useUploadVideoForm'
import VideoInformation from './video-information/VideoInformation'

const UploadVideoForm: FC<{
	videoId: string
	handleCloseModal: () => void
}> = ({ videoId, handleCloseModal }) => {
	const { form, status, isSuccess, media } = useUploadVideoForm({
		videoId,
		handleCloseModal
	})
	return (
		<form
			onSubmit={form.handleSubmit(form.onSubmit)}
			className='flex flex-wrap'
		>
			{isSuccess && <SuccessMessage />}
			{status.percent > 0 ? (
				<>
					<div className='w-7/12 pr-6 pt-4'>
						<Field
							{...form.register('name', {
								required: 'Name is required'
							})}
							//@ts-ignore
							placeholder='Email'
							error={form.errors.name}
						/>
						<TextArea
							{...form.register('description', {
								required: 'Description is required'
							})}
							//@ts-ignore
							placeholder='Description'
							error={form.errors.description}
						/>
						<div className='mt-8'>
							<Controller
								control={form.control}
								name='thumbnailPath'
								render={({ field: { onChange } }) => (
									<UploadField
										folder='thumbnails'
										onChange={(value: IMediaResponse) => {
											onChange(value.url)
										}}
									/>
								)}
							/>
						</div>
						<Controller
							control={form.control}
							name='isPublic'
							defaultValue={false}
							render={({ field: { onChange, value } }) => (
								<TogglePublic
									clickHandler={() => onChange(!value)}
									isEnabled={!!value}
								/>
							)}
						/>
					</div>
					<div className='w-5/12 p-3 pl-10'>
						<VideoInformation
							fileName={media.videoFileName}
							videoId={videoId}
							isUploaded={status.isUploaded}
							thumbnailPath={media.thumbnailPath}
						/>
					</div>

					<FooterForm percent={status.percent} isUploaded={status.isUploaded} />
				</>
			) : (
				<div className={styles.uploadScreen}>
					<Controller
						control={form.control}
						name='videoPath'
						render={() => (
							<UploadField
								title='Upload video to start 👇'
								folder='videos'
								onChange={media.handleUploadVideo}
								setValue={media.setProgressPercentage}
							/>
						)}
					/>
				</div>
			)}
		</form>
	)
}

export default UploadVideoForm
