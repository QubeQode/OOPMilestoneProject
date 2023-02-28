import IUser from "./user.interface";

// ⭐️ Feel free to change this interface to your liking. change this to users to post users and comments. fisst step look at jeddit and the fakedb stuff.
export default interface IDatabase {
  users: IUser[];
}
