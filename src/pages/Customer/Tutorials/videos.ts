/**
 * Tutorial videos shown on the Tutorials page.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW LOOM VIDEO
 * ──────────────────────────────────────────────────────────────────────────
 * 1. Record the video on Loom and click "Share".
 * 2. Copy the share URL — it looks like:
 *      https://www.loom.com/share/abc123def456?sid=xyz
 *    The `loomId` is the part after `/share/` and before the `?`:
 *      → "abc123def456"
 * 3. Add a new object to the TUTORIAL_VIDEOS array below with:
 *      - loomId:      the ID you just copied
 *      - title:       short title (max ~50 chars)
 *      - description: 1-2 sentence summary of what the video covers
 * 4. Commit the change to GitHub. The next deploy will show the new video.
 *
 * To remove a video: delete its object from the array.
 * To reorder: move objects up/down in the array.
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface TutorialVideo {
  /** Loom video ID — the part of the share URL between `/share/` and `?`. */
  loomId: string;
  /** Short title shown below the embed. */
  title: string;
  /** 1–2 sentence summary shown under the title. */
  description: string;
}

export const TUTORIAL_VIDEOS: TutorialVideo[] = [
  // Add your first tutorial here. Example shape (uncomment and edit):
  //
  // {
  //   loomId: 'abc123def456',
  //   title: 'Setting up your first WhatsApp channel',
  //   description: 'Connect a WhatsApp number via Evolution API in under 5 minutes.',
  // },
];
