/* eslint linebreak-style: ["error", "windows"] */
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useEffect, React } from 'react';
import { useDispatch } from 'react-redux';
import { autoLogin } from './redux/user/user';
import Navbar from './components/navbar/Navbar';
import AboutScreen from './routes/About';
import AdminScreen from './routes/admin/Admin';
import BookingScreen from './routes/Booking';
import DetailScreen from './routes/Detail';
import EditScreen from './routes/admin/Edit';
import HomeScreen from './routes/Home';
import NewScreen from './routes/admin/New';
import ReservationScreen from './routes/Reservation';
import LoginScreen from './routes/Login';
import SignupScreen from './routes/Signup';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(autoLogin());
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<LoginScreen />} path="/login" />
        <Route element={<SignupScreen />} path="/signup" />
        <Route element={<HomeScreen />} path="/models" />
        <Route element={<AboutScreen />} path="/about" />
        <Route element={<HomeScreen />} index />
        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminScreen />} path="/admin" />
          <Route element={<NewScreen />} path="/admin/new" />
          <Route element={<EditScreen />} path="/admin/edit/:id" />
          <Route element={<BookingScreen />} path="/booking" />
          <Route element={<DetailScreen />} path="/models/:id" />
          <Route element={<ReservationScreen />} path="/reservation" />
        </Route>

        <Route
          element={(
            <section className="flex-center">
              <div className="container text-center">404 Page not found</div>
            </section>
          )}
          path="*"
        />
      </Routes>
    </Router>
  );
}

export default App;
