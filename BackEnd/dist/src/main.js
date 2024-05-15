"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logging_middleware_1 = require("./middleware/logging.middleware");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors());
    app.use(new logging_middleware_1.LoggingMiddleware().use);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map