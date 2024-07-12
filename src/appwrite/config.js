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

  async getFileDownload(fileId) {
    try {
      const result = await this.bucket.getFileDownload(
        conf.appwriteBucketId,
        fileId
      );
      if (result) {
        return result.href; // Return the URL directly
      } else {
        console.log("Failed to download");
        return false;
      }
    } catch (error) {
      console.log("app-write Service :: getFileDownload() ::>>> ", error);
      return false;
    }
  }

  async fileDelete(fileId) {
    try {
      const response = await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );

      if (!response) {
        console.log("Failed to delete file");
      }
      return response;
    } catch (error) {
      console.log("app-write Service :: getFileDownload() ::>>> ", error);
      return false;
    }
  }
  async voteDocument(user, email, review, vote) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.voteCollection,
        ID.unique(),
        {
          user,
          email,
          review,
          vote,
        }
      );
      return response;
    } catch (error) {
      console.log("app-write Service :: voteDocument() ::>>> ", error);
      return false;
    }
  }
  async getVoteDocs() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.voteCollection
      );
      if (!response) {
        return false;
      }
      return response;
    } catch (error) {
      console.log("app-write Service :: getVoteDocs() ::>>> ", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
