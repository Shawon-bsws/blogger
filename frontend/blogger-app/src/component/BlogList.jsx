import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  const navigate = useNavigate();

  return (
    <Row xs={1} md={1} className="g-4">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Col key={blog.blog_master_id}>
            <Card
              className="h-100"
              onClick={() => navigate(`/blog/${blog.blog_master_id}`)}
              style={{ cursor: 'pointer' }}>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-auto position-relative">
                  <div>
                    <Card.Title>{blog.blog_title}</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Author: {blog.user_name}
                    </Card.Subtitle>
                  </div>
                  <Card.Text className="text-end ms-auto position-absolute end-0 mt-4 mb-0">
                    <small>
                      Created on:{' '}
                      {new Date(blog.created_at).toLocaleDateString()}
                    </small>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <div className="text-center">
            <h5>No blogs found</h5>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default BlogList;
