import {SizeInMB} from "libs/SizeInMB";
import {IFile} from "libs/types";
import React, {FunctionComponent} from "react";

const RenderFile: FunctionComponent<{file: IFile}> = ({
  file: {format, name, sizeInBytes},
}) => {
  return (
    <div className="flex items-center w-full p-4 my-2">
      <img src={`/images/${format}.png`} alt="" className="w-14 h-14" />
      <span className="mx-2">{name}</span>
      <span className="ml-auto">{SizeInMB(sizeInBytes)}</span>
    </div>
  );
};

export default RenderFile;
