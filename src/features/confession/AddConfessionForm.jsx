import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { Modal, Button, Form, Message, Dropdown } from "semantic-ui-react";
import { tagOptions } from "../../utils/Tags";

const AddConfessionForm = ({ open, handleClose }) => {
  const [content, setContent] = useState("");
  const [shareAs, setShareAs] = useState("anonymous");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState([]);

  const makeConfession = () => {};

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
      </Modal.Content>

      <Modal.Actions>
        <Button primary onClick={() => makeConfession()}>
          YAYINLA
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddConfessionForm;
