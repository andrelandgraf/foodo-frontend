import { useContext, useMemo } from 'react';
import { UserRecipesContext } from '../provider/UserRecipesProvider';
import { UserStateContext } from '../provider/UserStateProvider';

export const ACCESS_LEVELS = {
    FREE: 'free',
    SUBSCRIBED: 'subscribed',
    ADMIN: 'admin',
};

function useUserHasAccessLevels() {
    const { userRecipes } = useContext( UserRecipesContext );
    const { user } = useContext( UserStateContext );

    const makesBabysteps = useMemo( () => {
        const hasJustStarted = userRecipes && userRecipes.length <= 5
            && user && user.level === ACCESS_LEVELS.FREE;
        const hasSkippedSub = user && user.skippedSubscription;
        return hasJustStarted || hasSkippedSub;
    },
    [ userRecipes, user ] );

    const hasSubscribed = useMemo( () => user
        && user.level === ACCESS_LEVELS.SUBSCRIBED, [ user ] );

    const isAdmin = useMemo( () => user
    && user.level === ACCESS_LEVELS.ADMIN, [ user ] );

    return { makesBabysteps, hasSubscribed, isAdmin };
}

export default useUserHasAccessLevels;
