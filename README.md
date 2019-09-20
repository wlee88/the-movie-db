# TheMovieDb

## Initial Environment Setup

### Development Environment

- Create a `.env` file at root with `API_KEY` and `API_URL`. It should look like this:

```env
API_URL=the-movie-db-api
API_KEY=the-api-key
```

- This should be your api key provided from themoviedb -
  see the [developers API portal](https://developers.themoviedb.org/3/).
  As of now the latest API url is `https://api.themoviedb.org/3/`.

## Production Environment

For preparing a production build ensure that the `API_KEY`, `API_URL` are set
and also `PRODUCTION` variables are set in the environment.

- Build with `npm run build`.

## Summary

You can see a live preview [here](http://some-future-bucket-link).

## Time constraints

## Folder structure

- components
- contracts
- interceptors
- pages
- pipes
- scss - for variables
- services
- testing
- utils

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

- Progressive image loading.
- Decent test coverage on pages.
- CI/CD pipeline

## Could be improved

- Due to lack of time I only tested the main pages, but with a
  but more time I would add them to components for more thorough testing.
- I feel I rushed certain things that could have been more generic or
  better thought out such as pipes - such as the durationToHours pipe.
  This could have been made to be much more flexible such as allowing the
  over view text to be changed or formatting.
- Could have used rem instead of px everywhere.
- Could have reduced the size of the headings for mobile just a touch.
- Could have introduced name spaces to modules. i.e @services/blah or @components/some-component
- Could have made this into a progressive web app.
- Could have broken down various components into even smaller parts for better
  reusability - didn't see the point of it for the scope of this exercise.
- Installed typescript 3.6 and utilise incremental builds - used angular-cli so can't get it quite yet https://github.com/angular/angular-cli/issues/13941
- API key is in the url could be done via a proxy server which has the key instead. No need for http interceptor.
- Wasn't overly happy with my implementation of the overlay - in hindsight i could've experimented with with flex and a direct image overlay.
- Could've explored server side rendering - haven't done this but know the Benefits are great. Better SEO as static page, less load on client so better support on all mobiles / devices

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
