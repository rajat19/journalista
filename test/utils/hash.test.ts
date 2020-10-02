import { expect } from 'chai';
import {encryptJournalEntity, decryptJournalEntity, compareBcrypt, encryptBcrypt, CryptoHash} from '../../utils/hash';

describe('Crypto encryption/decryption', () => {
    it('should be able to encrypt/decrypt correctly', () => {
        const text = "New text for testing";
        const hash: CryptoHash = encryptJournalEntity(text);
        const decryptedText: string = decryptJournalEntity(hash);
        expect(decryptedText).to.eql(text);
    });
});

describe('Bcrypt tests', () => {
    it('should be able to match texts correctly', () => {
        const text = 'New Text';
        const encryptedText = encryptBcrypt(text);
        expect(compareBcrypt(text, encryptedText)).to.eql(true);
    });
});