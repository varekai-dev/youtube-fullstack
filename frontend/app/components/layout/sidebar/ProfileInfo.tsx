import Image from 'next/image'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { formatNumberToK } from 'utils/FormatNumberToK'

import Loader from '@/components/ui/Loader'

import { UserService } from '@/services/UserService'

const ProfileInfo: FC = () => {
	const { data, isLoading } = useQuery(
		'getProfile',
		() => UserService.getProfile(),
		{ select: ({ data }) => data }
	)
	if (isLoading) {
		return <Loader count={5} />
	}
	return (
		<>
			<div className='profile_info'>
				{data?.avatarPath && (
					<Image src={data?.avatarPath} alt='avatar' width={100} height={100} />
				)}

				<div className='name'>{data?.name}</div>
				<div className='location'>{data?.location}</div>
			</div>
			<div className='information'>
				<div className='item'>
					<div className='top'>{data?.videosCount}</div>
					<div className='bottom'>videos</div>
				</div>

				<div className='item'>
					<div className='top'>
						{formatNumberToK(data?.subscribersCount || 0)}
					</div>
					<div className='bottom'>subscribers</div>
				</div>
			</div>
		</>
	)
}

export default ProfileInfo
