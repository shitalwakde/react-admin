import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  Box,
  IconButton,
  useTheme,
  Button,
  TextField,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { Formik, FormikConsumer } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import EventIcon from "@mui/icons-material/Event";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const newLocal = {
  projectName: "",
  completionDate: "",
  completionStatus: "",
  billStatus: "",
};

const ProjectCompletionDetails = () => {
  const [initialValues, setInitialValues] = useState(newLocal);
  const [selectedValues, setSelectedValues] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isCompletionDatePickerOpen, setCompletionDatePickerOpen] =
    useState(false);

  const handleExport = () => {};

  const handleCancel = () => {};

  const handleFormSubmit = () => {};

  //=====================Company Info Detail========================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Sr.No.", flex: 0.5 },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "projectCompletionDate",
      headerName: "Project Completion Date",
      flex: 1,
    },
    {
      field: "billStatus",
      headerName: "Bill Status",
      flex: 1,
    },
    {
      field: "billCompletion",
      headerName: "Bill Completion",
      flex: 1,
    },
  ];

  return (
    <Box m="30px" paddingBottom="20px">
      <Header title="Project Completion Details" />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        <FormikConsumer>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                m="20px"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="projectName">Select Project</InputLabel>
                  <Select
                    value={values.projectName}
                    onChange={handleChange}
                    name="projectName"
                    onBlur={handleBlur}
                    error={!!errors.projectName}
                  >
                    <MenuItem value="projectName">SaiConstruction</MenuItem>
                    <MenuItem value="projectName">SaiConstruction</MenuItem>
                  </Select>
                  {!!errors.projectName && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.projectName}
                    </Box>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Completion Date(MM-dd-yyyy)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={
                    values.completionDate
                      ? format(values.completionDate, "MM-dd-yyyy")
                      : ""
                  }
                  name="completionDate"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setCompletionDatePickerOpen(true)}
                      >
                        <EventIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 1" }}
                />
                {isCompletionDatePickerOpen && (
                  <DatePicker
                    placeholderText="Select date"
                    selected={values.completionDate}
                    onChange={(date) => {
                      setFieldValue("completionDate", date); // Use "dob" as the field name
                      setCompletionDatePickerOpen(false);
                    }}
                    onBlur={() => setCompletionDatePickerOpen(false)}
                  />
                )}
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="completionStatus">
                    Completion Status
                  </InputLabel>
                  <Select
                    value={values.completionStatus}
                    onChange={handleChange}
                    name="completionStatus"
                    onBlur={handleBlur}
                    error={!!errors.completionStatus}
                  >
                    <MenuItem value="0">Complete</MenuItem>
                    <MenuItem value="1">Incomplete</MenuItem>
                  </Select>
                  {!!errors.completionStatus && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.completionStatus}
                    </Box>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="billStatus">Bill Status</InputLabel>
                  <Select
                    value={values.billStatus}
                    onChange={handleChange}
                    name="billStatus"
                    onBlur={handleBlur}
                    error={!!errors.billStatus}
                  >
                    <MenuItem value="0">Received</MenuItem>
                    <MenuItem value="1">Not Received</MenuItem>
                  </Select>
                  {!!errors.billStatus && (
                    <Box color="red" mt={1} sx={{ fontSize: "0.6rem" }}>
                      {errors.billStatus}
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
                      backgroundColor: "blue",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={handleFormSubmit}
                  >
                    SAVE
                  </Button>
                  <Button
                    type="button"
                    color="greencolor"
                    variant="contained"
                    sx={{
                      mr: 4,
                      fontSize: ".9rem",
                      color: "white",
                      backgroundColor: "green",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    onClick={handleExport}
                  >
                    EXPORT
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
                    CANCEL
                  </Button>
                </Box>
            </form>
          )}
        </FormikConsumer>
      </Formik>
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

export default ProjectCompletionDetails;
