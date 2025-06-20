import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isQueensStudent?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isQueensStudent?: boolean;
  }
}