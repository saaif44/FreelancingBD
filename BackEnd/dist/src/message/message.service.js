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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MessageService = class MessageService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMessage(senderId, createMessageDto) {
        const { content, recipientId } = createMessageDto;
        const [sender, recipient] = await Promise.all([
            this.prisma.user.findUnique({ where: { id: senderId }, select: { username: true } }),
            this.prisma.user.findUnique({ where: { id: recipientId }, select: { username: true } }),
        ]);
        if (!sender || !recipient) {
            throw new Error('Sender or recipient not found');
        }
        return this.prisma.message.create({
            data: {
                content,
                senderId,
                recipientId,
                senderName: sender.username,
                recipientName: recipient.username,
            },
        });
    }
    async getMessagesBySenderId(senderId) {
        return this.prisma.message.findMany({
            where: {
                senderId: senderId,
            },
        });
    }
    async getMessagesByRecipientId(recipientId) {
        return this.prisma.message.findMany({
            where: {
                recipientId: recipientId,
            },
        });
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessageService);
//# sourceMappingURL=message.service.js.map