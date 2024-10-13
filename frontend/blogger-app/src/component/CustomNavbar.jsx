import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setProfileDropdown } from '../Redux/slices/stateSlice';
import { stringToColor } from '../utils/colors/stringToColor';
import axios from 'axios';
import { apiUrl } from '../config/config';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.data);
  const { user_token } = useSelector((state) => state.state);
  const { profileDropdown } = useSelector((state) => state.state);

  const handleToggleDropdown = () => {
    dispatch(setProfileDropdown(!profileDropdown));
    // setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    const response = await axios.get(`${apiUrl}/app/logout`, {
      headers: {
        Authorization: user_token,
      },
    });
    if (response.status) {
      dispatch(setProfileDropdown(false));
      dispatch(setLoggedIn(false));
      navigate('/login');
    }
    // Add your logout logic here
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown
            show={profileDropdown}
            onToggle={handleToggleDropdown}
            align="end">
            <Dropdown.Toggle
              variant="light"
              as="div"
              id="dropdown-custom-components"
              className="d-flex align-items-center">
              <div
                style={{
                  backgroundColor: stringToColor(userInfo.name),
                  color: 'white',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                }}>
                {userInfo.name.charAt(0)}
              </div>
              <span className="ms-2">{userInfo.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
