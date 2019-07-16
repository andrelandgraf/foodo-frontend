/**
 * Ranks based on the official NutriScore ranks for the respective nutrition value category
 *
 */
const kiloJouleRanks = [ 335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350 ];
const sugarRanks = [ 4.5, 9, 13.5, 18, 22.5, 27, 31, 36, 40, 45 ];
const sfaRanks = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
const saltRanks = [ 0.09, 0.18, 0.27, 0.36, 0.45, 0.54, 0.63, 0.72, 0.81, 0.9 ];
const dietaryFibresRanks = [ 0.7, 1.4, 2.1, 2.8, 3.5, 1000000 ];
const proteinRanks = [ 1.6, 3.2, 4.8, 6.4, 8, 1000000 ];
const fruitsVegetableProportionRanks = [ 0.4, 0.6, 0.8, 0.8, 0.8, 1 ];

// exceptional ranks for specific categories
const kiloJouleRanksBeverages = [ 0, 30, 60, 90, 120, 150, 180, 210, 240, 270 ];
const sugarRanksBeverages = [ 0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5 ];
const sfaRanksFats = [ 10, 16, 22, 28, 34, 40, 46, 52, 58, 64 ];

/**
 * Ranks for mapping NutriScore to abcde
 */
const nutriScoreRanks = [ -1, 2, 10, 18 ];
const nutriScoreRanksBeverages = [ -15, 1, 5, 9 ];

const compareValueWithScala = ( value, scala ) => (
    scala.findIndex( element => element >= value )
);

/**
 * calulates the points of a single nutrition value needed for the NutriScore Calculation
 * @param value
 * @param comparisonScala
 * @returns {number}
 */
const calculatePointsForSingleNutritionValue = ( value, comparisonScala ) => {
    const result = compareValueWithScala( value, comparisonScala );
    return result === -1 ? 10 : result;
};

/**
 * Calculates the NutriScore for a dish according to the official formula
 * @param dish - A dish can be a single ingredient or
 *                the weighted average of the nutrition values of a recipe
 * @param categoryName : String if it is a single ingredient the category influences the used ranks
 * @returns {number}
 */
const calculateNutriScore = ( dish, categoryName ) => {
    const malusPoints = calculatePointsForSingleNutritionValue( dish.KiloJoule, categoryName === 'Beverages' ? kiloJouleRanksBeverages : kiloJouleRanks )
        + calculatePointsForSingleNutritionValue( dish.AddedSugars, categoryName === 'Beverages' ? sugarRanksBeverages : sugarRanks )
        + calculatePointsForSingleNutritionValue( dish.SFA, categoryName === 'Oils, fats and shortenings' ? sfaRanksFats : sfaRanks )
        + calculatePointsForSingleNutritionValue( dish.Salt, saltRanks );

    let bonusPoints = 0;
    const proteinScore = calculatePointsForSingleNutritionValue( dish.Protein, proteinRanks );
    const fruitVegetableScore = calculatePointsForSingleNutritionValue(
        dish.proportionOfFruitsAndVegetables,
        fruitsVegetableProportionRanks,
    );
    bonusPoints += calculatePointsForSingleNutritionValue( dish.DietaryFiber, dietaryFibresRanks )
        + fruitVegetableScore + proteinScore;

    let nutriScore;
    if ( malusPoints >= 11 && fruitVegetableScore < 5 ) {
        nutriScore = malusPoints - ( bonusPoints - proteinScore );
    } else {
        nutriScore = malusPoints - bonusPoints;
    }
    return nutriScore;
};

const addProportionFruitVegetables = ( nutritionValues, category ) => (
    Object.assign( {}, nutritionValues,
        {
            proportionOfFruitsAndVegetables: category.name === 'Fruits'
            || category.name === 'Vegetables' ? 1 : 0,
        } )
);

/**
 *  Calculates the weighted average of nutrition values of a
 *  List of Ingredients with their respective amount.
 *  Focuses only on nutrition values needed for the NutriScore calculation.
 * @param ingredients
 * @returns {{KiloJoule: number, Salt: number, proportionOfFruitsAndVegetables: number,
 * AddedSugars: number, Protein: number, DietaryFiber: number, SFA: number}}
 */
export const calculateNutritionValuesOfIngredientsList = ( ingredients ) => {
    const averageNutritionValues = {
        KiloJoule: 0,
        DietaryFiber: 0,
        AddedSugars: 0,
        SFA: 0,
        Protein: 0,
        Salt: 0,
        proportionOfFruitsAndVegetables: 0,
    };
    let summedAmounts = 0;
    ingredients.forEach( ( { ingredient, amount } ) => {
        const ingredientAmount = amount;
        const ingredientNutritionValues = addProportionFruitVegetables( ingredient.elements,
            ingredient.category );

        // calculate weighted average of nutrition values
        Object.keys( averageNutritionValues ).forEach( ( i ) => {
            averageNutritionValues[ i ] = ( averageNutritionValues[ i ] * summedAmounts
                + ingredientNutritionValues[ i ] * ingredientAmount )
                / ( summedAmounts + ingredientAmount );
        } );
        summedAmounts += ingredientAmount;
    } );
    return averageNutritionValues;
};

export const computeNutriScoreForRecipe = ( recipeIngredients ) => {
    const nutritionValuesOfRecipe = calculateNutritionValuesOfIngredientsList( recipeIngredients );
    return calculateNutriScore( nutritionValuesOfRecipe, 'Recipe' );
};


export const mapNutriScoreToABCDE = ( nutriScore, categoryName ) => {
    const scala = categoryName === 'Beverages' ? nutriScoreRanksBeverages : nutriScoreRanks;
    const result = compareValueWithScala( nutriScore, scala );
    return result === -1 ? 'E' : [ 'A', 'B', 'C', 'D' ][ result ];
};
