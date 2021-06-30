import React, {Dispatch, FunctionComponent, useCallback} from "react";
import {useDropzone} from "react-dropzone";

const DropZoneComponent: FunctionComponent<{setFile: Dispatch<any>}> = ({setFile}) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0])
  }, []);

  const {getRootProps, getInputProps, isDragAccept, isDragReject} = useDropzone(
    {
      onDrop,
      multiple: false,
      accept: "image/jpeg, image/png, audio/mpeg",
    }
  );
  return (
    <div className="p-4 w-full">
      <div
        {...getRootProps()}
        className="h-80 w-full rounded-md cursor-pointer focus:outline-none"
      >
        <input {...getInputProps()} />
        <div
          className={
            "flex flex-col items-center justify-center border-2 border-dashed border-yellow-light rounded-x1 h-full space-y-3" +
            (isDragReject === true ? "border-red-500" : "") +
            (isDragAccept === true ? "border-green-500" : "")
          }
        >
          <img src="/images/folder.png" alt="folder" className="h-16 w-16" />
          {isDragReject ? (
            <p>Sorry, This app only supports images and audio</p>
          ) : (
            <div>
              <p>Drag and drop files here</p>  
              <p className="mt-2 text-base text-gray-300">
                Only Jpg, png and mp3 files supported
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropZoneComponent;
