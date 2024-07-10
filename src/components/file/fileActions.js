import service from "../../appwrite/config";

const downloadFile = async (fileId) => {
  try {
    const url = await service.getFileDownload(fileId);

    if (!url) {
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    alert("File downloaded");
  } catch (error) {
    alert(error.message);
    console.log("Files :: downloadFile() :: ", error);
  }
};

const shareFile = async (fileId) => {
  try {
    const res = await service.getFileDownload(fileId);
    if (!res) {
      alert("Failed");
      return;
    }
    const url = res.toString();
    await window.navigator.clipboard.writeText(url);
    alert("Link Copied", url);
  } catch (error) {
    alert(error.message);
    throw error;
  }
};

export { downloadFile, shareFile };

