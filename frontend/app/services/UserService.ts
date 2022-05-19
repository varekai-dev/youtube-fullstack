import instance, { axiosClassic } from 'api/interceptors'

import { IUser, IUserDto } from '@/types/user.interface'

export const UserService = {
	async getProfile() {
		return instance.get<IUser>('/user/profile')
	},
	async getMostPopular() {
		return axiosClassic.get<IUser[]>('/user/most-popular')
	},
	async updateProfile(body: IUserDto) {
		return instance.put<IUser>('/user/profile', body)
	}
}
