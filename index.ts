#!/usr/bin/env node

import chalk from 'chalk';
import * as inquirer from 'inquirer';
import { encryptBcrypt } from './utils/hash';
import { checkPassword, registerUser, LoginResponse } from './utils/login';
import { LOGIN_QUESTIONS, getUserDetailQuestions, JOURNAL_QUESTIONS, NEW_JOURNAL, WANNA_TRY } from './utils/options';
import { listJournal, createNewJournal } from './utils/journal';

let successfullyLoggedIn = false;
let username: string;
let encryptedUsername: string;

const start = async () => {
	await loginProcessing();
	await journalProcessing(encryptedUsername, username);
};

const loginProcessing = async() => {
	const loginChoice = await inquirer.prompt(LOGIN_QUESTIONS);
	if (loginChoice.loginOption === 'login') {
		const loginAnswers = await inquirer.prompt(getUserDetailQuestions());
		username = loginAnswers.username;
		const loginResponse = checkPassword(username, loginAnswers.password);
		if (!loginResponse.success) {
			console.log(loginResponse.message);
			await loginProcessing();
		};
		successfullyLoggedIn = true;
		encryptedUsername = loginResponse.encryptedUsername;
		console.log(chalk.green(`Successfully logged in as ${username}`));
	} else {
		const loginAnswers = await inquirer.prompt(getUserDetailQuestions(true));
		username = loginAnswers.username;
		encryptedUsername = encryptBcrypt(username);
		const encryptedPassword = encryptBcrypt(loginAnswers.password);
		const registerResponse: LoginResponse = registerUser(username, encryptedUsername, encryptedPassword);
		console.log(registerResponse.message);
		if (registerResponse.success) successfullyLoggedIn = true;
		else {
			encryptedUsername = '';
			await loginProcessing();
		}
	}
};

const journalProcessing = async(encryptedUsername: string, username: string) => {
	if (!successfullyLoggedIn) {
		console.log('Not authorized, login first');
		await start();
	}
	const journalChoice = await inquirer.prompt(JOURNAL_QUESTIONS);
	if (journalChoice.task == 'list') {
		listJournal(username, encryptedUsername);
	} else if (journalChoice.task == 'new'){
		const newJournal = await inquirer.prompt(NEW_JOURNAL);
		createNewJournal(encryptedUsername, newJournal.text);
	}
	const wannaRetry = await inquirer.prompt(WANNA_TRY);
	if (wannaRetry.retry) await journalProcessing(encryptedUsername, username);
};

start().then(() => console.log('Exiting. Logging you out'));