import { useContext, useMemo } from 'react';
import { UserRecipesContext } from '../provider/UserRecipesProvider';
import { UserStateContext } from '../provider/UserStateProvider';

export const SUBSCRIPTION_LEVELS = {
    BASIC: 'basic',
};

function useSubscriptionLevels() {
    const { userRecipes } = useContext( UserRecipesContext );
    const { user } = useContext( UserStateContext );

    const makesBabysteps = useMemo( () => userRecipes && userRecipes.length <= 5, [ userRecipes ] );

    const hasBasicSubscription = useMemo( () => user
        && user.subscription === SUBSCRIPTION_LEVELS.BASIC, [ user ] );

    return { makesBabysteps, hasBasicSubscription };
}

export default useSubscriptionLevels;
