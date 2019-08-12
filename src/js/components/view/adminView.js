import React from 'react';

import { IngredientsContext } from '../../provider/IngredientsProvider';
import CreateRecipeContainer from '../../container/Admin/CreateRecipeContainer';

const AdminView = () => (
    <div className="container admin-page">
        <h1>Admin Page</h1>
        <IngredientsContext.Consumer>
            {ingredientsContext => (
                <CreateRecipeContainer
                    ingredientsContext={ingredientsContext}
                />
            )}
        </IngredientsContext.Consumer>
    </div>
);

export default AdminView;
