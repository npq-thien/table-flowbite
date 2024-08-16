import { TableCell } from "flowbite-react";
import React, { useState } from "react";

const EditableTableRow = ({ row, onDoubleClick, handleEditRow }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleDoubleClick = () => {
    // console.log('run')
    setIsDisabled(false);
  };

  return (
    <>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          disabled={isDisabled}
          className="w-12 disabled:text-black rounded-xl"
          type="text"
          value={row.id}
        />
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          disabled={isDisabled}
          type="text"
          value={row.name}
          className="disabled:text-black rounded-xl"
        />
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          disabled={isDisabled}
          type="number"
          value={row.age}
          className="w-16 disabled:text-black rounded-xl"
        />
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <select
          disabled={isDisabled}
          type="text"
          value={row.gender}
          className="disabled:text-black rounded-xl"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <input
          disabled={isDisabled}
          type="email"
          value={row.email}
          className="min-w-60 disabled:text-black rounded-xl"
        />
      </TableCell>
      <TableCell onDoubleClick={handleDoubleClick}>
        <select
          disabled={isDisabled}
          type="text"
          value={row.status}
          className="disabled:text-black rounded-xl"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Expired">Expired</option>
        </select>
      </TableCell>
    </>
  );
};

export default EditableTableRow;
