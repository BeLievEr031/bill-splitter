import React from "react";

function SingalMember({ member, handleDeleteMemberFromGroup }) {
  return (
    <div className="sigl-member">
      <div className="user-member-detail">
        <div className="user-info">
          <div className="user-name">
            <b>{member.name}</b>
          </div>
          <div className="user-email">{member.email}</div>
        </div>
        <div className="close-btn">
          <span
            className="material-symbols-outlined"
            onClick={() => handleDeleteMemberFromGroup("member.email")}
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingalMember;
