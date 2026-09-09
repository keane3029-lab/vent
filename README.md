# vent.

A place to say whatever's on your mind.

vent. is a prototype for an open platform for getting things off your chest. No filters on your feelings, no judgment on what you're going through — just a space to write and be heard. The only things not welcome here are explicit (18+) content and bullying.

This is an idea/prototype, not a published product.

## Pages

- `index.html` — landing page
- `signup.html` / `login.html` — account creation and sign-in (Firebase Auth)
- `feed.html` — the composer and the feed (Firestore)
- `about.html` — rules and how moderation works
- `style.css` / `vent.js` / `firebase.js` — shared styling, moderation logic, and Firebase setup

## Community rules

1. **No 18+ / explicit content.**
2. **No bullying.** Targeting or insulting another person isn't allowed. Venting about your own experiences — even painful ones, including suicide or self-harm — is never a violation and never gets punished.

## How moderation works

- **Bullying:** a flagged post gets an automatic reply telling the user to stop.
- **Name detector:** if a post targets someone by typing their username, that person won't see it — it shows as an empty post to them.
- **Suicide / self-harm mentions:** never treated as a violation. The post goes through normally, and the user sees a gentle popup with support resources alongside it.
- **Reports:** go through automated review first; only unresolved cases escalate to a human (currently just the project's solo creator).
- **Server hiccups:** users are gently asked to wait a moment, never shown a scary error.

## Setup

This project uses [Firebase](https://firebase.google.com/) for authentication and data storage.

1. Create a Firebase project and enable **Email/Password** sign-in under Authentication.
2. Set up Firestore and configure security rules so signed-in users can read/write `posts`, read `usernames`, and only write their own `usernames` / `users` documents.
3. The Firebase config is already in `firebase.js`. Firebase client config is not a secret — access is controlled by Firestore security rules, not by hiding the key.

## Status

Solo project, currently just an idea/prototype. Open to becoming open-source down the line — forks and bug fixes would be reviewed before merging.
