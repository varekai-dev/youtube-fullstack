import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { VideoService } from '@/services/VideoService'

import { useAuth } from '@/hooks/useAuth'

import Recommended from '../home/recommended/Recommended'

import StudioItem from './StudioItem'

const Studio: FC = () => {
	const router = useRouter()
	const { user } = useAuth()
	useEffect(() => {
		if (!user) {
			router.push('/')
		}
	}, [user, router])

	const { data, isLoading, refetch } = useQuery(
		'get videos in studio',
		() => VideoService.getVideosByCurrentUser(),
		{
			select: ({ data }) => data
		}
	)

	const { mutate } = useMutation(
		'delete video',
		(videoId: string) => VideoService.deleteVideo(videoId),
		{
			onSuccess() {
				refetch()
			}
		}
	)

	return (
		<Layout title='Youtube Studio'>
			<div
				style={{
					backgroundColor: '#f0f1f7'
				}}
				className='p-7 h-full'
			>
				<StudioItem>
					{isLoading ? (
						<Loader count={8} />
					) : !!data?.length ? (
						<Recommended
							newVideos={data || []}
							removeHandler={mutate}
							isUpdateLink
						/>
					) : (
						'You have not uploaded any videos yet'
					)}
				</StudioItem>
			</div>
		</Layout>
	)
}

export default Studio
