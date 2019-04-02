const Post = {
  author(parent, args, {
    db
  }, info) {
    // parent will be the post object of individual iteration
    /*
      The find() method returns the value of the first element in the array
      that satisfies the provided testing function. Otherwise undefined is returned.
    */
    return db.users.find(user => user.id === parent.author);
  },
  comments(parent, args, {
    db
  }, info) {
    return db.comments.filter(comment => comment.post === parent.id);
  }
}

export {
  Post as
  default
}