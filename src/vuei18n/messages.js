const messages = {
    en: {
        dialog: {
            title: 'title',
            body: 'body {msg}',
            bodyList: 'body {0}',
        },
        text: 'text {count}',
    },
    bg: {
        dialog: {
            title: 'заглавие',
            body: 'съдържание {msg}',
            bodyList: 'съдържание {0}',
        },
        text: 'текст {count}',
    }
};

export default messages;

export const locales = Object.keys(messages);




