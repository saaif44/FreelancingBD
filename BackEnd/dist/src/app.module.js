"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const profile_module_1 = require("./profile/profile.module");
const jwt_1 = require("@nestjs/jwt");
const message_module_1 = require("./message/message.module");
const multer_config_1 = require("./config/multer.config");
const file_controller_1 = require("./file/file.controller");
const file_module_1 = require("./file/file.module");
const file_upload_service_1 = require("./file/file-upload.service");
const logging_middleware_1 = require("./middleware/logging.middleware");
const platform_express_1 = require("@nestjs/platform-express");
const transaction_service_1 = require("./transaction/transaction.service");
const transaction_controller_1 = require("./transaction/transaction.controller");
const transaction_module_1 = require("./transaction/transaction.module");
const dashboard_controller_1 = require("./dashboard/dashboard.controller");
const dashboard_service_1 = require("./dashboard/dashboard.service");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.LoggingMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [file_module_1.FileModule, auth_module_1.AuthModule, prisma_module_1.PrismaModule, users_module_1.UsersModule, profile_module_1.ProfileModule, jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'jwt-secret',
                signOptions: { expiresIn: '1d' },
            }), message_module_1.MessageModule, platform_express_1.MulterModule.register(multer_config_1.multerConfig), transaction_module_1.TransactionModule, dashboard_module_1.DashboardModule,],
        controllers: [file_controller_1.FileController, transaction_controller_1.TransactionController, dashboard_controller_1.DashboardController,],
        providers: [file_upload_service_1.FileUploadService, transaction_service_1.TransactionService, dashboard_service_1.DashboardService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map