"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signup(signupDto) {
        const userData = {
            username: signupDto.username,
            email: signupDto.email,
            password: signupDto.password,
            role: signupDto.role,
            balance: signupDto.balance,
            language_known: signupDto.language_known,
            nationality: signupDto.nationality,
            address: signupDto.address,
            phone_number: signupDto.phone_number,
            nid_number: signupDto.nid_number,
        };
        const user = await this.prisma.user.create({
            data: userData,
        });
        await this.createFreelancerProfile(user.id);
        await this.createClientProfile(user.id);
        return user;
    }
    async signin(signinDto) {
        const { email, password } = signinDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.password !== password) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { userId: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async validateUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        return user;
    }
    async verifyPassword(password, userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user.password === password;
    }
    async createFreelancerProfile(userId) {
        await this.prisma.freelancerProfile.create({
            data: {
                userId,
            },
        });
    }
    async createClientProfile(userId) {
        await this.prisma.clientProfile.create({
            data: {
                userId,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map