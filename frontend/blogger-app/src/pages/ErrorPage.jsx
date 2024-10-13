import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="text-center">
        <Col>
          <h1 className="display-1">Oops!</h1>
          <h2 className="mb-4">Something Went Wrong</h2>
          <p className="mb-4">
            We're sorry, but something went wrong on our end. Please try again
            later.
          </p>
          <Button variant="primary" onClick={handleGoBack} className="me-2">
            Go Back
          </Button>
          <Button variant="secondary" onClick={handleHome}>
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
