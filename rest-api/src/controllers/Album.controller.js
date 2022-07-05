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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = void 0;
const tsoa_1 = require("tsoa");
const db_1 = __importStar(require("../utils/db"));
const error_1 = require("../utils/error");
let AlbumController = class AlbumController extends tsoa_1.Controller {
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
    getAlbums(limit = 20, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_1.default)('Album')
                .select('*', db_1.default
                .select((0, db_1.objAggregate)('ArtistAggregate'))
                .from((0, db_1.default)('Artist')
                .first()
                .whereRaw(`"ArtistId" = "Album"."ArtistId"`)
                .as('ArtistAggregate'))
                .as('Artist'), db_1.default
                .select((0, db_1.arrAggregate)('TracksAggregate'))
                .from((0, db_1.default)('Track')
                .select('*', db_1.default
                .select((0, db_1.objAggregate)('GenreAggregate'))
                .from((0, db_1.default)('Genre')
                .first()
                .whereRaw(`"GenreId" = "Track"."GenreId"`)
                .as('GenreAggregate'))
                .as('Genre'), db_1.default
                .select((0, db_1.objAggregate)('MediaTypeAggregate'))
                .from((0, db_1.default)('MediaType')
                .first()
                .whereRaw(`"MediaTypeId" = "Track"."MediaTypeId"`)
                .as('MediaTypeAggregate'))
                .as('MediaType'))
                .whereRaw('"AlbumId" = "Album"."AlbumId"')
                .as('TracksAggregate'))
                .as('Tracks'))
                .orderBy('Title')
                .limit(limit)
                .offset(offset);
        });
    }
    /**
     * Get a single resource using the resource id.
     * @param AlbumId resource id
     */
    getAlbum(AlbumId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('Album')
                .first('*', db_1.default
                .select((0, db_1.objAggregate)('ArtistAggregate'))
                .from((0, db_1.default)('Artist')
                .first()
                .whereRaw(`"ArtistId" = "Album"."ArtistId"`)
                .as('ArtistAggregate'))
                .as('Artist'), db_1.default
                .select((0, db_1.arrAggregate)('TracksAggregate'))
                .from((0, db_1.default)('Track')
                .select('*', db_1.default
                .select((0, db_1.objAggregate)('GenreAggregate'))
                .from((0, db_1.default)('Genre')
                .first()
                .whereRaw(`"GenreId" = "Track"."GenreId"`)
                .as('GenreAggregate'))
                .as('Genre'), db_1.default
                .select((0, db_1.objAggregate)('MediaTypeAggregate'))
                .from((0, db_1.default)('MediaType')
                .first()
                .whereRaw(`"MediaTypeId" = "Track"."MediaTypeId"`)
                .as('MediaTypeAggregate'))
                .as('MediaType'))
                .whereRaw('"AlbumId" = "Album"."AlbumId"')
                .as('TracksAggregate'))
                .as('Tracks'))
                .where({ AlbumId })
                .orderBy('Title');
            if (!result) {
                throw new error_1.NotFoundError('Not Found');
            }
            // return { ...result, Artist: { ArtistId: 1, Name: 'test' }, Tracks: [] };
            return result;
        });
    }
    /**
     * Create a new instance of the resource. Returns the created resource.
     * @param requestBody Request Body
     */
    insertAlbum(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('Album').insert(requestBody).returning('*');
            return result[0];
        });
    }
    /**
     * Update the resource using the resource id. Returns the updated resource.
     * @param AlbumId resource id
     * @param requestBody Request Body
     */
    updateAlbum(AlbumId, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('Album')
                .where({ AlbumId })
                .update(requestBody)
                .returning('*');
            return result[0];
        });
    }
    /**
     * Delete the resource using the resource id. Returns the deleted resource.
     * @param AlbumId resource id
     */
    deleteAlbum(AlbumId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, db_1.default)('Album').where({ AlbumId }).del().returning('*');
            return result[0];
        });
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)())
], AlbumController.prototype, "getAlbums", null);
__decorate([
    (0, tsoa_1.Response)('422', 'Validation failed'),
    (0, tsoa_1.Response)('404', 'Not found'),
    (0, tsoa_1.Get)('{AlbumId}'),
    __param(0, (0, tsoa_1.Path)())
], AlbumController.prototype, "getAlbum", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], AlbumController.prototype, "insertAlbum", null);
__decorate([
    (0, tsoa_1.Patch)('{AlbumId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)())
], AlbumController.prototype, "updateAlbum", null);
__decorate([
    (0, tsoa_1.Delete)('{AlbumId}'),
    __param(0, (0, tsoa_1.Path)())
], AlbumController.prototype, "deleteAlbum", null);
AlbumController = __decorate([
    (0, tsoa_1.Route)('albums'),
    (0, tsoa_1.Tags)('Album')
], AlbumController);
exports.AlbumController = AlbumController;
