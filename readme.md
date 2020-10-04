![License](https://img.shields.io/npm/l/journalista?style=for-the-badge)
![Build](https://img.shields.io/github/workflow/status/rajat19/journalista/Node.js%20CI?style=for-the-badge)
![Language](https://img.shields.io/github/languages/top/rajat19/journalista?style=for-the-badge)
![Dependencies](https://img.shields.io/david/rajat19/journalista?style=for-the-badge)
![Bundle Size](https://img.shields.io/bundlephobia/min/journalista?style=for-the-badge)
![Release](https://img.shields.io/github/v/release/rajat19/journalista?style=for-the-badge)
![Node](https://img.shields.io/node/v/journalista?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/rajat19/journalista?style=for-the-badge)

# Journalista

Personal journal cli app
It is a terminal application to store personal journal log with user management, to be run
locally and not on cloud. For simplicity considering we could enter only textual content in journal
data.

## Terminologies
- User : An independent entity with access to its own journal. Data should not be shared
between users.
- Journal : A text log containing multiple entries.
- Journal Entry : A piece for text accompanied by a timestamp

## Features
1. User Management: On starting the application the user is presented with
either Login or Sign Up options.
2. Journal Management: After authentication, the user is presented with two
options to either list all his previous entries or create a new entry. Maximum 50
Journal entries is allowed per user. Newer entry after 50 replace the
oldest entry(like a queue).
3. While showing previous entries each entry is preceded by time in readable
format and data followed by the text input
Eg.
25 Jun 2019 10.30pm - Some text that the user entered
23 Jun 2019 10.00am - Some text that user entered

## Installation (Using npm registries)
There are two ways to install the cli **(Do any one)**

- From npm registry
```bash
npm install -g journalista
journalista
```

- From github registry
```bash
npm install -g @rajat19/journalista
journalista
```

## How to run this project (if you want to code/debug)
- Install dependencies
```bash
npm i
```
- Make changes to code
- Then run following commands 
    - For development purposes you can directly do
        ```bash
        npm run start
        ```
    - For build and using journalista command (Alternate)
        ```bash
        npm run build && npm link
        journalista
        ```

## What the system does
1. Allows login/signup using command line
2. List/Create journals for authorized users

The system encrypts username/passwords and journals so that these are not visible by anyone just crawling 
through the repo. Your journals are secure with us.

Two types of encryption is done in this project
1. bcrypt - hashing using salt - used to encrypt username/password
2. crypto - aes-256-ctr - used to encrypt/decrypt journals

Code for these encryption/decryption can be found in `utils/hash.ts`

## Publish
This package uses github actions to publish to both npm as well as github registries
Check `.github/workflows/npm-publish.yml` file for more details