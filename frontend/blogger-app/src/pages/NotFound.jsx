import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="text-center">
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="mb-4">
            Oops! The page you're looking for doesn't exist. It might have been
            removed or the URL might be incorrect.
          </p>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
