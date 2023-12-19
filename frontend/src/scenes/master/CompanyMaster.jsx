import React, { useState } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataCompany } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyMaster = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/default_avatar.jpg"
  );

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleCancel = () => {
    // Handle cancel button logic
    console.log("Form canceled");
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    // { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "address",
        headerName: "Address",
        flex: 1,
      },
      {
        field: "city",
        headerName: "City",
        flex: 1,
      },
      {
        field: "zipCode",
        headerName: "Zip Code",
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
            onClick={() => handleEdit(params.row.id)}
            style={{ color: "orange" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
            style={{ color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log(`Edit button clicked for row with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete button clicked for row with ID: ${id}`);
  };

  return (
    <Box m="20px">
      <Header title="Company Info" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CIN No."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cinNo}
                name="cinNo"
                error={!!touched.cinNo && !!errors.cinNo}
                helperText={touched.cinNo && errors.cinNo}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel htmlFor="state">Select State</InputLabel>
                <Select
                  value={values.state}
                  onChange={handleChange}
                  name="state"
                  onBlur={handleBlur}
                  error={!!errors.state}
                >
                  <MenuItem value="state1">State 1</MenuItem>
                  <MenuItem value="state2">State 2</MenuItem>
                </Select>
                {!!errors.state && (
                  <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                    {errors.state}
                  </Box>
                )}
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="GST No."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gstNo}
                name="gstNo"
                error={!!touched.gstNo && !!errors.gstNo}
                helperText={touched.gstNo && errors.gstNo}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel htmlFor="city">Select City</InputLabel>
                <Select
                  value={values.state}
                  onChange={handleChange}
                  name="city"
                  onBlur={handleBlur}
                  error={!!errors.city}
                >
                  <MenuItem value="city1">City 1</MenuItem>
                  <MenuItem value="city2">City 2</MenuItem>
                </Select>
                {!!errors.city && (
                  <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                    {errors.city}
                  </Box>
                )}
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />

              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="input-foam">
                    <label className="form-label" htmlFor="customFile">
                      Company Logo
                    </label>
                    <div className="me-3">
                      <figure className="avatar item-rtl">
                        <img
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="image"
                        />
                      </figure>
                    </div>
                    <Box display="flex" mt="10px">
                      <input
                        type="file"
                        name="avatar"
                        className="form-control"
                        id="customFile"
                        accept="images/*"
                        onChange={onChange}
                      />
                    </Box>
                  </div>
                </div>
              </div>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt="10px">
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
              >
                Save
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
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Box m="20px">
        <Header title="Company Details" />
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
          <DataGrid checkboxSelection rows={mockDataCompany} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  companyName: yup.string().required("Please enter company name"),
  state: yup.string().required("Please select state"),
  city: yup.string().required("Please select city"),
  cinNo: yup.string().required("Please enter CIN No."),
  gstNo: yup.string().required("Please enter GST No."),
  email: yup.string().email("invalid email").required("Please enter email"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter mobile number"),
  address1: yup.string().required("Please enter address"),
});
const initialValues = {
  companyName: "",
  state: "",
  city: "",
  email: "",
  contact: "",
  address1: "",
  cinNo: "",
  gstNo: "",
};

export default CompanyMaster;
