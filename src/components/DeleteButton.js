import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteButton = ({ onDelete, item, label }) => {
  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      {label || 'Delete'}
    </Button>
  );
};

export default DeleteButton;