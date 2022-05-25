import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { IMediaResponse } from '@/services/MediaService'
import { VideoService } from '@/services/VideoService'

import { IVideoDto } from '@/types/video.interface'

interface IUseUploadVideoForm {
	videoId: string
	handleCloseModal: () => void
}

export const useUploadVideoForm = ({
	handleCloseModal,
	videoId
}: IUseUploadVideoForm) => {
	const {
		register,
		formState: { errors },
		control,
		watch,
		setValue,
		handleSubmit,
		reset
	} = useForm<IVideoDto>({
		mode: 'onChange'
	})

	const { mutateAsync, isSuccess } = useMutation(
		'update video',
		(body: IVideoDto) => VideoService.updateVideo(videoId, body),
		{
			onSuccess: () => {
				setTimeout(() => {
					handleCloseModal()
					reset()
				}, 1000)
			}
		}
	)

	const onSubmit: SubmitHandler<IVideoDto> = async (data) => {
		await mutateAsync(data)
	}

	const [videoFileName, setVideoFileName] = useState('')
	const thumbnailPath = watch('thumbnailPath')

	const handleUploadVideo = (value: IMediaResponse) => {
		setValue('videoPath', value.url)
		setValue('name', value.name)
		setVideoFileName(value.name)
	}

	const [percent, setPercent] = useState(0)
	const [isUploaded, setIsUploaded] = useState(false)
	const setProgressPercentage = (value: number) => {
		setPercent(value)
		if (value === 100) {
			setIsUploaded(true)
		}
	}

	return {
		form: {
			register,
			control,
			handleSubmit,
			onSubmit,
			errors
		},
		media: {
			setProgressPercentage,
			videoFileName,
			thumbnailPath,
			handleUploadVideo
		},
		status: {
			percent,
			isUploaded
		},
		isSuccess
	}
}
