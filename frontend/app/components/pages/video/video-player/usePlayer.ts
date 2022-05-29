import { useCallback, useEffect, useRef, useState } from 'react'

import { IVideoElement } from './video-player.interface'

export const usePlayer = () => {
	const videoRef = useRef<IVideoElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [isShowButton, setIsShowButton] = useState(true)

	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if (originalDuration) {
			setVideoTime(originalDuration)
		}
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
			setTimeout(() => {
				setIsShowButton(false)
			}, 1500)
		} else {
			setIsShowButton(true)
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 15
	}
	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 15
	}

	const fullScreen = () => {
		const video = videoRef.current
		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return
		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / video.duration) * 100)
		}
		video.addEventListener('timeupdate', updateProgress)

		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
					forward()
					break
				case 'ArrowLeft':
					revert()
					break
				case ' ':
					e.preventDefault()
					toggleVideo()
					break
				case 'f':
					fullScreen()
					break
				default:
					return
			}
		}
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [videoTime, toggleVideo])

	return {
		videoRef,
		toggleVideo,
		status: {
			currentTime,
			isPlaying,
			progress,
			isShowButton
		}
	}
}
