import {
    Box,
    Button,
    useTheme,
  } from "@mui/material";
  import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";



const SecurityDepositeReminder = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();



    const handleAddNew = () => {
        navigate('/security_deposite/AddSecurityDeposite');
      };




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
          headerName: "Name",
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
          field: "Date",
          headerName: "Order Date",
          flex: 1,
        },
        {
          field: "creationDate",
          headerName: "Creation Date",
          flex: 1,
        },
        {
            field: "reminderDate",
            headerName: "Reminder Date",
            flex: 1,
          },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
        },
    ];



    return (
        <Box m="20px">
      <Header title="Security Deposite Reminder"/>
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


export default SecurityDepositeReminder;