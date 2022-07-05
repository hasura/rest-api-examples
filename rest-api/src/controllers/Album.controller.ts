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
import db, { arrAggregate, objAggregate } from '../utils/db';
import { NotFoundError } from '../utils/error';
import {
  Album,
  Artist,
  Flatten,
  Genre,
  IntId,
  MediaType,
  Track,
  ValidateErrorJSON,
} from '../utils/types';

interface AlbumResourceTrack extends Track {
  MediaType: MediaType;
  Genre?: Genre;
}

interface AlbumResource extends Album {
  Artist: Artist;
  Tracks: AlbumResourceTrack[];
}

/**
 * Album Track Insert Input
 */
interface AlbumTrackInsertInput
  extends Flatten<Omit<Track, 'TrackId' | 'AlbumId'>> {}

/**
 * Album Insert Input
 */
interface AlbumInsertInput extends Flatten<Omit<Album, 'AlbumId'>> {
  Tracks?: AlbumTrackInsertInput[];
}

/**
 * Album Update Input
 */
interface AlbumUpdateInput
  extends Flatten<Omit<Album, 'AlbumId' | 'ArtistId'>> {}

@Route('albums')
@Tags('Album')
export class AlbumController extends Controller {
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
  public async getAlbums(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<AlbumResource[]> {
    return db('Album')
      .select(
        '*',
        db
          .select(objAggregate('ArtistAggregate'))
          .from(
            db('Artist')
              .first()
              .whereRaw(`"ArtistId" = "Album"."ArtistId"`)
              .as('ArtistAggregate')
          )
          .as('Artist'),
        db
          .select(arrAggregate('TracksAggregate'))
          .from(
            db('Track')
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
                  .as('MediaType')
              )
              .whereRaw('"AlbumId" = "Album"."AlbumId"')
              .as('TracksAggregate')
          )
          .as('Tracks')
      )
      .orderBy('Title')
      .limit(limit)
      .offset(offset);
  }
  /**
   * Get a single resource using the resource id.
   * @param AlbumId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{AlbumId}')
  public async getAlbum(@Path() AlbumId: IntId): Promise<AlbumResource> {
    const result = await db('Album')
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
          .as('Artist'),
        db
          .select(arrAggregate('TracksAggregate'))
          .from(
            db('Track')
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
                  .as('MediaType')
              )
              .whereRaw('"AlbumId" = "Album"."AlbumId"')
              .as('TracksAggregate')
          )
          .as('Tracks')
      )
      .where({ AlbumId })
      .orderBy('Title');

    if (!result) {
      throw new NotFoundError('Not Found');
    }
    // return { ...result, Artist: { ArtistId: 1, Name: 'test' }, Tracks: [] };
    return result;
  }

  /**
   * Create a new instance of the resource. Returns the created resource.
   * @param requestBody Request Body
   */
  @Post()
  public async insertAlbum(
    @Body() requestBody: AlbumInsertInput
  ): Promise<Album> {
    const result = await db('Album').insert(requestBody).returning('*');
    return result[0];
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param AlbumId resource id
   * @param requestBody Request Body
   */
  @Patch('{AlbumId}')
  public async updateAlbum(
    @Path() AlbumId: IntId,
    @Body()
    requestBody: AlbumUpdateInput
  ): Promise<Album> {
    const result = await db('Album')
      .where({ AlbumId })
      .update(requestBody)
      .returning('*');

    return result[0];
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param AlbumId resource id
   */
  @Delete('{AlbumId}')
  public async deleteAlbum(@Path() AlbumId: IntId): Promise<Album> {
    const result = await db('Album').where({ AlbumId }).del().returning('*');
    return result[0];
  }
}
