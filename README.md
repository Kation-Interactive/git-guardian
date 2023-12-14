# GitGuardian

[![npm version](https://img.shields.io/npm/v/quality-code.svg)](https://www.npmjs.com/package/quality-code)
[![License](https://img.shields.io/npm/l/quality-code.svg)](https://github.com/jordycold/quality-code/blob/main/LICENSE)

GitGuardian is a utility to set up Git hooks and configuration files for enforcing branch name validation and commit message linting in a project using popular packages like Husky, Validate Branch Name, and Commitlint. It installs necessary dependencies, creates configuration files, sets up package.json scripts, and adds Husky hooks. Branch names are validated against a specified pattern, and commit messages are linted based on conventional commit guidelines.

## Features

- Validates branch names to follow a specific pattern.
- Enforces commit message format using conventional commit standards.
- Provides hooks for pre-commit checks to ensure code quality before committing.

## Installation

To install GitGuardian, run the following command:

```bash
npm install git-guardian
```

## Configuration

GitGuardian provides the following configuration files:

- `.validate-branch-namerc`: Configures the branch name pattern and error message.
- `commitlint.config.js`: Configures the commit message format and rules.

You can modify these files according to your project's requirements.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request on the GitHub repository.

## License

GitGuardian is released under the MIT License.

This project relies on the following packages for its functionality:

- Husky: Git hooks made easy.
- Validate Branch Name: Validate branch names against custom patterns.
- @commitlint/cli: Lint commit messages using conventional commit standards.
- @commitlint/config-conventional: Default configuration for commitlint using conventional commits.

These packages greatly contribute to the features and functionality of GitGuardian. We extend our gratitude to their maintainers and contributors for their excellent work.
