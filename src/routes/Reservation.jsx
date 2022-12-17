/* eslint linebreak-style: ["error", "windows"] */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBookings } from '../redux/booking/booking';
import { removeBooking } from '../redux/booking/booking';

const ReservationScreen = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(state=>state.bookings);
  const del_id = useRef();  
  useEffect(() => {
    dispatch(fetchBookings())
}, []);

  const bgimage = {
      vehicle_photo: 'model1a.jpg',
  }
 const  deleteHandler = (e) => {
    let del_id = e.target.id;
    console.log(del_id);
    dispatch(removeBooking(del_id)).then(() => {
      dispatch(fetchBookings());
    });
  }

  console.log(reservations.undefined);
  return (
    <div className="container page-reservation">
      {reservations.bookings.length==0 ? <h2>No Reservations</h2> : 
      <div className="info-container">
        {
          reservations.bookings.map((item) => (
            <article key={item.id}>
              <div className="main-info">
                <div
                  className="photo"
                  style={{ backgroundImage: `url(/assets/vehicles/${bgimage.vehicle_photo})` }}
                />
                <span>
                  <p>{item.city}</p>
                  <h2>
                    <Link to={`/detail/${item.car.id}`}>
                      {item.car.name}
                    </Link>
                  </h2>
                </span>
              </div>
              <div className="dateRange">
                <div>
                  <span className='range'>Start</span>
                  <p>{item.start_date}</p>
                </div>
                <div>
                  <span className='range'>End</span>
                  <p>{item.end_date}</p>
                </div>
                <div>
                  <button 
                  className='delete'
                  label='delete'
                  onClick={e=>deleteHandler(e)}
                  id={item.id}
                 >delete</button>
                    
                </div>
              </div>
            </article>
          ))
        }
      </div>
}
    </div>
  );
};

export default ReservationScreen;