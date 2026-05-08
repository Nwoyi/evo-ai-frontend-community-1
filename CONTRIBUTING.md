# Contributing to Hyvelox Frontend

Thanks for your interest in contributing to Hyvelox Frontend! This document
outlines how to contribute effectively.

## Code of Conduct

All contributors are expected to be respectful, inclusive, and professional.
Harassment, discrimination, or abusive behavior will not be tolerated.

## How to Contribute

### Reporting Bugs

1. Check existing [issues](https://github.com/Nwoyi/evo-ai-frontend-community-1/issues)
   to avoid duplicates
2. Open a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, version, dependencies)
   - Logs or screenshots when relevant

### Suggesting Features

1. Open an issue describing:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternatives you considered
2. Wait for maintainer feedback before starting implementation

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch from `develop`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Make your changes following the project's coding standards
4. Write or update tests for your changes
5. Ensure all tests pass and the code lints clean
6. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add new feature
   fix: resolve bug in X
   docs: update README
   refactor: simplify Y
   test: add coverage for Z
   ```
7. Push to your fork and open a PR against `develop`
8. Fill out the PR template with context, testing notes, and screenshots if
   applicable

## Development Setup

See [README.md](./README.md) for project-specific setup instructions.

## Code Standards

- Follow the existing code style of the project
- Run linters and formatters before committing
- Add tests for new features and bug fixes
- Document public APIs and non-obvious behavior
- Keep commits atomic and focused

## Branch Strategy

- `main` — stable production-ready code
- `develop` — integration branch for upcoming releases
- `feat/*`, `fix/*`, `chore/*` — short-lived branches off `develop`

## Upstream sync

Hyvelox Frontend is a brand-modified fork of upstream
[Evo CRM Frontend](https://github.com/evolution-foundation/evo-ai-frontend-community)
(Apache-2.0). When pulling upstream changes:

- Do not re-introduce upstream brand assets, trademarks, or the
  `evocrm-frontend` wordmark into the user interface — they have been
  intentionally removed per the upstream TRADEMARKS §4.2.
- Re-run the brand audit (search for `Evo CRM`, `EvoAI`, `Evolution Foundation`,
  `evocrm-frontend`) after every upstream merge.
- Preserve the [NOTICE](./NOTICE) attribution to Evolution Foundation —
  Apache-2.0 §4(c) requires it.

## License of Contributions

By contributing, you agree that your contributions will be licensed under the
Apache License 2.0 (see [LICENSE](./LICENSE)).

Hyvelox trademarks and brand assets are governed separately by
[TRADEMARKS.md](./TRADEMARKS.md).

## Questions?

- **Email**: support@hyvelox.com
- **Website**: [hyvelox.com](https://hyvelox.com)

Thanks for helping make Hyvelox Frontend better!

---

© 2026 Hyvelox
