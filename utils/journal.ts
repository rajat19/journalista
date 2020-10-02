import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import {decryptJournalEntity, encryptJournalEntity} from './hash';

const CURR_DIR = process.cwd();
const JOURNALS_LIMIT = 50;

export function listJournal(username, encryptedUsername) {
    const filePath = path.join(CURR_DIR, 'store', 'journal.json');
    if (fs.existsSync(filePath)) {
        const contents: Object = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (!contents.hasOwnProperty(encryptedUsername)) {
            console.log(`No journals present for user: ${username}`);
        } else {
            const data = contents[encryptedUsername];
            try {
                for(let hash in data) {
                    console.log(decryptJournalEntity(hash));
                }
            } catch(e) {
                console.log('Journals might be corrupted', e);
            }
        }
    } else {
        console.log('No journals exist, try creating a new one');
    }
};

export function createNewJournal(encryptedUsername, journal) {
    const fileName = 'journal.json';
    const dirName = 'store';
    const dirPath = path.join(CURR_DIR, dirName);
    const filePath = path.join(dirPath, fileName);
    let contents: Object = {};
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    } else {
        contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    const existingJournals: Array<Object> = contents[encryptedUsername];
    const date = moment().format('DD MMM YYYY hh:mm a');
    const completeText = `${date} - ${journal}`;
    existingJournals.unshift(encryptJournalEntity(completeText));
    if (existingJournals.length > JOURNALS_LIMIT) {
        existingJournals.pop();
    }
    contents[encryptedUsername] = existingJournals;
    const result: string = JSON.stringify(contents, null, 2);
    fs.writeFileSync(filePath, result);
    console.log('Successfully updated journals');
};