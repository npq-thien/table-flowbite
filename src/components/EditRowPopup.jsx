import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";

const EditRowPopup = ({ open, handleClose, data, handleSave }) => {
  console.log("edit", data);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  console.log(formData);

  return (
    <Modal show={open} onClose={handleClose}>
      <Modal.Header>Edit information</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{data?.name}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Accept</Button>
        <Button color="gray" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRowPopup;
