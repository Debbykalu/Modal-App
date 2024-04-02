import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useFocusTrap from './hook/customeHook';
import './App.css';

const Modal = () => {
  const [open, setOpen] = useState(false);
  const [firstButtonFocused, setFirstButtonFocused] = useState(false);
  // Initialize custom hook for focus trapping
  const [modalRef, handleKeyDown] = useFocusTrap();
  const firstButtonRef = useRef(null);
  useEffect(() => {
    const handleEscapePress = event => {
      if (event.key === 'Escape') {
        if (firstButtonFocused) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }
    };
    document.addEventListener('keydown', handleEscapePress);
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [firstButtonFocused]);

  const handleDialogClose = () => {
    if (firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
    setOpen(false);
  };
return (
    <>
      <Button
        className='main-btn'
        variant="outlined"
        data-testId='modalButton'
        onClick={() => {
          setOpen(true);
        }}
        ref={firstButtonRef}
        onFocus={() => setFirstButtonFocused(true)}
        onBlur={() => setFirstButtonFocused(false)}
      >
        Payment Confirmation
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        ref={modalRef}
        onKeyDown={handleKeyDown}
        onClose={handleDialogClose}
      >
        <DialogTitle data-testid="alert-dialog-title">{"To proceed to payment page:"}</DialogTitle>
            <DialogContent>
            <DialogContentText data-testid="alert-dialog-description">
            You will need to agree to our terms and conditions All the Lorem Ipsum generators on 
            the Internet tend to repeat predefined chunks as necessary, making this the first true 
            generator on the Internet. It uses a dictionary of over 200 Latin words, combined with 
            a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
            The generated Lorem Ipsum is therefore always free from repetition, injected humour, or 
            non-characteristic words etc.
            </DialogContentText>
            </DialogContent>
        <DialogActions data-testid="button-wrap" className='button-wrap'>
          <Button onClick={handleDialogClose} data-testid="aceptButton">Acept</Button>
          <Button onClick={handleDialogClose} autoFocus data-testid="rejectButton">Reject</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
