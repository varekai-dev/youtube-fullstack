export interface IUser {
	_id: string
	email: string
	createdAt: string
	updatedAt: string
	name: string
	avatarPath: string
	description: string
	location: string
	subscriberCount: number
	videosCount?: number
}
