import { IsBoolean, IsString } from 'class-validator'

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

	userId?: string
}
