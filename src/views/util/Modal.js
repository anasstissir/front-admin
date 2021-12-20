import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IntlMessages from "../../helpers/IntlMessages";

export default function AlertDialog(props) {

    const handleClose = () => {
        props.close()
    };

    const handleOK = () => {
        props.close()
        props.action()
    };

    return (
        <div>
            <Dialog
                disableBackdropClick
                open={props.isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <IntlMessages id="modal.preforme" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <IntlMessages id="modal.desagree" />
                    </Button>
                    <Button onClick={handleOK} color="primary" autoFocus>
                        <IntlMessages id="modal.agree" />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
