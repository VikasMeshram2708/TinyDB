import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

type Document = { id: string; [key: string]: any };
type Query = { [key: string]: any };

class TinyDB {
  private collections: { [key: string]: Document[] } = {};
  private persistenceFile: string | null;

  constructor(persistenceFile?: string) {
    this.collections = {};
    this.persistenceFile = persistenceFile || null;

    if (this.persistenceFile) {
      this.loadFromFile();
    }
  }

  private persistToFile(): void {
    if (this.persistenceFile) {
      fs.writeFileSync(
        this.persistenceFile,
        JSON.stringify(this.collections, null, 2)
      );
    }
  }

  private loadFromFile(): void {
    if (this.persistenceFile && fs.existsSync(this.persistenceFile)) {
      const data = fs.readFileSync(this.persistenceFile, "utf-8");
      this.collections = JSON.parse(data);
    }
  }

  /**
   * Insert a New Document inot a specified collection
   * @param collectionName Name of the collection
   * @param data Document to be Inserted
   * @returns Unique Identifier of the inserted document
   */

  insert(collectionName: string, data: object): string {
    if (!this.collections[collectionName]) {
      this.collections[collectionName] = [];
    }

    // Generate a Unique Id
    const documentId = uuidv4();

    const document = {
      id: documentId,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.collections[collectionName].push(document);
    this.persistToFile();
    return documentId;
  }

  /**
   * Find Documents in a collection based on optional query
   * @param collectionName Name of the collection
   * @param query Optional filtering criteria
   * @returns Array of matching documents
   */

  find(collectionName: string, query?: Query): Document[] {
    const collection = this.collections[collectionName] || [];

    if (!query) return collection;

    return collection.filter((doc) =>
      Object.entries(query).every(([key, value]) => doc[key] === value)
    );
  }

  /**
   * Get All collection names
   * @returns Array of collection names
   */
  getCollections(): string[] {
    return Object.keys(this.collections);
  }
}

export default TinyDB;
