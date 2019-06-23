import React from 'react';

import AdminContainer from '../container/Admin/AdminContainer';
import { IngredientsContext } from '../provider/IngredientsProvider';

const AdminView = () => (
    <div className="container admin-page">
        <h1>Admin Page</h1>
        <IngredientsContext.Consumer>
            {ingredientsContext => <AdminContainer ingredientsContext={ingredientsContext} />}
        </IngredientsContext.Consumer>
    </div>
);

export default AdminView;
