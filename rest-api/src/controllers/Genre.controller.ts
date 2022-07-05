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
import { Flatten, Genre, IntId, ValidateErrorJSON } from '../utils/types';

/**
 * Genre Insert Input
 */
interface GenreInsertInput extends Flatten<Omit<Genre, 'GenreId'>> {}

/**
 * Genre Update Input
 */
interface GenreUpdateInput extends Flatten<Partial<Omit<Genre, 'GenreId'>>> {}

@Route('genres')
@Tags('Genre')
export class GenreController extends Controller {
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
  public async getGenres(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<Genre[]> {
    return db('Genre').select().limit(limit).offset(offset).orderBy('Name');
  }
  /**
   * Get a single resource using the resource id.
   * @param GenreId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{GenreId}')
  public async getGenre(@Path() GenreId: IntId): Promise<Genre> {
    const result = await db('Genre').first().where({ GenreId });
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
  public async insertGenre(
    @Body() requestBody: GenreInsertInput
  ): Promise<Genre> {
    const result = await db('Genre').insert(requestBody).returning('*');
    return result[0];
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param GenreId resource id
   * @param requestBody Request Body
   */
  @Patch('{GenreId}')
  public async updateGenre(
    @Path() GenreId: IntId,
    @Body() requestBody: GenreUpdateInput
  ): Promise<Genre> {
    const result = await db('Genre')
      .where({ GenreId })
      .update(requestBody)
      .returning('*');

    return result[0];
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param GenreId resource id
   */
  @Delete('{GenreId}')
  public async deleteGenre(@Path() GenreId: IntId): Promise<Genre> {
    const result = await db('Genre').where({ GenreId }).del().returning('*');
    return result[0];
  }
}
