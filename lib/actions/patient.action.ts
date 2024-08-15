'use server';

import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';
import { parseStringify } from '../utils';

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(), 
      user.email,
      user.phone,
      undefined, 
      user.name
    );
    return newUser;
  } catch (error: any) {
    if (error?.code === 409) {
      const documents = await users.list([
        Query.equal('email', user.email)
      ]);
      return documents?.users[0]; 
    } else {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};

export const getUser = async (userId: string)=> {
  try{
    const user = await users.get(userId);
    return parseStringify(user);
  }
  catch(error:any){
    console.log(error)
  }
}