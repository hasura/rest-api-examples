"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaTypeController = void 0;
const tsoa_1 = require("tsoa");
const db_1 = __importDefault(require("../utils/db"));
const error_1 = require("../utils/error");
let MediaTypeController = class MediaTypeController extends tsoa_1.Controller {
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
    getMediaTypes(limit = 20, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_1.default)('MediaType').select().limit(limit).offset(offset).orderBy('Name');
        });
    }
    /**
     * Get a single resource using the resource id.
     * @param MediaTypeId resource id
     */
    getMediaType(MediaTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('MediaType').first().where({ MediaTypeId });
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
    insertMediaType(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('MediaType').insert(requestBody).returning('*');
            return result[0];
        });
    }
    /**
     * Update the resource using the resource id. Returns the updated resource.
     * @param MediaTypeId resource id
     * @param requestBody Request Body
     */
    updateMediaType(MediaTypeId, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('MediaType')
                .where({ MediaTypeId })
                .update(requestBody)
                .returning('*');
            return result[0];
        });
    }
    /**
     * Delete the resource using the resource id. Returns the deleted resource.
     * @param MediaTypeId resource id
     */
    deleteMediaType(MediaTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('MediaType')
                .where({ MediaTypeId })
                .del()
                .returning('*');
            return result[0];
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)())
], MediaTypeController.prototype, "getMediaTypes", null);
__decorate([
    (0, tsoa_1.Response)('422', 'Validation failed'),
    (0, tsoa_1.Response)('404', 'Not found'),
    (0, tsoa_1.Get)('{MediaTypeId}'),
    __param(0, (0, tsoa_1.Path)())
], MediaTypeController.prototype, "getMediaType", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], MediaTypeController.prototype, "insertMediaType", null);
__decorate([
    (0, tsoa_1.Patch)('{MediaTypeId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)())
], MediaTypeController.prototype, "updateMediaType", null);
__decorate([
    (0, tsoa_1.Delete)('{MediaTypeId}'),
    __param(0, (0, tsoa_1.Path)())
], MediaTypeController.prototype, "deleteMediaType", null);
MediaTypeController = __decorate([
    (0, tsoa_1.Route)('mediaTypes'),
    (0, tsoa_1.Tags)('MediaType')
], MediaTypeController);
exports.MediaTypeController = MediaTypeController;
