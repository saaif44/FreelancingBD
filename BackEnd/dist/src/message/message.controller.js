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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const message_service_1 = require("./message.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const app_gateway_1 = require("../app.gateway");
let MessageController = class MessageController {
    constructor(messageService, appGateway) {
        this.messageService = messageService;
        this.appGateway = appGateway;
    }
    async createMessage(createMessageDto, request) {
        const decodedToken = request.user;
        const senderId = decodedToken.userId;
        const message = await this.messageService.createMessage(senderId, createMessageDto);
        this.appGateway.sendMessage(message);
        return message;
    }
    async getSentMessages(request) {
        const decodedToken = request.user;
        const senderId = decodedToken.userId;
        return this.messageService.getMessagesBySenderId(senderId);
    }
    async getReceivedMessages(id) {
        const recipientId = parseInt(id, 10);
        return this.messageService.getMessagesByRecipientId(recipientId);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)('sent'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getSentMessages", null);
__decorate([
    (0, common_1.Get)(':id/received'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getReceivedMessages", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        app_gateway_1.AppGateway])
], MessageController);
//# sourceMappingURL=message.controller.js.map