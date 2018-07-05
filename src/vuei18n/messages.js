const messages = {
    en: {
        dialog: {
            title: 'title',
            body: 'body {msg}',
            bodyList: 'body {0}',
        },
    },
    bg: {
        dialog: {
            title: 'заглавие',
            body: 'съдържание {msg}',
            bodyList: 'съдържание {0}',
        },
    }
};

export default messages;

export const locales = Object.keys(messages);




