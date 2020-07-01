import React from "react";

interface ProfileProps {
  imgUrl: string;
  name: string;
  githubUrl: string;
  linkedinUrl: string;
}

function Profile({ imgUrl, name, linkedinUrl, githubUrl }: ProfileProps) {
  return (
    <div className="profile">
      <div className="profile-pic">
        <img src={imgUrl} alt="Profile" />
      </div>
      <div className="profile-main">
        <h3>{name}</h3>
      </div>
      <div className="profile-links">
        <a href={linkedinUrl} target="_blank" rel="noreferrer" className="linkedin">
          Linkedin
        </a>
        <a href={githubUrl} target="_blank" rel="noreferrer" className="github">
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Profile;
