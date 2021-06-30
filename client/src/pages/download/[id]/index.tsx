import axios from "axios";
import RenderFile from "@components/RenderFile";
import {GetServerSidePropsContext, NextPage} from "next";
import React from "react";
import {IFile} from "libs/types";
import fileDownload from "js-file-download";

const index: NextPage<{file: IFile}> = ({
  file: {format, name, sizeInBytes, id},
}) => {
  const handleDownload = async () => {
    const {data} = await axios.get(
      `http://localhost:8000/api/files/${id}/download`,
      {
        responseType: "blob",
      }
    );

    fileDownload(data, name);
  };

  return (
    <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-x1">
      {!id ? (
        <span>Oops!, File does not exist</span>
      ) : (
        <>
          <img src="/images/file-download.png" alt="" className="w-16 h-16" />
          <h1 className="text-xl">Your File is ready to be downloaded</h1>
          <RenderFile file={{format, sizeInBytes, name}}></RenderFile>
          <button
            className="w-44 bg-gray-900 p-2 my-5 rounded-md focus:outline-none"
            onClick={handleDownload}
          >
            download
          </button>
        </>
      )}
    </div>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {id} = context.query;
  let file;
  try {
    const {data} = await axios.get(`http://localhost:8000/api/files/${id}`);
    file = data;
  } catch (error) {
    console.log(error.response.data);
    file = {};
  }

  return {
    props: {
      file,
    },
  };
}
