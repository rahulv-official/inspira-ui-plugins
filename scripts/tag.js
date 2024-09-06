const { execSync } = require('child_process');
const args = process.argv.slice(2);

// Default values
let releaseType = 'patch';
let preid = '';

// Parse arguments
args.forEach(arg => {
  if (arg.startsWith('--release=')) {
    releaseType = arg.split('=')[1];
  }
  if (arg.startsWith('--preid=')) {
    preid = arg.split('=')[1];
  }
});

try {
  // Bump the version based on the release type and preid (if provided)
  const versionCommand = preid ? `npm version ${releaseType} --preid=${preid}` : `npm version ${releaseType}`;
  execSync(versionCommand, { stdio: 'inherit' });

  // Push the commit with the new version
  execSync('git push', { stdio: 'inherit' });

  // Push the new tag to the remote repository
  execSync('git push --tags', { stdio: 'inherit' });

  console.log(`Version bumped and tagged as a ${releaseType} release with preid "${preid}".`);
} catch (error) {
  console.error('An error occurred while tagging the release:', error.message);
  process.exit(1);
}
