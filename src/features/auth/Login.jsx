import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Segment,
  Form,
  Header,
  Button,
  Icon,
  Message,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "./authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from "./auth.module.css";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    if (isFormValid()) {
      dispatch(loginUser({ email, password }))
        .then(unwrapResult)
        .then((loggedInUser) => {
          console.log(loggedInUser);
        })
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error]);
        });
    }
  };

  const isFormValid = () => Boolean(email) && Boolean(password);

  const displayErrors = () =>
    errors.map((error, key) => <p key={key}> {error.message}</p>);

  return (
    <Grid textAlign="center" verticalAlign="middle" className={styles.form}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="violet" icon>
          <Icon name="comment alternate outline" />
          {" İtirafci'ya Giriş Yap "}
        </Header>

        <Form>
          <Segment>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Email Adresi"
                onChange={(e) => setEmail(e.target.value)}
                icon="mail"
                iconPosition="left"
                name="email"
                type="email"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Parola"
                onChange={(e) => setPassword(e.target.value)}
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
              />
            </Form.Field>
          </Segment>

          <Button
            color="green"
            fluid
            size="large"
            onClick={handleSubmit}
            loading={loading === "pending"}
          >
            Giriş Yap
          </Button>
        </Form>
        {errors.length > 0 && <Message error>{displayErrors()}</Message>}
        <Message>
          <Icon name="help" />
          Hesabınız yok mu? <Link to="/register">Hesap Oluştur</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(Login);
