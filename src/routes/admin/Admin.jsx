/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint linebreak-style: ["error", "windows"] */
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadImages from '../../components/uploadimages/UploadImages';
import Button from '../../components/button/Button';
import { fetchVehicles, removeVehicle } from '../../redux/vehicles/vehicles';

const AdminScreen = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [vehicleSelected, setvehicleSelected] = useState({ id: 0, model: 'undefined' });
  const [isIntruder, setIsIntruder] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (user.user.role == 'admin') {
      setIsIntruder(false);
      dispatch(fetchVehicles());
    } else {
      setIsIntruder(true);
    }
  }, []);

  const vehicles = useSelector((state) => state.vehicles.cars);

  const showUpload = (car = null) => {
    if (car) setvehicleSelected(car);
    setUploadVisible(!uploadVisible);
  };

  const handledelete = (id) => {
    // eslint-disable-next-line no-unused-vars
    dispatch(removeVehicle(id)).then((_res) => {
      dispatch(fetchVehicles());
    });
  };

  const addVehicle = () => navigate('/admin/new', { replace: true }, [navigate]);

  if (isIntruder) {
    return (
      <div className="container page-admin">
        <h1>You need admin access for this page</h1>
      </div>
    );
  }

  return (
    <div className="container page-admin">
      <div className="info-container">
        <Button
          btnAxn={addVehicle}
          label="Add"
        />
        <br />

        {
          vehicles.map((car) => (
            <article key={car.id}>
              <div className="main-info">
                <p>{`${car.id}. ${car.name} ${car.price}`}</p>
              </div>
              <div className="text-end">
                <Button
                  btnAxn={showUpload}
                  label="Images"
                  value={car}
                  size="small"
                />
                <button className="delete" onClick={(_e) => { handledelete(car.id); }}>
                  Delete
                </button>
              </div>
            </article>
          ))
        }

        <table className="table-admin" style={{ display: 'none' }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Cover</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              vehicles.map((car) => (
                <tr key={car.id}>
                  <td className="text-center">{car.id}</td>
                  <td>image</td>
                  <td>{car.name}</td>
                  <td>{car.price}</td>
                  <td className="text-center">{car.year}</td>
                  <td className="text-center">
                    <Button
                      btnAxn={showUpload}
                      label="Upload"
                      value={car}
                      size="small"
                    />
                  </td>
                  <td className="text-center">

                    <Link to={`/admin/edit/${car.id}`} className="add-padding-horizontal">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <UploadImages
        btnAxn={showUpload}
        state={uploadVisible}
        vehicle={vehicleSelected}
      />
    </div>
  );
};

export default AdminScreen;
