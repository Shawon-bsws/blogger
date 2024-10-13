import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import BlogList from '../component/BlogList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../config/config';
import { setBlogs, setMyBlogs } from '../Redux/slices/dataSlice';

const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_token, isLoggedIn } = useSelector((state) => state.state);
  const { blogs, myBlogs, userInfo } = useSelector((state) => state.data);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchBlogs = async () => {
        const response = await axios.get(`${apiUrl}/blogs/list`, {
          headers: { Authorization: user_token },
        });
        if (response.data.status) {
          dispatch(setBlogs(response.data.data));
        }
      };

      const fetchMyBlogs = async () => {
        const response = await axios.get(
          `${apiUrl}/blogs/list/${userInfo.id}`,
          {
            headers: { Authorization: user_token },
          }
        );
        if (response.data.status) {
          dispatch(setMyBlogs(response.data.data));
        }
      };

      fetchBlogs();
      fetchMyBlogs();
    }
  }, []);

  return (
    <Container className="mt-4 ">
      <Row className="bg-light rounded-3 p-4">
        <Col md={10}>
          <Tab.Container defaultActiveKey="all">
            <Nav variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="all">All Blogs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="my">My Blogs</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="all">
                <BlogList blogs={blogs} />
              </Tab.Pane>
              <Tab.Pane eventKey="my">
                <BlogList blogs={myBlogs} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
        <Col md={2} className="d-flex align-items-start justify-content-end">
          <Button
            variant="primary"
            className="ms-auto"
            onClick={() => navigate('/create-blog')}>
            Create
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Blogs;
