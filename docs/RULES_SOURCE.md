# Where mstack rules live (vendor vs remote import)

You can get mstack’s `.mdc` rules into a project in two broad ways. Both are valid; they trade **control and verify-ability** for **convenience**.

## Path A — Vendored copy + sync (recommended for teams)

**What:** `git submodule`, subtree, or copy of mstack at e.g. **`vendor/mstack`**, then **`scripts/sync-mstack.sh`** with **`MSTACK_PACK`**.

**Pros:**

- **Explicit packs** via [`scripts/packs/*.txt`](../scripts/packs/) ([PACKS.md](PACKS.md)).
- **`verify-mstack-sync.sh --strict`** proves consumer `.cursor/rules` matches the chosen pack ([POWER_USER.md](POWER_USER.md)).
- **`AGENTS.md`**, **`templates/`**, and **`.cursor/skills/`** copy in one place.

**Cons:** Submodule or copy discipline; teammates must re-sync after updates ([VENDOR_UPGRADE.md](VENDOR_UPGRADE.md)).

## Path B — Cursor remote rule import

**What:** In the Cursor UI, **import project rules from a GitHub repo** into **`.cursor/rules/imported/`** (or equivalent)—see [Rules](https://cursor.com/docs/context/rules).

**Pros:** No submodule; quick try-out; dashboard-managed updates.

**Cons:**

- **No automatic pack parity** with mstack’s **`minimal` / `standard` / `full`** manifests unless you enforce naming or custom checks yourself.
- **Skills** and **`templates/`** are **not** pulled the same way—you still copy or vendor those if you want them.
- **`AGENTS.md`** merge remains manual.

**When B fits:** Solo experiments, inner-source “always latest main,” or orgs that standardize on dashboard rule sync.

## Choosing

| Situation | Prefer |
| --------- | ------ |
| Team CI, strict “only these rules” | **Path A** + optional consumer workflow from **`mstack-pack-verify.yml.example`** |
| Quick personal project | **Path A** minimal pack, or **Path B** if you only want rules |
| Monorepo, many packages | **Path A** once at root ([MONOREPO.md](MONOREPO.md)) |

## See also

- [CURSOR_INTEGRATION.md](CURSOR_INTEGRATION.md) — full surface map
- [STARTER_KIT.md](STARTER_KIT.md) — Path A commands
