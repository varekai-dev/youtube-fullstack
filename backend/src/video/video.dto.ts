import { prop, Ref } from '@typegoose/typegoose'
import { IsBoolean, IsString } from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { UserModel } from 'src/user/user.model'

export class VideoDto {
	@IsString()
	name: string

	@IsBoolean()
	isPublic?: boolean

	@IsString()
	description: string

	@IsString()
	videoPath: string

	@IsString()
	thumbnailPath: string

	@IsObjectId()
	userId: string
}
