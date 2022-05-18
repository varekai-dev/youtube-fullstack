import { Types } from 'mongoose'
import { Auth } from './../auth/decorators/auth.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { VideoService } from './video.service'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { VideoDto } from './video.dto'
import { CurrentUser } from 'src/user/decorators/user.decorator'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get('get-private/:id')
	@Auth()
	async getVideoPrivate(@Param('id', IdValidationPipe) id: Types.ObjectId) {
		return this.videoService.byId(id, false)
	}

	@Get('by-user/:userId')
	async getVideoByUserId(
		@Param('userId', IdValidationPipe) userId: Types.ObjectId
	) {
		return this.videoService.byUserId(userId)
	}

	@Get('by-user-private')
	@Auth()
	async getVideoByUserIdPrivate(@CurrentUser('_id') _id: Types.ObjectId) {
		return this.videoService.byUserId(_id, true)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo(@CurrentUser('_id') _id: Types.ObjectId) {
		return this.videoService.create(_id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateVideo(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: VideoDto
	) {
		return this.videoService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id', IdValidationPipe) id: string) {
		return this.videoService.delete(id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.videoService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}

	@Get(':id')
	async getVideo(@Param('id', IdValidationPipe) id: Types.ObjectId) {
		return this.videoService.byId(id)
	}

	@HttpCode(200)
	@Put('update-views/:videoId')
	async updateViews(@Param('videoId', IdValidationPipe) videoId: string) {
		return this.videoService.updateCountViews(videoId)
	}

	@HttpCode(200)
	@Put('update-likes/:videoId')
	@Auth()
	async updateLikes(
		@Param('videoId', IdValidationPipe) videoId: string,
		@Query('type') type: 'inc' | 'dis'
	) {
		return this.videoService.updateReaction(videoId, type)
	}
}
