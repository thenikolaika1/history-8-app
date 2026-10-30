// Force paragraph cards into textbook order, including cards added outside paragraphData.
(function () {
  function firstNumber(value) {
    return parseInt(String(value).match(/\d+/)?.[0] || '0', 10);
  }

  if (typeof paragraphData !== 'undefined') {
    paragraphData.sort((a, b) => firstNumber(a.number) - firstNumber(b.number));
  }

  const container = document.getElementById('paragraphs');
  if (!container) return;

  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  function applyOrder() {
    container.querySelectorAll('.paragraph').forEach(card => {
      // Chapter summary has no paragraph number, so it must always be last.
      if (card.id === 'chapter-1-summary' || card.classList.contains('chapter-summary')) {
        card.style.order = '135';
      } else {
        card.style.order = String(firstNumber(card.id) * 10);
      }
    });
  }

  applyOrder();
  new MutationObserver(applyOrder).observe(container, { childList: true, subtree: false });
  window.addEventListener('load', applyOrder);
})();