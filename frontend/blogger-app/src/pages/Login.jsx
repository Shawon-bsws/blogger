import { Form, Button, Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLogin,
  setSignup,
  setUserInfo,
  validate,
} from '../Redux/slices/dataSlice';
import axios from 'axios';
import { apiUrl } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn, setUserToken } from '../Redux/slices/stateSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData, signupData, errors } = useSelector(
    (state) => state.data.auth
  );

  const handleLoginChange = (e) => {
    dispatch(
      validate({
        ...loginData,
        [e.target.name]: e.target.value,
      })
    );
    dispatch(
      setLogin({
        ...loginData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSignupChange = (e) => {
    dispatch(
      validate({
        ...signupData,
        [e.target.name]: e.target.value,
      })
    );
    dispatch(
      setSignup({
        ...signupData,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).every((key) => !errors[key])) {
      try {
        const response = await axios.post(`${apiUrl}/app/login`, loginData);
        console.log(response.data);

        if (response?.data?.status) {
          const verifyResponse = await axios.post(
            `${apiUrl}/app/verifyToken`,
            {
              token: response.data.data,
            },
            {
              headers: {
                Authorization: response.data.data,
              },
            }
          );

          if (verifyResponse?.data?.status) {
            dispatch(
              setUserInfo({
                id: verifyResponse.data.data.id,
                name: verifyResponse.data.data.name,
              })
            );
            dispatch(setLogin({ email: '', password: '' }));
            dispatch(setLoggedIn(true));
            dispatch(setUserToken(response.data.data));
            navigate('/');
          }
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert('Something went wrong');
        }
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).every((key) => !errors[key])) {
      console.log(signupData);

      const response = await axios.post(`${apiUrl}/user/create`, {
        username: signupData.name,
        password: signupData.password,
        email: signupData.email,
      });

      if (response?.data?.status) {
        alert(response.data.message);
        dispatch(
          setSignup({ name: '', email: '', password: '', confirmPassword: '' })
        );
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    }
  };

  return (
    <div className="login-signup-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} className="bg-light p-5">
            <Tab.Container defaultActiveKey="login">
              <Nav variant="tabs" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* Login Form */}
                <Tab.Pane eventKey="login">
                  <Form onSubmit={handleLoginSubmit} className="mt-4">
                    <Form.Group controlId="loginEmail" className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                        isInvalid={!!errors.loginEmail}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.loginEmail}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="loginPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        isInvalid={!!errors.loginPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.loginPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3">
                        Login
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>

                {/* Signup Form */}
                <Tab.Pane eventKey="signup">
                  <Form onSubmit={handleSignupSubmit} className="mt-4">
                    <Form.Group controlId="signupName" className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="name"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        required
                        isInvalid={!!errors.signupName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.signupName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="signupEmail" className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        required
                        isInvalid={!!errors.signupEmail}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.signupEmail}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="signupPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        required
                        isInvalid={!!errors.signupPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.signupPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="signupConfirmPassword"
                      className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        required
                        isInvalid={!!errors.signupConfirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.signupConfirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3">
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
