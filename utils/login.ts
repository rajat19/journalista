import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { compareBcrypt } from './hash';

const CURR_DIR = process.cwd();

export interface LoginResponse {
    success: boolean
    message: string
    encryptedUsername: string
}

export function checkPassword(username: string, password: string): LoginResponse {
    const filePath = path.join(CURR_DIR, 'store', 'password.json');
    let message = '';
    if (fs.existsSync(filePath)) {
        const contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        for(let i=0; i<Object.keys(contents).length; i++) {
            const key = Object.keys(contents)[i];
            const value = contents[key];
            if (compareBcrypt(username, key) && compareBcrypt(password, value)) {
                return {
                    success: true,
                    message: chalk.green('Welcome !!'),
                    encryptedUsername: key
                }
            }
        }
        message = chalk.red('Invalid username/password combination');
    } else {
        message = chalk.red(`No ${filePath} file present. Please register new users`);
    }
    return {
        success: false,
        message,
        encryptedUsername: ''
    }
};

export function registerUser(username: string, encryptedUsername: string, encryptedPassword: string): LoginResponse {
    let message = '';
    const fileName = 'password.json';
    const dirName = 'store';
    const dirPath = path.join(CURR_DIR, dirName);
    const filePath = path.join(dirPath, fileName);
    let contents: any = {};
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    } else {
        contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    for(let i=0; i<Object.keys(contents).length; i++) {
        const key = Object.keys(contents)[i];
        if (compareBcrypt(username, key)) {
            message = chalk.red('This username may already exists, try a different one');
            return {success: false, message, encryptedUsername: ''};
        }
    }
    contents[encryptedUsername] = encryptedPassword;
    message = chalk.green('Successfully registered !!');
    const result: string = JSON.stringify(contents, null, 2);
    fs.writeFileSync(filePath, result);
    return {success: true, message, encryptedUsername};
};