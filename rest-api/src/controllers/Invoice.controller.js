"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const tsoa_1 = require("tsoa");
const db_1 = __importStar(require("../utils/db"));
const error_1 = require("../utils/error");
let InvoiceController = class InvoiceController extends tsoa_1.Controller {
    /**
     * Get a set of resources. Can be paginated
     * @param limit how many records should be returned
     * @default limit 20 the default limit is 20
     * @minimum limit 0 limit has a minimum value of 0
     * @isInt limit limit must be an integer
     * @param offset how many records to offset by
     * @default offset 0 the default offset is 0
     * @minimum offset 0 limit has a minimum value of 0
     * @isInt offset offset must be an integer
     */
    getInvoices(limit = 20, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_1.default)('Invoice')
                .select('*', db_1.default
                .select((0, db_1.arrAggregate)('InvoiceLineAggregate'))
                .from((0, db_1.default)('InvoiceLine')
                .select()
                .whereRaw(`"InvoiceId" = "Invoice"."InvoiceId"`)
                .as('InvoiceLineAggregate'))
                .as('Lines'))
                .limit(limit)
                .offset(offset)
                .orderBy(['InvoiceDate', 'InvoiceId']);
        });
    }
    /**
     * Get a single resource using the resource id.
     * @param InvoiceId resource id
     */
    getInvoice(InvoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('Invoice')
                .first('*', db_1.default
                .select((0, db_1.arrAggregate)('InvoiceLineAggregate'))
                .from((0, db_1.default)('InvoiceLine')
                .select()
                .whereRaw(`"InvoiceId" = "Invoice"."InvoiceId"`)
                .as('InvoiceLineAggregate'))
                .as('Lines'))
                .where({ InvoiceId });
            if (!result) {
                throw new error_1.NotFoundError('Not Found');
            }
            return result;
        });
    }
    /**
     * Create a new instance of the resource. Returns the created resource.
     * @param requestBody Request Body
     */
    insertInvoice(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { Lines: partialInvoiceLineInput } = requestBody, invoiceInput = __rest(requestBody, ["Lines"]);
                const [invoice] = yield trx('Invoice').insert(invoiceInput, '*');
                const invoiceLineInput = partialInvoiceLineInput.map((line) => (Object.assign(Object.assign({}, line), { InvoiceId: invoice.InvoiceId })));
                const lines = yield trx('InvoiceLine').insert(invoiceLineInput, '*');
                return Object.assign(Object.assign({}, invoice), { Lines: lines });
            }));
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)())
], InvoiceController.prototype, "getInvoices", null);
__decorate([
    (0, tsoa_1.Response)('422', 'Validation failed'),
    (0, tsoa_1.Response)('404', 'Not found'),
    (0, tsoa_1.Get)('{InvoiceId}'),
    __param(0, (0, tsoa_1.Path)())
], InvoiceController.prototype, "getInvoice", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], InvoiceController.prototype, "insertInvoice", null);
InvoiceController = __decorate([
    (0, tsoa_1.Route)('invoices'),
    (0, tsoa_1.Tags)('Invoice')
], InvoiceController);
exports.InvoiceController = InvoiceController;
