import { Client, Databases, ID, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async serviceCreateFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  async serviceCreateDocument(fileId, metadata) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          fileId,
          metadata,
        }
      );
      return response;
    } catch (error) {
      console.log("app-write Service :: createDocument() ::>>> ", error);
      return false;
    }
  }

  async getPreview(fileId) {
    try {
      const response = await this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
      return response.href;
    } catch (error) {
      console.log("app-write Service :: getPreview() ::>>> ", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
