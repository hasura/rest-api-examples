import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Response,
  Route,
  Tags,
} from 'tsoa';
import db, { arrAggregate } from '../utils/db';
import { NotFoundError } from '../utils/error';
import {
  Flatten,
  IntId,
  Invoice,
  InvoiceLine,
  ValidateErrorJSON,
} from '../utils/types';

interface InvoiceLineResource extends InvoiceLine {}
interface InvoiceResource extends Invoice {
  Lines: InvoiceLineResource[];
}

/**
 * Invoice Line Insert Input
 */
interface InvoiceLineInsertInput
  extends Flatten<Omit<InvoiceLine, 'InvoiceId' | 'InvoiceLineId'>> {}
/**
 * Invoice Insert Input
 * @minItems Lines 1 Invoice must have at least one Line
 */
interface InvoiceInsertInput extends Flatten<Omit<Invoice, 'InvoiceId'>> {
  Lines: InvoiceLineInsertInput[];
}

@Route('invoices')
@Tags('Invoice')
export class InvoiceController extends Controller {
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
  public async getInvoices(
    @Query() limit = 20,
    @Query() offset = 0
  ): Promise<InvoiceResource[]> {
    return db('Invoice')
      .select(
        '*',
        db
          .select(arrAggregate('InvoiceLineAggregate'))
          .from(
            db('InvoiceLine')
              .select()
              .whereRaw(`"InvoiceId" = "Invoice"."InvoiceId"`)
              .as('InvoiceLineAggregate')
          )
          .as('Lines')
      )
      .limit(limit)
      .offset(offset)
      .orderBy(['InvoiceDate', 'InvoiceId']);
  }
  /**
   * Get a single resource using the resource id.
   * @param InvoiceId resource id
   */
  @Response<ValidateErrorJSON>('422', 'Validation failed')
  @Response<NotFoundError>('404', 'Not found')
  @Get('{InvoiceId}')
  public async getInvoice(@Path() InvoiceId: IntId): Promise<InvoiceResource> {
    const result = await db('Invoice')
      .first(
        '*',
        db
          .select(arrAggregate('InvoiceLineAggregate'))
          .from(
            db('InvoiceLine')
              .select()
              .whereRaw(`"InvoiceId" = "Invoice"."InvoiceId"`)
              .as('InvoiceLineAggregate')
          )
          .as('Lines')
      )
      .where({ InvoiceId });
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
  public async insertInvoice(
    @Body()
    requestBody: InvoiceInsertInput
  ): Promise<InvoiceResource> {
    return db.transaction(async (trx) => {
      const { Lines: partialInvoiceLineInput, ...invoiceInput } = requestBody;

      const [invoice] = await trx('Invoice').insert(invoiceInput, '*');

      const invoiceLineInput = partialInvoiceLineInput.map((line) => ({
        ...line,
        InvoiceId: invoice.InvoiceId,
      }));

      const lines = await trx('InvoiceLine').insert(invoiceLineInput, '*');

      return {
        ...invoice,
        Lines: lines,
      };
    });
  }
}
