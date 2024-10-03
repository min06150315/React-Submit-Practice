import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";

const UserDetail = () => { // 이름 변경
  const [user, setUser] = useState({});
  const { id } = useParams();
  const getUserApi = "http://localhost:3000/user";

  useEffect(() => {
    getUser();
  }, [id]); // id가 변경될 때마다 호출

  const getUser = () => {
    axios
      .get(`${getUserApi}/${id}`) // 템플릿 리터럴 사용
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail; // 변경된 이름으로 export
