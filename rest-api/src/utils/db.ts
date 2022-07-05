import { knex } from 'knex';
import {
  Album,
  Artist,
  Customer,
  Employee,
  Genre,
  Invoice,
  InvoiceLine,
  MediaType,
  Playlist,
  PlaylistTrack,
  Track,
} from './types';
declare module 'knex/types/tables' {
  interface Tables {
    Album: Album;
    Artist: Artist;
    Customer: Customer;
    Employee: Employee;
    Genre: Genre;
    Invoice: Invoice;
    InvoiceLine: InvoiceLine;
    MediaType: MediaType;
    Playlist: Playlist;
    PlaylistTrack: PlaylistTrack;
    Track: Track;
  }
}

const db = knex({
  client: 'pg',
  connection: process.env.MAIN_DATABASE_URL,
});

export default db;

export const arrAggregate = (table: string) =>
  db.raw(`coalesce(array_to_json(array_agg(row_to_json("${table}"))),'[]')`);

export const objAggregate = (table: string) =>
  db.raw(db.raw(`row_to_json("${table}")`));
