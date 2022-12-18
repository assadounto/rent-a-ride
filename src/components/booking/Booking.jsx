/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import './Booking.scss';
import Button from '../button/Button';
import { createBooking } from '../../redux/booking/booking';

const createDate = (dateStr) => {
  const dateArr = dateStr.split('-');
  return new Date(dateArr[0], parseInt(dateArr[1], 10) - 1, parseInt(dateArr[2], 10));
};

const Booking = (props) => {
  const {
    btnAxn,
    close,
    price,
    state,
    vehicle,
  } = props;

  const userState = useSelector((state) => state.user);
  const cars = useSelector((state) => state.vehicles.cars);
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = 1; // GET USER ID FROM THE SESSION

  const dateStart = useRef();
  const dateEnd = useRef();
  const form = useRef();
  const city = useRef();
  const car_id = useRef();

  const [days, setDays] = useState('---');
  const [cost, setCost] = useState('---');

  const calcDays = () => {
    const dateStartVal = dateStart.current.value;
    const dateEndVal = dateEnd.current.value;

    if ((dateStartVal !== '') && (dateEndVal !== '')) {
      const oneDay = 24 * 60 * 60 * 1000;

      const options = { style: 'currency', currency: 'USD' };
      const numberFormat = new Intl.NumberFormat('en-US', options);

      const diffDays = Math.round((createDate(dateEndVal) - createDate(dateStartVal)) / oneDay) + 1;
      const rentCost = diffDays * price;

      if (diffDays >= 0) {
        setDays(diffDays);
        setCost(numberFormat.format(rentCost));
      } else {
        setDays('---');
        setCost('---');
      }
    } else {
      setDays('---');
      setCost('---');
    }
  };

  const sendForm = () => {
    /* PUT SOME VALIDATION HERE */
    const dateStartVal = dateStart.current.value;
    const dateEndVal = dateEnd.current.value;
    const cityVal = city.current.value;
    const car_idVal = id || car_id.current.value;
    console.log(user);
    const booking = {
      car_id: car_idVal,
      start_date: dateStartVal,
      end_date: dateEndVal,
      city: cityVal,
    };

    dispatch(createBooking(booking));
  };
  return (
    <div className={state ? 'booking book-show' : 'booking book-hide'}>
      <div
        className={close ? 'closeBtn' : 'hide'}
        onClick={() => btnAxn(!state)}
      >
        <FaTimes className="icon" />
      </div>
      <h2>BOOKING</h2>
      <div className="centerForm">
        <form ref={form} action="#" method="post">
          <input type="hidden" name="user" value={user} />
          {!id && (
          <div className="add-margin-below">
            <label htmlFor="vehicle">Vehicle</label>
            <select
              name="vehicle"
              ref={car_id}
              className="form-field"
              required
            >
              {cars.map((car) => (
                <option key={car.id} value={car.id}>{car.name}</option>
              ))}
            </select>
          </div>
          )}
          <div className="add-margin-below">
            <label htmlFor="date-start">Start Date</label>
            <input
              type="date"
              ref={dateStart}
              id="date-start"
              name="date-start"
              placeholder="MM/DD/YYYY"
              className="form-field"
              onChange={calcDays}
              required
            />
          </div>

          <div className="add-margin-below">
            <label htmlFor="date-end">End Date</label>
            <input
              type="date"
              ref={dateEnd}
              id="date-end"
              name="date-end"
              placeholder="MM/DD/YYYY"
              className="form-field"
              onChange={calcDays}
              required
            />
          </div>

          <div className="add-margin-below">
            <label htmlFor="city">City</label>
            <input
              ref={city}
              type=""
              id="city"
              name="city"
              className="form-field"
              placeholder="city"
              required
            />
          </div>

          <div className="resume">
            <div>
              <span>Days</span>
              <h2>{days}</h2>
            </div>
            <div>
              <span>Cost</span>
              <h2>{cost}</h2>
            </div>
          </div>

          <div className="form-bottom-bar">
            <Button
              btnAxn={sendForm}
              iconEnd="check"
              label="Book now"
              size="main"
              color="dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

Booking.propTypes = {
  btnAxn: PropTypes.func,
  close: PropTypes.bool,
  state: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  price: PropTypes.string,
  vehicle: PropTypes.number,
};

Booking.defaultProps = {
  btnAxn: null,
  close: true,
  state: false,
  vehicle: null,
};

export default Booking;
