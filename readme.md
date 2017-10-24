![youbrew logo](client/build/assets/images/ms-icon-150x150.png)

An internal facing tracking app for Arches Brewing, Atlanta GA.  This application was built using React, Node, Axios and MongoDB. This app allows the sales team in the field to have a live feed into the inventory of the brewery and their development cycle.  The user can track processes, request new batches, reserve portions of incomplete batches for future sales and communicate with the brewers in real time.  Because this was built not to be accesible by the public, an admin user needs to be seeded in the DB in order to access anything before running.

## Getting Started

Clone or download the files for local use and use gitbash or console to run.

### Prerequisites

```
terminal -or- gitbash
Node.js
MongoDB

```

### Installing

Install is straight forward...

```
npm install
```

in order to run youbrew you must have your database up and running, start your server and then run the application.  

start database...
```
mongod
```

if on a mac...
```
yarn start
```

if on windows...
navigate to main directory
```
yarn server
```
navigate to client
```
yarn start
```


## Built With...

* [node](https://nodejs.org/en/) 
* [MongoDB](https://www.mongodb.com/)
* [React.js](https://reactjs.org/)

## Authors

* **Tyler Finkle** - *Authorization, React, and bits and bobs* - (https://github.com/carltheape)
* **Michael Mann** - *Database, React, and bits and bobs* - (https://github.com/mmann30)
* **Florian Hutter** - *Front End Guru and graphic designer* - (https://github.com/florianhutter)
* **Andrew Coleman** - *React Translator, and bits and bobs* - (https://github.com/andrewdavidcoleman)


## Acknowledgments
**Thanks to Arches Brewing for the Inspiration**
(https://www.archesbrewing.com/)

* Built for GA tech coding bootcamp
