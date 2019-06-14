import React from 'react';

import lodash from 'lodash';

class RecipesContainer extends React.Component {
    testData = [
        {
            name: 'Bolognese',
            id: 1,
        },
        {
            name: 'Pizza Brot',
            id: 2,
        },
        {
            name: 'Hawai Toast',
            id: 3,
        },
        {
            name: 'Spagghetti Arabiate',
            id: 4,
        },
        {
            name: 'Pilzragout',
            id: 5,
        },
    ];

    constructor( props ) {
        super( props );

        this.state = {
            recipes: undefined,
        };
    }

    componentWillMount = () => {
        const { recipes } = this.state;

        if ( !recipes ) {
            // TODO call backend to get standard recipes
            this.setState( { recipes: this.testData } );
        }
    }
}

export default RecipesContainer;
