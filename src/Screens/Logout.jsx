import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Logout = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState(" Nothing");

  useEffect(() => {
    dispatch(logout());
    setResult(true);
  }, []);

  return (
    <>
      <h1>{result}</h1>
    </>
  );
};

export default Logout;
