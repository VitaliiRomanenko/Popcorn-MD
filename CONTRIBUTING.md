# Contributing to Popcorn‑MD

Thank you for your interest in contributing! This document outlines the process for contributing to the project.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/VitaliiRomanenko/popcorn-md
   cd popcorn-md
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run in dev mode**:
   ```bash
   npm run dev
   ```
5. **Build** the plugin:
   ```bash
   npm run build
   ```
6. **Run tests**:
   ```bash
   npm test
   ```

## Development Workflow

- The plugin is written in TypeScript. Source files are in `src/`.
- Use `npm run dev` to watch for changes and rebuild automatically.
- Use `npm run lint` to check code style (ESLint).
- Use `npm run format` to auto‑format code (Prettier).

## Code Style

- Follow the existing code style (2‑space indentation, semicolons, etc.).
- Use JSDoc comments for all public functions, classes, and methods.
- Keep functions small and focused.
- Use meaningful variable and function names.

## Testing

- Tests are located in `tests/` and use Jest.
- Run `npm test` to execute all tests.
- When adding new features, please add corresponding tests.

## Pull Request Process

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Make your changes and commit them with clear commit messages.
3. Push your branch to your fork:
   ```bash
   git push origin feature/my-feature
   ```
4. Open a pull request against the `main` branch of the original repository.
5. Ensure the PR description explains what the change does and why it is needed.
6. Wait for a maintainer to review your PR. Address any feedback.

## Reporting Issues

- Use the GitHub issue tracker to report bugs or suggest features.
- Provide a clear description, steps to reproduce, and environment details.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see `LICENSE`).
