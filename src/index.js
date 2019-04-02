import {
	GraphQLServer
} from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

let users = [{
		id: '1',
		name: 'Debotos',
		email: 'debotosdas@gmail.com',
		age: 22
	},
	{
		id: '2',
		name: 'Ripon',
		email: 'ripondas49@gmail.com'
	},
	{
		id: '3',
		name: 'Akash',
		email: 'akashdas@gmail.com',
		age: 23
	}
];

let posts = [{
		id: '10',
		title: 'GraphQL 101',
		body: 'This is how to use GraphQL',
		published: true,
		author: '1'
	},
	{
		id: '11',
		title: 'GraphQL 201',
		body: 'This is advance GraphQL Post',
		published: false,
		author: '2'
	},
	{
		id: '12',
		title: 'Third Post',
		body: 'Awesome 3rd post',
		published: false,
		author: '1'
	}
];

let comments = [{
		id: '1',
		text: 'This is comment 1',
		author: '1',
		post: '10'
	},
	{
		id: '2',
		text: 'This is comment 2',
		author: '2',
		post: '11'
	},
	{
		id: '3',
		text: 'This is comment 3',
		author: '3',
		post: '12'
	},
	{
		id: '4',
		text: 'This is comment 4',
		author: '1',
		post: '12'
	}
];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
    comments: [Comment!]!
  }

  type Mutation {
		createUser(data: createUserInput): User!
		deleteUser(id: ID!): User!
		createPost(data: createPostInput): Post!
		deletePost(id: ID!): Post!
		createComment(data: createCommentInput): Comment!
	}
	
	input createUserInput {
		name: String!
		email: String!
		age: Int
	}

	input createPostInput {
		title: String!
		body: String!
		published: Boolean!
		author: ID!
	}

	input createCommentInput {
		text: String!
		author: ID!
		post: ID!
	}

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
/* If any of the field type is not Scalar then you have to set up a Resolver */
const resolvers = {
	Query: {
		comments(parent, args, ctx, info) {
			return comments;
		},
		users(parent, args, ctx, info) {
			if (!args.query) {
				return users;
			}
			return users.filter(user =>
				user.name.toLowerCase().includes(args.query.toLowerCase())
			);
		},
		me() {
			return {
				id: '123abc',
				name: 'Debotos',
				email: 'debotosdas@gmail.com'
			};
		},
		post() {
			return {
				id: 'abc123',
				title: 'graphql-yoga basic',
				body: 'A very begineer friendly GraphQL starter',
				published: false
			};
		},
		posts(parent, args, ctx, info) {
			if (!args.query) {
				return posts;
			}
			const isTitleMatch = posts.filter(post =>
				post.title.toLowerCase().includes(args.query.toLowerCase())
			);
			const isBodyMatch = posts.filter(post =>
				post.body.toLowerCase().includes(args.query.toLowerCase())
			);

			return isTitleMatch || isBodyMatch;
		}
	},
	Mutation: {
		createUser(parent, args, ctx, info) {
			const userTaken = users.some(user => user.email === args.data.email);
			if (userTaken) throw new Error('Email taken.');

			const user = {
				id: uuidv4(),
				...args.data
			};

			users.push(user);

			return user;
		},

		deleteUser(parent, args, ctx, info) {
			const userIndex = users.findIndex(user => user.id === args.id);

			if (userIndex === -1) {
				throw new Error('Use not found');
			}

			const deletedUsers = users.splice(userIndex, 1);

			posts = posts.filter(post => {
				const match = post.author === args.id;
				if (match) {
					comments = comments.filter(comment => comment.post !== post.id);
				}
				return !match;
			});

			comments = comments.filter(comment => comment.author !== args.id);

			return deletedUsers[0];
		},
		createPost(parent, args, ctx, info) {
			const userExists = users.some(user => user.id === args.data.author);

			if (!userExists) throw new Error('User not found');

			const post = {
				id: uuidv4(),
				...args.data
			};

			posts.push(post);

			return post;
		},
		deletePost(parent, args, ctx, info) {
			const postExists = posts.findIndex((post) => post.id === args.id)

			if (postExists === -1) {
				throw new Error('Post not found')
			}

			const deletedPosts = posts.splice(postExists, 1)

			comments = comments.filter((comment) => comment.post !== args.id)
			return deletedPosts[0]

		},
		createComment(parent, args, ctx, info) {
			const userExists = users.some(user => user.id === args.data.author);
			if (!userExists) throw new Error('User not found');
			const postExists = posts.find(post => post.id === args.data.post);
			if (!postExists) throw new Error('Post not found');
			if (!postExists.published) throw new Error('Post is not published yet');
			const comment = {
				id: uuidv4(),
				...args.data
			};
			comments.push(comment);
			return comment;
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			// parent will be the post object of individual iteration
			/*
        The find() method returns the value of the first element in the array
        that satisfies the provided testing function. Otherwise undefined is returned.
      */
			return users.find(user => user.id === parent.author);
		},
		comments(parent, args, ctx, info) {
			return comments.filter(comment => comment.post === parent.id);
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			// console.log(parent.posts)
			return posts.filter(post => post.author === parent.id);
		},
		comments(parent, args, ctx, info) {
			return comments.filter(comment => comment.author === parent.id);
		}
	},
	Comment: {
		author(parent, args, ctx, info) {
			return users.find(user => user.id === parent.author);
		},

		post(parent, args, ctx, inof) {
			return posts.find(post => post.id === parent.post);
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

// GraphQL Yoga starts on default port 4000
server.start(() => console.log('Server is up!'));