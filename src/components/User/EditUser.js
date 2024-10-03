import axios from "axios";
import React, { useEffect, useState, useCallback } from "react"; // useCallback 추가
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState({}); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = "http://localhost:3000/user";

  const getUser = useCallback(() => { // useCallback 사용
    axios
      .get(`${getUserApi}/${id}`)
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [id]); // id를 의존성 배열에 추가

  useEffect(() => {
    getUser(); 
  }, [getUser]); // getUser를 의존성 배열에 추가

  const handelInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${getUserApi}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        navigate("/show-user");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name || ''} 
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email || ''}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone || ''}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditUser;
