const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')


const users = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

const posts = [
    { id: 1, title: 'Harry Potter and the Chamber of Secrets', userId: 1 },
    { id: 2, title: 'Harry Potter and the Prisoner of Azkaban', userId: 1 },
    { id: 3, title: 'Harry Potter and the Goblet of Fire', userId: 1 },
    { id: 4, title: 'The Fellowship of the Ring', userId: 2 },
    { id: 5, title: 'The Two Towers', userId: 2 },
    { id: 6, title: 'The Return of the King', userId: 2 },
    { id: 7, title: 'The Way of Shadows', userId: 3 },
    { id: 8, title: 'Beyond the Shadows', userId: 3 }
]

const UserType = new GraphQLObjectType({
    name: "User",
    description: "A User in our application",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        posts: {
            type: new GraphQLList(PostType),
            resolve: (user) => {
                return posts.filter(post => post.userId === user.id)
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "A Post created by a user",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
        user: {
            type: UserType,
            resolve: (post) => {
                return users.find(user => user.id === post.userId)
            }
        }
    })
})

// root query scope
const rootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        posts: {
            type: new GraphQLList(PostType),
            description: 'List of posts',
            resolve: () => posts
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'List of users',
            resolve: () => users
        },
        post: {
            type: PostType,
            description: 'A single post',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => posts.find(book => book.id === args.id)
        },
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => users.find(user => user.id === args.id)
        }
    })
})

const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addPost: {
            type: PostType,
            description: 'Add a post',
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                userId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const post = {
                    id: posts.length + 1,
                    title: args.title,
                    userId: args.userId
                }
                posts.push(post)
                return book
            }
        }
    })
})


const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})


const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => (console.log("Running")))
