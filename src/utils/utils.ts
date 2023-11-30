
import crypto from 'crypto';

export function randomToken() {

    return crypto.randomBytes(20).toString('hex');

}
