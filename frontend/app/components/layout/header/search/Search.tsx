import { FC } from 'react'
import { useQuery } from 'react-query'

import { useSearch } from '@/components/layout/header/search/useSearch'
import VideoItem from '@/components/ui/video-item/VideoItem'

import { VideoService } from '@/services/VideoService'

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
			{isSuccess && !!searchTerm.length && (
				<div className={styles.result}>
					{data?.length ? (
						data.map((video) => <VideoItem key={video._id} item={video} />)
					) : (
						<div>No results</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
