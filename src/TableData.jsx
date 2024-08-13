import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { rowData } from "./constants/data";

const TableData = () => {
  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center my-4">
        <TextInput
          type="text"
          placeholder="Search"
          icon={FaSearch}
          // required
        />
        <div className="flex items-center gap-2">
          <Button className="bg-green-400" color="success">
            Add row
          </Button>
          <Button className="bg-red-500" color="failure">
            Delete rows
          </Button>
        </div>
      </div>

      <Table striped={true} hoverable={true}>
        <TableHead>
          <Table.HeadCell>
            <Checkbox className="cursor-pointer" />
          </Table.HeadCell>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Age</TableHeadCell>
          <TableHeadCell>Gender</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {rowData.map((row) => (
            <TableRow key={row.id} className="bg-white">
              <TableCell>
                <Checkbox className="cursor-pointer"/>
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell className="flex gap-2">
                <Button className="bg-blue-500">
                  <FaEdit />
                </Button>
                <Button className="bg-red-400">
                  <MdDeleteForever />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableData;
