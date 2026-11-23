import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';

config({
    override: true,
    path: `.env.${env}`,
    debug: true 
});

export default new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: +(process.env.PORT ?? 5432), 
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: false, 
    
    // 💡 CAMBIA ESTA LÍNEA EXACTAMENTE A ESTO:
    // Al usar __dirname + '/src/**/*.entity{.ts,.js}', TypeORM buscará de forma absoluta
    // tanto archivos de TypeScript (.ts) como los compilados (.js) evitando fallos de metadatos.
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'], 
    
    migrations: [__dirname + '/src/database/migrations/*.ts'] 
});