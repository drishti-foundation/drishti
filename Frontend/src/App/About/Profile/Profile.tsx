import React from "react";

interface ProfileProps {
  imgUrl: string;
  name: string;
  role: string;
  githubUrl: string;
  linkedinUrl: string;
}

function Profile({ imgUrl, name, role, linkedinUrl, githubUrl }: ProfileProps) {
  return (
    <li className="profile">
      <div className="profile-pic">
        <img src={imgUrl} alt={`${name}, ${role} of Drishti`} title={name} />
      </div>
      <div className="profile-main">
        <h6>{name}</h6>
        <p>{role}</p>
      </div>
      <div className="profile-links">
        <a href={linkedinUrl} target="_blank" rel="noreferrer" className="linkedin" title={`${name}'s Linked-In`}>
          Linkedin
        </a>
        <a href={githubUrl} target="_blank" rel="noreferrer" className="github" title={`${name}'s GitHub`}>
          GitHub
        </a>
      </div>
    </li>
  );
}

export default Profile;
