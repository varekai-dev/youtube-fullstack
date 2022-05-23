import React, { FC } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

import { useAuth } from '@/hooks/useAuth'

import AuthForm from '../auth-form/AuthForm'
import UploadVideo from '../upload-video/UploadVideo'

import styles from './IconsRight.module.scss'

const IconsRight: FC = () => {
	const { user } = useAuth()
	return (
		<div className={styles.icons}>
			{!!user ? <UploadVideo /> : <AuthForm />}
		</div>
	)
}

export default IconsRight
