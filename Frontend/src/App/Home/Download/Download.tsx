import * as React from "react";

interface Download {
  className: String;
  link: String;
}

function Download({ className, link, ...props }) {
  return (
    <a {...props} target="_blank" className={className} href={`/${link}`}>
      Download
    </a>
  );
}

export default Download;
