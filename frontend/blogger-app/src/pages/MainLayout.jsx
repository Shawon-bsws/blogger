import CustomNavbar from '../component/CustomNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('Not logged in', isLoggedIn);
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
};
