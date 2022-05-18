import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { Types } from 'mongoose'
import { VideoModel } from './video.model'
import { VideoDto } from './video.dto'

@Injectable()
export class VideoService {
	constructor(
		@InjectModel(VideoModel)
		private readonly VideoModel: ModelType<VideoModel>
	) {}
	async byId(_id: Types.ObjectId, isPublic = true) {
		//check authUserId === video.userId
		const video = await this.VideoModel.findOne(
			isPublic ? { _id, isPublic: true } : { _id },
			'-__v'
		)
		if (!video) throw new UnauthorizedException('Video not found')

		return video
	}
	async getMostPopularByViews() {
		return this.VideoModel.find({ views: { $gt: 0 } }, '-__v')
			.sort({ views: -1 })
			.exec()
	}
	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [{ name: new RegExp(searchTerm, 'i') }]
			}
		}
		return this.VideoModel.find({ ...options, isPublic: true })
			.select('-__v')
			.sort({ createdAt: 'desc' })
			.populate('user', 'name avatarPath isVerified')
			.exec()
	}

	async byUserId(userId: Types.ObjectId, isPrivate = false) {
		const userIdCheck = { user: userId }
		const options = isPrivate ? userIdCheck : { ...userIdCheck, isPublic: true }

		return this.VideoModel.find(options, '-__v')
			.sort({ createdAt: 'desc' })
			.populate('user', 'name avatarPath isVerified')
			.exec()
	}

	async create(userId: Types.ObjectId) {
		const defaultValue: VideoDto = {
			name: '',
			userId: String(userId),
			videoPath: '',
			description: '',
			thumbnailPath: ''
		}
		const video = await this.VideoModel.create(defaultValue)
		return video._id
	}
	async update(_id: string, dto: VideoDto) {
		const updateVideo = await this.VideoModel.findByIdAndUpdate(_id, dto, {
			new: true
		}).exec()

		if (!updateVideo) throw new NotFoundException('Video not found')
		return updateVideo
	}
	async delete(_id: string) {
		const deleteVideo = await this.VideoModel.findByIdAndDelete(_id)
		if (!deleteVideo) throw new NotFoundException('Video not found')
		return deleteVideo
	}
	async updateCountViews(_id: string) {
		const updateVideo = await this.VideoModel.findByIdAndUpdate(
			_id,
			{ $inc: { views: 1 } },
			{
				new: true
			}
		).exec()

		if (!updateVideo) throw new NotFoundException('Video not found')
		return updateVideo
	}

	async updateReaction(_id: string, type: 'inc' | 'dis') {
		if (!type) throw new BadRequestException('Type query is not valid')
		const updateVideo = await this.VideoModel.findByIdAndUpdate(
			_id,
			{ $inc: { likes: type === 'inc' ? 1 : -1 } },
			{
				new: true
			}
		).exec()
		if (!updateVideo) throw new NotFoundException('Video not found')

		return updateVideo
	}
}
