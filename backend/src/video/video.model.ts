import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface VideoModel extends Base {}

export class VideoModel extends TimeStamps {
	@prop()
	name: string

	@prop()
	isPublic: boolean

	@prop({ default: 0 })
	views?: number

	@prop({ default: 0 })
	like?: number

	@prop({ default: 0 })
	dislike?: number

	@prop()
	videoPath: string

	@prop()
	thumbnailPath: string
}
