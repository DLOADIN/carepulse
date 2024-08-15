import * as sdk from 'node-appwrite';

// Destructure environment variables
const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env;

// Check for required environment variables
if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  throw new Error('Missing environment variables: ENDPOINT, PROJECT_ID, or API_KEY');
}

// Initialize Appwrite client
const client = new sdk.Client();

client
  .setEndpoint(ENDPOINT as string)
  .setProject(PROJECT_ID as string)
  .setKey(API_KEY as string);

// Initialize Appwrite services
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
