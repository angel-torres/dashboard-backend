import crypto from 'crypto';

interface validatePasswordInterface {
    salt: string;
    hash: string;
}

export function validatePassword(password: string): validatePasswordInterface {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return { salt, hash }
}

export function generatePassword(){}

