import React, { useState, useEffect } from 'react';
import DataListInput from 'react-datalist-input';

import { getRequest, postRequest } from '../../services/foodo-api/httpService';
import { ENDPOINTS } from '../../services/foodo-api/api';
import { getIngredientCategories } from '../../services/foodo-api/ingredient/ingredientsService';
import Button from '../../components/button/button';
import { getLocale } from '../../utilities/internationalization/internationalization';

/**
 * Add Categories to each ingredient
 */
function CategoryContainer() {
    const [ ingredients, setIngredients ] = useState( [] );
    const [ categories, setCategories ] = useState( [] );
    const [ pickedIngredient, setPickedI ] = useState();
    const [ pickedCategory, setPickedC ] = useState();

    useEffect( () => {
        // get all ingredients without categories (special admin endpoint)
        getRequest( `${ ENDPOINTS.INGREDIENTS }/tmp/categories/` )
            .then( i => setIngredients( i ) );
        getIngredientCategories()
            .then( c => setCategories( c ) );
    }, [] );

    const onClickSave = () => {
        const data = { _id: pickedIngredient._id, categoryId: pickedCategory._id };
        postRequest( `${ ENDPOINTS.INGREDIENTS }/setcategory`, data );
        setPickedC( undefined );
        setPickedI( undefined );
    };
    return (
        <div className="container admin-page">
            <div className="center box">
                <h2>Select an Ingredient</h2>
                <div className="input-container">
                    <DataListInput
                        items={ingredients.map( i => ( {
                            ...i,
                            key: i._id,
                            label: i.name[ getLocale() ],
                        } ) )}
                        placeholder="choose an Ingredient..."
                        onSelect={( i => setPickedI( i ) )}
                        dropDownLength={10}
                        requiredInputLength={1}
                        inputClassName="datalist-input-input"
                        dropdownClassName="datalist-input-dropdown"
                        itemClassName="datalist-input-item"
                        activeItemClassName="datalist-input-activeItem"
                        suppressReselect={false}
                        clearInputOnSelect={false}
                    />
                </div>
                <h2>Select a Category</h2>
                <div className="input-container">
                    <DataListInput
                        items={categories.map( c => ( {
                            ...c,
                            key: c._id,
                            label: c.name,
                        } ) )}
                        placeholder="choose an Category"
                        onSelect={c => setPickedC( c )}
                        dropDownLength={10}
                        requiredInputLength={0}
                        inputClassName="datalist-input-input"
                        dropdownClassName="datalist-input-dropdown"
                        itemClassName="datalist-input-item"
                        activeItemClassName="datalist-input-activeItem"
                        suppressReselect={false}
                        clearInputOnSelect={false}
                    />
                </div>
                <Button
                    onClick={onClickSave}
                    text="save"
                    disabled={!pickedCategory || !pickedIngredient}
                    primary
                />
            </div>
        </div>
    );
}

export default CategoryContainer;
