import { CircularProgress } from "@mui/material";

const Loader = ({ color = "primary" }) => {
  return (
    <>
      <CircularProgress color={color} sx={{ m: "auto" }} />
    </>
  );
};

export default Loader;
