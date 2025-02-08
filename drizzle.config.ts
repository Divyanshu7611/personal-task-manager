import { config } from "dotenv";

config();

export default {
    schema:'db/schemas',
    out:"db/migration",
    dialect:"postgresql",
    dbCredentials:{
        url: process.env.DATABASE_URL,
    }
}