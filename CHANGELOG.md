# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.7](https://github.com/Math1987/enigmafrontend/compare/v0.0.6...v0.0.7) (2020-08-25)


### Features

* (re)active routing guards ([cefea98](https://github.com/Math1987/enigmafrontend/commit/cefea9804758f26845a3ab88fca091ba7d0812dc))
* add functions in metadataService to give all metadatas as obj, used for mattooltip in icones ([d8b645c](https://github.com/Math1987/enigmafrontend/commit/d8b645c6d8ce7a3e0cc92f94c46351087460b074))
* add resourceActions as deplacement and actions in player's bar ([18b38ef](https://github.com/Math1987/enigmafrontend/commit/18b38ef35376b74fccaba32011fd0d527285fb54))
* add socketon die in world viewver ([a5ea083](https://github.com/Math1987/enigmafrontend/commit/a5ea08332a0402db1f7b123260fb82430cb464e3))
* add view cash system ([2aaa04c](https://github.com/Math1987/enigmafrontend/commit/2aaa04cf5310d14b828a259c2d2e1b8e0984f8bd))
* create map-viewver module ([413a0af](https://github.com/Math1987/enigmafrontend/commit/413a0af9b964680673050fb79288375f386bd7b7))
* implement view service width matrix for viewver's component drawing ([fdd2f29](https://github.com/Math1987/enigmafrontend/commit/fdd2f29b39e0a554d2705134edf9f13f731462fa))
* move and attack ([d28d6e9](https://github.com/Math1987/enigmafrontend/commit/d28d6e93f07f72d606de510965add4a7ce6fad22))
* move players ok (need clean code and comments) ([6e41ccb](https://github.com/Math1987/enigmafrontend/commit/6e41ccbe1139cb87475b733446cfdcb7c40a0761))
* resources and icon module ([13fe41a](https://github.com/Math1987/enigmafrontend/commit/13fe41a7dace5d6ebc46da0893f6e13a551e3882))
* update move for player, used socket ([cd17f82](https://github.com/Math1987/enigmafrontend/commit/cd17f825b5f771ffca93c73ebe93ecb8ad3d0fa6))


### Bug Fixes

* comme back to replay subject for user, chara observables in services, cleanning usage in templates (using public services instead of creating new observables/using functions), clean routing, app structure connection supose to be OK ([7eaffe0](https://github.com/Math1987/enigmafrontend/commit/7eaffe0a0e73977fb959e43881f88410de6c67d6))
* destroy subscriptions in worldviewver ([08c5d70](https://github.com/Math1987/enigmafrontend/commit/08c5d70be93649f43fb9a397fe4f22fec29ea373))
* icon system; get number of icon from backend in metavalues ([01f7f28](https://github.com/Math1987/enigmafrontend/commit/01f7f28bcf6351bb9e6869f52c9b8608da68b7ed))
* set scale animation with correct value (fix error on chrome or other browsers) ([ae51a98](https://github.com/Math1987/enigmafrontend/commit/ae51a984691da5cd9c9be4c66b72cef42c71edb8))
* set user services (as userService, charaService, valueService) init and destroy function  used in player's guard (canActivate or canDeactivate)...in place of destroying lazyloaded  module seems not possible ([ef269e6](https://github.com/Math1987/enigmafrontend/commit/ef269e65ff640c391a132c5f1de1ca570f4263b0))
* use BehaviorSubject witht skil(1) in pipes instead of ReplaySubject in guards ([9b2b8db](https://github.com/Math1987/enigmafrontend/commit/9b2b8db91bc274bdc565a27fb60e3cb301b8e2a5))

### [0.0.6](https://github.com/Math1987/enigmafrontend/compare/v0.0.5...v0.0.6) (2020-05-30)


### Features

* wip creation of a character if user is connected but have note ([f819aee](https://github.com/Math1987/enigmafrontend/commit/f819aeea2f8c911f16f15bf32d986bfd46518f64))


### Bug Fixes

* clean connection system, routes, creation of a character, observables. The user can create and connect account and character with security token. ([3c1eddc](https://github.com/Math1987/enigmafrontend/commit/3c1eddc4a4da7e0fe5aacfe6101470f160c9fdfd))

### [0.0.5](https://github.com/Math1987/enigmafrontend/compare/v0.0.4...v0.0.5) (2020-05-27)


### Features

* creation of admin module with protected route in player's module ([bf131c7](https://github.com/Math1987/enigmafrontend/commit/bf131c7c9924f91d2f7494e987e487f4591059df))

### [0.0.4](https://github.com/Math1987/enigmafrontend/compare/v0.0.3...v0.0.4) (2020-05-26)


### Bug Fixes

* correction of user informations problem when signup with a session already stored localy. + lint code, + comments ([32a5307](https://github.com/Math1987/enigmafrontend/commit/32a5307233b0fff5aa7208582efc71abb42b1741))

### [0.0.3](https://github.com/Math1987/enigmafrontend/compare/v0.0.2...v0.0.3) (2020-05-25)


### Features

* add angular flex layout ([918b582](https://github.com/Math1987/enigmafrontend/commit/918b582c85068319dc7eb7a68f3afb3479036057))
* add brouillon.txt for test ([70065f8](https://github.com/Math1987/enigmafrontend/commit/70065f8d89f2e45adf727e56a36ea37c6d57fd68))
* create base securised environnement allowing creation and connection of user ([8bd3f60](https://github.com/Math1987/enigmafrontend/commit/8bd3f60e2a38e36e5e03309477893659866ad0b9))
* update angular/cdk ([2e21a2b](https://github.com/Math1987/enigmafrontend/commit/2e21a2ba3c39b49884ac84b799cbb6c3bac576b4))


### Bug Fixes

* remove tsconfig.app.ts include path ([88a3399](https://github.com/Math1987/enigmafrontend/commit/88a3399bb482d93f923486ea2654eb8ee9926947))
* set typescript version 3.5.2 ([42b0976](https://github.com/Math1987/enigmafrontend/commit/42b097695add26a9a7eb87c29f57cbc9e9253dc2))

### [0.0.2](https://github.com/Math1987/enigmafrontend/compare/v0.0.1...v0.0.2) (2020-05-20)


### Features

* install Angular Material, create signIn formGroup with validators calling backend ([91be282](https://github.com/Math1987/enigmafrontend/commit/91be2828d656c15d9215d250625c18d3844e5d11))
* signIn/create, set error in pipe when backend out ([b9af1ab](https://github.com/Math1987/enigmafrontend/commit/b9af1ab962a20245bf90f740fc42f4ed07dc0105))
* start form signIn implementation ([3b38834](https://github.com/Math1987/enigmafrontend/commit/3b38834968a1d0137c05e16e3608afd355aec414))
* update signIn and create account with pipes for errors ([4fac2d9](https://github.com/Math1987/enigmafrontend/commit/4fac2d90b3cb395c957d40d45ffb0746f9f69a1a))

### 0.0.1 (2020-05-18)


### Features

* add standard-version, create user.service with session as BehaviorSubject, create signIn component, back.service a004ea0
