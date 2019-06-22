import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ( { recipe } ) => (
    <div className="recipe">
        <div className="center">
            <h2>{ recipe.name }</h2>
        </div>
        <img src={recipe.imgUrl} alt={recipe.name} className="recipePic" />
        <div>
            <img
                src="../img/hourglass.svg"
                alt="Preparation time"
                classes="icon-item"
            />
            {' : '}
            {recipe.preparationTime}
            min
        </div>
        <h3>Ingredients</h3>
        <table>
            <tbody>
                { recipe.ingredients.map(
                    ingredient => (
                        <tr key={ingredient.key}>
                            <td>
                                {ingredient.amount * ingredient.unit.amount}
                            </td>
                            <td>
                                {ingredient.unit.name}
                            </td>
                            <td>{ ingredient.label}</td>
                        </tr>
                    ),
                )}
            </tbody>
        </table>
        <h3>Nutritional Facts</h3>
        <table className="borderTable">
            <thead>
                <tr>
                    <th />
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Calories</td>
                    <td>
                        {recipe.ingredients.map(
                            ingredient => ( ingredient.elements.KCal * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>
                </tr>
                <tr>
                    <td>Fat</td>
                    <td>
                        {recipe.ingredients.map(
                            ingredient => ( ingredient.elements.TotalFat * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>
                </tr>
                <tr>
                    <td>Proteins</td>
                    <td>
                        {recipe.ingredients.map(
                            ingredient => ( ingredient.elements.Protein * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>
                </tr>
                <tr>
                    <td>Salt</td>
                    <td>
                        {recipe.ingredients.map(
                            ingredient => ( ingredient.elements.Salt * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
);

Recipe.propTypes = {
    recipe: PropTypes.shape( {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        preparationTime: PropTypes.number.isRequired,
        meal: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(
            PropTypes.shape( {
                label: PropTypes.string.isRequired,
                key: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired,
                unit: PropTypes.shape( {
                    amount: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                } ),
            } ),
        ).isRequired,
        imgUrl: PropTypes.string,
    } ).isRequired,
};

export default Recipe;
