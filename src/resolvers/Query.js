const Query = {
  comments(parent, args, {
    db
  }, info) {
    return db.comments;
  },
  users(parent, args, {
    db
  }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter(user =>
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
  }
}

export {
  Query as
  default
}