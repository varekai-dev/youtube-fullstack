import { FC, useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useMutation } from 'react-query'

import { VideoService } from '@/services/VideoService'

import stylesIcon from '../Icons/IconsRight.module.scss'

import UploadModal from './UploadModal'
import styles from './UploadVideo.module.scss'

const UploadVideo: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [videoId, setVideoId] = useState('')

	const { mutate } = useMutation(
		'create video',
		() => {
			return VideoService.createVideo()
		},
		{
			onSuccess: ({ data }) => {
				setVideoId(data)
				setIsOpen(true)
			}
		}
	)

	return (
		<>
			<button className={stylesIcon.button} onClick={() => mutate()}>
				<BsFillPlusCircleFill fill='#cd3a42' />
			</button>
			<UploadModal isOpen={isOpen} setIsOpen={setIsOpen} videoId={videoId} />
		</>
	)
}

export default UploadVideo
