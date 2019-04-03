const Subscription = {
  count: {
    subscribe(parent, args, {
      pubsub
    }, info) {
      let count = 0

      setInterval(() => {
        count++
        pubsub.publish('count', { // publish data in 'count' channel
          count
        })
      }, 1000)

      return pubsub.asyncIterator('count') // up/create the 'count' channel
    }
  },
  post: { // 'post' key have to match with schema's subscription
    subscribe(parent, args, ctx, info) {
      return ctx.pubsub.asyncIterator('post')
    }
  },
  comment: { // It will be an object
    subscribe(parent, { // 'everything inside subscribe(){}'
      postId
    }, ctx, info) {
      const {
        db,
        pubsub
      } = ctx;
      const post = db.posts.find((post) => post.id === postId && post.published)

      if (!post) throw new Error('Post not found')

      return pubsub.asyncIterator(`comment ${postId}`)
    }
  }
}

export {
  Subscription as
  default
}