import { Hangzone } from 'types';
import API from './axios';

/**
 * `hangzones` collection
 */

export async function get(): Promise<Hangzone[]> {
  const { data, status } = await API.get(`/api/hangzones`);
  if (status !== 200) throw new Error(data.message);
  return data.data.hangzones;
}

export async function checkIn(hangzoneId: string): Promise<Hangzone> {
  const { data, status } = await API.post(`api/hangzones/checkin`, {
    hangzoneId,
  });
  if (status !== 200) throw new Error(data.message);
  return data.data.hangzone;
}
