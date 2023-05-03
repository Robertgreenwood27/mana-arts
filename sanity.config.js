import { createClient } from 'next-sanity';

const client = createClient({
  projectId: '4rlmck45',
  dataset: 'production',
  apiVersion: '2023-04-01',
  useCdn: false,
});

export default client;