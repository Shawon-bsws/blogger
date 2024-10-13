import { Form, Button, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogData } from '../Redux/slices/dataSlice';
import axios from 'axios';
import { apiUrl } from '../config/config';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogData } = useSelector((state) => state.data);
  const { user_token } = useSelector((state) => state.state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/blogs/create`,
        { title: blogData.title, details: blogData.content },
        { headers: { Authorization: user_token } }
      );

      if (response.data.status) {
        navigate('/');
        dispatch(setBlogData({ title: '', content: '' }));
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
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 bg-light">
        <h2>Create a New Blog</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="blogTitle" className="mb-3">
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={blogData.title}
              onChange={(e) =>
                dispatch(setBlogData({ ...blogData, title: e.target.value }))
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="blogContent" className="mb-3">
            <Form.Label>Blog Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Write your blog here..."
              value={blogData.content}
              onChange={(e) =>
                dispatch(setBlogData({ ...blogData, content: e.target.value }))
              }
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="float-end">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateBlog;
