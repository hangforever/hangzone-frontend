import * as admin from 'firebase-admin';

const usersData = [
  {
    email: 'hanger@hangzone.com',
    password: 'password',
  },
  {
    email: 'banger@hangzone.com',
    password: 'password',
  },
];

type UID = string;

export default async function seedUsers(): Promise<UID[]> {
  return Promise.all(
    usersData.map((userData) =>
      admin
        .auth()
        .createUser({
          email: userData.email,
          emailVerified: false,
          password: userData.password,
          disabled: false,
        })
        .then((u) => {
          console.log(`Created user ${u.email}`);
          return u.uid;
        })
    )
  );
}
