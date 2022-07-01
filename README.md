# Next.js OpenJira App
To run locally, the database is needed
```
docker-compose up -d
```

*  -d, mean's __detached__
  


## Configure environment variables
Rename the file __.env.template__ to __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

* Rebuild the node modules and launch Next
```
yarn install
yarn dev
```

## Fill the database with test information
```
  http://localhost:3000/api/seed
```

