#!/bin/bash

# Install recommended web dev, design, and testing skills for all supported agents
# (Cursor, VS Code + GitHub Copilot, Claude Code, Codex, etc.) using the Skills CLI.
# On Windows: run in Git Bash (`bash skills.sh`). PowerShell cannot execute bash directly.
#
# openai/frontend-skill is bundled in vendor/openai-frontend-skill/ (not on skills.sh registry).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENT_FLAGS=(-a '*' -g -y)
FRONTEND_SKILL_DIR="${SCRIPT_DIR}/vendor/openai-frontend-skill"

skills=(
    "anthropics/skills@frontend-design"
    "anthropics/skills@theme-factory"
    "anthropics/skills@web-artifacts-builder"
    "anthropics/skills@webapp-testing"
    "expo/skills@building-native-ui"
    "expo/skills@expo-tailwind-setup"
    "expo/skills@native-data-fetching"
    "vercel-labs/agent-skills@vercel-react-best-practices"
    "vercel-labs/vercel-plugin@next-cache-components"
    "vercel-labs/vercel-plugin@next-upgrade"
    "openai/skills@playwright"
    "openai/skills@screenshot"
    "openai/skills@vercel-deploy"
    "trailofbits/skills-curated@openai-develop-web-game"
    "auth0/agent-skills@auth0-nextjs"
    "auth0/agent-skills@auth0-react"
    "greensock/gsap-skills@gsap-core"
    "greensock/gsap-skills@gsap-timeline"
    "netlify/context-and-tools@netlify-frameworks"
    "netlify/context-and-tools@netlify-cli-and-deploy"
    "addyosmani/web-quality-skills@web-quality-audit"
    "addyosmani/web-quality-skills@performance"
    "addyosmani/web-quality-skills@accessibility"
    "addyosmani/web-quality-skills@seo"
    "cypress-io/ai-toolkit@cypress-author"
    "cypress-io/ai-toolkit@cypress-explain"
    "voltagent/skills@voltagent-best-practices"
    "microsoft/skills@cloud-solution-architect"
    "apollographql/skills@graphql-schema"
    "pedronauck/skills@next-best-practices"
    "hashicorp/agent-skills@terraform-style-guide"
    "google-labs-code/stitch-skills@design-md"
    "cloudflare/skills@workers-best-practices"
    "firebase/agent-skills@firebase-basics"
    "nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max"
    "microsoft/skills@mcp-builder"
    "shipshitdev/library@tool-design"
    "muratcankoylan/agent-skills-for-context-engineering@context-engineering-collection"
)

install_local_skill() {
    local path="$1"
    npx skills add "$path" "${AGENT_FLAGS[@]}"
}

install_playwright_variant() {
    local skill_name="$1"
    local repo="$2"
    local subpath="${3:-.}"
    local tmpdir staged src
    tmpdir="$(mktemp -d)"
    echo "Installing ${skill_name} from ${repo}"
    git clone --depth 1 "$repo" "$tmpdir/repo" >/dev/null 2>&1
    staged="${tmpdir}/${skill_name}"
    if [ "$subpath" = "." ]; then
        cp -R "${tmpdir}/repo" "$staged"
    else
        mkdir -p "$staged"
        cp -R "${tmpdir}/repo/${subpath}/." "$staged/"
    fi
    if [ -f "${staged}/SKILL.md" ]; then
        sed -i.bak "s/^name: .*/name: ${skill_name}/" "${staged}/SKILL.md"
        rm -f "${staged}/SKILL.md.bak"
    fi
    install_local_skill "$staged"
    rm -rf "$tmpdir"
}

install_gstack_subskill() {
    local name="$1"
    local tmpdir
    tmpdir="$(mktemp -d)"
    echo "Installing garrytan/gstack@${name}"
    git clone --depth 1 https://github.com/garrytan/gstack.git "$tmpdir" >/dev/null 2>&1
    install_local_skill "${tmpdir}/${name}"
    rm -rf "$tmpdir"
}

install_neolabhq_plugins() {
    local tmpdir ddd_dir
    tmpdir="$(mktemp -d)"
    echo "Installing NeoLabHQ sdd and sadd plugins from context-engineering-kit"
    git clone --depth 1 https://github.com/neolabhq/context-engineering-kit.git "$tmpdir" >/dev/null 2>&1
    install_local_skill "${tmpdir}/plugins/sdd"
    install_local_skill "${tmpdir}/plugins/sadd"
    ddd_dir="${tmpdir}/ddd-skill"
    mkdir -p "${ddd_dir}/rules"
    cp -R "${tmpdir}/plugins/ddd/rules/." "${ddd_dir}/rules/"
    cat > "${ddd_dir}/SKILL.md" <<'EOF'
---
name: ddd
description: Domain-Driven Development plugin from NeoLabHQ. Apply Clean Architecture, SOLID, and DDD patterns via embedded rules when writing or reviewing code.
---

# Domain-Driven Development (NeoLabHQ)

Apply the rules in `rules/` from the NeoLabHQ context-engineering-kit ddd plugin.

Read and follow all markdown rule files in this skill's `rules/` directory when implementing or reviewing code.
EOF
    install_local_skill "$ddd_dir"
    rm -rf "$tmpdir"
}

install_ehmo_platform_skills() {
    echo "Installing all ehmo/platform-design-skills"
    npx skills add ehmo/platform-design-skills --skill '*' "${AGENT_FLAGS[@]}"
}

echo "Installing recommended skills for all agents..."

installed=0
failed=0

for skill in "${skills[@]}"; do
    echo "Adding skill: $skill"
    if npx skills add "$skill" "${AGENT_FLAGS[@]}"; then
        installed=$((installed + 1))
    else
        echo "Failed to install: $skill" >&2
        failed=$((failed + 1))
    fi
done

# openai/frontend-skill is bundled with this repo (not published in openai/skills).
if [ -f "${FRONTEND_SKILL_DIR}/SKILL.md" ]; then
    echo "Installing bundled frontend-skill from ${FRONTEND_SKILL_DIR}"
    if install_local_skill "$FRONTEND_SKILL_DIR"; then
        installed=$((installed + 1))
    else
        echo "Failed to install bundled frontend-skill" >&2
        failed=$((failed + 1))
    fi
else
    echo "Skipping frontend-skill (missing ${FRONTEND_SKILL_DIR}/SKILL.md)" >&2
fi

# Multiple Playwright skills share the same skill name; install each with a unique name.
install_playwright_variant "playwright-skill-testmu-ai" "https://github.com/LambdaTest/agent-skills.git" "playwright-skill"
install_playwright_variant "playwright-skill-lackeyjb" "https://github.com/lackeyjb/playwright-skill.git" "skills/playwright-skill"
install_playwright_variant "playwright-skill-testdino-hq" "https://github.com/testdino-hq/playwright-skill.git" "."
installed=$((installed + 3))

# garrytan/gstack exposes qa, browse, and plan-eng-review as top-level subfolders.
install_gstack_subskill "qa"
install_gstack_subskill "browse"
install_gstack_subskill "plan-eng-review"
installed=$((installed + 3))

# NeoLabHQ sdd (spec-driven development) and ddd (domain-driven rules).
install_neolabhq_plugins
installed=$((installed + 16))

# ehmo/platform-design-skills (all platform design guideline skills).
install_ehmo_platform_skills
installed=$((installed + 8))

echo "Done. Installed: $installed, Failed: $failed"
echo "Skills are installed globally for all detected agents (Cursor, GitHub Copilot, Claude Code, etc.)."
echo "Note: openai/skills@develop-web-game is installed via trailofbits/skills-curated@openai-develop-web-game."
echo "Note: testmu-ai/playwright-skill maps to LambdaTest/agent-skills (installed as playwright-skill-testmu-ai)."
echo "Note: oby/next-best-practices is unavailable; using pedronauck/skills@next-best-practices."
echo "Note: muratcankoylan/tool-design is installed via shipshitdev/library@tool-design."
echo "Note: NeoLabHQ/sdd installs the sdd plugin; NeoLabHQ/ddd installs ddd rules wrapper + sadd plugin skills."
