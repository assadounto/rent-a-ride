import user from "../redux/user/user";
import http from "./http";


const getAllCars = () => http.get("/api/v1/cars");
const getCar = id => http.get(`/api/v1/cars/${id}`);
const createCar = data => http.post("/api/v1/cars", data);
const updateCar = (id, data) => http.put(`/api/v1/cars/${id}`, data);
const removeCar = id => http.delete(`/api/v1/cars/${id}`);

const login = data => http.post("/api/v1/login", data);
const signup = data => http.post("/api/v1/signup", data);
const auto_login=()=>  http.get("/api/v1/auto_login")

const createBooking = data => http.post("/api/v1/bookings", data);
const getBookings = () => http.get(`/api/v1/bookings`);
const removeBooking = id => http.delete(`/api/v1/bookings/${id}`);

const carService = {
    getAllCars,
    getCar,
    createCar,
    updateCar,
    removeCar
};

const userService = {
    login,
    signup,
    auto_login
};

const bookingService = {
    createBooking,
    getBookings,
    removeBooking
};

export default carService;
export { userService, bookingService };

