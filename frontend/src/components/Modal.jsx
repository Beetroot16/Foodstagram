import React from 'react'
import { RiCloseLine } from 'react-icons/ri';
import '../styles/modal.css';
import { useNavigate } from 'react-router-dom';

export default function Modal({ setModal }) {
    const navigate = useNavigate();
    return (
        <div className="darkBg" onClick={() => setModal(false)}>
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        {/* modal header */}
                        <h5 className='heading'>Confirm</h5>
                    </div>
                    <button className='closeBtn' onClick={() => setModal(false)}>
                        <RiCloseLine />
                    </button>
                    {/* modal content */}
                    <div className="modalContent">
                        <h5>Do you really wish to logout ?</h5>
                    </div>
                    {/* modal actions */}
                    <div className="modalActions">
                        <div className="actionsContainer">

                            <button className="logOutBtn"
                                onClick={() => {
                                    setModal(false);
                                    localStorage.clear();
                                    navigate('./signin')
                                }}>Logout</button>
                            
                            <button className="cancelBtn" onClick={() => setModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
