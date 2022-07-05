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
import db from '../utils/db';
import { NotFoundError } from '../utils/error';
import { Artist, Flatten, IntId, ValidateErrorJSON } from '../utils/types';

/**
 * Artist Insert Input
 */
interface ArtistInsertInput extends Flatten<Omit<Artist, 'ArtistId'>> {}

/**
 * Artist Update Input
 */
interface ArtistUpdateInput extends ArtistInsertInput {}

@Route('artists')
@Tags('Artist')
export class ArtistController extends Controller {
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
  public async getArtists(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<Artist[]> {
    return db('Artist').select().limit(limit).offset(offset).orderBy('Name');
  }
  /**
   * Get a single resource using the resource id.
   * @param ArtistId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{ArtistId}')
  public async getArtist(@Path() ArtistId: IntId): Promise<Artist> {
    const result = await db('Artist').first().where({ ArtistId });
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
  public async insertArtist(
    @Body() requestBody: ArtistInsertInput
  ): Promise<Artist> {
    const result = await db('Artist').insert(requestBody).returning('*');
    return result[0];
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param ArtistId resource id
   * @param requestBody Request Body
   */
  @Patch('{ArtistId}')
  public async updateArtist(
    @Path() ArtistId: IntId,
    @Body() requestBody: ArtistUpdateInput
  ): Promise<Artist> {
    const result = await db('Artist')
      .where({ ArtistId })
      .update(requestBody)
      .returning('*');

    return result[0];
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param ArtistId resource id
   */
  @Delete('{ArtistId}')
  public async deleteArtist(@Path() ArtistId: IntId): Promise<Artist> {
    const result = await db('Artist').where({ ArtistId }).del().returning('*');
    return result[0];
  }
}
