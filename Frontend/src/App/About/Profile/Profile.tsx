import React from "react";

interface ProfileProps {
  imgUrl: string;
  name: string;
  role: string;
  githubUrl: string;
  linkedinUrl: string;
  tabIndex: number;
}

function Profile({ imgUrl, name, role, linkedinUrl, githubUrl, tabIndex }: ProfileProps) {
  return (
    <li className="profile">
      <div className="profile-pic">
        <img src={imgUrl} alt={`${name}, ${role} of Drishti`} title={name} />
      </div>
      <div className="profile-main">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
      <div className="profile-links">
        <a href={linkedinUrl} target="_blank" rel="noreferrer" className="linkedin" title={`${name}'s Linked-In`} tabIndex={tabIndex}>
          Linkedin
        </a>
        <a href={githubUrl} target="_blank" rel="noreferrer" className="github" title={`${name}'s GitHub`} tabIndex={tabIndex + 1}>
          GitHub
        </a>
      </div>
    </li>
  );
}

export default Profile;
