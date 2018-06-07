
export default class Balls {
    constructor(collection) {
        this._balls = [];

        // a reference to the Balls collection
        this._ballsCollection = collection;

        // onSnapshot is executed every time the data
        // in the underlying firestore collection changes
        // It will get passed an array of references to
        // the documents that match your query
        this._ballsCollection.onSnapshot((ballsRef) => {
            const balls = [];
            ballsRef.forEach((doc) => {
                const ball = doc.data();
                ball.id = doc.id;
                balls.push(ball);
            });

            // immutable - change entirely - will not work with current design of the store
            // as it creates a new store { balls: xxxx } object,
            // so changing the 'xxx' (in this case the this._balls) will not be caught by VueJS reactivity
            //this._balls = balls;

            // mutate
            this._balls.splice(0);
            this._balls.push(...balls);
        });
    }

    get balls() {
        return this._balls;
    }

    /**
     *
     * @param {String} message
     * @param {User} user (FirebaseAuth User instance)
     */
    write({ message, user }) {
        this._ballsCollection.add({
            createdOn: new Date(),
            author: user.uid,
            author_name: user.displayName,
            message
        });
    }
}
