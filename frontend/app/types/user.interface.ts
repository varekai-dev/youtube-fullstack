export interface IUserDto {
	location: string
	email: string
	description: string
	name: string
	avatarPath: string
}

export interface IUser extends IUserDto {
	_id: string
	createdAt: string
	updatedAt: string
	subscribersCount: number
	videosCount?: number
	isVerified: boolean
}
