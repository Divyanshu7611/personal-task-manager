import { relations } from "drizzle-orm";
import { serial, text, varchar, integer, boolean, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";


// user table
export const users = pgTable("users",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    email:varchar("email",{length:255}).notNull().unique(),
    age:integer("age").notNull(),
    password:text("password").notNull(),
    phone:varchar("phone").notNull(),
    createdAt:timestamp("created_at")
})

// categories table
export const categories = pgTable("categories",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull().unique(),
    color:varchar("color",{length:10}).notNull()
})

// projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: integer("owner_id").references(() => users.id, { onDelete: "cascade" }).notNull(), // Owner ID
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
  code: uuid("code").defaultRandom().unique(), // Unique code for inviting members
  createdAt: timestamp("created_at").defaultNow(),
});


export const projectMembers = pgTable("project_members", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  role: varchar("role", { length: 20 }).default("member"), // "owner" or "member"
  createdAt: timestamp("created_at").defaultNow(),
});



// tasks table
export const tasks = pgTable("tasks",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    description:text("description"),
    projectId: integer("project_id").references(()=>projects.id,{onDelete:"cascade"}),
    completed:boolean("completed").default(false),
    createdAt:timestamp("created_at").defaultNow(),
})



