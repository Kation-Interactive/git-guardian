const { execSync } = require('child_process');
const fs = require('fs');

function setupProject() {
  console.log('Installing dependencies...');
  execSync('npm install husky validate-branch-name @commitlint/cli @commitlint/config-conventional --save-dev', { stdio: 'inherit' });

  console.log('Creating configuration files...');
  fs.writeFileSync('.validate-branch-namerc', JSON.stringify({
    pattern: '^(feature|fix|hotfix|release)\\/[-a-zA-Z0-9_]+$',
    errorMessage: "El nombre de la rama debe seguir el formato 'feature/nombre-de-la-rama'",
  }, null, 2));

  fs.writeFileSync('commitlint.config.js', `module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    },
  };`);

  console.log('Setting up package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json'));
  packageJson.scripts = {
    ...packageJson.scripts,
    prepare: 'husky install',
    'lint-branch': 'validate-branch-name --config .validate-branch-namerc',
    'lint-commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  };
  packageJson.husky = {
    hooks: {
      'pre-commit': 'npm run lint-branch && npm run lint-commit-msg',
    },
  };
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  console.log('Running husky install...');
  execSync('npx husky install', { stdio: 'inherit' });

  console.log('Adding Husky hooks...');
  execSync('npx husky add .husky/pre-commit "npx validate-branch-name"', { stdio: 'inherit' });
  const commitMsgHookScript = `
  #!/bin/sh
  . "$(dirname $0)/_/husky.sh"

  npx --no -- commitlint --edit \${1} --config commitlint.config.js
  `;

  fs.writeFileSync('.husky/commit-msg', commitMsgHookScript);

  console.log('Setting up completed.');
}

module.exports = {
  setupProject,
};

setupProject();