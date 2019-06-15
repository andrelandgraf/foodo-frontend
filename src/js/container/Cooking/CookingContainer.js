import React from 'react';
import PropTypes from 'prop-types';

class CookingContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            recipe: undefined,
        };
    }

    componentWillMount = () => {
        // eslint-disable-next-line no-unused-vars
        const { recipe } = this.state;
        // TODO get (user) recipe from backend
    }

    render() {
        const { id } = this.props;
        console.log( id );
        return (
            <React.Fragment />
        );
    }
}

CookingContainer.propTypes = {
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    } ).isRequired,
    id: PropTypes.number.isRequired,
};

export default CookingContainer;
