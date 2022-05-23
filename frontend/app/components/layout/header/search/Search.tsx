import { FC } from 'react'

import { useSearch } from '@/components/layout/header/search/useSearch'
import VideoItem from '@/components/ui/video-item/VideoItem'

import styles from './Search.module.scss'

const Search: FC = () => {
	return (
		<div className={styles.search_top}>
			<label>
				<input type='text' placeholder='Search videos...' />
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src='http://localhost:3000/img/common/search.svg' alt='' />
			</label>
		</div>
	)
}

export default Search
