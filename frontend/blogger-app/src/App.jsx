import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Route';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
