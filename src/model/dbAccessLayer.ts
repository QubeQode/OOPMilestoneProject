import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

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

  private findUser = async(email?): Promise<User> => {
    let user = null;
    if (email) {
      user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
    }
    return user;
  };

  private modifyPassword = async(userID: number, password: string): Promise<void> => {
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

class DatabaseAccessHandler {
  
}

async function main() {
    const users = await prisma.user.findMany();
    const posts = await prisma.post.findMany();
    const comments = await prisma.comment.findMany();
    const likes = await prisma.like.findMany();

    console.log('Users: ', users);
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