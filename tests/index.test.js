const chai = require('chai');
const chaiFs = require('chai-fs');
const expect = chai.expect;
const fs = require('fs');
const { execSync } = require('child_process');
const { setupProject } = require('../install.js');

chai.use(chaiFs);

describe('Husky setup', () => {
  before(() => {
    setupProject();
  });

  it('should install husky', () => {
    expect('.husky').to.be.a.directory();
  });

  it('should create configuration files', () => {
    expect('.validate-branch-namerc').to.be.a.file().and.not.empty;
    const validateBranchNameConfig = JSON.parse(fs.readFileSync('.validate-branch-namerc'));
    expect(validateBranchNameConfig).to.deep.equal({
      pattern: '^(feature|fix|hotfix|release)\\/[-a-zA-Z0-9_]+$',
      errorMessage: "El nombre de la rama debe seguir el formato 'feature/nombre-de-la-rama'",
    });

    expect('commitlint.config.js').to.be.a.file().and.not.empty;
    const commitlintConfig = fs.readFileSync('commitlint.config.js').toString();
    expect(commitlintConfig).to.include('extends: [\'@commitlint/config-conventional\']');
    expect(commitlintConfig).to.include('rules: {');
    expect(commitlintConfig).to.include("'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],");
  });

  it('should set up package.json', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json'));

    expect(packageJson.scripts.prepare).to.equal('husky install');
    expect(packageJson.scripts['lint-branch']).to.equal('validate-branch-name --config .validate-branch-namerc');
    expect(packageJson.scripts['lint-commit-msg']).to.equal('commitlint -E HUSKY_GIT_PARAMS');

    expect(packageJson.husky.hooks['pre-commit']).to.equal('npm run lint-branch && npm run lint-commit-msg');
  });

  it('should run husky install', () => {
    expect('.husky/pre-commit').to.be.a.file().and.not.empty;
  });

  it('should add Husky hooks', () => {
    expect('.husky/commit-msg').to.be.a.file().and.not.empty;
    const commitMsgHookScript = fs.readFileSync('.husky/commit-msg').toString();
    expect(commitMsgHookScript).to.include('. "$(dirname $0)/_/husky.sh"');
    expect(commitMsgHookScript).to.include('npx --no -- commitlint --edit ${1} --config commitlint.config.js');
  });
});
