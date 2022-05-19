import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

export interface IHome {
	newVideo: IVideo[]
	weeklyVideos: IVideo[]
	topVideo: IVideo
	randomVideo: IVideo
	topChannels: IUser[]
}
