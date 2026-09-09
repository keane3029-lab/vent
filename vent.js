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

// Resizes and compresses an image file into a small base64 data URL, so it
// can be stored directly inside a Firestore document (no paid Storage needed).
// Shrinks to maxDim on the longest side and lowers JPEG quality until the
// result fits under maxBytes.
function compressImageToDataUrl(file, maxDim, maxBytes){
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => { img.src = e.target.result; };
    reader.onerror = reject;
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxDim){
        height = Math.round(height * (maxDim / width));
        width = maxDim;
      } else if (height > maxDim){
        width = Math.round(width * (maxDim / height));
        height = maxDim;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);

      let quality = 0.7;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);
      while (dataUrl.length > maxBytes && quality > 0.2){
        quality -= 0.1;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }
      if (dataUrl.length > maxBytes){
        reject(new Error('too_large'));
        return;
      }
      resolve(dataUrl);
    };
    img.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// UIDs allowed to see the moderation/review link + dashboard
const MODERATOR_UIDS = ['fxsTaa7MLyZDq7VvhOh0X4fwr7n1', 'n5nH5V1us2Mp3owgC23kDc6lZAv1'];

// Builds the nav bar markup. username is null when signed out.
// uid is optional — when it's a moderator's uid, a "review" link is added.
function buildNavHtml(username, uid){
  let linksHtml;
  if (username){
    const reviewLink = (uid && MODERATOR_UIDS.includes(uid)) ? ` · <a href="moderation.html">review</a>` : '';
    linksHtml = `<span>logged in as <b>${escapeHtml(username)}</b></span> · <a href="profile.html">profile</a> · <button id="navSignOut">sign out</button> · <a href="feed.html">feed</a>${reviewLink}`;
  } else {
    linksHtml = `<a href="login.html">log in</a> · <a href="signup.html">sign up</a>`;
  }
  return `
    <a class="logo" href="index.html">vent<span>.</span></a>
    <div class="nav-links">${linksHtml} · <a href="about.html">about</a></div>
  `;
}
