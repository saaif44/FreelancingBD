"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const file_controller_1 = require("./file.controller");
const file_upload_service_1 = require("./file-upload.service");
const prisma_module_1 = require("../prisma/prisma.module");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'jwt-secret',
                signOptions: { expiresIn: '1d' }
            }), prisma_module_1.PrismaModule,
        ],
        controllers: [file_controller_1.FileController],
        providers: [file_upload_service_1.FileUploadService, jwt_auth_guard_1.JwtAuthGuard],
    })
], FileModule);
//# sourceMappingURL=file.module.js.map