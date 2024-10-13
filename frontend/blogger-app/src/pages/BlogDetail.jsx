import { useEffect, useState } from 'react';
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBlogDetails,
  setEditComment,
  setNewComment,
} from '../Redux/slices/dataSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config/config';

const BlogDetail = ({
  blog = {
    blog_master_id: 1,
    blog_title: 'Testing Blog Creation',
    blog_detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    blog_author_id: 1,
    blog_author_name: 'Peter Anderson',
    created_at: '2024-10-13T16:54:36.000Z',
    comments: '[]',
  },
}) => {
  const { id: blogId } = useParams();
  const dispatch = useDispatch();
  const { userInfo, newComment, editComment, blogDetails } = useSelector(
    (state) => state.data
  );
  const { user_token, isLoggedIn } = useSelector((state) => state.state);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchBlog = async () => {
        const response = await axios.get(`${apiUrl}/blogs/info/${blogId}`, {
          headers: { Authorization: user_token },
        });
        if (response.data.status) {
          dispatch(setBlogDetails(response.data.data));
          console.log(response.data.data);
        }
      };

      fetchBlog();
    }
  }, []);

  const [comments, setComments] = useState([
    {
      id: 11,
      userId: 122,
      username: 'User 1',
      comment: 'Comment 1',
      createdDate: '2024-01-01',
    },
    {
      id: 21,
      userId: 25,
      username: 'User 2',
      comment: 'Comment 2',
      createdDate: '2024-01-02',
    },
  ]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const commentData = {
        userId: userInfo.id,
        username: userInfo.name,
        comment: newComment,
        createdDate: new Date().toLocaleDateString(),
      };
      setComments([...comments, commentData]);
      dispatch(setNewComment(''));
    }
  };

  const handleEditClick = (comment) => {
    dispatch(
      setEditComment({
        ...editComment,
        id: comment.id,
        comment: comment.comment,
      })
    );
  };

  const handleSaveEdit = (commentId) => {
    // Update the comments array with the edited comment
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, comment: editComment.comment }
          : comment
      )
    );
    dispatch(setEditComment({ id: null, comment: '' }));
  };

  return (
    <Container className="mt-4">
      <div className="bg-light rounded-3 p-4">
        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>{blogDetails.blog_title}</Card.Title>
              <div className="float-end">
                {userInfo.id === blogDetails.blog_author_id && (
                  <>
                    <Button variant="link" size="sm">
                      <i className="bi bi-pen"></i>
                    </Button>
                    <Button variant="link" size="sm" style={{ color: 'red' }}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <Card.Text>{blogDetails.blog_detail}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              Author: {blogDetails.author}
            </Card.Subtitle>
            <Card.Text className="text-muted">
              Created on:{' '}
              {new Date(blogDetails.created_at).toLocaleDateString()}
            </Card.Text>
          </Card.Body>
        </Card>

        <h5>Comments</h5>
        <Form onSubmit={handleCommentSubmit} className="mb-5">
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => dispatch(setNewComment(e.target.value))}
            />
          </Form.Group>
          <Button
            size="sm"
            variant="primary"
            type="submit"
            className="float-end mt-1">
            Submit
          </Button>
        </Form>

        <ListGroup>
          {comments.map((comment, index) => (
            <ListGroup.Item key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <strong>{comment.username}</strong>
                {comment.userId === userInfo.id && (
                  <div className="float-end">
                    {editComment.id === comment.id ? (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleSaveEdit(comment.id)}>
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleEditClick(comment)}>
                          <i className="bi bi-pen"></i>
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          style={{ color: 'red' }}>
                          <i className="bi bi-trash"></i>
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {editComment.id === comment.id ? (
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={editComment.comment}
                  onChange={(e) =>
                    dispatch(
                      setEditComment({
                        ...editComment,
                        comment: e.target.value,
                      })
                    )
                  }
                />
              ) : (
                <p>{comment.comment}</p>
              )}

              <small className="text-muted">
                Created on: {comment.createdDate}
              </small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default BlogDetail;
