(() => {
  const config = window.CHAIN_WATCHER_PAGES_CONFIG || {};
  const appUrl = String(config.appUrl || '').trim();
  const validAppUrl = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:[?#].*)?$/.test(appUrl);
  const setup = document.getElementById('setup');
  const loader = document.getElementById('loader');
  const frame = document.getElementById('chain-watcher');
  document.getElementById('pages-origin').textContent = window.location.origin;

  if (!validAppUrl) {
    loader.classList.add('hidden');
    setup.classList.remove('hidden');
    return;
  }

  const hideLoader = () => loader.classList.add('hidden');
  frame.addEventListener('load', hideLoader, { once: true });
  frame.classList.remove('hidden');
  frame.src = appUrl;

  // A cached iframe can finish before some browsers report its load event.
  // Never leave the launch screen covering an otherwise usable app forever.
  window.setTimeout(hideLoader, 15000);
})();
