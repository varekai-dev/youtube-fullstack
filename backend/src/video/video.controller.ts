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

	@Get(':id')
	async getVideo(@Param('_id', IdValidationPipe) _id: Types.ObjectId) {
		return this.videoService.byId(_id)
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
		return this.videoService.byUserId(_id)
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
		@Param('_id', IdValidationPipe) _id: string,
		@Body() dto: VideoDto
	) {
		return this.videoService.update(_id, dto)
	}

	@HttpCode(200)
	@Delete()
	@Auth()
	async deleteVideo(@Param('_id', IdValidationPipe) _id: string) {
		return this.videoService.delete(_id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.videoService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}

	@HttpCode(200)
	@Put('update-views/:videoId')
	async updateViews(@Param('_videoId', IdValidationPipe) videoId: string) {
		return this.videoService.updateCountViews(videoId)
	}

	@HttpCode(200)
	@Put('update-likes/:videoId')
	@Auth()
	async updateLikes(
		@Param('_videoId', IdValidationPipe) videoId: string,
		@Query('type') type: 'inc' | 'dis'
	) {
		return this.videoService.updateReaction(videoId, type)
	}
}
