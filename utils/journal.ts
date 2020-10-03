import * as fs from 'fs';
import chalk from 'chalk';
import moment from 'moment';
import * as path from 'path';
import {decryptJournalEntity, encryptJournalEntity, CryptoHash } from './hash';

const CURR_DIR = process.cwd();
const JOURNALS_LIMIT = 50;

export function listJournal(username: string, encryptedUsername: string) {
    const filePath = path.join(CURR_DIR, 'store', 'journal.json');
    if (fs.existsSync(filePath)) {
        const contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (!contents.hasOwnProperty(encryptedUsername)) {
            console.log(chalk.red(`No journals present for user: ${username}`));
        } else {
            const data: Array<CryptoHash> = contents[encryptedUsername];
            try {
                console.log(chalk.blue('You have following journals'));
                for(let hash of data) {
                    console.log(chalk.yellow(decryptJournalEntity(hash)));
                }
            } catch(e) {
                console.log('Journals might be corrupted', e);
            }
        }
    } else {
        console.log(chalk.red('No journals exist, try creating a new one'));
    }
};

export function modifyJournals(journals: Array<CryptoHash>, journal: string) {
    const date = moment(new Date()).format('DD MMM YYYY hh:mm a');
    const completeText = `${date} - ${journal}`;
    console.log('complete text: ', completeText);
    journals.unshift(encryptJournalEntity(completeText));
    if (journals.length > JOURNALS_LIMIT) {
        journals.pop();
    }
    return journals;
}

export function createNewJournal(encryptedUsername: string, journal: string) {
    const fileName = 'journal.json';
    const dirName = 'store';
    const dirPath = path.join(CURR_DIR, dirName);
    const filePath = path.join(dirPath, fileName);
    let contents: any = {};
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    } else {
        contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    const existingJournals: Array<CryptoHash> = contents.hasOwnProperty(encryptedUsername) ? contents[encryptedUsername] : [];
    contents[encryptedUsername] = modifyJournals(existingJournals, journal);
    const result: string = JSON.stringify(contents, null, 2);
    fs.writeFileSync(filePath, result);
    console.log(chalk.green('Successfully updated journals'));
};