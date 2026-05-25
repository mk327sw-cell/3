(() => {
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  onReady(() => {
    // 1) コンセプト切替タブ (a, b, c) で説明文を切替
    const tabMap = {
      a: 'concept-a',
      b: 'concept-b',
      c: 'concept-c',
    };

    const tabs = Array.from(document.querySelectorAll('[data-concept-tab], .concept-tab'));
    const panels = Array.from(document.querySelectorAll('[data-concept-panel], .concept-panel'));

    const setActiveConcept = (key) => {
      if (!key) return;

      tabs.forEach((tab) => {
        const tabKey = (tab.dataset.conceptTab || tab.getAttribute('data-tab') || '').toLowerCase();
        const active = tabKey === key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });

      panels.forEach((panel) => {
        const panelKey = (panel.dataset.conceptPanel || panel.id || '').toLowerCase();
        const active = panelKey === key || panelKey === tabMap[key];
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = (tab.dataset.conceptTab || tab.getAttribute('data-tab') || '').toLowerCase();
        setActiveConcept(key);
      });
    });

    if (tabs.length > 0) {
      const initial = (tabs[0].dataset.conceptTab || tabs[0].getAttribute('data-tab') || 'a').toLowerCase();
      setActiveConcept(initial);
    }

    // 2) 商品カードの軽いホバー演出用クラス制御
    const productCards = Array.from(document.querySelectorAll('.product-card, [data-product-card]'));

    const addHover = (card) => card.classList.add('is-hovered');
    const removeHover = (card) => card.classList.remove('is-hovered');

    productCards.forEach((card) => {
      card.addEventListener('mouseenter', () => addHover(card));
      card.addEventListener('mouseleave', () => removeHover(card));
      card.addEventListener('focusin', () => addHover(card));
      card.addEventListener('focusout', () => removeHover(card));
    });

    // 3) モバイルメニュー開閉（ボタンがなければ何もしない）
    const menuButton =
      document.querySelector('[data-mobile-menu-toggle]') ||
      document.querySelector('.mobile-menu-toggle') ||
      document.querySelector('.menu-toggle');

    const mobileMenu =
      document.querySelector('[data-mobile-menu]') ||
      document.querySelector('.mobile-menu') ||
      document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
      const setMenuOpen = (open) => {
        menuButton.setAttribute('aria-expanded', String(open));
        mobileMenu.classList.toggle('is-open', open);
        mobileMenu.hidden = !open;
      };

      if (!menuButton.hasAttribute('aria-expanded')) {
        menuButton.setAttribute('aria-expanded', 'false');
      }

      setMenuOpen(menuButton.getAttribute('aria-expanded') === 'true');

      menuButton.addEventListener('click', () => {
        const nextOpen = menuButton.getAttribute('aria-expanded') !== 'true';
        setMenuOpen(nextOpen);
      });
    }
  });
})();
