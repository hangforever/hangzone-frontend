export interface HangzoneUser {
  name: string
  friendIds: { [userId: string]: boolean },
  userUID: string,
}

export function createHangzoneUser(userUID: string, name: string): HangzoneUser {
  return {
    name: name,
    friendIds: {},
    userUID,
  }
}
