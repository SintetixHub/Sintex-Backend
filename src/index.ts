import config from "./config";
import Connection from "./services/dbConnection";
import app from "./services/server";

(async () => {
    try {
        await Connection.getInstance();
        app.listen(config.PORT, () => console.log("\n", "Connected to database and Server up! ->", "\x1b[1m",
            `http://localhost:${config.PORT}`,
            "\x1b[0m", "\n"));
    }
    catch (error) {
        console.log(error);
    }
})();