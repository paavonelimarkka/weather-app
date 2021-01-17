# Weather app - YTSP0300, Application Frameworks

This is the final assignment in the Application Frameworks course. The course is a part of JAMK Full Stack Developer masters degree programme.

The application is a simple weather forecast service done with Vue.js. It uses a modified FMI-API.

## Weather app & demo video

**You can find a demo here:** [https://n7510.pages.labranet.jamk.fi/ytsp0300/](https://n7510.pages.labranet.jamk.fi/ytsp0300/)

## Features

You can find the assignemnt istructions here: [https://ytsp0300.pages.labranet.jamk.fi/Assignments/Weatherapp/](https://ytsp0300.pages.labranet.jamk.fi/Assignments/Weatherapp/)

I managed to implement all the core features. Heres a list of extra features I managed to implement as well

- User favorites are stored in LocalStorage
- App uses Vuetify as UI framework
- App uses SASS (with .sass syntax) for extra styles
- App uses vue-router for routing, and uses route.params for viewing a chosen municipality
   - Link can be shared as well. Since we can't configure the server I used a pretty "hacky" solution here
   - `- cp public/index.html public/404.html` so basically my 404 is now the index as well :--)
- I guess I use both, babel and webpack. I did not need to configure them in any way though. They came with Vuetify
- I deployed the app to GL Pages
- The search uses the autocomplete field

Basically I did all of them but I'm not so happy with the autocomplete- or the try_files-thingie.

### Ugly stuff

- Autocomplete searchbar has a dirty trick into it :(
   - It seems that the locations come from different API than the forecast so using the name of the station is not going to work
   - Here I did something really sinful: I just splitted the string after "," so I get the name of the municipality only
   - Using the station ID would be the wisest here, but I build my application logic around the municipalities and the deadline is tomorrow so..
- Ended up having pretty stale styles
- I had some problems with naming the views and components. You will have problems if theres a component with a same name as a view has. Ended up having some stupid naming conventions 

## Project setup & stuff
```
npm install
```

Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

Lints and fixes files
```
npm run lint
```

