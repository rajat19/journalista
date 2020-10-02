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

## Installation (Using npm registries)
There are two ways to install the cli (Do any one)

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

## How to run this project (if you want to code)
- Make changes to code
- Then run following commands 
```bash
npm run build && npm link
journalista
```
or for development purposes you can also directly do
```bash
npm run start
```

## What the system does
1. Allows login/signup using command line
2. List/Create journals for user -> only authorized users

The system encrypts username/passwords and journals so that these are not visible by anyone just crawling 
through the repo. Your journals are secure with us.


## Publish
This package uses github actions to publish to both npm as well as github registries
Check `.github/workflows/npm-publish.yml` file for more details