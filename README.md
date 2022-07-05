# rest-api-examples
Create a Federated GraphQL API with REST APIs using Hasura GraphQL Engine (HGE)

This repository highlights 2 ways to use the Hasura GraphQL Engine to wrap REST APIs in a GraphQL API:
- Hasura [actions](https://hasura.io/docs/latest/graphql/core/actions/index/)
- Hasura [Remote Schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/) + [OpenAPI-to-GraphQL](https://github.com/IBM/openapi-to-graphql)

## Hasura Actions
The first example uses :
- `postgres` for the example data and HGE metadata
- `rest-api` for the REST data API
- `hge-rest-actions` to add part of the REST API into a GraphQL API via Hasura Actions
  - The metadata will automatically be applied via the mounted volume of the container service

The second example uses :
- `postgres` for the example data and HGE metadata
- [Random Data](https://random-data-api.com/api/users/random_user) as the REST API
- `hge-rest-actions` to add part of the REST API into a GraphQL API via Hasura Actions
  - `hge-rest-transform-metadata.json` will need to be imported to initialize the metadata [docs - please click "Console"](https://hasura.io/docs/latest/graphql/core/migrations/manage-metadata/#applying-metadata)
  - The `User` action illustrates defining a subset of the returned data to limit the scope of the exposed data
  - The `userSubscription` action illustrates using a response transform

## Hasura Remote Schemas + OpenAPI-to-GraphQL
This example uses:
- `postgres` for the example data and HGE metadata
- `rest-api` for the REST data API, which implements the OpenAPI spec
- `oa2gql` to wrap the REST API with a GraphQL API
- `hge-rest-schema` to stitch the sub-graph/remote schema into a GraphQL API
  - The metadata will automatically be applied via the mounted volume of the container service

## Services
- [REST API](http://localhost:3000/)
- [GraphQL API via OpenAPI-to-GraphQL](http://localhost:3100/graphql)
- [HGE REST via Actions](http://localhost:8010/console)
- [HGE REST via Actions with Response Transform](http://localhost:8020/console)
- [HGE REST via Remote Schema](http://localhost:8030/console)

## Run the examples
1) Clone the repository
2) `cd` into the example repository directory
3) `docker compose up -d` to pull & start all the container defined in `ocker-compose.yaml`
    a) Please wait approximately 2-3 minutes for all the services to install, build, start and connect to each other. The services may restart several times if the dependent services are not ready.
4) Load the Hasura Console in your web browser for each example:
    1) [HGE REST via Actions](http://localhost:8010/console)
    2) [HGE REST via Actions with Response Transform](http://localhost:8020/console)
    ***Please remember to import the metadata `hge-rest-transform-metadata.json`**
    3) [HGE REST via Remote Schema](http://localhost:8030/console)
5) `docker compose down` to stop & remove the services, this will persist the PostgreSQL data and enable faster re-starts with `docker compose up -d`. Please use `docker compose down -v` if you would like to remove the PostgreSQL data volume `db_data`. 

## Files
- `docker-compose.yaml` - start the example container services
  - `postgres` - PostgreSQL database for HGE metadata & demo data
  - `rest-api` - OpenAPI micro service serving Chinook data from postgres service
  - `oa2gql` - OpenAPI-to-GraphQL proxy that creates a GraphQL schema for an OpenAPI endpoint
  - `hge-rest-actions` - HGE example that wraps the `rest-api` service using HGE actions
  - `hge-rest-schema` - HGE example that uses the `oa2gql` service as a remote schema
  - `hge-rest-transform` - HGE example that wraps the [Random Data API](https://random-data-api.com/api/users/random_user) service using HGE actions and action response transforms to flatten the response data structure
- `/init-pg` - SQL files to create the `postgres` database and initialize the example data
- `/hge-metadata/rest-actions` - metadata for the `hge-rest-action` service
- `/hge-metadata/rest-actions` - metadata for the `hge-rest-action` service
- `/hge-metadata/rest-actions` - metadata for the `hge-rest-action` service
- `hge-rest-transform-metadata.json` - metadata for the `hge-rest-transform` service
- `/rest-api` - OpenAPI micro service serving Chinook data from postgres service