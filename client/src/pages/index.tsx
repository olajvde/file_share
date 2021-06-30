// import Delete from "@components/Delete";
import {useState} from "react";
import DropZoneComponent from "@components/DropZoneComponent";
import RenderFile from "@components/RenderFile";
import axios from "axios";
import DownloadFile from "@components/DownloadFile";

export default function Home() {
  const [file, setFile] = useState(null);

  const [id, setId] = useState(null);
  const [downloadPageLink, setdownloadPageLink] = useState(null);
  const [uploadState, setuploadState] =
    useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    setuploadState("Uploading");

    const formData = new FormData();
    formData.append("myFile", file);

    try {
      const {data} = await axios({
        method: "post",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setdownloadPageLink(data.downloadPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error.response.data);
      setuploadState("Upload Failed");
    }
  };
  const resetComponent = () => {
    setFile(null);
    setdownloadPageLink(null);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium">Share a File? ⚡</h1>
      <div className="w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center">
        {!downloadPageLink && <DropZoneComponent setFile={setFile} />}

        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}

        {/* upload button */}
        {!downloadPageLink && file && (
          <button
            className="w-44 bg-gray-900 p-2 my-5 rounded-md focus:outline-none"
            onClick={handleUpload}
          >
            {uploadState}
          </button>
        )}
        {downloadPageLink && (
          <div>
            <DownloadFile downloadPageLink={downloadPageLink} />
            <button
              className="w-44 bg-gray-900 p-2 my-5 rounded-md focus:outline-none"
              onClick={resetComponent}
            >
              Upload New file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
