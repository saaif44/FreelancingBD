import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import AppController from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ReviewRatingModule } from './review-rating/review-rating.module';
import { GigManagementModule } from './gig-management/gig-management.module';
import { PrivacySettingsModule } from './privacy-settings/privacy-settings.module';



import ormConfig from "ormconfig";


@Module({
    imports: [TypeOrmModule.forRoot(ormConfig), UserModule, AuthModule, ReviewRatingModule, GigManagementModule, PrivacySettingsModule],
    controllers : [AppController],
})
export class AppModule{}