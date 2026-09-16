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

  // CSS order is stable even if another script adds/re-adds a card later.
  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  function applyOrder() {
    container.querySelectorAll('.paragraph').forEach(card => {
      card.style.order = String(firstNumber(card.id));
    });
  }

  applyOrder();
  new MutationObserver(applyOrder).observe(container, { childList: true });
})();