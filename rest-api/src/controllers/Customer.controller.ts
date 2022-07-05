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
import { Customer, Flatten, IntId, ValidateErrorJSON } from '../utils/types';

/**
 * Customer Insert Input
 */
interface CustomerInsertInput extends Flatten<Omit<Customer, 'CustomerId'>> {}

/**
 * Customer Update Input
 */
interface CustomerUpdateInput
  extends Flatten<Partial<Omit<Customer, 'CustomerId'>>> {}

@Route('customers')
@Tags('Customer')
export class CustomerController extends Controller {
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
  public async getCustomers(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<Customer[]> {
    return db('Customer')
      .select()
      .limit(limit)
      .offset(offset)
      .orderBy(['LastName', 'FirstName']);
  }
  /**
   * Get a single resource using the resource id.
   * @param CustomerId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{CustomerId}')
  public async getCustomer(@Path() CustomerId: IntId): Promise<Customer> {
    const result = await db('Customer').first().where({ CustomerId });
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
  public async insertCustomer(
    @Body()
    requestBody: CustomerInsertInput
  ): Promise<Customer> {
    const result = await db('Customer').insert(requestBody).returning('*');
    return result[0];
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param CustomerId resource id
   * @param requestBody Request Body
   */
  @Patch('{CustomerId}')
  public async updateCustomer(
    @Path() CustomerId: IntId,
    @Body()
    requestBody: CustomerUpdateInput
  ): Promise<Customer> {
    const result = await db('Customer')
      .where({ CustomerId })
      .update(requestBody)
      .returning('*');

    return result[0];
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param CustomerId resource id
   */
  @Delete('{CustomerId}')
  public async deleteCustomer(@Path() CustomerId: IntId): Promise<Customer> {
    const result = await db('Customer')
      .where({ CustomerId })
      .del()
      .returning('*');
    return result[0];
  }
}
