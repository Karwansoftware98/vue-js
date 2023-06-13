import isOnline from 'is-online';

export async function checkNetwork() {
  const online = await isOnline();
  if (!online) {
    throw new Error('No internet connection.');
  }
}
