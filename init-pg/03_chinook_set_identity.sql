\c postgres

/*******************************************************************************
   Set Primary Key Columns as Generated Always as Identity
   Using psql variable substitution to dynamically set start with values
********************************************************************************/

SELECT MAX("AlbumId") + 1 AS "AlbumIdMax" FROM "Album" \gset
ALTER TABLE "Album" ALTER "AlbumId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :AlbumIdMax);

SELECT MAX("ArtistId") + 1 AS "ArtistIdMax" FROM "Artist" \gset
ALTER TABLE "Artist" ALTER "ArtistId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :ArtistIdMax);

SELECT MAX("CustomerId") + 1 AS "CustomerIdMax" FROM "Customer" \gset
ALTER TABLE "Customer" ALTER "CustomerId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :CustomerIdMax);

SELECT MAX("EmployeeId") + 1 AS "EmployeeIdMax" FROM "Employee" \gset
ALTER TABLE "Employee" ALTER "EmployeeId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :EmployeeIdMax);

SELECT MAX("GenreId") + 1 AS "GenreIdMax" FROM "Genre" \gset
ALTER TABLE "Genre" ALTER "GenreId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :GenreIdMax);

SELECT MAX("InvoiceId") + 1 AS "InvoiceIdMax" FROM "Invoice" \gset
ALTER TABLE "Invoice" ALTER "InvoiceId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :InvoiceIdMax);

SELECT MAX("InvoiceLineId") + 1 AS "InvoiceLineIdMax" FROM "InvoiceLine" \gset
ALTER TABLE "InvoiceLine" ALTER "InvoiceLineId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :InvoiceLineIdMax);

SELECT MAX("MediaTypeId") + 1 AS "MediaTypeIdMax" FROM "MediaType" \gset
ALTER TABLE "MediaType" ALTER "MediaTypeId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :MediaTypeIdMax);

SELECT MAX("PlaylistId") + 1 AS "PlaylistIdMax" FROM "Playlist" \gset
ALTER TABLE "Playlist" ALTER "PlaylistId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :PlaylistIdMax);

SELECT MAX("TrackId") + 1 AS "TrackIdMax" FROM "Track" \gset
ALTER TABLE "Track" ALTER "TrackId" ADD GENERATED ALWAYS AS IDENTITY (START WITH :TrackIdMax);


