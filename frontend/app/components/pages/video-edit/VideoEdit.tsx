import { useRouter } from 'next/router'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

import Layout from '@/components/layout/Layout'
import TogglePublic from '@/components/layout/header/upload-video/upload-video-form/toggle-public/TogglePublic'
import VideoInformation from '@/components/layout/header/upload-video/upload-video-form/video-information/VideoInformation'
import StudioItem from '@/components/pages/studio/StudioItem'
import Button from '@/components/ui/Button/Button'
import Field from '@/components/ui/Field/Field'
import Loader from '@/components/ui/Loader'
import TextArea from '@/components/ui/TextArea/TextArea'
import UploadField from '@/components/ui/UploadField/UploadField'

import { IMediaResponse } from '@/services/MediaService'
import { VideoService } from '@/services/VideoService'

import { IVideoDto } from '@/types/video.interface'

const VideoEdit: FC = () => {
	const { query } = useRouter()
	const videoId = String(query.id)

	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue
	} = useForm<IVideoDto>({
		mode: 'onChange'
	})

	const { isLoading } = useQuery(
		['get video private by id', videoId],
		() => VideoService.getVideoPrivateById(videoId),
		{
			onSuccess: ({ data }) => {
				setValue('name', data.name)
				setValue('description', data.description)
				setValue('videoPath', data.videoPath)
				setValue('thumbnailPath', data.thumbnailPath)
				setValue('isPublic', data.isPublic)
			},
			enabled: !!videoId
		}
	)

	const { mutate } = useMutation(['update video', videoId], (data: IVideoDto) =>
		VideoService.updateVideo(videoId, data)
	)

	const onSubmit: SubmitHandler<IVideoDto> = (data) => {
		mutate(data)
	}

	return (
		<Layout title='Video Editing'>
			<div style={{ backgroundColor: '#F0F1F7' }} className={'p-7 h-full'}>
				<StudioItem>
					{isLoading ? (
						<Loader count={5} />
					) : (
						<form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap'>
							<div className='w-7/12 pr-6 pt-8'>
								<Field
									{...register('name', {
										required: 'Name is required'
									})}
									// @ts-ignore
									placeholder='Name'
									error={errors.name}
								/>
								<TextArea
									{...register('description', {
										required: 'Description is required'
									})}
									// @ts-ignore
									placeholder='Description'
									error={errors.description}
								/>
								<div className='mt-8'>
									<Controller
										control={control}
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
								<div className='mt-8'>
									<span>Video: </span>
									<Controller
										control={control}
										name='videoPath'
										render={({ field: { onChange } }) => (
											<UploadField
												accept='video/mp4,video/x-m4v,video/*'
												folder='videos'
												onChange={(value: IMediaResponse) => {
													onChange(value.url)
												}}
											/>
										)}
									/>
								</div>
								<Controller
									control={control}
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
									fileName={''}
									videoId={videoId}
									isUploaded
									thumbnailPath={watch('thumbnailPath')}
								/>
							</div>

							<div className={'mt-10'}>
								<Button>Save</Button>
							</div>
						</form>
					)}
				</StudioItem>
			</div>
		</Layout>
	)
}

export default VideoEdit
