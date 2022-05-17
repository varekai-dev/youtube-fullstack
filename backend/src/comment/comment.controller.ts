import { CurrentUser } from './../user/decorators/user.decorator'
import { CommentDto } from './comment.dto'
import { Types } from 'mongoose'
import { IdValidationPipe } from './../pipes/id.validation.pipe'
import { Auth } from './../auth/decorators/auth.decorator'
import {
	Body,
	Controller,
	HttpCode,
	Param,
	UsePipes,
	ValidationPipe,
	Get,
	Post
} from '@nestjs/common'
import { CommentService } from './comment.service'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createComment(
		@CurrentUser('_id') _id: Types.ObjectId,
		@Body() dto: CommentDto
	) {
		return this.commentService.create(_id, dto)
	}

	@Get('by-video/:videoId')
	async getVideoByUserId(
		@Param('videoId', IdValidationPipe) videoId: Types.ObjectId
	) {
		return this.commentService.byVideoId(videoId)
	}
}
