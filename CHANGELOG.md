# Changelog

All notable changes to vent. are documented here.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/). Earlier
history (posts, comments, profile pictures, the friends feature, theme
toggle, moderation dashboard) predates this file and wasn't tracked with
dates, so entries start from today.

## 2026-09-13

### Added
- **Chat**: three new ways to message on vent.
  - **Friend DMs** — 1-on-1 threads with an accepted friend, reachable from the new `chats.html` inbox.
  - **Anonymous chat** — matches you with a random signed-in stranger; either side can leave at any time, no names shown.
  - **Public lounge** — one shared chat room open to everyone signed in.
  - New pages: `chats.html` (inbox) and `chat-room.html` (the thread itself).
  - Same explicit/bullying/self-harm keyword filters and support-resources popup used on posts now apply to messages too.
  - Messages can be reported; reports show up in the moderation dashboard alongside reported posts.
- MIT license.

### Changed
- `firebase.js` — added `collectionGroup`, `limit`, and `runTransaction` exports (needed for anonymous matching and the moderation dashboard's cross-chat report view).
- `vent.js` — nav bar now includes a `chats` link.
- `moderation.html` — added a "reported messages" section next to "reported posts".
- `firestore.rules` — added rules for the new `chats`, `chats/{id}/messages`, and `anonymousQueue` collections.
