import React from 'react'
import { Modal } from '../../../../components'

const InfoModal = ({ isOpen, handleClose, name, age, status, neededWork, image }) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className="avatar-container">
                <img src={image} alt="tree" className='avatar-tree' />
            </div>
            <div className='row'>
                <p className="tree-title">Name</p>
                <p className="tree-title">{name}</p>
            </div>
            <div className='row'>
                <p className="tree-title">Age</p>
                <p className="tree-title">{age}</p>
            </div>
            <div className='row'>
                <p className="tree-title">Status</p>
                <p className="tree-title">{status}</p>
            </div>
            <div className='row'>
                <p className="tree-title">Need work</p>
                <p className="tree-title">{neededWork}</p>
            </div>
        </Modal>
    )
}

export default InfoModal