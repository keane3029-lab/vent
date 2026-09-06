// vent. — shared moderation + rendering helpers (no storage logic here anymore —
// accounts/posts are handled by Firebase, see firebase.js and each page's script).

const explicitWords = ['porn','nude','sex tape','xxx'];
const bullyWords = ['idiot','loser','kill yourself','worthless','stupid ugly','retard'];
const selfHarmWords = ['suicide','self-harm','self harm','kill myself','want to die','end it all'];

function containsAny(text, list){
  const lower = text.toLowerCase();
  return list.some(w => lower.includes(w));
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function timeAgo(ts){
  const d = (ts && ts.toDate) ? ts.toDate() : new Date(ts || Date.now());
  const s = Math.floor((Date.now() - d.getTime())/1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s/60) + 'm ago';
  return Math.floor(s/3600) + 'h ago';
}

function findTargetedUsername(text, usernames, exclude){
  const lower = text.toLowerCase();
  for (const uname of usernames){
    if (uname.toLowerCase() === (exclude||'').toLowerCase()) continue;
    if (lower.includes(uname.toLowerCase())) return uname;
  }
  return null;
}

// Builds the nav bar markup. username is null when signed out.
function buildNavHtml(username){
  let linksHtml;
  if (username){
    linksHtml = `<span>logged in as <b>${escapeHtml(username)}</b></span> · <button id="navSignOut">sign out</button> · <a href="feed.html">feed</a>`;
  } else {
    linksHtml = `<a href="login.html">log in</a> · <a href="signup.html">sign up</a>`;
  }
  return `
    <a class="logo" href="index.html">vent<span>.</span></a>
    <div class="nav-links">${linksHtml} · <a href="about.html">about</a></div>
  `;
}
