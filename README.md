## Backend connection in localhost

Grab the back-end server at Math1987/enigmabackend.
Install the dependencies with npm i.
Setup a local MySQL database named enigma_db, accessible with a passwordless root user. (The easiest way to do this on Windows is with a basic Wamp installation)
Start the server with npm run dev.

## Front-end

Install the dependencies with npm i.
Run npm run start to start the front-end locally.
Navigate to http://localhost:4200/.
The app will automatically reload if you change any of the source files.

Note: If you don't wan't to open the back-end workspace everytime you work on the front-end, you can simply run npm run backend within your front-end workspace if you installed the back-end in the same folder as the front-end. This will start the back-end server.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



