import { FC } from 'react'

import { useSearch } from '@/components/layout/header/search/useSearch'
import VideoItem from '@/components/ui/video-item/VideoItem'

import styles from './Search.module.scss'

const Search: FC = () => {
	const { data, handleSearch, searchTerm, isSuccess } = useSearch()

	return (
		<div className={styles.search_top}>
			<label>
				<input
					type='text'
					placeholder='Search videos...'
					value={searchTerm}
					onChange={handleSearch}
				/>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src='http://localhost:3000/img/common/search.svg' alt='' />
			</label>
			{isSuccess && (
				<div className={styles.result}>
					{data?.length ? (
						data.map((video) => <VideoItem item={video} key={video._id} />)
					) : (
						<div>Videos not found!</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
