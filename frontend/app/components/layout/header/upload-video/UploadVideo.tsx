import { FC, useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'

import stylesIcon from '../Icons/IconsRight.module.scss'

import UploadModal from './UploadModal'
import styles from './UploadVideo.module.scss'

const UploadVideo: FC = () => {
	let [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button className={stylesIcon.button} onClick={() => setIsOpen(true)}>
				<BsFillPlusCircleFill fill='#cd3a42' />
			</button>
			<UploadModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	)
}

export default UploadVideo
