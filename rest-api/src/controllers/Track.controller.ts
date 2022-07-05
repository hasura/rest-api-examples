import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Response,
  Route,
  Tags,
} from 'tsoa';
import db, { objAggregate } from '../utils/db';
import { NotFoundError } from '../utils/error';
import {
  Album,
  Artist,
  Flatten,
  IntId,
  Track,
  MediaType,
  ValidateErrorJSON,
  Genre,
} from '../utils/types';

interface TrackResourceAlbum extends Album {
  Artist: Artist;
}

interface TrackResource extends Track {
  Album?: TrackResourceAlbum;
  MediaType: MediaType;
  Genre?: Genre;
}

/**
 * Track Insert Input
 */
interface TrackInsertInput extends Flatten<Omit<Track, 'TrackId'>> {}

/**
 * Track Update Input
 */
interface TrackUpdateInput extends Flatten<Partial<Omit<Track, 'TrackId'>>> {}

@Route('tracks')
@Tags('Track')
export class TrackController extends Controller {
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
  @Get()
  public async getTracks(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<TrackResource[]> {
    return db('Track')
      .select(
        '*',
        db
          .select(objAggregate('GenreAggregate'))
          .from(
            db('Genre')
              .first()
              .whereRaw(`"GenreId" = "Track"."GenreId"`)
              .as('GenreAggregate')
          )
          .as('Genre'),
        db
          .select(objAggregate('MediaTypeAggregate'))
          .from(
            db('MediaType')
              .first()
              .whereRaw(`"MediaTypeId" = "Track"."MediaTypeId"`)
              .as('MediaTypeAggregate')
          )
          .as('MediaType'),
        db
          .select(objAggregate('AlbumAggregate'))
          .from(
            db('Album')
              .first(
                '*',
                db
                  .select(objAggregate('ArtistAggregate'))
                  .from(
                    db('Artist')
                      .first()
                      .whereRaw(`"ArtistId" = "Album"."ArtistId"`)
                      .as('ArtistAggregate')
                  )
                  .as('Artist')
              )
              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
              .as('AlbumAggregate')
          )
          .as('Album')
      )
      .orderBy('TrackId')
      .limit(limit)
      .offset(offset);
  }
  /**
   * Get a single resource using the resource id.
   * @param TrackId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{TrackId}')
  public async getTrack(@Path() TrackId: IntId): Promise<TrackResource> {
    const result = db('Track')
      .first(
        '*',
        db
          .select(objAggregate('GenreAggregate'))
          .from(
            db('Genre')
              .first()
              .whereRaw(`"GenreId" = "Track"."GenreId"`)
              .as('GenreAggregate')
          )
          .as('Genre'),
        db
          .select(objAggregate('MediaTypeAggregate'))
          .from(
            db('MediaType')
              .first()
              .whereRaw(`"MediaTypeId" = "Track"."MediaTypeId"`)
              .as('MediaTypeAggregate')
          )
          .as('MediaType'),
        db
          .select(objAggregate('AlbumAggregate'))
          .from(
            db('Album')
              .first(
                '*',
                db
                  .select(objAggregate('ArtistAggregate'))
                  .from(
                    db('Artist')
                      .first()
                      .whereRaw(`"ArtistId" = "Album"."ArtistId"`)
                      .as('ArtistAggregate')
                  )
                  .as('Artist')
              )
              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
              .as('AlbumAggregate')
          )
          .as('Album')
      )
      .where({ TrackId });
    if (!result) {
      throw new NotFoundError('Not Found');
    }
    return result;
  }

  /**
   * Create a new instance of the resource. Returns the created resource.
   * @param requestBody Request Body
   */
  @Post()
  public async insertTrack(
    @Body()
    requestBody: TrackInsertInput
  ): Promise<Track> {
    const [result] = await db('Track').insert(requestBody).returning('*');
    return result;
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param TrackId resource id
   * @param requestBody Request Body
   */
  @Patch('{TrackId}')
  public async updateTrack(
    @Path() TrackId: IntId,
    @Body()
    requestBody: TrackUpdateInput
  ): Promise<Track> {
    const [result] = await db('Track')
      .where({ TrackId })
      .update(requestBody)
      .returning('*');

    return result;
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param TrackId resource id
   */
  @Delete('{TrackId}')
  public async deleteTrack(@Path() TrackId: IntId): Promise<Track> {
    const [result] = await db('Track').where({ TrackId }).del().returning('*');
    return result;
  }
}
