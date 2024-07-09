import { Client, Databases, Storage } from "appwrite";
import { useEffect, useState } from "react";
import conf from "../conf/conf";

const useUserFiles = (userData) => {
  const [filesData, setFilesData] = useState([0, 0, 0, 0, 0]);
  const [total, setTotal] = useState(0);
  const [allFiles, setAllFiles] = useState()
  useEffect(() => {
    const client = new Client();
    client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

    const databases = new Databases(client);
    const storage = new Storage(client);

    const fetchFilesData = async () => {
      const getFiles = async () => {
        const response = await storage.listFiles(conf.appwriteBucketId);
        return response.files;
      };

      const getDocs = async () => {
        const response = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId
        );
        return response.documents;
      };

      const userFiles = async () => {
        const files = await getFiles();
        const docs = await getDocs();

        const userDocs = docs.filter(
          (doc) => JSON.parse(doc.metaData).user === userData.$id
        );
        const filteredFiles = files.filter((file) =>
          userDocs.some((doc) => doc.fileId === file.$id)
        );
        setAllFiles(filteredFiles)
        setTotal(filteredFiles.length);

        const categories = {
          Documents: 0,
          Images: 0,
          Video: 0,
          Audio: 0,
          Others: 0,
        };

        filteredFiles.forEach((file) => {
          const type = file.mimeType;
          if (type.includes("image")) {
            categories.Images += 1;
          } else if (type.includes("video")) {
            categories.Video += 1;
          } else if (type.includes("audio")) {
            categories.Audio += 1;
          } else if (
            type.includes("document") ||
            type.includes("text") ||
            type.includes("pdf") ||
            type.includes("word") ||
            type.includes("excel") ||
            type.includes("powerpoint")
          ) {
            categories.Documents += 1;
          } else {
            categories.Others += 1;
          }
        });

        setFilesData([
          categories.Documents,
          categories.Images,
          categories.Video,
          categories.Audio,
          categories.Others,
        ]);
      };

      userFiles();
    };

    fetchFilesData();
  }, [userData]);

  return { filesData, total, userData, allFiles };
};

export default useUserFiles;
