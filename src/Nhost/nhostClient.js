import { NhostClient } from '@nhost/nhost-js' 
const subdomain = import.meta.env.VITE_NHOST_SUBDOMAIN;
const region = import.meta.env.VITE_NHOST_REGION;

const nhost = new NhostClient({
  subdomain: subdomain, 
  region: region,     
});

export default nhost;
