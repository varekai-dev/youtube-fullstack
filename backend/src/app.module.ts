import { getMongoConfig } from './config/mongo.config'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { VideoModule } from './video/video.module'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		UserModule,
		VideoModule,
		CommentModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
