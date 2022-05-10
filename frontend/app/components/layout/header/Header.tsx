import { FC } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'

import IconsRight from './Icons/IconsRight'

const Header: FC = () => {
	return (
		<header id='header'>
			<div className='search_top'>
				<label>
					<input type='text' placeholder='Search videos, stars or authors...' />
					<img src='img/common/search.svg' alt='' />
				</label>
			</div>
			<IconsRight />
		</header>
	)
}

export default Header
