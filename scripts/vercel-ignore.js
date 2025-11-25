#!/usr/bin/env node
// Exit with code 0 to tell Vercel to skip the build (ignored build step).
// Exit with non-zero to continue the build.

const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || process.env.GITHUB_REF || '';

// Normalize GITHUB_REF which can be refs/heads/branch
const normalizeRef = (r) => {
  if (!r) return '';
  if (r.startsWith('refs/heads/')) return r.replace('refs/heads/', '');
  return r;
};

const ref = normalizeRef(branch);

// If the commit ref is gh-pages, tell Vercel to ignore the build.
if (ref === 'gh-pages') {
  // console.log allow debugging in Vercel logs
  console.log('vercel-ignore: branch is gh-pages — skipping build');
  process.exit(0);
}

// Otherwise do not ignore (exit non-zero to continue)
console.log(`vercel-ignore: branch is '${ref}' — proceed with build`);
process.exit(1);
