import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Styled components for customization
const StyledDialogContentText = styled(DialogContentText)({
  color: "blue", // Set the text color here
  fontSize: "1.2rem", // Set the font size here
});

const GreenButton = styled(Button)({
  backgroundColor: "green",
  color: "white",
});

const RedButton = styled(Button)({
  backgroundColor: "red",
  color: "white",
});

const StyledDialog = styled(Dialog)({
  "& .MuiDialogContent-root": {
    padding: "30px", // Set the desired padding here
  },
});

const AlertDialog = ({ open, onAgree, onDisagree, onClose, message }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleAgree = () => {
    onAgree();
    onClose();
  };

  const handleDisagree = () => {
    onDisagree();
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      BackdropProps={{ onClick: (e) => e.stopPropagation() }}
    >
      <DialogContent>
        <StyledDialogContentText>{message}</StyledDialogContentText>
      </DialogContent>
      <DialogActions>
        <RedButton onClick={handleDisagree}>No</RedButton>
        <GreenButton onClick={handleAgree} autoFocus>
          Yes
        </GreenButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default AlertDialog;
