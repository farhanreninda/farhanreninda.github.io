export function navigateNatural(event: MouseEvent) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
  const id = link?.getAttribute('href')?.slice(1);
  const section = id ? document.getElementById(id) : null;
  if (!section) return;

  event.preventDefault();
  const headerBottom = document.querySelector('.natural-header')?.getBoundingClientRect().bottom ?? 0;
  const rect = section.getBoundingClientRect();
  const style = getComputedStyle(section);
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const contentHeight = rect.height - paddingTop - (parseFloat(style.paddingBottom) || 0);
  const availableHeight = window.innerHeight - headerBottom;
  const gap = Math.max(24, (availableHeight - contentHeight) / 2);
  const top = id === 'top' ? 0 : window.scrollY + rect.top + paddingTop - headerBottom - gap;
  history.pushState(null, '', '#' + id);
  window.scrollTo({ top: Math.max(0, top), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
