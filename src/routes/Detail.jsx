/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint linebreak-style: ["error", "windows"] */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../components/backbutton/BackButton';
import Booking from '../components/booking/Booking';
import Button from '../components/button/Button';
// import Gallery from '../components/gallery/Gallery';
import { fetchVehicle } from '../redux/vehicles/vehicles';
import Spinner from '../components/spinner';

const DetailScreen = () => {
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => state.vehicles);
  const { id } = useParams();
  const [bookVisible, setBookVisible] = useState(false);

  const showBooking = () => setBookVisible(!bookVisible);

  useEffect(() => {
    dispatch(fetchVehicle(id));
  }, []);

  return (
    vehicle.loading ? <Spinner />
      : (
        <div className="container" style={{ backgroundImage: `url(${vehicle.car.image})` }}>
          <div className="whiteCortain">
            <div className="detailBox">
              <h1>{vehicle.car.name}</h1>
              <p>
                {vehicle.car.description}
              </p>

              <table className="detail-table">
                <tbody>
                  <tr>
                    <td>Price</td>
                    <td className="text-end">{vehicle.car.price}</td>
                  </tr>
                  <tr>
                    <td>Rented?</td>
                    <td className="text-end">{vehicle.car.rented ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Duration (months)</td>
                    <td className="text-end">{vehicle.car.duration}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td className="text-end">{vehicle.car.location}</td>
                  </tr>
                </tbody>
              </table>

              <Button
                btnAxn={showBooking}
                iconStart="calendar"
                iconEnd="arrow"
                label="Booking"
                size="main"
              />
            </div>
          </div>

          <BackButton />
          <Booking
            vehicle={vehicle.car.id}
            price={vehicle.car.price}
            state={bookVisible}
            btnAxn={showBooking}
          />
        </div>
      )

  );
};

export default DetailScreen;
