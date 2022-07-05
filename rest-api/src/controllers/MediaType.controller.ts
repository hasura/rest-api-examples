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
import { Flatten, IntId, MediaType, ValidateErrorJSON } from '../utils/types';

/**
 * MediaType Insert Input
 */
interface MediaTypeInsertInput
  extends Flatten<Omit<MediaType, 'MediaTypeId'>> {}

/**
 * MediaType Update Input
 */
interface MediaTypeUpdateInput
  extends Flatten<Partial<Omit<MediaType, 'MediaTypeId'>>> {}

@Route('mediaTypes')
@Tags('MediaType')
export class MediaTypeController extends Controller {
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
  public async getMediaTypes(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<MediaType[]> {
    return db('MediaType').select().limit(limit).offset(offset).orderBy('Name');
  }
  /**
   * Get a single resource using the resource id.
   * @param MediaTypeId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{MediaTypeId}')
  public async getMediaType(@Path() MediaTypeId: IntId): Promise<MediaType> {
    const result = await db('MediaType').first().where({ MediaTypeId });
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
  public async insertMediaType(
    @Body() requestBody: MediaTypeInsertInput
  ): Promise<MediaType> {
    const result = await db('MediaType').insert(requestBody).returning('*');
    return result[0];
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param MediaTypeId resource id
   * @param requestBody Request Body
   */
  @Patch('{MediaTypeId}')
  public async updateMediaType(
    @Path() MediaTypeId: IntId,
    @Body() requestBody: MediaTypeUpdateInput
  ): Promise<MediaType> {
    const result = await db('MediaType')
      .where({ MediaTypeId })
      .update(requestBody)
      .returning('*');

    return result[0];
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param MediaTypeId resource id
   */
  @Delete('{MediaTypeId}')
  public async deleteMediaType(@Path() MediaTypeId: IntId): Promise<MediaType> {
    const result = await db('MediaType')
      .where({ MediaTypeId })
      .del()
      .returning('*');
    return result[0];
  }
}
