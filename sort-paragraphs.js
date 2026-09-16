// Keep paragraph cards in textbook order even when paragraph files render themselves.
(function () {
  function firstNumber(value) {
    return parseInt(String(value).match(/\d+/)?.[0] || '0', 10);
  }

  function sortData() {
    if (typeof paragraphData !== 'undefined') {
      paragraphData.sort((a, b) => firstNumber(a.number) - firstNumber(b.number));
    }
  }

  function sortRenderedCards() {
    const container = document.getElementById('paragraphs');
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('.paragraph'));
    cards.sort((a, b) => firstNumber(a.id) - firstNumber(b.id));
    cards.forEach(card => container.appendChild(card));
  }

  sortData();
  if (typeof render === 'function') render();
  sortRenderedCards();

  // Some paragraph files call render() themselves. Re-check after all current scripts finish.
  setTimeout(() => {
    sortData();
    if (typeof render === 'function') render();
    sortRenderedCards();
  }, 0);
})();