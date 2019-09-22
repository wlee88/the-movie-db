# TheMovieDb

You can see a live preview at [http://the-movie-db.william-lee.com](http://the-movie-db.william-lee.com).

<img src="https://user-images.githubusercontent.com/631540/65369745-60dede80-dc94-11e9-94c1-1185ea32bcb8.gif" width="500">

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
  on the device screen size with image loading placeholder. Also will only fetch
  images when the image is in the viewport for improved performance.
- Infinite scroll - loads new data when the user reaches the bottom of the page - with loading state.
- Fallback missing images for those photos without photos.
- Handles empty results.
- Behaviour subject observable store for keeping track of the user search query -
  this persists history when the user clicks a movie and clicks back.
- Theme color on chrome android.
- Clickable icon to go back to the homepage.
- A 404 page.
- CI/CD pipeline for quick and easy deployment straight to AWS S3.

## Time constraints

- Testing of smaller components was omitted - so no test coverage for them as of now.
- I didn't have time to unit test the infinite scroll related functionality and loading states in movies component
  as I added these in a rush at the end for fun.
- No error handling on network issues - it doesn't handle these gracefully.

## Room for improvement

- Could be a progressive web app for a faster app like experience and offline functionality.
- Those fallback images and loading images are courtesy of [placeholder.com](placeholder.com).
  They could have been refined much better for a better user experience.
- API key is in the url could be done via a proxy server which has the key instead.
  There would be no need for the http interceptor and one less environment variable for this repo to care about.
- Server side rendering - For better performance and SEO as static page, less load on client so better support on all mobiles / devices.
- Could've broken down components small for better re-usability.
- Enable Typescript incremental builds when this is supported for faster build times - https://github.com/angular/angular-cli/issues/13941)
- Could have made the `durationToHours` pipe more flexible - it's not flexible on formatting at all.
- Could have used `rem` as opposed to `px`. It's much more maintainable and sustainable to use `rem`.
- Path name mapping (i.e introduction of named modules) for cleaner imports.
- In hindsight I shouldn't have made `PRODUCTION` a necessary environment.
  This should have been a flag that is generated via `build:production`
- The back button is transparent when the poster is white. It'd be nice
  to make a smart back button which is aware of the color and can display
  the inverse of the background color average.
- Would be nice if the app scrolled to the search bar when you click back when viewing a movie.
- Hide the keyboard when the user finishes searching for
  a movie (i.e presses enter or if the search results are loaded) - I think this is easily rectified by blurring the search input.
- Currently API calls to retrieve movies are cached. It'd be great to have
  a background worker/process checking if the current data is stale - and notifies the user to
  refresh / re-retrieve the data. I believe this would create a better UX experience than refreshing the data on the user's behalf -
  the reason being that the user may not understand what is going on, may perceive the the auto refresh as a glitch
  and we will lose user's trust in our interface.
- Would be great to remember where the user's position was when they clicked a movie and then went back.
- Progressive image loading for the header.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

## Tested on

- Galaxy S8 (chrome)
- Pixel (chrome)
- Ipad mini (safari)
- Desktop (Firefox/Chrome)
