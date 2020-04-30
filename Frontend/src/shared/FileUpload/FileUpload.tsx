import React from "react";
import { useRef } from "react";
import _FileUpload from "react-file-drop";

interface FileUpload {
  setFile: Function;
  onDrop: Function;
}

function FileUpload({ setFile: pushFile, onDrop, ...props }) {
  let ref = useRef(null);

  return (
    <div onClick={() => ref.current.click()}>
      <_FileUpload {...props} onDrop={onDrop} />
      <input type="file" name="file" ref={ref} onChange={(e) => pushFile(e.target.files[0])} style={{ display: "none" }} />
    </div>
  );
}

export default FileUpload;
