import { FC } from 'react'

import Search from '@/components/layout/header/search/Search'

import IconsRight from './icons/IconsRight'

const Header: FC = () => {
	return (
		<header id='header'>
			<Search />
			<IconsRight />
		</header>
	)
}

export default Header
