import Image from 'next/image'
import React, { FC } from 'react'

import avatarImg from '../../../../public/img/main/avatar.jpg'

const ProfileInfo: FC = () => {
	return (
		<>
			<div className='profile_info'>
				<Image src={avatarImg} alt='avatar' width={130} height={42} />
				<div className='name'>Nannie Nelson</div>
				<div className='location'>Montreal, QC</div>
			</div>
			<div className='information'>
				<div className='item'>
					<div className='top'>278</div>
					<div className='bottom'>videos</div>
				</div>
				<div className='item'>
					<div className='top'>36.5k</div>
					<div className='bottom'>subscribers</div>
				</div>
			</div>
		</>
	)
}

export default ProfileInfo
