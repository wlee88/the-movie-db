# TheMovieDb

## Initial Environment Setup

`.env`

- create a `.env` file at root with `API_KEY` and `API_URL`. It should look like this:

```
API_URL={{the-movie-db-api-}}
API_KEY={{the-api-key}}
```

If production also add

```
PRODUCTION=TRUE
```

If this variable isn't specified it defaults to false.

- Run with `npm run start`.

## Summary

You can see a live preview [here](http://some-future-bucket-link).

Benefits of this are:

- works offline
- fast and app like experience due to the service worker pre-caching everything.
- can add this to your home screen (on android not sure about ios yet).

## Folder structure

- Components
- Contracts
- Pages

## Getting up and Running

### Terraform - for s3 bucket configuration

- Run blah

### CircleCI

- Fork this repo and connect it to your CircleCI account.
- Add your moviedb API key to build environment.
- Create AWS creds (elaborate here).

### AWS S3

Why s3 you may ask? it's a static website and s3 provides great security (resilience against DDOS) and is super cheap.
No need to worry about ongoing server costs.

# Features

- Named modules
- linting?
- (typescript incremental build.. let's see)
- terraform
- dockerfile

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
