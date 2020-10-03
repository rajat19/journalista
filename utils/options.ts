const LOGIN_OPTIONS = ['login', 'signup'];
const JOURNAL_OPTIONS = ['list', 'new'];

export const LOGIN_QUESTIONS = [
{
    name: 'loginOption',
    type: 'list',
    choices: LOGIN_OPTIONS,
    message: 'Do you want to login or signup instead: '
}
];

export function getUserDetailQuestions(isRegister: boolean = false) {
    const additionalMsg = isRegister ? 'New ' : '';
    const USER_DETAILS_QUESTIONS = [
        {
            name: 'username',
            type: 'input',
            message: `${additionalMsg}Username: `,
        },
        {
            // TODO: validate password and add mask
            name: 'password',
            type: 'password',
            mask: '*',
            message: `${additionalMsg}Password: `
        }
    ];
    return USER_DETAILS_QUESTIONS;
};

export const JOURNAL_QUESTIONS = [
{
    name: 'task',
    type: 'list',
    choices: JOURNAL_OPTIONS,
    message: 'Do you want to list your journals or create a new one: '
}
];

export const NEW_JOURNAL = [
{
    name: 'text',
    type: 'input',
    message: 'New Journal Text',
    validate: (text: string) => {
        if (text.length < 1) return 'Journal should be atleast of 1 word.';
        return true;
    },
}
];

export const WANNA_TRY = [
{
    name: 'retry',
    type: 'confirm',
    message: 'See journal options again: '
}
];