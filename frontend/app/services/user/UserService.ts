import { axiosClassic } from 'api/interceptors'

import { IUser } from '@/types/user.interface'

import { IAuthData, saveToStorage } from './../auth/auth.helper'

export const UserService = {
	async login(email: string, password: string) {
		// const response = await axiosClassic.get<IUser>('/user/profile', {
		// 	email,
		// 	password
		// })
		// if (response.data.accessToken) saveToStorage(response.data)
		// return response.data
	}
}
