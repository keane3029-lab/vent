// Shared utilities and configuration for the vent site[cite: 1, 2]

export const explicitWords = [
    'spam-example'
];

export const bullyWords = [
    'hate', 'idiot', 'loser', 'trash'
];

export const selfHarmWords = [
    'suicide', 'kill myself', 'end my life', 'hurt myself'
];

export function checkExplicit(text) {
    const lower = text.toLowerCase();
    return explicitWords.some(word => lower.includes(word));
}

export function checkBullying(text) {
    const lower = text.toLowerCase();
    return bullyWords.some(word => lower.includes(word));
}

export function checkSelfHarm(text) {
    const lower = text.toLowerCase();
    return selfHarmWords.some(word => lower.includes(word));
}

export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export async function compressImage(file, maxSizeKB = 700) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                const maxDimension = 1000;
                if (width > height && width > maxDimension) {
                    height *= maxDimension / width;
                    width = maxDimension;
                } else if (height > maxDimension) {
                    width *= maxDimension / height;
                    height = maxDimension;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                let quality = 0.8;
                let dataUrl = canvas.toDataURL('image/jpeg', quality);

                while (dataUrl.length > maxSizeKB * 1024 && quality > 0.1) {
                    quality -= 0.1;
                    dataUrl = canvas.toDataURL('image/jpeg', quality);
                }

                resolve(dataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
}

export function buildNav() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    navContainer.innerHTML = `
        <nav style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eaeaea; margin-bottom: 20px;">
            <div style="font-weight: bold; font-size: 1.2rem;">
                <a href="feed.html" style="text-decoration: none; color: inherit;">vent</a>
            </div>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <a href="feed.html">Feed</a>
                <a href="subvent.html">Subvents</a>
                <a href="post.html">Post</a>
                <a href="profile.html">Profile</a>
                <a href="about.html">About</a>
            </div>
        </nav>
    `;
}
