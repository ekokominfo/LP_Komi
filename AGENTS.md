# LP_Komi — project guidance

This project has selected local skills in `.agents/skills/`. Read the relevant SKILL.md and its required references when applying it; do not load or execute all skills by default. User instructions take precedence. Installation alone does not authorize implementation or publishing.

## Selection
- Investigate reported 3D failures: systematic-debugging; verify with playwright.
- Camera driven by scrolling: scroll-experience and threejs-animation.
- Office shape, proportions and roof references: 3dviz-pro-max and threejs-geometry.
- Animated lighting and bloom: threejs-lighting, threejs-postprocessing; use threejs-shaders only for effects that need custom shaders.
- Mobile performance: threejs-performance.
- Identity, theme and readable UI: frontend-design; review with web-design-guidelines.

The application uses Three.js r180. These Three.js skill examples target r186: verify API compatibility; do not upgrade dependencies merely to follow an example. Adapt helper paths to this checkout's actual `.agents/skills` directories rather than global paths from upstream examples. Installation does not install MCP servers or application libraries.

Provenance, upstream licenses, and hashes are preserved; see `.agents/skills-provenance.json`. Keep vendored skills unchanged unless provenance is updated. Current work uses the existing isolated checkout; do not create a new Git worktree unless requested.
