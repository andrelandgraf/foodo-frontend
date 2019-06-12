import React from 'react';
import PropTypes from 'prop-types';

import BackIcon from '../../../img/back.svg';

import CustomButton from '../button/customButton';

const Title = ( { title, id, onClick } ) => (
    <CustomButton
        id={id}
        role="button"
        onClick={onClick}
    >
        <img
            src={BackIcon}
            alt="Language Icon"
        />
        { title }
    </CustomButton>
);

Title.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

Title.defaultProps = {
    onClick: undefined,
};

export default Title;
