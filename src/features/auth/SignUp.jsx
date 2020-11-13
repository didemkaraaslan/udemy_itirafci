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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, email, password, passwordConfirm, gender });
  };

  const displayErrors = () =>
    errors.map((error, key) => <p key={key}> {error.message}</p>);

  return (
    <Grid textAlign="center" verticalAlign="middle" className={styles.form}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="violet" icon>
          <Icon name="comment alternate outline" />
          {" İtirafci'ya Kaydol "}
        </Header>

        <Form>
          <Segment>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Kullanıcı Adı"
                onChange={(e) => setUsername(e.target.value)}
                icon="users"
                iconPosition="left"
                name="username"
                type="text"
              />
            </Form.Field>
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
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Parola (Tekrar)"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                icon="repeat"
                iconPosition="left"
                name="passwordConfirmation"
                type="password"
              />
            </Form.Field>
          </Segment>

          <Segment>
            <Form.Group inline>
              <label>Cinsiyet</label>
              <Form.Radio
                label="Erkek"
                name="radioGroup"
                value="male"
                checked={gender === 'male'}
                onChange={(e, { value }) => setGender(value)}
              />
              <Form.Radio
                label="Kadın"
                name="radioGroup"
                value="female"
                checked={gender === 'female'}
                onChange={(e, { value }) => setGender(value)}
              />
            </Form.Group>
          </Segment>

          <Button color="green" fluid size="large" onClick={handleSubmit}>
            Kaydol
          </Button>
        </Form>
        {errors.length > 0 && <Message error>{displayErrors()}</Message>}
        <Message>
          <Icon name="help" />
          Zaten bir hesabınız var mı?{' '}
          <Link to="/login">Buradan giriş yapın</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
