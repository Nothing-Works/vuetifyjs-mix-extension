# For Laravel User

## Install laravel and scaffolding vue.

```bash
laravel new mix
composer require laravel/ui
php artisan ui vue
npm i
```

## Install package

```bash
npm i vuetifyjs-mix-extension -D
```

## Configure laravel-mix file

```js
const mix = require('laravel-mix')

require('vuetifyjs-mix-extension')

mix.js('resources/js/app.js', 'public/js').vuetify()
//if you use vuetify-loader
mix.js('resources/js/app.js', 'public/js').vuetify('vuetify-loader')
```

## Create a plugin file for Vuetify, `src/plugins/vuetify.js` with the below content:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

## If using `vuetify-loader` use the content below:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

## Navigate to your main entry point where you instantiate your Vue instance and pass the Vuetify object in as an option.

```js
// src/main.js

import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

new Vue({
    vuetify
}).$mount('#app')
```

## Font installation The simplest way to install these are to include their CDN's in your main `index.html`.

```html
<link
    href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
    rel="stylesheet"
/>
<link
    href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
    rel="stylesheet"
/>
```

## Now All done. just run

```bash
npm run dev
```

note: the first time you run this it's going to install all the required dependency. So you need to run `npm run dev` again to compile all your assets.
