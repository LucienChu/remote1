import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

IrisMessagePopupDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogMessage: PropTypes.string.isRequired,
};

export default function IrisMessagePopupDialog(props) {
  const { onClose, dialogTitle, dialogMessage } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Dialog
        disableBackdropClick={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
