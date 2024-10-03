import axios from "axios";
import React, { useEffect, useState, useCallback } from "react"; // useCallback 추가
import { useParams } from "react-router-dom";
import "./User.css";

const User = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const getUserApi = "http://localhost:3000/user";

  const getUser = useCallback(() => { // useCallback 사용
    axios
      .get(`${getUserApi}/${id}`) // 템플릿 리터럴 사용
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // id를 의존성 배열에 추가

  useEffect(() => {
    getUser(); // getUser 호출
  }, [getUser]); // getUser를 의존성 배열에 추가

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

export default User; // 변경된 이름으로 export
