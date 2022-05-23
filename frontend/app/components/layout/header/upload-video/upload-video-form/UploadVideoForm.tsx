import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button/Button'
import Field from '@/components/ui/Field/Field'
import TextArea from '@/components/ui/TextArea/TextArea'

import { IVideoDto } from '@/types/video.interface'

import TogglePublic from '../toggle-pulic/TogglePublic'

const UploadVideoForm: FC = () => {
	const {
		register,
		formState: { errors },
		control,
		handleSubmit
	} = useForm<IVideoDto>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IVideoDto> = (data) => {
		console.log(data)
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register('name', {
					required: 'Name is required'
				})}
				//@ts-ignore
				placeholder='Email'
				error={errors.name}
			/>
			<TextArea
				{...register('description', {
					required: 'Description is required'
				})}
				//@ts-ignore
				placeholder='Description'
				error={errors.description}
			/>
			<TogglePublic />
			<div className={'mt-3 mb-1 text-center'}>
				<Button type='submit'>Save</Button>
			</div>
		</form>
	)
}

export default UploadVideoForm
