import { writable } from 'svelte/store';

export const username = writable('');
export const friendUsername = writable('');
export const peer = new Peer();

peer.on('open', id => username.set(id));
