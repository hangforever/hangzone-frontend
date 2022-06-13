import API from './axios';

/**
 * `profiles` collection
 * Each profile's UID is the UID of the firebaseUser's UID that it is created with
 */

export async function signUp(
  email: string,
  password: string
): Promise<null> {
  const { data, status } = await API.post('/api/auth/signup', {
    email,
    password,
  });
  if (status !== 200) throw new Error(data.message);
  return null;
}
