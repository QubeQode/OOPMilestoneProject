import { Post, PrismaClient, User, Follower } from '@prisma/client'

const prisma = new PrismaClient()

/*
 * Auth:
 * - Authenticate email + pass against db
 *    - findUser by email
 * - Register new user
 *    - createUser with fname, lname, email, pass
 * 
 * Feed:
 * - Post Feed from random sample of ppl user follows
 *    - fname, date made, content, comments, likes
 * 
 * Posts:
 * - Specific post from a post id
 *    - findPost by id
 * - Delete post by post id
 *    - delete post where id = post id
 * - Create post
 *    - given content and the rest is taken from user
 *    - init with 0 likes and comments
 * - Like post by post id
 *    - findPost by id
 *    - create like entity for it
 *        - user id, post id
 * 
 * Search:
 * - Find all posts with keyword in content and all users with keyword in name
 *    - allPosts where post.content contains keyword
 */

interface IUserInitObject {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

class UserHandler {
  private _user: User;

  constructor (email: string = undefined, userInitObject: IUserInitObject = undefined) {
    if (userInitObject) {
      this.createUser(userInitObject)
    }
    const userEmail: string = email || userInitObject.email;

    this.findUser(userEmail)
    .then(foundUser => {
      this._user =  foundUser;
    });
  }


  private createUser = async(userInitObject: IUserInitObject)
    : Promise<void> => {
    await prisma.user.create({
      data: {
        ...userInitObject
      }
    })
  };

  private findUser = async(email): Promise<User> => {
    let user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    return user;
  };

  private updatePassword = async(userID: number, password: string): Promise<void> => {
    prisma.user.update({
      where: {
        id: userID
      },
      data: {
        password: password
      }
    })
  };

  private deleteUser = async(userID: number): Promise<void> => {
    await prisma.user.delete({
      where: {
        id: userID
      }
    });
  };
}

class FeedHandler {
  private _feed: Post[];

  constructor (userID: number) {
    this.createFeed(userID)
    .then(feed => {
      this._feed = feed;
    })
  }

  private createFeed = async(userID: number): Promise<Post[]> => {
    const followed = await prisma.follower.findMany({
      where: {
        followerID: userID
      }
    })
    
    const feed = [];

    for (let followedUser of followed) {
      const userID = followedUser.followingID;
      const posts = await prisma.post.findMany({
        where: {
          id: userID
        }
      });

      feed.push(posts[posts.length - 1]);
    }
    return feed;
  };
}

interface IPostInitObject {
  userID: number;
  content: string;
}

interface IRepostInitObject extends IPostInitObject {
  parentPostId: number;
}

class PostHandler {
  private _post: Post;

  constructor(userID: number = undefined, content: string = undefined, 
    postInitObject: IPostInitObject | IRepostInitObject = undefined) {
      if (postInitObject) {
        this.createPost(postInitObject)
      }
      const postCreator = userID || postInitObject.userID;
      const postContent = content || postInitObject.content;
      
      this.findPost(postCreator, postContent)
      .then(foundPost => {
        this._post = foundPost;
      })
  }

  private findPost = async(userID: number, content: string): Promise<Post> => {
    const post = await prisma.post.findUnique({
      where: {
        userID: userID,
        content: content,
      }
    })

    return post;
  }

  private createPost = async(initObject: IPostInitObject | IRepostInitObject): Promise<void> => {
    prisma.post.create({
      data: {
        ...initObject
      }
    })
  }
}

class DatabaseAccessHandler {
  
}

async function main() {
    const users = await prisma.user.findMany();
    const follows = await prisma.follower.findMany();
    const posts = await prisma.post.findMany();
    const comments = await prisma.comment.findMany();
    const likes = await prisma.like.findMany();

    console.log('Users: ', users);
    console.log('Followers: ', follows);
    console.log('Posts: ', posts);
    console.log('Comments: ', comments);
    console.log('Likes: ', likes);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })