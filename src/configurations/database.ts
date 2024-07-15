import mongoose from 'mongoose';

export default class Database {
    connect(): void {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@potatosoft.tfgozuv.mongodb.net/boleiros`, { });

        const database: mongoose.Connection = mongoose.connection;
        database.on('error',
            console.error.bind(console, 'Erro na conexão com o MongoDB:'));
        database.once('open', (): void => {
            console.log('Conexão com o MongoDB estabelecida com sucesso!');
        });
    }
}
