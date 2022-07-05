/**
 * Functionally the same as build-in Omit, but uses no inner types.
 * This generates clean types for tsoa documentation purposes
 */
type Exclude<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
/**
 * Utility type for TSOA type generation purposes.
 * Flattens the generated types for a cleaner OpenAPI spec
 */
type Flatten<T> = {
  [K in keyof T]: T[K];
};

/**
 * An integer that serves as a record id. Used for primary keys and foreign keys.
 * @isInt IntId must be an integer
 * @minimum 1 IntId must be a positive integer with a value of at least 1
 */
export type IntId = number;
/**
 * A price value. Has a precision of 2 significant digits after the decimal point.
 * @isFloat Price is a Numeric type
 */
export type Price = number;

/**
 * A validation error
 */
export interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}

/**
 * Album
 */
export interface Album {
  AlbumId: IntId;
  Title: string;
  ArtistId: IntId;
}

/**
 * Artist
 */
export interface Artist {
  ArtistId: IntId;
  Name?: string;
}

/**
 * Customer
 */
export interface Customer {
  CustomerId: IntId;
  FirstName: string;
  LastName: string;
  Company?: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  Phone?: string;
  Fax?: string;
  Email?: string;
  SupportRepId?: IntId;
}

/**
 * Employee
 */
export interface Employee {
  EmployeeId: IntId;
  LastName: string;
  FirstName: string;
  Title?: string;
  ReportsTo?: IntId;
  BirthDate?: Date;
  HireDate?: Date;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  Phone?: string;
  Fax?: string;
  Email?: string;
}

/**
 * Genre
 */
export interface Genre {
  GenreId: IntId;
  Name?: string;
}

/**
 * Invoice
 */
export interface Invoice {
  InvoiceId: IntId;
  CustomerId: IntId;
  InvoiceDate: Date;
  BillingAddress?: string;
  BillingCity?: string;
  BillingState?: string;
  BillingCountry?: string;
  BillingPostalCode?: string;
  Total: Price;
}

/**
 * Invoice Line
 */
export interface InvoiceLine {
  InvoiceLineId: IntId;
  InvoiceId: IntId;
  TrackId: IntId;
  UnitPrice: Price;
  Quantity: IntId;
}

/**
 * Media Type
 */
export interface MediaType {
  MediaTypeId: IntId;
  Name?: string;
}

/**
 * Playlist
 */
export interface Playlist {
  PlaylistId: IntId;
  Name?: string;
}

/**
 * Playlist Track
 */
export interface PlaylistTrack {
  PlaylistId: IntId;
  TrackId: IntId;
}

/**
 * Track
 */
export interface Track {
  TrackId: IntId;
  Name: string;
  AlbumId?: IntId;
  MediaTypeId: IntId;
  GenreId?: IntId;
  Composer?: string;
  Milliseconds: number;
  Bytes?: number;
  UnitPrice: Price;
}
