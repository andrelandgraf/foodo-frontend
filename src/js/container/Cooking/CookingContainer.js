import React from 'react';
import PropTypes from 'prop-types';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';

class CookingContainer extends React.Component {
    testData = {
        name: 'Bolognese',
        _id: '1',
        ingridients: [
            {
                name: 'Nudeln',
                _id: '1',
            },
            {
                name: 'Hackfleisch',
                _id: '2',
            },
            {
                name: 'Tomatensauce',
                _id: '3',
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
            // TODO get (user) recipe from backend with _id
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
        _id: PropTypes.string.isRequired,
    } ).isRequired,
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
