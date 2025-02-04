import {drizzle} from "drizzle-orm/node-postgres"
import {Pool} from "pg";
import * as Schema from "../db/schemas"
import {config} from "dotenv";

config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || ""
})

export const db = drizzle(pool,{schema: Schema})