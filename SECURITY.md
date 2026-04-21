# Security

## Reporting a vulnerability

If you believe you have found a **security vulnerability** in this repository (for example in the **reference Ideas API** under `src/`, or in scripts that could affect consumers), please **do not** open a public issue with exploit details.

**Preferred:** Open a **private security advisory** on GitHub for this repository (Security → Advisories), or contact the maintainers through a channel they publish on the repo profile.

Include:

- A short description of the issue and impact  
- Steps to reproduce (if safe to share)  
- Whether you believe it affects **only this demo repo** or **consumers who copy rules/scripts**

## Scope notes

- **mstack** is primarily **Markdown rules and templates** copied into other projects. Those files are not executable by themselves; risk is mostly **social engineering** (malicious instructions) if you install rules from an **untrusted** source — prefer this **official repo** or your own fork.
- The **Ideas HTTP API** in `src/` is a **demo** service (in-memory or optional file store). **Do not** expose it to the public internet without your own hardening and review.

## Security-related rules in the pack

For **application** security posture while coding, see **`mstack-security-review`**, **`mstack-secrets-env`**, and **`templates/SECURITY_REVIEW_LITE.md`** after you sync mstack into your project.
