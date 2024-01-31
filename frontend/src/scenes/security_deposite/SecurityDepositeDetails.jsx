import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  IconButton,
  useTheme,
} from "@mui/material";
import { Formik, FormikConsumer } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const newLocal = {
  projectName: "",
  status: "",
};

const SecurityDepositeDetails = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleEdit = () => {};

  const handleDelete = () => {
    deleteItem();
  };

  const handleSearch = () => {
    console.log("Form canceled =>" + initialValues);
  };

  const handlePrint = () => {};

  const handleExport = () => {};

  const handleAddNew = () => {
    navigate("/security_deposite/AddSecurityDeposite");
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const deleteItem = () => {};

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Sr.No.", flex: 0.5 },
    {
      field: "orderCopyId",
      headerName: "Order Copy Id",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "completionDate",
      headerName: "Completion Date",
      flex: 1,
    },
    {
      field: "securityDeposit",
      headerName: "Security Deposit",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
    },

    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      sort: "asc",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row)}
            style={{ color: "orange" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
            style={{ color: "brown" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="30px">
      <Header title="Security Deposite Details" />
      <Box display="flex" justifyContent="flex-end" mt="30px">
        <Button
          type="submit"
          color="bluecolor"
          variant="contained"
          sx={{
            mr: 4,
            fontSize: ".9rem",
            color: "white",
            backgroundColor: "blue",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
          onClick={handleAddNew}
        >
          ADD NEW
        </Button>
      </Box>
      <Box m="20px">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          <FormikConsumer>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="ProjectName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.projectName}
                    name="projectName"
                    error={!!touched.projectName && !!errors.projectName}
                    helperText={touched.projectName && errors.projectName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl
                    fullWidth
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel htmlFor="status">Select Status</InputLabel>
                    <Select
                      value={values.status}
                      onChange={handleChange}
                      name="status"
                      onBlur={handleBlur}
                      error={!!errors.status}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Received">Received</MenuItem>
                    </Select>
                    {!!errors.status && (
                      <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                        {errors.status}
                      </Box>
                    )}
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="flex-end" mt="30px">
                  <Button
                    type="submit"
                    color="bluecolor"
                    variant="contained"
                    sx={{
                      mr: 4,
                      fontSize: ".9rem",
                      color: "white",
                      backgroundColor: "red",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={handleSearch}
                  >
                    SEARCH
                  </Button>
                  <Button
                    type="button"
                    color="redcolor"
                    variant="contained"
                    sx={{
                      fontSize: ".9rem",
                      color: "white",
                      backgroundColor: "red",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={handlePrint}
                  >
                    PRINT
                  </Button>
                  <Button
                    type="button"
                    color="greencolor"
                    variant="contained"
                    sx={{
                      mr: 4,
                      marginLeft: 4,
                      fontSize: ".9rem",
                      color: "white",
                      backgroundColor: "blue",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={handleExport}
                  >
                    EXPORT
                  </Button>
                </Box>
              </form>
            )}
          </FormikConsumer>
        </Formik>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  projectName: yup.string().required("required"),
});

export default SecurityDepositeDetails;
