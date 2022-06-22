# Next.js OpenJira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
* el -d, significa __detached__
  
* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__