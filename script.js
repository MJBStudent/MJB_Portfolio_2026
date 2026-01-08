(function () {
  const defaults = {
    owner: 'MJBStudent',
    repo: 'MJB_Portfolio_2026',
    branch: 'main',
  };

  const params = new URLSearchParams(window.location.search);
  const owner = (params.get('owner') || defaults.owner).trim();
  const repo = (params.get('repo') || defaults.repo).trim();
  const branch = (params.get('branch') || defaults.branch).trim();

  const galleryEl = document.getElementById('gallery');
  const statusEl = document.getElementById('status');
  const filterEl = document.getElementById('filter');
  const countEl = document.getElementById('image-count');
  const baseUrlEl = document.getElementById('base-url');

  const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'];

  const pagesBase = `https://${owner.toLowerCase()}.github.io/${repo}/images/`;
  baseUrlEl.textContent = pagesBase;

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/images?ref=${encodeURIComponent(branch)}`;

  function isImage(name) {
    const lower = name.toLowerCase();
    return imageExts.some((ext) => lower.endsWith(ext));
  }

  function render(files) {
    galleryEl.innerHTML = '';
    const tpl = document.getElementById('card-template');
    let shown = 0;

    files.forEach((f) => {
      if (f.type !== 'file' || !isImage(f.name)) return;
      const url = pagesBase + encodeURIComponent(f.name);
      const md = `![${f.name}](${url})`;

      const node = tpl.content.cloneNode(true);
      const link = node.querySelector('.thumb-link');
      const img = node.querySelector('.thumb');
      const nameEl = node.querySelector('.name');
      const btns = node.querySelectorAll('.copy-btn');

      link.href = url;
      img.src = url;
      img.alt = f.name;
      nameEl.textContent = f.name;
      nameEl.title = f.name;

      btns.forEach((b) => {
        b.addEventListener('click', async () => {
          try {
            const kind = b.dataset.kind;
            const text = kind === 'md' ? md : url;
            await navigator.clipboard.writeText(text);
            const original = b.textContent;
            b.textContent = 'Copied!';
            setTimeout(() => (b.textContent = original), 1200);
          } catch (e) {
            console.error('Copy failed', e);
            alert('Copy failed. You can select and copy manually.');
          }
        });
      });

      galleryEl.appendChild(node);
      shown += 1;
    });

    countEl.textContent = shown ? `${shown} image${shown === 1 ? '' : 's'}` : 'No images yet';
    statusEl.textContent = shown ? 'Ready' : 'Add files to the images/ folder.';
  }

  async function load() {
    try {
      statusEl.textContent = 'Loading images…';
      const res = await fetch(apiUrl, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
      if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Unexpected API response');
      render(data);

      filterEl.addEventListener('input', () => {
        const q = filterEl.value.trim().toLowerCase();
        const filtered = data.filter((f) => f.type === 'file' && f.name.toLowerCase().includes(q));
        render(filtered);
      });
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'Failed to load images. Make sure the repository is public.';
    }
  }

  document.addEventListener('DOMContentLoaded', load);
})();
