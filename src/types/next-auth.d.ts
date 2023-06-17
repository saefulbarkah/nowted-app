import { Session } from 'next-auth';

// Extend the existing session type with custom properties
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    };
  }
}
