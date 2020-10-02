import * as fs from 'fs';
import * as path from 'path';
import { compareBcrypt } from './hash';

const CURR_DIR = process.cwd();

export function checkPassword(username, password): boolean {
    const filePath = path.join(CURR_DIR, 'store', 'password.json');
    if (fs.existsSync(filePath)) {
        const contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        for(let i=0; i<Object.keys(contents).length; i++) {
            const key = Object.keys(contents)[i];
            const value = contents[key];
            if (compareBcrypt(username, key) && compareBcrypt(password, value)) {
                console.log('Welcome !!');
                return true;
            }
        }
        console.log('Invalid username/password combination');
    } else {
        console.log(`No ${filePath} file present. Please register new users`);
    }
    return false;
};


export interface RegisterResponse {
    success: boolean
    message: string
};

export function registerUser(username, encryptedUsername, encryptedPassword): RegisterResponse {
    let message = '';
    const fileName = 'password.json';
    const dirName = 'store';
    const dirPath = path.join(CURR_DIR, dirName);
    const filePath = path.join(dirPath, fileName);
    let contents: Object = {};
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    } else {
        contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    for(let i=0; i<Object.keys(contents).length; i++) {
        const key = Object.keys(contents)[i];
        if (compareBcrypt(username, key)) {
            message = 'This username may already exists, try a different one';
            return {success: false, message};
        }
    }
    contents[encryptedUsername] = encryptedPassword;
    message = 'Successfully registered !!';
    const result: string = JSON.stringify(contents, null, 2);
    fs.writeFileSync(filePath, result);
    return {success: true, message};
};