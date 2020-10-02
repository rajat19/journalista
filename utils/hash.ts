import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

export function encryptBcrypt(text) {
    const saltRounds = 10;
    return bcrypt.hashSync(text, saltRounds);
}

export function compareBcrypt(text, hash) {
    return bcrypt.compareSync(text, hash);
}

export function encryptJournalEntity(text) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export function decryptJournalEntity(hash) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
}