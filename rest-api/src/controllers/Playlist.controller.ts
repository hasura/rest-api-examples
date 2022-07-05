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
  Playlist,
  PlaylistTrack,
  Track,
  ValidateErrorJSON,
} from '../utils/types';

interface PlaylistResourceAlbum extends Album {
  Artist: Artist;
}

interface PlaylistResourceTrack extends Track {
  Album?: PlaylistResourceAlbum;
  MediaType: MediaType;
  Genre?: Genre;
}

interface PlaylistResourcePlaylistTrack extends PlaylistTrack {
  Track: PlaylistResourceTrack;
}

interface PlaylistResource extends Playlist {
  PlaylistTracks: PlaylistResourcePlaylistTrack[];
}

/**
 * Playlist Track Insert Input
 */
interface PlaylistTrackInsertInput
  extends Flatten<Omit<PlaylistTrack, 'PlaylistId'>> {}
/**
 * Playlist Insert Input
 */
interface PlaylistInsertInput extends Flatten<Omit<Playlist, 'PlaylistId'>> {
  PlaylistTracks: PlaylistTrackInsertInput[];
}

/**
 * Playlist Update Input
 */
interface PlaylistUpdateInput
  extends Flatten<Partial<Omit<Playlist, 'PlaylistId'>>> {}

@Route('playlists')
@Tags('Playlist')
export class PlaylistController extends Controller {
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
  public async getPlaylists(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<PlaylistResource[]> {
    return db('Playlist')
      .select(
        '*',
        db
          .select(arrAggregate('PlaylistTrackAggregate'))
          .from(
            db('PlaylistTrack')
              .select(
                '*',
                db
                  .select(objAggregate('TrackAggregate'))
                  .from(
                    db('Track')
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
                                      .whereRaw(
                                        `"ArtistId" = "Album"."ArtistId"`
                                      )
                                      .as('ArtistAggregate')
                                  )
                                  .as('Artist')
                              )
                              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
                              .as('AlbumAggregate')
                          )
                          .as('Album')
                      )
                      .whereRaw('"TrackId" = "PlaylistTrack"."TrackId"')
                      .as('TrackAggregate')
                  )
                  .as('Track')
              )
              .whereRaw(`"PlaylistId" = "Playlist"."PlaylistId"`)
              .as('PlaylistTrackAggregate')
          )
          .as('PlaylistTracks')
      )
      .limit(limit)
      .offset(offset)
      .orderBy('Name');
  }
  /**
   * Get a single resource using the resource id.
   * @param PlaylistId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{PlaylistId}')
  public async getPlaylist(
    @Path() PlaylistId: IntId
  ): Promise<PlaylistResource> {
    const result = await db('Playlist')
      .first(
        '*',
        db
          .select(arrAggregate('PlaylistTrackAggregate'))
          .from(
            db('PlaylistTrack')
              .select(
                '*',
                db
                  .select(objAggregate('TrackAggregate'))
                  .from(
                    db('Track')
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
                                      .whereRaw(
                                        `"ArtistId" = "Album"."ArtistId"`
                                      )
                                      .as('ArtistAggregate')
                                  )
                                  .as('Artist')
                              )
                              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
                              .as('AlbumAggregate')
                          )
                          .as('Album')
                      )
                      .whereRaw('"TrackId" = "PlaylistTrack"."TrackId"')
                      .as('TrackAggregate')
                  )
                  .as('Track')
              )
              .whereRaw(`"PlaylistId" = "Playlist"."PlaylistId"`)
              .as('PlaylistTrackAggregate')
          )
          .as('PlaylistTracks')
      )
      .where({ PlaylistId });
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
  public async insertPlaylist(
    @Body() requestBody: PlaylistInsertInput
  ): Promise<PlaylistResource> {
    const { PlaylistTracks: tracks, ...playlistInput } = requestBody;

    const [playlist] = await db
      .with('playlist', db('Playlist').insert(playlistInput, '*'))
      .with(
        'insert_input',
        ['TrackId'],
        db.raw(
          `VALUES ${tracks.map(() => '(?)').join(', ')}`,
          tracks.map(({ TrackId }) => TrackId)
        )
      )
      .with(
        'playlist_tracks',
        db
          .from(db.raw(`"PlaylistTrack" ("PlaylistId", "TrackId")`))
          .insert(
            db
              .select(['PlaylistId', db.raw(`"TrackId"::INT`)])
              .from('playlist')
              .join('insert_input', db.raw('true'))
          )
          .returning('*')
      )

      .from('playlist')
      .select(
        db.raw(`"playlist".*`),
        '*',
        db
          .select(arrAggregate('PlaylistTrackAggregate'))
          .from(
            db()
              .from('playlist_tracks')
              .select(
                '*',
                db
                  .select(objAggregate('TrackAggregate'))
                  .from(
                    db('Track')
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
                                      .whereRaw(
                                        `"ArtistId" = "Album"."ArtistId"`
                                      )
                                      .as('ArtistAggregate')
                                  )
                                  .as('Artist')
                              )
                              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
                              .as('AlbumAggregate')
                          )
                          .as('Album')
                      )
                      .whereRaw('"TrackId" = "playlist_tracks"."TrackId"')
                      .as('TrackAggregate')
                  )
                  .as('Track')
              )
              .as('PlaylistTrackAggregate')
          )
          .as('PlaylistTracks')
      );
    return playlist;
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param PlaylistId resource id
   * @param requestBody Request Body
   */
  @Patch('{PlaylistId}')
  public async updatePlaylist(
    @Path() PlaylistId: IntId,
    @Body() requestBody: PlaylistUpdateInput
  ): Promise<PlaylistResource> {
    const [playlist] = await db
      .with(
        'playlist',
        db('Playlist').where({ PlaylistId }).update(requestBody, '*')
      )
      .select(
        'playlist.*',
        db
          .select(arrAggregate('PlaylistTrackAggregate'))
          .from(
            db('PlaylistTrack')
              .select(
                '*',
                db
                  .select(objAggregate('TrackAggregate'))
                  .from(
                    db('Track')
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
                                      .whereRaw(
                                        `"ArtistId" = "Album"."ArtistId"`
                                      )
                                      .as('ArtistAggregate')
                                  )
                                  .as('Artist')
                              )
                              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
                              .as('AlbumAggregate')
                          )
                          .as('Album')
                      )
                      .whereRaw('"TrackId" = "PlaylistTrack"."TrackId"')
                      .as('TrackAggregate')
                  )
                  .as('Track')
              )
              .whereRaw(`"PlaylistId" = "playlist"."PlaylistId"`)
              .as('PlaylistTrackAggregate')
          )
          .as('PlaylistTracks')
      )
      .from('playlist');

    return playlist;
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param PlaylistId resource id
   */
  @Delete('{PlaylistId}')
  public async deletePlaylist(
    @Path() PlaylistId: IntId
  ): Promise<PlaylistResource> {
    const [playlist] = await db
      .with('playlist', db('Playlist').where({ PlaylistId }).delete('*'))
      .select(
        'playlist.*',
        db
          .select(arrAggregate('PlaylistTrackAggregate'))
          .from(
            db('PlaylistTrack')
              .select(
                '*',
                db
                  .select(objAggregate('TrackAggregate'))
                  .from(
                    db('Track')
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
                                      .whereRaw(
                                        `"ArtistId" = "Album"."ArtistId"`
                                      )
                                      .as('ArtistAggregate')
                                  )
                                  .as('Artist')
                              )
                              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
                              .as('AlbumAggregate')
                          )
                          .as('Album')
                      )
                      .whereRaw('"TrackId" = "PlaylistTrack"."TrackId"')
                      .as('TrackAggregate')
                  )
                  .as('Track')
              )
              .whereRaw(`"PlaylistId" = "playlist"."PlaylistId"`)
              .as('PlaylistTrackAggregate')
          )
          .as('PlaylistTracks')
      )
      .from('playlist');

    return playlist;
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param PlaylistId resource id
   * @param requestBody Request Body
   */
  @Post('{PlaylistId}/Track')
  public async insertPlaylistTrack(
    @Path() PlaylistId: IntId,
    @Body() requestBody: PlaylistTrackInsertInput
  ): Promise<PlaylistResource> {
    const [playlist] = await db
      .with(
        'playlist',
        db('PlaylistTrack').insert({ ...requestBody, PlaylistId }, '*')
      )
      .select(
        '*',
        db
          .select(arrAggregate('PlaylistTrackAggregate'))
          .from(
            db('PlaylistTrack')
              .select(
                '*',
                db
                  .select(objAggregate('TrackAggregate'))
                  .from(
                    db('Track')
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
                                      .whereRaw(
                                        `"ArtistId" = "Album"."ArtistId"`
                                      )
                                      .as('ArtistAggregate')
                                  )
                                  .as('Artist')
                              )
                              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
                              .as('AlbumAggregate')
                          )
                          .as('Album')
                      )
                      .whereRaw('"TrackId" = "PlaylistTrack"."TrackId"')
                      .as('TrackAggregate')
                  )
                  .as('Track')
              )
              .whereRaw(`"PlaylistId" = "Playlist"."PlaylistId"`)
              .as('PlaylistTrackAggregate')
          )
          .as('PlaylistTracks')
      )
      .from('Playlist')
      .where({ PlaylistId });

    return playlist;
  }
  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param PlaylistId resource id
   * @param requestBody Request Body
   */
  @Delete('{PlaylistId}/Track/{TrackId}')
  public async deletePlaylistTrack(
    @Path() PlaylistId: IntId,
    @Path() TrackId: IntId
  ): Promise<PlaylistResource> {
    const [playlist] = await db
      .with(
        'playlist',
        db('PlaylistTrack').delete('*').where({ PlaylistId, TrackId })
      )
      .select(
        '*',
        db
          .select(arrAggregate('PlaylistTrackAggregate'))
          .from(
            db('PlaylistTrack')
              .select(
                '*',
                db
                  .select(objAggregate('TrackAggregate'))
                  .from(
                    db('Track')
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
                                      .whereRaw(
                                        `"ArtistId" = "Album"."ArtistId"`
                                      )
                                      .as('ArtistAggregate')
                                  )
                                  .as('Artist')
                              )
                              .whereRaw(`"AlbumId" = "Track"."AlbumId"`)
                              .as('AlbumAggregate')
                          )
                          .as('Album')
                      )
                      .whereRaw('"TrackId" = "PlaylistTrack"."TrackId"')
                      .as('TrackAggregate')
                  )
                  .as('Track')
              )
              .whereRaw(`"PlaylistId" = "Playlist"."PlaylistId"`)
              .as('PlaylistTrackAggregate')
          )
          .as('PlaylistTracks')
      )
      .from('Playlist')
      .where({ PlaylistId });

    return playlist;
  }
}
