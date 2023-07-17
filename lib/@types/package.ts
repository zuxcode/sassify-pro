export interface Package {
  name: string;
  version: string;
  author: string;
  description: string;
  dependencies: { 'sassify-pro': string };
  devDependencies: { 'sassify-pro': string };
  peerDependencies: { 'sassify-pro': string };
}
