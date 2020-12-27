import { Friends, Aliens } from "./dbConnectors";

class Friend {
    constructor(id, { firstName, lastName, gender, email, contacts }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.contacts = contacts;
    }
}

// Resolver Map
export const resolvers = {
    Query: {
        getFriend: ({ id }) => {
            return new Friend(id, friendDatabase[id]);
        },
    },
    Mutation: {
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                email: input.email,
                contacts: input.contacts,
            });
            newFriend.id = newFriend._id;
            return new Promise((resolve, object) => {
                newFriend.save((err) => {
                    if (err) reject(err);
                    else resolve(newFriend);
                });
            });
        },
    },
};