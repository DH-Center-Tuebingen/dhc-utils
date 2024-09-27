import type { User } from "./types/User.ts";


/**
 * Creates a function that checks if the user has the given permission.
 * 
 * @param user {User} - The user object
 * @returns {(permission: string) => boolean} - The function that checks if the user has the given permission
 */
function checkPermissionOf(user: User): (permission: string) => boolean {
    return (permission) => {
        return user.permissions[permission] === true;
    }
}

/**
 * Checks if the current user has the given permission(s)
 * 
 * @param {string} permissionString -   String of a single permission or multiple permissions separated by '|'.
 *                                      The permissions have normally the form of [permission_name]_[permission_action].
 *                                      The permission_action can be one of 'read', 'write', 'create', 'delete', 'share'.
 * 
 * @param {?boolean} [oneOf=false] - If true, only one of the permissions is required to return true.
 * @returns 
 */
export function can(user: User, permissionString: string, oneOf = false) {
    if (!user) return false;
    const permissions = permissionString.split('|');

    if (oneOf) {
        return permissions.some(checkPermissionOf(user));
    } else {
        return permissions.every(checkPermissionOf(user));
    }
}