import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const budgetTable = pgTable("budget", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: integer("amount").notNull(),
  Icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const incomeTable = pgTable("income", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: integer("amount").notNull(),
  Icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const expenseTable = pgTable("expense", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  //   1 - many relationship
  budgetID: integer("budgetID").references(() => budgetTable.id),
  createdBy: varchar("createdBy").notNull(),
});
