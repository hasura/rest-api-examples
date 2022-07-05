"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Album_controller_1 = require("./../controllers/Album.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Artist_controller_1 = require("./../controllers/Artist.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Customer_controller_1 = require("./../controllers/Customer.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Employee_controller_1 = require("./../controllers/Employee.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Genre_controller_1 = require("./../controllers/Genre.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Invoice_controller_1 = require("./../controllers/Invoice.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const MediaType_controller_1 = require("./../controllers/MediaType.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Playlist_controller_1 = require("./../controllers/Playlist.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const Track_controller_1 = require("./../controllers/Track.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "IntId": {
        "dataType": "refAlias",
        "type": { "dataType": "integer", "validators": { "isInt": { "errorMsg": "IntId must be an integer" }, "minimum": { "errorMsg": "IntId must be a positive integer with a value of at least 1", "value": 1 } } },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Artist": {
        "dataType": "refObject",
        "properties": {
            "ArtistId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MediaType": {
        "dataType": "refObject",
        "properties": {
            "MediaTypeId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Genre": {
        "dataType": "refObject",
        "properties": {
            "GenreId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Price": {
        "dataType": "refAlias",
        "type": { "dataType": "float", "validators": { "isFloat": { "errorMsg": "Price is a Numeric type" } } },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlbumResourceTrack": {
        "dataType": "refObject",
        "properties": {
            "TrackId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string", "required": true },
            "AlbumId": { "ref": "IntId" },
            "MediaTypeId": { "ref": "IntId", "required": true },
            "GenreId": { "ref": "IntId" },
            "Composer": { "dataType": "string" },
            "Milliseconds": { "dataType": "double", "required": true },
            "Bytes": { "dataType": "double" },
            "UnitPrice": { "ref": "Price", "required": true },
            "MediaType": { "ref": "MediaType", "required": true },
            "Genre": { "ref": "Genre" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlbumResource": {
        "dataType": "refObject",
        "properties": {
            "AlbumId": { "ref": "IntId", "required": true },
            "Title": { "dataType": "string", "required": true },
            "ArtistId": { "ref": "IntId", "required": true },
            "Artist": { "ref": "Artist", "required": true },
            "Tracks": { "dataType": "array", "array": { "dataType": "refObject", "ref": "AlbumResourceTrack" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "enum", "enums": ["Validation failed"], "required": true },
            "details": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NotFoundError": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "message": { "dataType": "string", "required": true },
            "stack": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Album": {
        "dataType": "refObject",
        "properties": {
            "AlbumId": { "ref": "IntId", "required": true },
            "Title": { "dataType": "string", "required": true },
            "ArtistId": { "ref": "IntId", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlbumTrackInsertInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string", "required": true },
            "MediaTypeId": { "ref": "IntId", "required": true },
            "GenreId": { "ref": "IntId" },
            "Composer": { "dataType": "string" },
            "Milliseconds": { "dataType": "double", "required": true },
            "Bytes": { "dataType": "double" },
            "UnitPrice": { "ref": "Price", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlbumInsertInput": {
        "dataType": "refObject",
        "properties": {
            "Title": { "dataType": "string", "required": true },
            "ArtistId": { "ref": "IntId", "required": true },
            "Tracks": { "dataType": "array", "array": { "dataType": "refObject", "ref": "AlbumTrackInsertInput" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlbumUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "Title": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ArtistInsertInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ArtistUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Customer": {
        "dataType": "refObject",
        "properties": {
            "CustomerId": { "ref": "IntId", "required": true },
            "FirstName": { "dataType": "string", "required": true },
            "LastName": { "dataType": "string", "required": true },
            "Company": { "dataType": "string" },
            "Address": { "dataType": "string" },
            "City": { "dataType": "string" },
            "State": { "dataType": "string" },
            "Country": { "dataType": "string" },
            "PostalCode": { "dataType": "string" },
            "Phone": { "dataType": "string" },
            "Fax": { "dataType": "string" },
            "Email": { "dataType": "string" },
            "SupportRepId": { "ref": "IntId" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomerInsertInput": {
        "dataType": "refObject",
        "properties": {
            "FirstName": { "dataType": "string", "required": true },
            "LastName": { "dataType": "string", "required": true },
            "Company": { "dataType": "string" },
            "Address": { "dataType": "string" },
            "City": { "dataType": "string" },
            "State": { "dataType": "string" },
            "Country": { "dataType": "string" },
            "PostalCode": { "dataType": "string" },
            "Phone": { "dataType": "string" },
            "Fax": { "dataType": "string" },
            "Email": { "dataType": "string" },
            "SupportRepId": { "ref": "IntId" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomerUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "FirstName": { "dataType": "string", "required": true },
            "LastName": { "dataType": "string", "required": true },
            "Company": { "dataType": "string" },
            "Address": { "dataType": "string" },
            "City": { "dataType": "string" },
            "State": { "dataType": "string" },
            "Country": { "dataType": "string" },
            "PostalCode": { "dataType": "string" },
            "Phone": { "dataType": "string" },
            "Fax": { "dataType": "string" },
            "Email": { "dataType": "string" },
            "SupportRepId": { "ref": "IntId" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Employee": {
        "dataType": "refObject",
        "properties": {
            "EmployeeId": { "ref": "IntId", "required": true },
            "LastName": { "dataType": "string", "required": true },
            "FirstName": { "dataType": "string", "required": true },
            "Title": { "dataType": "string" },
            "ReportsTo": { "ref": "IntId" },
            "BirthDate": { "dataType": "datetime" },
            "HireDate": { "dataType": "datetime" },
            "Address": { "dataType": "string" },
            "City": { "dataType": "string" },
            "State": { "dataType": "string" },
            "Country": { "dataType": "string" },
            "PostalCode": { "dataType": "string" },
            "Phone": { "dataType": "string" },
            "Fax": { "dataType": "string" },
            "Email": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployeeInsertInput": {
        "dataType": "refObject",
        "properties": {
            "Title": { "dataType": "string" },
            "FirstName": { "dataType": "string", "required": true },
            "LastName": { "dataType": "string", "required": true },
            "Address": { "dataType": "string" },
            "City": { "dataType": "string" },
            "State": { "dataType": "string" },
            "Country": { "dataType": "string" },
            "PostalCode": { "dataType": "string" },
            "Phone": { "dataType": "string" },
            "Fax": { "dataType": "string" },
            "Email": { "dataType": "string" },
            "ReportsTo": { "ref": "IntId" },
            "BirthDate": { "dataType": "datetime" },
            "HireDate": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmployeeUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "Title": { "dataType": "string" },
            "FirstName": { "dataType": "string", "required": true },
            "LastName": { "dataType": "string", "required": true },
            "Address": { "dataType": "string" },
            "City": { "dataType": "string" },
            "State": { "dataType": "string" },
            "Country": { "dataType": "string" },
            "PostalCode": { "dataType": "string" },
            "Phone": { "dataType": "string" },
            "Fax": { "dataType": "string" },
            "Email": { "dataType": "string" },
            "ReportsTo": { "ref": "IntId" },
            "BirthDate": { "dataType": "datetime" },
            "HireDate": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GenreInsertInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GenreUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceLineResource": {
        "dataType": "refObject",
        "properties": {
            "InvoiceLineId": { "ref": "IntId", "required": true },
            "InvoiceId": { "ref": "IntId", "required": true },
            "TrackId": { "ref": "IntId", "required": true },
            "UnitPrice": { "ref": "Price", "required": true },
            "Quantity": { "ref": "IntId", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceResource": {
        "dataType": "refObject",
        "properties": {
            "InvoiceId": { "ref": "IntId", "required": true },
            "CustomerId": { "ref": "IntId", "required": true },
            "InvoiceDate": { "dataType": "datetime", "required": true },
            "BillingAddress": { "dataType": "string" },
            "BillingCity": { "dataType": "string" },
            "BillingState": { "dataType": "string" },
            "BillingCountry": { "dataType": "string" },
            "BillingPostalCode": { "dataType": "string" },
            "Total": { "ref": "Price", "required": true },
            "Lines": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InvoiceLineResource" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceLineInsertInput": {
        "dataType": "refObject",
        "properties": {
            "TrackId": { "ref": "IntId", "required": true },
            "UnitPrice": { "ref": "Price", "required": true },
            "Quantity": { "ref": "IntId", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceInsertInput": {
        "dataType": "refObject",
        "properties": {
            "CustomerId": { "ref": "IntId", "required": true },
            "InvoiceDate": { "dataType": "datetime", "required": true },
            "BillingAddress": { "dataType": "string" },
            "BillingCity": { "dataType": "string" },
            "BillingState": { "dataType": "string" },
            "BillingCountry": { "dataType": "string" },
            "BillingPostalCode": { "dataType": "string" },
            "Total": { "ref": "Price", "required": true },
            "Lines": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InvoiceLineInsertInput" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MediaTypeInsertInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MediaTypeUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaylistResourceAlbum": {
        "dataType": "refObject",
        "properties": {
            "AlbumId": { "ref": "IntId", "required": true },
            "Title": { "dataType": "string", "required": true },
            "ArtistId": { "ref": "IntId", "required": true },
            "Artist": { "ref": "Artist", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaylistResourceTrack": {
        "dataType": "refObject",
        "properties": {
            "TrackId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string", "required": true },
            "AlbumId": { "ref": "IntId" },
            "MediaTypeId": { "ref": "IntId", "required": true },
            "GenreId": { "ref": "IntId" },
            "Composer": { "dataType": "string" },
            "Milliseconds": { "dataType": "double", "required": true },
            "Bytes": { "dataType": "double" },
            "UnitPrice": { "ref": "Price", "required": true },
            "Album": { "ref": "PlaylistResourceAlbum" },
            "MediaType": { "ref": "MediaType", "required": true },
            "Genre": { "ref": "Genre" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaylistResourcePlaylistTrack": {
        "dataType": "refObject",
        "properties": {
            "PlaylistId": { "ref": "IntId", "required": true },
            "TrackId": { "ref": "IntId", "required": true },
            "Track": { "ref": "PlaylistResourceTrack", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaylistResource": {
        "dataType": "refObject",
        "properties": {
            "PlaylistId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string" },
            "PlaylistTracks": { "dataType": "array", "array": { "dataType": "refObject", "ref": "PlaylistResourcePlaylistTrack" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaylistTrackInsertInput": {
        "dataType": "refObject",
        "properties": {
            "TrackId": { "ref": "IntId", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaylistInsertInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
            "PlaylistTracks": { "dataType": "array", "array": { "dataType": "refObject", "ref": "PlaylistTrackInsertInput" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaylistUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "Name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrackResourceAlbum": {
        "dataType": "refObject",
        "properties": {
            "AlbumId": { "ref": "IntId", "required": true },
            "Title": { "dataType": "string", "required": true },
            "ArtistId": { "ref": "IntId", "required": true },
            "Artist": { "ref": "Artist", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrackResource": {
        "dataType": "refObject",
        "properties": {
            "TrackId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string", "required": true },
            "AlbumId": { "ref": "IntId" },
            "MediaTypeId": { "ref": "IntId", "required": true },
            "GenreId": { "ref": "IntId" },
            "Composer": { "dataType": "string" },
            "Milliseconds": { "dataType": "double", "required": true },
            "Bytes": { "dataType": "double" },
            "UnitPrice": { "ref": "Price", "required": true },
            "Album": { "ref": "TrackResourceAlbum" },
            "MediaType": { "ref": "MediaType", "required": true },
            "Genre": { "ref": "Genre" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Track": {
        "dataType": "refObject",
        "properties": {
            "TrackId": { "ref": "IntId", "required": true },
            "Name": { "dataType": "string", "required": true },
            "AlbumId": { "ref": "IntId" },
            "MediaTypeId": { "ref": "IntId", "required": true },
            "GenreId": { "ref": "IntId" },
            "Composer": { "dataType": "string" },
            "Milliseconds": { "dataType": "double", "required": true },
            "Bytes": { "dataType": "double" },
            "UnitPrice": { "ref": "Price", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrackInsertInput": {
        "dataType": "refObject",
        "properties": {
            "AlbumId": { "ref": "IntId" },
            "Name": { "dataType": "string", "required": true },
            "MediaTypeId": { "ref": "IntId", "required": true },
            "GenreId": { "ref": "IntId" },
            "Composer": { "dataType": "string" },
            "Milliseconds": { "dataType": "double", "required": true },
            "Bytes": { "dataType": "double" },
            "UnitPrice": { "ref": "Price", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrackUpdateInput": {
        "dataType": "refObject",
        "properties": {
            "AlbumId": { "ref": "IntId" },
            "Name": { "dataType": "string", "required": true },
            "MediaTypeId": { "ref": "IntId", "required": true },
            "GenreId": { "ref": "IntId" },
            "Composer": { "dataType": "string" },
            "Milliseconds": { "dataType": "double", "required": true },
            "Bytes": { "dataType": "double" },
            "UnitPrice": { "ref": "Price", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get('/albums', ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController)), ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController.prototype.getAlbums)), function AlbumController_getAlbums(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Album_controller_1.AlbumController();
            const promise = controller.getAlbums.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/albums/:AlbumId', ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController)), ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController.prototype.getAlbum)), function AlbumController_getAlbum(request, response, next) {
        const args = {
            AlbumId: { "in": "path", "name": "AlbumId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Album_controller_1.AlbumController();
            const promise = controller.getAlbum.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/albums', ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController)), ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController.prototype.insertAlbum)), function AlbumController_insertAlbum(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "AlbumInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Album_controller_1.AlbumController();
            const promise = controller.insertAlbum.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/albums/:AlbumId', ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController)), ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController.prototype.updateAlbum)), function AlbumController_updateAlbum(request, response, next) {
        const args = {
            AlbumId: { "in": "path", "name": "AlbumId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "AlbumUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Album_controller_1.AlbumController();
            const promise = controller.updateAlbum.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/albums/:AlbumId', ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController)), ...((0, runtime_1.fetchMiddlewares)(Album_controller_1.AlbumController.prototype.deleteAlbum)), function AlbumController_deleteAlbum(request, response, next) {
        const args = {
            AlbumId: { "in": "path", "name": "AlbumId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Album_controller_1.AlbumController();
            const promise = controller.deleteAlbum.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/artists', ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController)), ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController.prototype.getArtists)), function ArtistController_getArtists(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Artist_controller_1.ArtistController();
            const promise = controller.getArtists.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/artists/:ArtistId', ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController)), ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController.prototype.getArtist)), function ArtistController_getArtist(request, response, next) {
        const args = {
            ArtistId: { "in": "path", "name": "ArtistId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Artist_controller_1.ArtistController();
            const promise = controller.getArtist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/artists', ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController)), ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController.prototype.insertArtist)), function ArtistController_insertArtist(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ArtistInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Artist_controller_1.ArtistController();
            const promise = controller.insertArtist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/artists/:ArtistId', ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController)), ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController.prototype.updateArtist)), function ArtistController_updateArtist(request, response, next) {
        const args = {
            ArtistId: { "in": "path", "name": "ArtistId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ArtistUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Artist_controller_1.ArtistController();
            const promise = controller.updateArtist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/artists/:ArtistId', ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController)), ...((0, runtime_1.fetchMiddlewares)(Artist_controller_1.ArtistController.prototype.deleteArtist)), function ArtistController_deleteArtist(request, response, next) {
        const args = {
            ArtistId: { "in": "path", "name": "ArtistId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Artist_controller_1.ArtistController();
            const promise = controller.deleteArtist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/customers', ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController.prototype.getCustomers)), function CustomerController_getCustomers(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Customer_controller_1.CustomerController();
            const promise = controller.getCustomers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/customers/:CustomerId', ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController.prototype.getCustomer)), function CustomerController_getCustomer(request, response, next) {
        const args = {
            CustomerId: { "in": "path", "name": "CustomerId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Customer_controller_1.CustomerController();
            const promise = controller.getCustomer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/customers', ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController.prototype.insertCustomer)), function CustomerController_insertCustomer(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "CustomerInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Customer_controller_1.CustomerController();
            const promise = controller.insertCustomer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/customers/:CustomerId', ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController.prototype.updateCustomer)), function CustomerController_updateCustomer(request, response, next) {
        const args = {
            CustomerId: { "in": "path", "name": "CustomerId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "CustomerUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Customer_controller_1.CustomerController();
            const promise = controller.updateCustomer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/customers/:CustomerId', ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(Customer_controller_1.CustomerController.prototype.deleteCustomer)), function CustomerController_deleteCustomer(request, response, next) {
        const args = {
            CustomerId: { "in": "path", "name": "CustomerId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Customer_controller_1.CustomerController();
            const promise = controller.deleteCustomer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/employees', ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController)), ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController.prototype.getEmployees)), function EmployeeController_getEmployees(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Employee_controller_1.EmployeeController();
            const promise = controller.getEmployees.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/employees/:EmployeeId', ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController)), ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController.prototype.getEmployee)), function EmployeeController_getEmployee(request, response, next) {
        const args = {
            EmployeeId: { "in": "path", "name": "EmployeeId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Employee_controller_1.EmployeeController();
            const promise = controller.getEmployee.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/employees', ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController)), ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController.prototype.insertEmployee)), function EmployeeController_insertEmployee(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "EmployeeInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Employee_controller_1.EmployeeController();
            const promise = controller.insertEmployee.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/employees/:EmployeeId', ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController)), ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController.prototype.updateEmployee)), function EmployeeController_updateEmployee(request, response, next) {
        const args = {
            EmployeeId: { "in": "path", "name": "EmployeeId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "EmployeeUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Employee_controller_1.EmployeeController();
            const promise = controller.updateEmployee.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/employees/:EmployeeId', ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController)), ...((0, runtime_1.fetchMiddlewares)(Employee_controller_1.EmployeeController.prototype.deleteEmployee)), function EmployeeController_deleteEmployee(request, response, next) {
        const args = {
            EmployeeId: { "in": "path", "name": "EmployeeId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Employee_controller_1.EmployeeController();
            const promise = controller.deleteEmployee.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/genres', ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController)), ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController.prototype.getGenres)), function GenreController_getGenres(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Genre_controller_1.GenreController();
            const promise = controller.getGenres.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/genres/:GenreId', ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController)), ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController.prototype.getGenre)), function GenreController_getGenre(request, response, next) {
        const args = {
            GenreId: { "in": "path", "name": "GenreId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Genre_controller_1.GenreController();
            const promise = controller.getGenre.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/genres', ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController)), ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController.prototype.insertGenre)), function GenreController_insertGenre(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "GenreInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Genre_controller_1.GenreController();
            const promise = controller.insertGenre.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/genres/:GenreId', ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController)), ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController.prototype.updateGenre)), function GenreController_updateGenre(request, response, next) {
        const args = {
            GenreId: { "in": "path", "name": "GenreId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "GenreUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Genre_controller_1.GenreController();
            const promise = controller.updateGenre.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/genres/:GenreId', ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController)), ...((0, runtime_1.fetchMiddlewares)(Genre_controller_1.GenreController.prototype.deleteGenre)), function GenreController_deleteGenre(request, response, next) {
        const args = {
            GenreId: { "in": "path", "name": "GenreId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Genre_controller_1.GenreController();
            const promise = controller.deleteGenre.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/invoices', ...((0, runtime_1.fetchMiddlewares)(Invoice_controller_1.InvoiceController)), ...((0, runtime_1.fetchMiddlewares)(Invoice_controller_1.InvoiceController.prototype.getInvoices)), function InvoiceController_getInvoices(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Invoice_controller_1.InvoiceController();
            const promise = controller.getInvoices.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/invoices/:InvoiceId', ...((0, runtime_1.fetchMiddlewares)(Invoice_controller_1.InvoiceController)), ...((0, runtime_1.fetchMiddlewares)(Invoice_controller_1.InvoiceController.prototype.getInvoice)), function InvoiceController_getInvoice(request, response, next) {
        const args = {
            InvoiceId: { "in": "path", "name": "InvoiceId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Invoice_controller_1.InvoiceController();
            const promise = controller.getInvoice.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/invoices', ...((0, runtime_1.fetchMiddlewares)(Invoice_controller_1.InvoiceController)), ...((0, runtime_1.fetchMiddlewares)(Invoice_controller_1.InvoiceController.prototype.insertInvoice)), function InvoiceController_insertInvoice(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "InvoiceInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Invoice_controller_1.InvoiceController();
            const promise = controller.insertInvoice.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/mediaTypes', ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController)), ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController.prototype.getMediaTypes)), function MediaTypeController_getMediaTypes(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MediaType_controller_1.MediaTypeController();
            const promise = controller.getMediaTypes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/mediaTypes/:MediaTypeId', ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController)), ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController.prototype.getMediaType)), function MediaTypeController_getMediaType(request, response, next) {
        const args = {
            MediaTypeId: { "in": "path", "name": "MediaTypeId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MediaType_controller_1.MediaTypeController();
            const promise = controller.getMediaType.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/mediaTypes', ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController)), ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController.prototype.insertMediaType)), function MediaTypeController_insertMediaType(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "MediaTypeInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MediaType_controller_1.MediaTypeController();
            const promise = controller.insertMediaType.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/mediaTypes/:MediaTypeId', ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController)), ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController.prototype.updateMediaType)), function MediaTypeController_updateMediaType(request, response, next) {
        const args = {
            MediaTypeId: { "in": "path", "name": "MediaTypeId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "MediaTypeUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MediaType_controller_1.MediaTypeController();
            const promise = controller.updateMediaType.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/mediaTypes/:MediaTypeId', ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController)), ...((0, runtime_1.fetchMiddlewares)(MediaType_controller_1.MediaTypeController.prototype.deleteMediaType)), function MediaTypeController_deleteMediaType(request, response, next) {
        const args = {
            MediaTypeId: { "in": "path", "name": "MediaTypeId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new MediaType_controller_1.MediaTypeController();
            const promise = controller.deleteMediaType.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/playlists', ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController)), ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController.prototype.getPlaylists)), function PlaylistController_getPlaylists(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Playlist_controller_1.PlaylistController();
            const promise = controller.getPlaylists.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/playlists/:PlaylistId', ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController)), ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController.prototype.getPlaylist)), function PlaylistController_getPlaylist(request, response, next) {
        const args = {
            PlaylistId: { "in": "path", "name": "PlaylistId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Playlist_controller_1.PlaylistController();
            const promise = controller.getPlaylist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/playlists', ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController)), ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController.prototype.insertPlaylist)), function PlaylistController_insertPlaylist(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "PlaylistInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Playlist_controller_1.PlaylistController();
            const promise = controller.insertPlaylist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/playlists/:PlaylistId', ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController)), ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController.prototype.updatePlaylist)), function PlaylistController_updatePlaylist(request, response, next) {
        const args = {
            PlaylistId: { "in": "path", "name": "PlaylistId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "PlaylistUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Playlist_controller_1.PlaylistController();
            const promise = controller.updatePlaylist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/playlists/:PlaylistId', ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController)), ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController.prototype.deletePlaylist)), function PlaylistController_deletePlaylist(request, response, next) {
        const args = {
            PlaylistId: { "in": "path", "name": "PlaylistId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Playlist_controller_1.PlaylistController();
            const promise = controller.deletePlaylist.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/playlists/:PlaylistId/Track', ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController)), ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController.prototype.insertPlaylistTrack)), function PlaylistController_insertPlaylistTrack(request, response, next) {
        const args = {
            PlaylistId: { "in": "path", "name": "PlaylistId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "PlaylistTrackInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Playlist_controller_1.PlaylistController();
            const promise = controller.insertPlaylistTrack.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/playlists/:PlaylistId/Track/:TrackId', ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController)), ...((0, runtime_1.fetchMiddlewares)(Playlist_controller_1.PlaylistController.prototype.deletePlaylistTrack)), function PlaylistController_deletePlaylistTrack(request, response, next) {
        const args = {
            PlaylistId: { "in": "path", "name": "PlaylistId", "required": true, "ref": "IntId" },
            TrackId: { "in": "path", "name": "TrackId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Playlist_controller_1.PlaylistController();
            const promise = controller.deletePlaylistTrack.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/tracks', ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController)), ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController.prototype.getTracks)), function TrackController_getTracks(request, response, next) {
        const args = {
            limit: { "default": 20, "in": "query", "name": "limit", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "limit must be an integer" } } },
            offset: { "default": 0, "in": "query", "name": "offset", "dataType": "integer", "validators": { "minimum": { "errorMsg": "limit has a minimum value of 0", "value": 0 }, "isInt": { "errorMsg": "offset must be an integer" } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Track_controller_1.TrackController();
            const promise = controller.getTracks.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/tracks/:TrackId', ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController)), ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController.prototype.getTrack)), function TrackController_getTrack(request, response, next) {
        const args = {
            TrackId: { "in": "path", "name": "TrackId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Track_controller_1.TrackController();
            const promise = controller.getTrack.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/tracks', ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController)), ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController.prototype.insertTrack)), function TrackController_insertTrack(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "TrackInsertInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Track_controller_1.TrackController();
            const promise = controller.insertTrack.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/tracks/:TrackId', ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController)), ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController.prototype.updateTrack)), function TrackController_updateTrack(request, response, next) {
        const args = {
            TrackId: { "in": "path", "name": "TrackId", "required": true, "ref": "IntId" },
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "TrackUpdateInput" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Track_controller_1.TrackController();
            const promise = controller.updateTrack.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/tracks/:TrackId', ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController)), ...((0, runtime_1.fetchMiddlewares)(Track_controller_1.TrackController.prototype.deleteTrack)), function TrackController_deleteTrack(request, response, next) {
        const args = {
            TrackId: { "in": "path", "name": "TrackId", "required": true, "ref": "IntId" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new Track_controller_1.TrackController();
            const promise = controller.deleteTrack.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
