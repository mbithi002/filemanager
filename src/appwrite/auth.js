import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(name, email, password) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return await this.login(email, password);
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      console.log("Appwriteservice :: createAccount() :: ", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const currentUser = await this.getCurrentUser();
      if (currentUser) {
        // console.log("Appwriteservice :: login() :: Session already active for", currentUser);
        return currentUser;
      } else {
        const res = await this.account.createEmailPasswordSession(email, password);
        res ? console.log("login success", res) : console.log("failed to login", res);
        return res;
      }
    } catch (error) {
      if (error.code === 401) { // If no session exists
        const res = await this.account.createEmailPasswordSession(email, password);
        res ? console.log("login success", res) : console.log("failed to login", res);
        return res;
      } else {
        console.log("Appwriteservice :: login() :: ", error);
        throw error;
      }
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwriteservice :: getCurrentUser() :: ", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("Logout successful");
    } catch (error) {
      console.log("Appwriteservice :: logout() :: ", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
