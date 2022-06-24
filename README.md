# Next.js OpenJira App
To run locally, the database is needed
```
docker-compose up -d
```
*  -d, mean's __detached__
  
* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configure environment variables
Rename the file __.env.template__ to __.env__

## Fill the database with test information
```
  http://localhost:3000/api/seed
```