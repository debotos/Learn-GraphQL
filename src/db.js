const users = [{
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

const posts = [{
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

const comments = [{
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

const db = {
  users,
  comments,
  posts
}

export {
  db as
  default
}