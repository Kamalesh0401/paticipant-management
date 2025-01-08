import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveParticipant } from '../redux/participantsSlice1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './FooterNavigation.css';
const FooterNavigation = () => {
    const dispatch = useDispatch();
    const { participants, activeParticipantIndex } = useSelector(
        (state) => state.participants
    );

    const handleNavigation = (direction) => {
        if (direction === 'back' && activeParticipantIndex > 0) {
            dispatch(setActiveParticipant(activeParticipantIndex - 1));
        } else if (
            direction === 'next' &&
            activeParticipantIndex < participants.length - 1
        ) {
            dispatch(setActiveParticipant(activeParticipantIndex + 1));
        }
    };

    return (
        <div className="footer-navigation">
            <div className="d-flex justify-content-between">
                <div className="align-item-start">
                    <button
                        className="nav-btn back-btn"
                        onClick={() => handleNavigation('back')}
                        disabled={activeParticipantIndex === 0}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-3" />Back
                    </button>
                </div>
                <div className="align-item-end">
                    <button
                        className="nav-btn next-btn"
                        onClick={() => handleNavigation('next')}
                        disabled={activeParticipantIndex === participants.length - 1}
                    >
                        Next
                        <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FooterNavigation;
