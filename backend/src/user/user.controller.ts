import { IdValidationPipe } from './../pipes/id.validation.pipe'
import {
	Controller,
	Body,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Put,
	Get,
	Param
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from './decorators/user.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'
import { Types } from 'mongoose'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('_id') _id: Types.ObjectId) {
		return this.userService.byId(_id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('profile')
	@Auth()
	async updateProfile(
		@CurrentUser('_id') _id: Types.ObjectId,
		@Body() dto: UserDto
	) {
		return this.userService.updateProfile(_id, dto)
	}

	@HttpCode(200)
	@Put(':userId')
	@Auth() // Change to admin
	async updateUser(
		@Param('userId', IdValidationPipe) userId: Types.ObjectId,
		@Body() dto: UserDto
	) {
		return this.userService.updateProfile(userId, dto)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.userService.getMostPopular()
	}
}
