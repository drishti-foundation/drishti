import React from "react";
import { useRef } from "react";
import DrageFileUpload, { IFileDropProps } from "react-file-drop";

interface FileUploadProps extends IFileDropProps {
  setFile: (file: File | null) => void;
}

function FileUpload({ setFile: pushFile, ...props }: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div onClick={() => ref.current?.click()} className="file-upload">
      <DrageFileUpload {...props} onDrop={(files) => files && pushFile(files[0])} />
      <input
        type="file"
        name="file"
        ref={ref}
        onChange={(e) => e.target.files && pushFile(e.target.files[0])}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default FileUpload;
