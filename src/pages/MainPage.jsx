import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, loadUsers } from "./../redux/actions";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  addAndDeleteProductInCart,
  checkProductInCart,
  getCart,
} from "redux/cart-actions";

// const useStyles = makeStyles((theme) => {
//   root: {
//     display: "flex";
//     flexDirection: "column";
//     alignItems: "center";
//     '&>*':
//       {
//         margin: theme.spacing(1),
//       };
//   }
// });

const MainPage = () => {
  //   const buttonStyles = useStyles();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  //
  let dispatch = useDispatch();
  const { users, cart, productsCountInCart } = useSelector(
    (state) => state.data
  );
  console.log(cart, productsCountInCart, "productsCountInCart");
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(getCart());
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user?")) {
      dispatch(deleteUsers(id));
    }
  };
  let navigate = useNavigate();
  const handleAddAndDeleteProductInCart = (product) => {
    dispatch(addAndDeleteProductInCart(product));
  };
  const checkBookInCart = (id) => {
    return checkProductInCart(id);
  };

  // let output = "";
  // let separator = "<br>";
  // const sortButton = () => {
  //   users
  //     .sort(function (a, b) {
  //       let nameA = a.name.toUpperCase();
  //       let nameB = b.name.toUpperCase();
  //       return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  //     })
  //     .forEach((element) => {
  //       output += element.name + separator;
  //     });
  // };
  // console.log(users, "soort");
  // const [data, setMockData] = useState(users);
  // const [order, setOrder] = useState("ASC");
  // const sorting = (col) => {
  //   if (order === "ASC") {
  //     const sorted = [...users].sort((a, b) =>
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  //     );
  //     setMockData(sorted);
  //     setOrder("DSC");
  //   }
  //   if (order === "DSC") {
  //     const sorted = [...users].sort((a, b) =>
  //       a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
  //     );
  //     setMockData(sorted);
  //     setOrder("ASC");
  //   }
  // };
  // console.log(sorted, "sorted");
  const handleSorted = () => {
    let sorted = users.sort((a, b) => a.name > b.name);
    return sorted;
    console.log(sorted, "usersss");
  };
  console.log(handleSorted(), "usersss");
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          style={{ margin: "50px" }}
          onClick={() => navigate("/addUser")}
          variant="contained"
          color="primary"
        >
          Add book
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/cart")}
        >
          Cart page
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSorted}
        >
          sort
        </Button>
        <p>Кол-во книг в корзине : {productsCountInCart}</p>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Author</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={user.image}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.category}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <ButtonGroup
                      variant="container"
                      aria-label="contained
                      primary
                      button group"
                    >
                      <Button
                        style={{ background: "red" }}
                        color="secondary"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        style={{ background: "blue" }}
                        color="primary"
                        onClick={() => navigate(`/editUser/${user.id}`)}
                      >
                        Edit
                      </Button>
                      {checkBookInCart(user.id) ? (
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => handleAddAndDeleteProductInCart(user)}
                        >
                          Delete from
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAddAndDeleteProductInCart(user)}
                        >
                          Add to cart
                        </Button>
                      )}
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MainPage;
