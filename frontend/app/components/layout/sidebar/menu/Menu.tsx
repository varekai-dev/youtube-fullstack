import { FC, Fragment } from 'react'

import MenuItem from './MenuItem'
import { menu } from './menu.data'

const Menu: FC = () => {
	return (
		<ul className='mnu_sidebar'>
			{menu.map((item, index) => (
				<Fragment key={index}>
					{index === 3 && <div className='line_mnu'></div>}
					<MenuItem item={item} />
				</Fragment>
			))}
			<div className='line_mnu'></div>
		</ul>
	)
}

export default Menu
