# Project media

Drop short, muted demo recordings in this folder using the names below. Then change that project's `<source data-src="...">` attributes in `index.html` to `src="..."` to enable playback; browsers select the first supported format. Keep each clip close to 16:9 and optimize it for web delivery.

| Project | WebM | MP4 |
| --- | --- | --- |
| ACRAMbly | `acrambly.webm` | `acrambly.mp4` |
| SplatFuse3D | `splatfuse3d.webm` | `splatfuse3d.mp4` |
| VLM Action Acquisition | `vlm-action-acquisition.webm` | `vlm-action-acquisition.mp4` |
| CandidateSide | `candidateside.webm` | `candidateside.mp4` |

Each video uses `research-demo-poster.svg` while the recording is unavailable or before playback begins. To use an animated GIF for a project, replace the `<img>` fallback inside that card’s `<video>` with the GIF path. Replace the shared poster reference with a project-specific still whenever one is available.
