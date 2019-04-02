import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, {
    db
  }, info) {
    const userTaken = db.users.some(user => user.email === args.data.email);
    if (userTaken) throw new Error('Email taken.');

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);

    return user;
  },

  deleteUser(parent, args, {
    db
  }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('Use not found');
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    posts = db.posts.filter(post => {
      const match = post.author === args.id;
      if (match) {
        comments = db.comments.filter(comment => comment.post !== post.id);
      }
      return !match;
    });

    comments = db.omments.filter(comment => comment.author !== args.id);

    return deletedUsers[0];
  },
  createPost(parent, args, {
    db
  }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!userExists) throw new Error('User not found');

    const post = {
      id: uuidv4(),
      ...args.data
    };

    db.posts.push(post);

    return post;
  },
  deletePost(parent, args, {
    db
  }, info) {
    const postExists = db.posts.findIndex((post) => post.id === args.id)

    if (postExists === -1) {
      throw new Error('Post not found')
    }

    const deletedPosts = db.posts.splice(postExists, 1)

    comments = db.comments.filter((comment) => comment.post !== args.id)
    return deletedPosts[0]

  },
  createComment(parent, args, {
    db
  }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);
    if (!userExists) throw new Error('User not found');
    const postExists = db.posts.find(post => post.id === args.data.post);
    if (!postExists) throw new Error('Post not found');
    if (!postExists.published) throw new Error('Post is not published yet');
    const comment = {
      id: uuidv4(),
      ...args.data
    };
    db.comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, {
    db
  }, info) {
    const commentExists = db.comments.findIndex((comment) => comment.id === args.id)

    if (commentExists === -1) throw new Error('Comment not found')

    const deletedComments = db.comments.splice(commentExists, 1)

    return deletedComments[0];
  }
}

export {
  Mutation as
  default
}