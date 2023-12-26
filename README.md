# Gea Project - Back End v2.0.0

## Origin in YvY

n this project, you will see the word YvY many times. YvY means Earth in Guaraní, just like Gea in ancient Greek. YvY is the original, non-open source project from which Gea is inspired. 

## Types of Users

   Gea offers two possibilities when registering:

- <b> Producer: </b> Control your farms, calculations such as water or carbon footprint, agronomic data, QR code, and among other functions available in Gea.

- <b> Organization: </b> Control the members of your organization and their respective farms, calculations, georeferencing, among other functions available in Gea.
  
Also, there is an admin role for developers and administrators of Gea:

- <b> Administrator: </b> Control the access to Gea, other general data and statistics.

## Modules Available

The application covers these principal modules for Producers:

- User Profile.
- Farms and Product Management.
- Calculation of Carbon Footprint and Water Footprint.
- Watering Needs.
- Agronomic Data.
- Weather Forecast.
- Seasonal Forecast.
- Historical Records with Farms/Lots Information, Agriculture Production, Accounting and Staffing.
- Soil Regeneration Plan.
- Historical Records
- Sustainability Self-Assessment. 
- QR Code.
- Organizations with their Invitations and Requests.

Also, we have these modules available for Organizations:
- Organization Profile.
- Farms Management.
- Carbon Footprint and Water Footprint Management.
- General Management.
- Agronomic Data Management.
- Members Management.
- Georeferencing.

And we have these modules available for Administrators:
- Administration, handle users and countries available in the application with their permissions.
- Statistics, get information about the users per country and number of users registered per year/country.

## Project Roadmap

Participation is welcomed from software developers, designers, testers, agronomists/agri experts/soil experts, IoT engineers, researchers, students, farmers, and others who can help improve the quality and value of the solution for small farmers around the world.

Please check the issues to see how you can contribute to the project
   
### Technologies

* [![PostgreSQL][PostgreSQL.js]][PostgreSQL-url]
* [![Node][Node.js]][Node-url]

External APIs:
- API Weather.
- API Meteostat.

And for the Cloud (not available for gea project), we are using :
* [![IBMCLOUD][IBMCLOUD.js]][IBMCLOUD-url]

Specifically these features in the Cloud:
- <b> Compute: </b> The application runs on IBM containers, ensuring a scalable, isolated, and efficient execution environment.

- <b> Database Service: </b>  The choice of Databases for PostgreSQL on IBM ensures a reliable, scalable, and performant data storage solution tailored for the app's requirements.

- <b> Monitoring and Logging: </b> To keep an eye on the system's health, performance, and potential issues, the IBM log Analysis service has been incorporated. This allows for real-time tracking, analysis, and prompt action on any anomalies.

  <img src="./assets/images/IBM Cloud Diagram.png"  width ="80%" height="10%">

## Getting Started


### Cloning the Repository from github

https:
```
git clone https://github.com/Gea-Project/Backend-Gea.git
```
or ssh:
```
git clone git@github.com:Gea-Project/Backend-Gea.git
```

```
cd gea-backend
```

### Dependencies Installation

_You require [npm](https://phoenixnap.com/kb/install-node-js-npm-on-windows) installed_ 🤷‍♀️
```
npm install
```

### Running the Backend Locally

To set up and run the gea-backend for a local environment:

-  Create a new database for the project using Postgres. Database name must be equal to the environment key called *PG_DATABASE_LOCAL*

- Create a `.env` file in the root directory of your `gea-backend` and populate with the following:
   
```js
NODE_ENV=local # use it always in local unless you preffered to share a better cloud solution for gea
BUILD= # must be undefinde unless you need to build the project and run it using node command in production
PG_HOST_LOCAL= # The hostname (e.g., localhost)
PG_PORT_LOCAL= # Server port (typically 5432)
PG_USER_LOCAL= # Database username
PG_PASSWORD_LOCAL= # Password for the user
PG_DATABASE_LOCAL= # Name of the database to connect to
PORT= # Port number for your application server
JWT_SECRET= # Secret key for JSON Web Tokens (can be whatever you like)
GEA_URL_LOCAL= # http://localhost/{frontend-port} the port where gea app will run in navigator locally
COUNTRIES_API=https://flagcdn.com #(open api)
```

### Special Indication for the rest of environments

#### Mailing
For mailing the gea project use gmail service. 
You can use your own gmail account or change the mailing service by develope specific one accourding to your needs.

Check out how to create your own gmail password app within your google account througth this [link](https://support.google.com/accounts/answer/185833?hl=en)

The modules that use mailing service are:

* Register
* Reset password
* Contact Us

```js
GEA_EMAIL= # Gmail Email address 
GEA_PASSWORD= # Password for external app from gmail service
``` 


#### Cloud object storage

For files manager the original project (called yvy) use Cloud Object Storage from IBM Cloud services.

Feel free to use the any other cloud object storage or change the [process-file middleware](./src/middlewares/processFiles.middleware.ts) by using another tech to storage files.

Check out [localstack](https://www.localstack.cloud/). It can brings you the solution emilating lot of cloud services locally.


The modules that use this keys environments are:

* Historical Records (uploads documents)
* Farms (upload documents)
* Sustainability Self-Assessment (upload documents)

```js
COS_ENDPOINT= # Endpoint for cloud object storage
COS_API_KEY_ID= # API key ID for cloud object storage authentication
COS_INSTANCE_CRN= # Cloud Resource Name for storage instance
FILE_BUCKET= # Bucket name for file storage in the cloud

```

### Wheater

Gea offers wheather info to their users by using the following the external service API Wheather

Feel free to use another services or api's for these modules or contribute to the project by finding free services that allows the same values for gea project

Check the source code that use these keys:
- [Api Wheater](./src/services/apiWeather/apiWeather.service.ts)
- [Seasonal Forecast](./src/services/apiWeather/seasonalForecast.service.ts)
- [Wheather Forecas](./src/services/apiWeather/weatherForecast.service.ts)

Check out this [dev tools](https://developer.ibm.com/apis/catalog/weather--environmental-intelligence-suite_historical-apis/Weather%20Company%20Data%20-%20API%20Common%20Usage%20Guide) by IBM

```js
BASE_API_WEATHER=https://api.weather.com/v2
WEATHER_NEEDS_15= # url of wheater needs for 15 days
WEATHER_FORECAST_AGRICULTURE_15= # url of forecast agriculture
API_KEY_WEATHER= # api key to use the service


```

### Water Footprint

Gea calculates the water footprint using an external service called METEOSTAT and adding special calculation in it's own source code.

Feel free to use another services or api's for these modules or contribute to the project by finding free services that allows the same values for gea project

Check the source code that use these keys:
- [Water Footprint Calculation](./src/utils/calculoHuellaHidrica.ts)


```js

API_KEY_METEOSTAT= # api key to use this api
METEOSTAT_STATIONS= # url to get the daily data
METEOSTAT_STATIONS_NEARBY= # url to get the nearest station
```

### Init Tables in Postgres Database

To simplify, there is a script you can run to init the database. Only the FIRST TIME to get started.

Make sure you made the .env file with the postgres credential for your database locally

```
npm run init-db
```

You should see the message `Postgres Tables Created`. Check the tables in your postgres local database

### Init Countries List

Gea use an official country list from an api. But to simplify, it get all the countries with their international code and english and spanish name and put it in their database, using the next script:

```
npm run countries-load
```

### Init Mock Users (Optional)

To populate the database with 1 admin user, and 20 another regular user, you can run the follow script:

```
npm run init-mock-users
```

Now you can acces with any of the *ACTIVE* users. Take a look at the mock json [users](./mock/users/users.json)

### Starting the Project

```
npm run dev
```


## Available Scripts


| Script        | Description                              |
| ------------- | ----------------------------------       |
| npm run dev       | Run the application in development mode. |
| npm run build     | Create production-ready builds.          |
| npm run lint      | Show eslint errors.                      |
| npm run lint:fix  | Fix eslint errors.                       |
| npm run format    | Apply prettier formatting to all files.  |
| npm run test      | Execute tests.                           |
| npm run init-db   | Init database locally to get started     |
| npm run init-mock-users | Populate mock users locally        |
| npm run migration:generate | Generate a migration db with type-orm|
|npm run migration:run | run the last migration generated in migration folder |
| npm run migration:revert | revert the last migration |




## Contributors


## Contributing

Please contact the members of this list:

- Sofia Ferro - Project Coordinator - sferro@plan21.org
- Guadalupe Carbó  - Project Coordinator - sferro@plan21.org
- Federico Interlandi Zoireff - Software Developer and Cloud Administrator - finterlandi@plan21.org

<!-- Slack space -->

## Index

Please take a look at the available endpoints until far. 

** Remember to add any endpoint you develope to their respective md file.


- [Auth](./docs/auth.endpoint.md)
- [User](./docs/user.endpoint.md)
- [Organization User](./docs/userCooperative.endpoint.md)

<!-- IMAGE SHIELDS -->

[Node.js]: https://img.shields.io/badge/NodeJS-20232A?style=for-the-badge&logo=node.js&logoColor=008B4A
[Node-url]: https://nodejs.org/en
[PostgreSQL.js]: https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=postgresql&logoColor=008B4A
[PostgreSQL-url]: https://www.postgresql.org/
[IBMCLOUD.js]: https://img.shields.io/badge/IBM_Cloud-20232A?style=for-the-badge&logo=ibmcloud&logoColor=008B4A
[IBMCLOUD-url]: https://cloud.ibm.com/
