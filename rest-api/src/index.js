"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("./utils/routes");
const error_1 = require("./utils/error");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
// Use body parser to read sent json payloads
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => res.redirect('/docs'));
app.use(express_1.default.static('public'));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: '/OpenAPISpec.json',
    },
}));
(0, routes_1.RegisterRoutes)(app);
(0, error_1.HandleErrors)(app);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
