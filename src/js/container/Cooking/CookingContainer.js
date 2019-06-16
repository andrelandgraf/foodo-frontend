import React from 'react';
import PropTypes from 'prop-types';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';

class CookingContainer extends React.Component {
    testData = {
        name: 'Bolognese',
        id: 1,
        ingridients: [
            {
                name: 'Nudeln',
                id: 1,
            },
            {
                name: 'Hackfleisch',
                id: 2,
            },
            {
                name: 'Tomatensauce',
                id: 3,
            },
        ],
    }

    constructor( props ) {
        super( props );

        this.state = {
            recipe: undefined,
        };
    }

    componentWillMount = () => {
        const { recipe } = this.state;
        // eslint-disable-next-line no-unused-vars
        const { id } = this.props;
        if ( !recipe ) {
            // TODO get (user) recipe from backend with id
            this.setState( { recipe: this.testData } );
        }
    }

    renderLoading = () => (
        <Loader />
    );

    render() {
        const { recipe } = this.state;

        return (
            <div className="cooking-container">
                {
                    recipe ? <Recipe recipe={recipe} /> : this.renderLoading()
                }

            </div>
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
