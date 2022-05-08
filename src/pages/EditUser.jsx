import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "redux/actions";

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.data);
  const [state, setState] = useState({
    name: "",
    image: "",
    contact: "",
    address: "",
    category: "",
  });
  const [error, setError] = useState("");
  const { name, image, contact, address, category } = state;
  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !image || !contact || !category) {
      setError("please input all input field");
    } else {
      dispatch(updateUser(state, id));
      navigate("/");
      setError("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        onClick={() => navigate("/")}
      >
        Go back
      </Button>
      <h3>Edit user </h3>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <Box
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="name"
          variant="standard"
          value={name || ""}
          type="text"
          name="name"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="image"
          variant="standard"
          value={image || ""}
          type="image"
          name="image"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="contact"
          variant="standard"
          value={contact || ""}
          type="number"
          name="contact"
          onChange={handleInputChange}
        />
        <br />

        <TextField
          id="standard-basic"
          label="address"
          variant="standard"
          value={address || ""}
          type="text"
          name="address"
          onChange={handleInputChange}
        />
        <TextField
          id="standard-basic"
          label="category"
          variant="standard"
          value={category}
          type="text"
          name="category"
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default EditUser;
