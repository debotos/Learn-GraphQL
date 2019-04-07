const Query = {
  users(parent, args, {
    db,
    prisma
  }, info) {
    return prisma.query.users(null, info)
  },
  posts(parent, args, {
    db
  }, info) {
    if (!args.query) {
      return db.posts;
    }
    const isTitleMatch = db.posts.filter(post =>
      post.title.toLowerCase().includes(args.query.toLowerCase())
    );
    const isBodyMatch = db.posts.filter(post =>
      post.body.toLowerCase().includes(args.query.toLowerCase())
    );

    return isTitleMatch || isBodyMatch;
  },
  comments(parent, args, {
    db
  }, info) {
    return db.comments;
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

}

export {
  Query as
  default
}