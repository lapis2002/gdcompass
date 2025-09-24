// Simple vanilla view helpers exposed on window
(function() {
  const escapeHtml = (unsafe) => String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  function button({ variant = 'primary', text = '', extraClasses = '' } = {}) {
    return `<button class="gd-btn gd-btn--${escapeHtml(variant)} ${escapeHtml(extraClasses)}">${escapeHtml(text)}</button>`;
  }

  function sectionTitle(text) {
    return `<h3 class="gd-results__section-title">${escapeHtml(text)}</h3>`;
  }

  function testLink(text) {
    return `<div class="gd-results__test-link">${escapeHtml(text)}</div>`;
  }

  function divider(text = 'Hoặc') {
    return `<div class="gd-results__divider">${escapeHtml(text)}</div>`;
  }

  function dropdown({ id = 'medical-info-dropdown', title = 'Thông tin y khoa cho bạn', html = '' } = {}) {
    return `
      <div class="gd-dropdown" id="${escapeHtml(id)}">
        <div class="gd-dropdown__header">
          <h3 class="gd-dropdown__title">${escapeHtml(title)}</h3>
          <svg class="gd-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
        <div class="gd-dropdown__content">
          <div class="gd-dropdown__body">${html}</div>
        </div>
      </div>`;
  }

  window.GDViews = window.GDViews || {};
  window.GDViews.components = { button, sectionTitle, testLink, divider, dropdown };
})();


