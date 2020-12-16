import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import network from "../../services/network";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UpdateWebhookEvent({
  open = false,
  setOpen,
  getAllEvents,
  data,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [newName, setNewName] = useState(data.name);
  const handleSubmitNewEvent = async () => {
    try {
      await network.patch(`/api/v1/webhooks/admin/events/${data.id}`, {
        name: newName,
      });
      getAllEvents();
      setOpen(false);
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <div id="simple-modal-description">
        <Input
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Insert New Name..."
          value={newName}
        />{" "}
      </div>{" "}
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitNewEvent}
      >
        Update Event
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
