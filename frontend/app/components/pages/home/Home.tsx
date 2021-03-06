import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import RightSide from '@/components/layout/right-side/RightSide'
import Line from '@/components/ui/Line'

import { useAuth } from '@/hooks/useAuth'

import { IHome } from './home.interface'
import Recommended from './recommended/Recommended'
import WeeklyFeatured from './weekly-featured/WeeklyFeatured'

const Home: FC<IHome> = (props) => {
	const { user } = useAuth()

	return (
		<Layout title='Youtube - Best video'>
			<div id='wrapper_content'>
				<div className='left_side'>
					<WeeklyFeatured
						weeklyVideos={props.weeklyVideos}
						randomVideo={props.randomVideo}
					/>

					<Line />

					<Recommended newVideos={props.newVideos} />
				</div>
				<RightSide topVideo={props.topVideo} topChannels={props.topChannels} />
			</div>
		</Layout>
	)
}

export default Home
