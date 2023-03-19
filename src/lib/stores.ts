import type { User } from '$lib/globals'
import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store';

export const user = persisted('user', undefined);
export const xmtpClient = writable(null);
export const conversations = persisted('conversations', []);
