import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import RightSide from '@/components/layout/right-side/RightSide'
import Line from '@/components/ui/Line'

import { useAuth } from '@/hooks/useAuth'

import { Recommended } from './recommended/Recommended'
import WeeklyFeatured from './weekly-featured/WeeklyFeatured'

const Home: FC = () => {
	const { user } = useAuth()

	return (
		<Layout title='Youtube - Best video'>
			<div id='wrapper_content'>
				<div className='left_side'>
					<WeeklyFeatured />

					<Line />

					<Recommended />
				</div>
				<RightSide />
			</div>
		</Layout>
	)
}

export default Home
