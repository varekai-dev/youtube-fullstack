import React, { FC, useRef } from 'react'

const VideoDuration: FC<{ videoPath: string }> = ({ videoPath }) => {
	const ref = useRef<HTMLVideoElement>(null)
	const duration = ref.current?.duration || 0

	const minutes = Math.floor(duration / 60)
	const seconds = Math.floor(duration % 60)
	return (
		<>
			<video className='hidden' ref={ref}>
				<source src={videoPath} type='video/mp4' />
			</video>
			<time>
				{minutes}: {seconds}
			</time>
		</>
	)
}

export default VideoDuration
