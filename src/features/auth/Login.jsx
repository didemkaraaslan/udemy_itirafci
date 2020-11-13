import React, { useState } from 'react';
import {
  Grid,
  Segment,
  Form,
  Header,
  Button,
  Icon,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
  };

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

          <Button color="green" fluid size="large" onClick={handleSubmit}>
            Griş Yap
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

export default Login;
