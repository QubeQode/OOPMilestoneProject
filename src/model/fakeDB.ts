import IPost from "../interfaces/post.interface";
import IDatabase from "../interfaces/database.interface.ts";

// Please feel free to not use this, or completely change it to your liking. It is just an example.
const database: IDatabase = {
  users: [
    {
      id: 1,
      email: "gates@gmail.com",
      password: "$2b$10$L0TYesYeZ0zi.fjOfGpd1OyUgF0sw4CETBVMPXtNLxEKLubXQzNDm",
      firstName: "Bill",
      lastName: "Gates",
      username: "billgates",
    },
    {
      id: 2,
      email: "james123@gmail.com",
      password: "james123",
      firstName: "James",
      lastName: "John",
      username: "james123",
    },
    {
      id: 3,
      email: "jobs@gmail.com",
      password: "steve123",
      firstName: "Steve",
      lastName: "Jobs",
      username: "stevejobs",
    },
    {
      id: 4,
      email: "ad123@gmail.com",
      password: "ad123123!",
      firstName: "Armaan",
      lastName: "Armaan",
      username: "Armaan123",
    },
    {
      id: 5,
      email: "jo123@gmail.com",
      password: "jo123",
      firstName: "John",
      lastName: "Armaan",
      username: "John123",
    },
    {
      id: 6,
      email: "musk@gmail.com",
      password: "elon123",
      firstName: "Elon",
      lastName: "Musk",
      username: "elonmusk",
    },
  ],
  posts: [
    {
      postId: 1,
      userId: 4,
      message: "Hi there",
      likes: 0,
      createdAt: 1643648446955,
      comments: [],
    },
    {
      postId: 2,
      userId: 3,
      message: "this is a new post by me",
      likes: 0,
      createdAt: 1643648446955,
      comments: [],
    },
    {
      postId: 3,
      userId: 1,
      message: "Microsoft is a nice company",
      likes: 3,
      createdAt: 1643648446955,
      comments: [],
    },
    {
      postId: 4,
      userId: 2,
      message: "A post by John",
      likes: 30,
      createdAt: 1643648446955,
      comments: [],
    },
    {
      postId: 5,
      userId: 2,
      message: "Nice weather today in Vancouver",
      likes: 12,
      createdAt: 1643648446955,
      comments: [],
    },
    {
      postId: 6,
      userId: 3,
      message: "Apple is a nice company",
      likes: 3,
      comments: [],
      createdAt: 1643648446955,
    },
    {
      postId: 7,
      userId: 3,
      message: "Twitter is my toy",
      likes: 3,
      comments: [],
      createdAt: 1643648446955,
    },
  ],
  comments: [
    {
      id: 1,
      postId: 4,
      userId: 1,
      message: "this is some random comment",
      createdAt: "1676188223124",
    },
    {
      id: 2,
      postId: 4,
      message: "string",
      userId: 3,
      createdAt: "1643648446955",
    },
    {
      id: 3,
      postId: 4,
      message: "Cool post james. Glad I decided to follow you.",
      userId: 1,
      createdAt: "1643648446955",
      // createdAt: "2012-01-05T04:13:24Z",
    },
    {
      id: 4,
      postId: 4,
      message: "The weather is always nice when you're rich like me.",
      userId: 1,
      createdAt: "1643648446955",
      // createdAt: "2012-02-05T05:13:24Z",
    },
    {
      id: 5,
      postId: 4,
      userId: 1,
      message: "this is some random comment",
      createdAt: "1676188223124",
    },
  ],
  // liked: [
  //   {
  //     postId: 3,
  //     userId: 1,
  //     liked: true,
  //   },
  //   {
  //     postId: 3,
  //     userId: 2,
  //     liked: true,
  //   },
  // ],
};

// -------- Note: I only created these as a simple test example for you, delete them later and use above db or your own --------------
const userDatabase = [
  {
    id: "1",
    firstName: "Armaan",
    lastName: "Armaan",
    email: "ad123@gmail.com",
    password: "ad123123!",
    role: "admin",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Armaan",
    email: "jo123@gmail.com",
    password: "jo123",
    role: "user",
  },
];

const post = {
  postId: 5,
  userId: "john",
  createdAt: new Date(),
  message: "Hi there",
  comments: "1",
  likes: "2",
  commentList: ["cool post"],
};

// const posts: IPost[] = [
//   {
//     id: "5",
//     userId: "john",
//     createdAt: new Date(),
//     message: "Hi there",
//     comments: 1,
//     likes: 2,
//     commentList: [{ id: "1", message: "some comment", userId: "5", createdAt: "yesterday" }],
//   },
//   {
//     id: "4",
//     userId: "jun",
//     createdAt: new Date(),
//     message: "this is a new post by me",
//     comments: 1,
//     likes: 2,
//     commentList: [{ id: "1", message: "some comment", userId: "5", createdAt: "yesterday" }],
//   },
// ];

export { userDatabase, database, post, /*posts*/ };
