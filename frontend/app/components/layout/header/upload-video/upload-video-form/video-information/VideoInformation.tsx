import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './VideoInformation.module.scss'

interface IVideoInformation {
	fileName: string
	thumbnailPath?: string
	isLoading?: boolean
	videoId: string
	isUploaded: boolean
}

const VideoInformation: FC<IVideoInformation> = ({
	fileName,
	thumbnailPath,
	videoId,
	isUploaded
}) => {
	return (
		<div className={styles.info}>
			{!thumbnailPath ? (
				<div className={styles.thumbnail}>
					{isUploaded ? 'Upload thumbnail' : 'Uploading video'}
				</div>
			) : (
				<Image src={thumbnailPath} width={386} height={200} alt='thumbnail' />
			)}

			<div className={styles.details}>
				<div>
					<span>Video Link</span>
					<span>
						<Link href={`/v/${videoId}`}>
							<a>{`${window.location.href}/v/${videoId}`}</a>
						</Link>
					</span>
				</div>
				<div>
					<span>Filename</span>
					<span>{fileName}</span>
				</div>
			</div>
		</div>
	)
}

export default VideoInformation
