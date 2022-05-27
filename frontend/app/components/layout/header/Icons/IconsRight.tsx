import { FC } from 'react'

import UploadVideo from '@/components/layout/header/upload-video/UploadVideo'

import { useAuth } from '@/hooks/useAuth'

import AuthForm from '../auth-form/AuthForm'

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
