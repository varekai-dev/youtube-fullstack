import { FC } from 'react'
import { MdPause, MdPlayArrow } from 'react-icons/md'

import styles from './VideoPlayer.module.scss'
import { usePlayer } from './usePlayer'

const VideoPlayer: FC<{ videoPath: string }> = ({ videoPath }) => {
	const {
		videoRef,
		toggleVideo,
		status: { isPlaying, progress, isShowButton }
	} = usePlayer()
	return (
		<div className={styles.wrapper}>
			<video
				ref={videoRef}
				className={styles.player}
				src={`${videoPath}#t=8`}
				preload='metadata'
			/>
			<div className={styles.button}>
				<button onClick={toggleVideo}>
					{isPlaying
						? isShowButton && <MdPause className='animate-fade' />
						: isShowButton && <MdPlayArrow />}
				</button>
			</div>
			<div className={styles.progressBarWrapper}>
				<div
					className={styles.progressBar}
					style={{
						width: `${progress}%`
					}}
				/>
			</div>
		</div>
	)
}

export default VideoPlayer
