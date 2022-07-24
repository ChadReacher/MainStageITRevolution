import React from 'react'
import { Button } from '@mui/material'
import { Modal } from '../../../../components'

const InfoModal = ({ isOpen, handleClose, name, age, status, neededWork, image, crownRadius, onDelete }) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className="avatar-container">
                <img src={image} alt="tree" className='avatar-tree' />
            </div>
            <div className='row'>
                <p className="tree-title">Type</p>
                <p className="tree-title">{name}</p>
            </div>
            <div className='row'>
                <p className="tree-title">Age</p>
                <p className="tree-title">{age}</p>
            </div>
            <div className='row'>
                <p className="tree-title">Condition</p>
                <p className="tree-title">{status}</p>
            </div>
            <div className='row'>
                <p className="tree-title">Crown radius</p>
                <p className="tree-title">{crownRadius}</p>
            </div>
            <div className='row'>
                <p className="tree-title">Work type</p>
                <p className="tree-title">{neededWork}</p>
            </div>
            <div className='centered_container'>
                <Button variant="contained" color="error" onClick={onDelete} sx={{ alignSelf: 'center' }}>Delete</Button>
            </div>
        </Modal>
    )
}

export default InfoModal