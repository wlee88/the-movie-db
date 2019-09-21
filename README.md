# TheMovieDb

You can see a live preview [here](http://some-future-bucket-link).

## Getting up and running

### Development Environment

Create a `.env` file at root with `API_KEY` and `API_URL`. It should look like this:

```env
API_URL=the-movie-db-api
API_KEY=the-api-key
```

This should be your api key provided from themoviedb - see
the [developers API portal](https://developers.themoviedb.org/3/).
As of now the latest API url is `https://api.themoviedb.org/3/`.

- Run `npm run start`

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Production Environment

For preparing a production build ensure that the `API_KEY`, `API_URL` are set
and also `PRODUCTION` variables are set in the environment.

- Build with `npm run build`.

# Features

- Progressive image loading - Shows an interim loading image and
  then loads an appropriate image poster of varying quality depending
  on the device screen size with image loading placeholder. Also loads
  images on scroll.
- Fallback missing images for those photos without photos.
- Behaviour subject store for keeping track of the user search time -
  this persists history when the user clicks a movie.
- CI/CD pipeline for quick and easy deployment straight to S3.

## Time constraints

- Testing of smaller components was omitted for time constraints.
  Could also have expanded more.

## Room for improvement

- Those fallback images and loading images are courtesy of [placeholder.com](placeholder.com).
  They could have beeen refined much better for a better user experience.
- API key is in the url could be done via a proxy server which has the key instead. No need for http interceptor and webpack Injection for key
- Server side rendering - For better performance and SEO as static page, less load on client so better support on all mobiles / devices
- Could've broken down components small for better reusability.
- Enable Typescript incremental builds when this is supported - https://github.com/angular/angular-cli/issues/13941)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).
