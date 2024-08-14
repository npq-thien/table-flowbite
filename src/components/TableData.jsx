import {
  Button,
  Checkbox,
  Modal,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaSearch, FaEdit, FaPlus } from "react-icons/fa";
import { rowData as initialRowData } from "../constants/data";
import DeleteRowPopup from "./DeleteRowPopup";

const TableData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteMultiple, setOpenDeleteMultiple] = useState(false);
  const [listDeletedName, setListDeletedName] = useState([]);

  const [currentRowData, setCurrentRowData] = useState(null);
  const [rowData, setRowData] = useState(initialRowData);
  const [filteredRows, setFilteredRows] = useState(rowData); // this state for search, sort, filter
  const [paginationRows, setPaginationRows] = useState(filteredRows); // for pagination, depends on filtered row

  const onPageChange = (page) => setCurrentPage(page);

  const handleSelectAllRows = (e) => {
    if (e.target.checked) {
      const allRowIds = rowData.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Delete row
  const handleDeleteRow = (id) => {
    const row = rowData.find((r) => r.id === id);
    setCurrentRowData(row);
    setOpenDelete(true);
  };

  const handleConfirmDelete = (id) => {
    const updatedRow = rowData.filter((r) => r.id !== id);
    setRowData(updatedRow);
    setFilteredRows(updatedRow);
    setOpenDelete(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Delete multiple rows
  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRow) =>
      prevSelectedRow.includes(id)
        ? prevSelectedRow.filter((rowId) => rowId !== id)
        : [...prevSelectedRow, id]
    );
  };

  const handleDeleteMultipleRows = () => {
    // console.log('first', selectedRows);
    // setListDeletedName(selectedRows.map((index) => rowData[index].name));
    setListDeletedName(
      rowData
        .filter((row) => selectedRows.includes(row.id)) // Filter rows where the ID is in selectedRows
        .map((row) => row.name)
    ); 
    setOpenDeleteMultiple(true);
  };

  const handleCloseDeleteMultiple = () => {
    setOpenDeleteMultiple(false);
  };

  const handleConfirmDeleteMultipleRows = () => {
    const updatedRow = rowData.filter((row) => !selectedRows.includes(row.id));
    setRowData(updatedRow);
    setFilteredRows(updatedRow);
    setSelectedRows([]);
    setOpenDeleteMultiple(false);
  };

  // Search
  const handleSearchValue = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setFilteredRows(rowData);
    } else {
      const searchedRows = rowData.filter((row) =>
        Object.entries(row).some(([key, field]) =>
          field.toString().toLowerCase().includes(value)
        )
      );
      setFilteredRows(searchedRows);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center my-4">
        <TextInput
          type="text"
          placeholder="Search"
          icon={FaSearch}
          onChange={handleSearchValue}
          // required
        />
        <div className="flex items-center gap-2">
          <Button className="bg-green-400" color="success">
            <div className="flex-center gap-2">
              <FaPlus className="w-6 h-6" />
              Add row
            </div>
          </Button>
          <Button
            className="bg-red-500"
            color="failure"
            onClick={handleDeleteMultipleRows}
          >
            <div className="flex-center gap-2">
              <MdDelete className="w-6 h-6" />
              Delete rows
            </div>
          </Button>
        </div>
      </div>

      <Table striped={true} hoverable={true} className="shadow-md w-full">
        <TableHead>
          <Table.HeadCell>
            <Checkbox
              className="cursor-pointer"
              onChange={handleSelectAllRows}
              checked={selectedRows.length === rowData.length}
            />
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
          {filteredRows.map((row) => (
            <TableRow key={row.id} className="bg-white">
              <TableCell>
                <Checkbox
                  className="cursor-pointer"
                  onChange={() => handleSelectRow(row.id)}
                  checked={selectedRows.includes(row.id)}
                />
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
                  <FaEdit className="w-4 h-4" />
                </Button>
                <Button
                  className="bg-red-400"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <MdDelete className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          showIcons
          currentPage={currentPage}
          totalPages={Math.floor(rowData.length / 5) + 1}
          onPageChange={onPageChange}
        />
      </div>

      {/* Popup confirm delete multiple rows */}
      <Modal show={openDeleteMultiple} onClose={handleCloseDeleteMultiple}>
        <Modal.Header>Confirm deletion</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Do you want to delete
              <span className="text-red-500">
                {" "}
                {listDeletedName ? listDeletedName.join(", ") : "these data"} ?
              </span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleConfirmDeleteMultipleRows}>Accept</Button>
          <Button color="gray" onClick={handleCloseDeleteMultiple}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete confirm popup */}
      <DeleteRowPopup
        open={openDelete}
        handleClose={handleCloseDelete}
        data={currentRowData}
        handleDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default TableData;
