/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createVehicle } from '../../redux/vehicles/vehicles';
import Button from '../../components/button/Button';

const NewScreen = () => {
  const dispatch = useDispatch();
  const form = useRef();
  const name = useRef();
  const image = useRef();
  const description = useRef();
  const price = useRef();
  const duration = useRef();
  const location = useRef();
  const [sucess, setSucess] = useState(false);

  const formSubmit = () => {
    const data = {
      name: name.current.value,
      image: image.current.value,
      description: description.current.value,
      price: price.current.value,
      duration: duration.current.value,
      location: location.current.value,
    };
    dispatch(createVehicle(data)).then(() => {
      form.current.reset();
      setSucess(true);
    });
  };

  return (
    <div className="container page-admin">
      <div className="info-container">
        <div>{sucess && 'Car created Sucessfully'}</div>
        <h1>Add new car</h1>

        <form ref={form} action="#" method="post">
          <div className="grid-display grid-simple">
            <div className="add-margin-below">
              <label htmlFor="brand">NAME</label>
              <input
                ref={name}
                type="text"
                id="brand"
                name="brand"
                placeholder="Ferrari"
                className="form-field"
                required
              />
            </div>
          </div>

          <div className="grid-display grid-double">
            <div className="add-margin-below">
              <label htmlFor="brand">DESCRIPTION</label>
              <input
                ref={description}
                type="text"
                id="model"
                name="model"
                placeholder="lorem ipsum"
                className="form-field"
                required
              />
            </div>

            <div className="add-margin-below grid-double">
              <label htmlFor="year">IMAGE</label>
              <input
                ref={image}
                type="text"
                id="year"
                name="year"
                placeholder="image"
                className="form-field"
                required
              />
            </div>
          </div>

          <div className="grid-display grid-double">
            <div className="add-margin-below grid-double">
              <label htmlFor="country">PRICE</label>
              <input
                ref={price}
                id="country"
                name="country"
                placeholder="Italia"
                className="form-field"
                required
              />
            </div>
          </div>

          <div className="grid-display grid-triple">
            <div className="add-margin-below">
              <label htmlFor="power">LOCATION</label>
              <input
                ref={location}
                type="text"
                id="power"
                name="power"
                placeholder="780 CV (574 kW)"
                className="form-field"
                required
              />
            </div>

            <div className="add-margin-below">
              <label htmlFor="max_speed">DURATION</label>
              <input
                ref={duration}
                id="max_speed"
                name="max_speed"
                placeholder="355 km/h"
                className="form-field"
                required
              />
            </div>
          </div>
          <div className="grid-flex">
            <Link to="/admin">
              Back to admin
            </Link>

            <Button
              btnAxn={formSubmit}
              label="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewScreen;
