import {
	GraphQLServer
} from 'graphql-yoga';

import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

// Note:
/* In Resolvers => If any of the field type is not Scalar then you have to set up a Resolver */

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql', // path relative root of the application
	resolvers: {
		Query,
		Mutation,
		User,
		Post,
		Comment
	},
	context: {
		db
	}
});

// GraphQL Yoga starts on default port 4000
server.start(() => console.log('Server is up!'));