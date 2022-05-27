import { FC } from 'react'
import { Controller } from 'react-hook-form'

import SuccessMessage from '@/components/layout/header/upload-video/upload-video-form/SuccessMessage'
import FooterForm from '@/components/layout/header/upload-video/upload-video-form/footer-form/FooterForm'
import TogglePublic from '@/components/layout/header/upload-video/upload-video-form/toggle-public/TogglePublic'
import { useUploadVideoForm } from '@/components/layout/header/upload-video/upload-video-form/useUploadVideoForm'
import VideoInformation from '@/components/layout/header/upload-video/upload-video-form/video-information/VideoInformation'
import Field from '@/components/ui/Field/Field'
import TextArea from '@/components/ui/TextArea/TextArea'
import UploadField from '@/components/ui/UploadField/UploadField'

import { IMediaResponse } from '@/services/MediaService'

import styles from '../UploadVideo.module.scss'

const UploadVideoForm: FC<{
	videoId: string
	handleCloseModal: () => void
}> = ({ videoId, handleCloseModal }) => {
	const { form, status, media } = useUploadVideoForm({
		videoId,
		handleCloseModal
	})

	return (
		<form
			onSubmit={form.handleSubmit(form.onSubmit)}
			className='flex flex-wrap'
		>
			{status.isSuccess && <SuccessMessage />}
			{status.isChosen ? (
				<>
					<div className='w-7/12 pr-6 pt-8'>
						<Field
							{...form.register('name', {
								required: 'Name is required'
							})}
							// @ts-ignore
							placeholder='Name'
							error={form.errors.name}
						/>
						<TextArea
							{...form.register('description', {
								required: 'Description is required'
							})}
							// @ts-ignore
							placeholder='Description'
							error={form.errors.description}
						/>
						<div className='mt-8'>
							<Controller
								control={form.control}
								name='thumbnailPath'
								render={({ field: { onChange } }) => (
									<UploadField
										accept='image/png, image/jpeg'
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
							render={({ field: { onChange, value } }) => (
								<TogglePublic
									clickHandler={() => {
										onChange(!value)
									}}
									isEnabled={!!value}
								/>
							)}
						/>
					</div>
					<div className={'w-5/12 p-3 pl-10'}>
						<VideoInformation
							fileName={media.videoFileName}
							videoId={videoId}
							isUploaded={status.isUploaded}
							thumbnailPath={media.thumbnailPath}
						/>
					</div>

					<FooterForm isUploaded={status.isUploaded} percent={status.percent} />
				</>
			) : (
				<div className={styles.uploadScreen}>
					<Controller
						control={form.control}
						name='videoPath'
						render={() => (
							<UploadField
								accept='video/mp4,video/x-m4v,video/*'
								title={'Upload video first👇'}
								folder='videos'
								onChange={media.handleUploadVideo}
								setValue={status.setProgressPercentage}
								setIsChosen={status.setIsChosen}
							/>
						)}
					/>
				</div>
			)}
		</form>
	)
}

export default UploadVideoForm
