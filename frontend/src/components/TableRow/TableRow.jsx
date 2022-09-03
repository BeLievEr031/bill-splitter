import React from "react";
import "./TableRow.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
function TableRow({ group, index }) {
  const navigate = useNavigate();
  const handleOpenGroup = () => {
    navigate(`details/${group._id}`);
  };
  return (
    <tr>
      <td className="grp-name">{group.groupname}</td>
      <td>{group.desc}</td>
      <td style={{ textAlign: "center" }}>{group.members.length}</td>
      <td style={{ textAlign: "center" }}>{group.expense}</td>
      <td className="action" onClick={handleOpenGroup}>
        <span className="open">open</span>
        <span className="material-symbols-outlined">open_in_new</span>
      </td>
    </tr>
  );
}

export default TableRow;
