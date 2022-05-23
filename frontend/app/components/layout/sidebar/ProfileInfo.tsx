import cn from 'classnames'
import Image from 'next/image'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { formatNumberToK } from 'utils/FormatNumberToK'

import Loader from '@/components/ui/Loader'

import { UserService } from '@/services/UserService'

import styles from './ProfileInfo.module.scss'

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
			<div className={styles.profile_info}>
				{data?.avatarPath && (
					<Image
						src={data?.avatarPath}
						alt='avatar'
						width={100}
						height={100}
						quality={90}
					/>
				)}

				<div
					className={cn(styles.name, {
						verified: data?.isVerified
					})}
				>
					{data?.name}
				</div>
				<div className={styles.location}>{data?.location}</div>
			</div>
			<div className={styles.information}>
				<div className={styles.item}>
					<div className={styles.top}>{data?.videosCount}</div>
					<div className={styles.bottom}>videos</div>
				</div>

				<div className={styles.item}>
					<div className={styles.top}>
						{formatNumberToK(data?.subscribersCount || 0)}
					</div>
					<div className={styles.bottom}>subscribers</div>
				</div>
			</div>
		</>
	)
}

export default ProfileInfo
