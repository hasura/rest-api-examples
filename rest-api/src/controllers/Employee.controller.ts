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
import { Employee, Flatten, IntId, ValidateErrorJSON } from '../utils/types';

/**
 * Employee Insert Input
 */
interface EmployeeInsertInput extends Flatten<Omit<Employee, 'EmployeeId'>> {}

/**
 * Employee Update Input
 */
interface EmployeeUpdateInput
  extends Flatten<Partial<Omit<Employee, 'EmployeeId'>>> {}

@Route('employees')
@Tags('Employee')
export class EmployeeController extends Controller {
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
  public async getEmployees(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<Employee[]> {
    return db('Employee')
      .select()
      .limit(limit)
      .offset(offset)
      .orderBy(['LastName', 'FirstName']);
  }
  /**
   * Get a single resource using the resource id.
   * @param EmployeeId resource id
   * @param requestBody Request Body
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{EmployeeId}')
  public async getEmployee(@Path() EmployeeId: IntId): Promise<Employee> {
    const result = await db('Employee').first().where({ EmployeeId });
    if (!result) {
      throw new NotFoundError('Not Found');
    }
    return result;
  }

  /**
   * Create a new instance of the resource. Returns the created resource.
   */
  @Post()
  public async insertEmployee(
    @Body()
    requestBody: EmployeeInsertInput
  ): Promise<Employee> {
    const result = await db('Employee').insert(requestBody).returning('*');
    return result[0];
  }

  /**
   * Update the resource using the resource id. Returns the updated resource.
   * @param EmployeeId resource id
   * @param requestBody Request Body
   */
  @Patch('{EmployeeId}')
  public async updateEmployee(
    @Path() EmployeeId: IntId,
    @Body()
    requestBody: EmployeeUpdateInput
  ): Promise<Employee> {
    const result = await db('Employee')
      .where({ EmployeeId })
      .update(requestBody)
      .returning('*');

    return result[0];
  }

  /**
   * Delete the resource using the resource id. Returns the deleted resource.
   * @param EmployeeId resource id
   */
  @Delete('{EmployeeId}')
  public async deleteEmployee(@Path() EmployeeId: IntId): Promise<Employee> {
    const result = await db('Employee')
      .where({ EmployeeId })
      .del()
      .returning('*');
    return result[0];
  }
}
