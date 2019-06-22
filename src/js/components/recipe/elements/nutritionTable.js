import React from 'react';
import PropTypes from 'prop-types';


const NutritionTable = ( { ingredients } ) => (
    <div>
        <h2>Nutritional Facts</h2>
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
                        {ingredients.map(
                            ingredient => ( ingredient.elements.KCal * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>
                </tr>
                <tr>
                    <td>Fat</td>
                    <td>
                        {ingredients.map(
                            ingredient => ( ingredient.elements.TotalFat * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>
                </tr>
                <tr>
                    <td>Proteins</td>
                    <td>
                        {ingredients.map(
                            ingredient => ( ingredient.elements.Protein * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>
                </tr>
                <tr>
                    <td>Salt</td>
                    <td>
                        {ingredients.map(
                            ingredient => ( ingredient.elements.Salt * ingredient.amount ),
                        ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 )}
g
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
);

NutritionTable.propTypes = {
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
};

export default NutritionTable;
