import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  return { timestamp: params.timestamp };
}) satisfies PageLoad;