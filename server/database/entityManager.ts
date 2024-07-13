import { AppDataSource } from "./data-source"
import { List } from "./entity/List";

export const listRepo = AppDataSource.getRepository(List)