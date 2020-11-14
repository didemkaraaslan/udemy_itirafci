import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { Modal, Button, Form, Message, Dropdown } from "semantic-ui-react";
import { createConfession } from "./confessionSlice";
import { tagOptions } from "../../utils/Tags";
import { unwrapResult } from "@reduxjs/toolkit";

const AddConfessionForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.firebase);

  const [status, setStatus] = useState("idle");
  const [content, setContent] = useState("");
  const [shareAs, setShareAs] = useState("anonymous");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState([]);

  const makeConfession = () => {
    if (canSave) {
      setStatus("pending");
      setErrors([]);

      dispatch(createConfession({ content, tags, shareAs, profile }))
        .then(unwrapResult)
        .then((result) => {
          setStatus("idle");

          // Clear form
          setContent("");
          setTags([]);
          setShareAs("user");
          handleClose();
        })
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error]);
          setStatus("idle");
        });
    }
  };

  const displayErrors = () =>
    errors.map((error, key) => <p key={key}>{error.message}</p>);

  const canSave =
    [content, tags, shareAs].every(Boolean) &&
    tags.length >= 1 &&
    status === "idle";

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>Hadi itiraf et!</Modal.Header>
      <Modal.Description>
        <p
          style={{
            margin: "5px 0px 5px 10px",
            fontSize: "0.9rem",
            color: "#928D8E",
          }}
        >
          Sırrınızı halkla{" "}
          <strong>
            <ins>anonim olarak</ins>
          </strong>{" "}
          veya{" "}
          <strong>
            <ins>tam isminizi kullanarak paylaşın</ins>
          </strong>
        </p>
      </Modal.Description>
      <Modal.Content scrolling>
        <Form>
          <Form.TextArea
            id="content"
            label="Neyi itiraf ediyorsun?"
            placeholder="Bize her şeyi anlat..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Form.Group grouped>
            <label>Nasıl itiraf etmek istersin?</label>
            <Form.Radio
              label="Anonim olarak"
              value="anonymous"
              checked={shareAs == "anonymous"}
              onChange={(e, { value }) => setShareAs(value)}
            />
            <Form.Radio
              label="Kullanıcı Adımla"
              value="user"
              checked={shareAs == "user"}
              onChange={(e, { value }) => setShareAs(value)}
            />
          </Form.Group>

          <Dropdown
            id="tags"
            selection
            clearable
            multiple
            header={
              <Dropdown.Header content={"Etikete göre filtrele"} icon="tags" />
            }
            value={tags}
            label="İtirafınızı hangisi daha iyi tanımlar?"
            labeled
            options={tagOptions}
            onChange={(e, { value }) => setTags(value)}
            placeholder="İtirafınızı en uygun hangileri tarif eder"
          />
        </Form>
        {errors.length > 0 && <Message error>{displayErrors()}</Message>}
      </Modal.Content>

      <Modal.Actions>
        <Button primary disabled={!canSave} onClick={() => makeConfession()}>
          YAYINLA
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddConfessionForm;
