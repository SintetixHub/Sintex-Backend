import mongoose from 'mongoose';
import config from '../config';

const dbConnectionUrl = config.DB_URI || '';

class Connection {
    private static instance: Connection;
    private constructor() {
        this.connectToDB();
    };

    public static getInstance(): Connection {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }
        return Connection.instance;
    }

    public async connectToDB() {
        try {
            await mongoose.connect(dbConnectionUrl);

        }
        catch (error: any) {
            console.log(error.message);
        }
    }

}

export default Connection;