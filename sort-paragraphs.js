// Keep paragraph cards in textbook order, regardless of which file added them.
if (typeof paragraphData !== 'undefined') {
  paragraphData.sort((a, b) => {
    const first = value => parseInt(String(value).match(/\d+/)?.[0] || '0', 10);
    return first(a.number) - first(b.number);
  });
  if (typeof render === 'function') render();
}
