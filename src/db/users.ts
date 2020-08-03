export interface HangzoneUser {
  name: string
  friendIds: { [userId: string]: boolean },
  userId: string,
}

export function createHangzoneUser(userId: string, name: string): HangzoneUser {
  return {
    name: name,
    friendIds: {},
    userId,
  }
}
