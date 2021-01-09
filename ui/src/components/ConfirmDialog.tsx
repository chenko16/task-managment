import * as React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'
import {Grid} from '@material-ui/core';

export interface ConfirmDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    okString: string;
    cancelString: string;
}

export default function ConfirmDialog(props) {

    const { onClose, selectedValue, open, warningText } = props;
    let {okString, cancelString} = props

    if (okString == null) {
        okString='Ok'
    }
    if (cancelString == null) {
        cancelString='Cancel'
    }

    const handleClose = () => {
        onClose(selectedValue);
    }

    const handleListItemClick = (value: string) => {
        onClose(value);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={'confirm-dialog-title'} >
            <DialogTitle id={'confirm-dialog-title'}>{warningText}</DialogTitle>
            <Grid container direction={'row'} justify={'flex-end'} style={{ marginBottom: '3px' }}>
                <Button variant={'contained'} color={'primary'} onClick={() => handleListItemClick('Ok') }>{okString}</Button>
                <Grid style={{ marginLeft: '5px', marginRight: '5px' }}>
                    <Button
                        color={'primary'}
                        onClick={() => handleListItemClick('Cancel') }>
                        {cancelString}
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}
