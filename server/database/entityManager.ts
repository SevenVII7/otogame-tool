import { AppDataSource } from "./data-source"
import { Collection } from "./entity/Collection";

export const collectionRepo = AppDataSource.getRepository(Collection)