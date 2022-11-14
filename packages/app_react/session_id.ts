import {v4} from 'uuid';
const sessionId = v4();

/**
 * Current session id.
 *
 * Regenerated on every page reload
 * @returns
 */
export const getUserSessionId = () => {
    return sessionId;
};
