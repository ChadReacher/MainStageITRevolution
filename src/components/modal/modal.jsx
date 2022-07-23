import React from 'react'
import { Modal, Box } from '@mui/material'

const ModalComponent = ({ children, isOpen, handleClose }) => {
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                boxShadow: 24,
                background: 'rgb(208,231,13)',
                background: 'linear-gradient(90deg, rgba(208,231,13,1) 17%, rgba(142,238,125,1) 50%, rgba(101,221,0,1) 90%)',
                p: 4,
                backgroundColor: '#1782fc',
                borderRadius: '20px'
            }}>
                {children}
            </Box>
        </Modal>
    )
}

export default ModalComponent