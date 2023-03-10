/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint linebreak-style: ["error", "windows"] */
import { useRef, React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchBookings, removeBooking } from '../redux/booking/booking';
import Spinner from '../components/spinner';

const ReservationScreen = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.bookings);
  const del_id = useRef();
  useEffect(() => {
    dispatch(fetchBookings());
  }, []);

  const bgimage = {
    vehicle_photo: 'model1a.jpg',
  };
  const deleteHandler = (e) => {
    const del_id = e.target.id;
    dispatch(removeBooking(del_id)).then(() => {
      dispatch(fetchBookings());
    });
  };

  return (
    reservations.loading ? <Spinner />
      : (
        <div className="container page-reservation">

          {reservations.bookings.length === 0 ? <h2>No Reservations</h2>
            : (
              <div className="info-container">
                <h2 className="txa">My Reservations</h2>
                {
          reservations.bookings.map((item) => (
            <article key={item.id} className="article">
              <div className="main-info">
                <img
                  alt={item.car.name}
                  src={item.car.image}
                  className="photo"
                />
                <span>
                  <p>{item.city}</p>
                  <h2>

                    {item.car.name}

                  </h2>
                </span>
              </div>
              <div className="dateRange">
                <div>
                  <span className="range">Start</span>
                  <p>{item.start_date}</p>
                </div>
                <div>
                  <span className="range">End</span>
                  <p>{item.end_date}</p>
                </div>
                <div>
                  <button
                    className="delete"
                    label="delete"
                    onClick={(e) => deleteHandler(e)}
                    id={item.id}
                  >
                    Cancel

                  </button>

                </div>
              </div>
            </article>
          ))
        }
              </div>
            )}
        </div>
      )
  );
};

export default ReservationScreen;
