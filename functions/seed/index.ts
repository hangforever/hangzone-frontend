import seedUsers from './users';
import seedProfiles from './profiles';

export default async function seedAll() {
  try {
    console.log('Seeding firestore data for development mode...');
    const uids = await seedUsers();
    await seedProfiles(uids);
  } catch (e) {
    console.log('Error seeding firestore data');
    console.error(e);
  }
}
