import { AppDataSource } from "./data-source"
import { Collection } from "./entity/Collection";

export const listRepo = AppDataSource.getRepository(Collection)