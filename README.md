# Nest.js + React.js

- Docker compose 2.17.3
- Turborepo 1.9.8
- TypeScript
- Postgres


## Instructions

### Docker

Make sure you have docker and docker compose installed and run the following
command in the project's root:
```shell
docker compose up --build
```

If you want to change server parameter, such as the server port, you can
change the parameters in the `.env` file. 

Otherwise, the default is:
`localhost:3000`

### Native

To run the code with the native libraries, you must run the command:

```shell
npm run [ dev | start | build ]
```
- `dev` starts a development server with hot reloading
- `start` starts the system for production
  - Depends on `npm run build`
- `build` will build the resources to `**/dist`

Please notice that you will need a Postgres server on `localhost:5432`.

## Roadmap
- API (Nest.js)
  - [x] Serve static fields for React.js SPA
  - [x] CRUD for users
  - [x] CRUD for services
  - [x] Basic Login endpoint
  - [x] Queries via enpoint
  - [ ] Unit tests (Jest)
- Client (React.js)
  - [x] Login form with validation and call to Login endpoint
  - [x] User registration with form validation
  - [ ] CRUD pages for services
    - [x] Delete
    - [x] Update status
    - [ ] Edit
  - [ ] Unit tests (Jest)
- Database (TypeORM + Postgres)
  - [x] User and Service tables
  - [x] Migrations
  - [x] Relations
  - [ ] Initial seeding
