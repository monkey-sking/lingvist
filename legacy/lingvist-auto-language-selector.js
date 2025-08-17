// ==UserScript==
// @name         Lingvist 自动语言切换器（可配置）
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  进入 https://learn.lingvist.com/#hub 后：打开语言选择 -> 选择指定语言 -> 点击"开始学习"
// @match        https://learn.lingvist.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // ========== 配置区域 ==========
  const CONFIG = {
    // 目标语言配置 - 可以同时配置多个条件，满足任一即可
    targetLanguage: {
      // 按标题匹配（支持正则）
      titlePattern: /(英语|English)/i,
      
      // 按副标题匹配（支持正则）- 用于确定学习语言
      subtitlePattern: /(中文|Chinese)/i,
      
      // 按图标 data-value 匹配
      iconValues: ['gb', 'en', 'us'],
      
      // 完全自定义匹配函数（可选）- 如果定义了这个，上面的配置会被忽略
      // customMatcher: (item) => {
      //   const title = item.querySelector('.info .title')?.textContent?.trim() || '';
      //   const subtitle = item.querySelector('.info .subtitle')?.textContent?.trim() || '';
      //   return title === '法语' && subtitle.includes('中文');
      // }
    },
    
    // 开始学习按钮文案匹配
    startButtonText: /开始学习|继续学习|Start Learning|Continue/i,
    
    // 调试日志开关
    enableDebug: true,
    
    // 超时设置（毫秒）
    timeouts: {
      waitForPopup: 12000,
      waitForStartButton: 20000,
      clickRetryInterval: 400,
      maxClickAttempts: 6
    }
  };

  // ========== 常用语言配置模板 ==========
  const LANGUAGE_PRESETS = {
    // 用中文学英语
    englishFromChinese: {
      titlePattern: /(英语|English)/i,
      subtitlePattern: /(中文|Chinese)/i,
      iconValues: ['gb', 'en', 'us']
    },
    
    // 用中文学法语
    frenchFromChinese: {
      titlePattern: /(法语|French|法語)/i,
      subtitlePattern: /(中文|Chinese)/i,
      iconValues: ['fr']
    },
    
    // 用中文学日语
    japaneseFromChinese: {
      titlePattern: /(日语|Japanese|日語)/i,
      subtitlePattern: /(中文|Chinese)/i,
      iconValues: ['jp', 'ja']
    },
    
    // 用中文学西班牙语
    spanishFromChinese: {
      titlePattern: /(西班牙语|Spanish|西班牙語)/i,
      subtitlePattern: /(中文|Chinese)/i,
      iconValues: ['es', 'es-us']
    },
    
    // 用英语学法语
    frenchFromEnglish: {
      titlePattern: /(French)/i,
      subtitlePattern: /(English)/i,
      iconValues: ['fr']
    }
  };

  // 快速切换预设 - 取消注释想要的语言
  // CONFIG.targetLanguage = LANGUAGE_PRESETS.englishFromChinese;  // 默认已配置
  // CONFIG.targetLanguage = LANGUAGE_PRESETS.frenchFromChinese;
  // CONFIG.targetLanguage = LANGUAGE_PRESETS.japaneseFromChinese;
  // CONFIG.targetLanguage = LANGUAGE_PRESETS.spanishFromChinese;
  // CONFIG.targetLanguage = LANGUAGE_PRESETS.frenchFromEnglish;

  // ========== 脚本逻辑 ==========
  const LOG = CONFIG.enableDebug ? (...args) => console.debug('[Lingvist-AutoLang]', ...args) : () => {};
  const inHub = () => location.hash && location.hash.startsWith('#hub');

  const OPENED_KEY = '__lv_open_lang_once';
  const PICKED_KEY = '__lv_pick_lang_once';
  const START_CLICKED_KEY = '__lv_start_clicked_once';

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function simulateClick(el) {
    if (!el) return false;
    try {
      el.scrollIntoView({ block: 'center', inline: 'nearest' });
      const rect = el.getBoundingClientRect();
      ['pointerdown', 'mousedown', 'mouseup', 'click'].forEach(type => {
        el.dispatchEvent(new MouseEvent(type, {
          bubbles: true, cancelable: true, view: window,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        }));
      });
      el.click?.();
      return true;
    } catch (e) {
      LOG('simulateClick error:', e);
      return false;
    }
  }

  function waitFor(selector, { timeout = 12000, root = document } = {}) {
    return new Promise((resolve) => {
      const existing = root.querySelector(selector);
      if (existing) return resolve(existing);
      const timer = setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
      const observer = new MutationObserver(() => {
        const el = root.querySelector(selector);
        if (el) {
          clearTimeout(timer);
          observer.disconnect();
          resolve(el);
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    });
  }

  function findLanguageButton() {
    const selectors = [
      '.course-select [role="button"]',
      '.course-select .text',
      '.course-select .arrow',
      '.course-select',
    ];
    for (const s of selectors) {
      const el = document.querySelector(s);
      if (el) return el;
    }
    return null;
  }

  function openLanguagePopupOnce() {
    if (sessionStorage.getItem(OPENED_KEY) === '1') return true;
    const btn = findLanguageButton();
    if (!btn) return false;
    LOG('点击"切换语言"按钮');
    simulateClick(btn);
    sessionStorage.setItem(OPENED_KEY, '1');
    return true;
  }

  function matchTargetLanguage(item) {
    try {
      const config = CONFIG.targetLanguage;
      
      // 如果有自定义匹配函数，优先使用
      if (config.customMatcher && typeof config.customMatcher === 'function') {
        const result = config.customMatcher(item);
        if (result) LOG('自定义匹配器匹配到目标项');
        return result;
      }

      const title = item.querySelector('.info .title')?.textContent?.trim() || '';
      const subtitle = item.querySelector('.info .subtitle')?.textContent?.trim() || '';
      const iconVal = item.querySelector('.course-icon')?.getAttribute('data-value') || '';
      
      let titleMatch = false;
      let subtitleMatch = false;
      let iconMatch = false;

      // 标题匹配
      if (config.titlePattern) {
        titleMatch = config.titlePattern.test(title);
      }

      // 副标题匹配
      if (config.subtitlePattern) {
        subtitleMatch = config.subtitlePattern.test(subtitle);
      }

      // 图标匹配
      if (config.iconValues && config.iconValues.length > 0) {
        iconMatch = config.iconValues.includes(iconVal);
      }

      // 需要同时满足标题/图标匹配 AND 副标题匹配（如果配置了的话）
      const hasLanguageMatch = titleMatch || iconMatch;
      const hasSourceMatch = !config.subtitlePattern || subtitleMatch;
      
      const result = hasLanguageMatch && hasSourceMatch;
      
      if (result) {
        LOG('匹配到目标项:', { title, subtitle, iconVal, titleMatch, subtitleMatch, iconMatch });
      }
      
      return result;
    } catch (e) {
      LOG('matchTargetLanguage error:', e);
      return false;
    }
  }

  function getClickTargets(item) {
    const candidates = [
      item.querySelector('button,[role="button"],a'),
      item.querySelector('.info .title'),
      item.querySelector('.info'),
      item.querySelector('.course-icon'),
      item.querySelector('.right .meta'),
      item.querySelector('.right'),
      item, // 兜底
    ].filter(Boolean);
    return Array.from(new Set(candidates));
  }

  async function clickCourseItemRobust(item) {
    const targets = getClickTargets(item);
    for (const t of targets) {
      LOG('尝试点击目标子元素:', t);
      t.focus?.();
      if (simulateClick(t)) {
        await sleep(150);
        const popupOpen = !!document.querySelector('.courses-list');
        const becameActive = (item.classList?.contains('active') ||
          item.closest('.course-list-item')?.classList?.contains('active'));
        if (!popupOpen || becameActive) {
          LOG('已选择：弹窗关闭或条目为 active');
          return true;
        }
      }
    }
    return false;
  }

  async function pickTargetLanguageOnce() {
    const listRoot = await waitFor('.courses-list', { timeout: CONFIG.timeouts.waitForPopup });
    if (!listRoot) {
      LOG('未找到 courses-list 容器');
      return false;
    }
    await sleep(250);

    let attempt = 0;
    const maxAttempts = CONFIG.timeouts.maxClickAttempts;
    while (attempt < maxAttempts) {
      attempt++;
      LOG(`查找并点击目标项，尝试 ${attempt}/${maxAttempts}`);
      const items = Array.from(listRoot.querySelectorAll('.course-list-item'));
      const target = items.find(matchTargetLanguage);
      if (!target) {
        await sleep(CONFIG.timeouts.clickRetryInterval);
        continue;
      }
      target.scrollIntoView({ block: 'center', inline: 'nearest' });
      const ok = await clickCourseItemRobust(target);
      if (ok) {
        sessionStorage.setItem(PICKED_KEY, '1');
        return true;
      }
      await sleep(CONFIG.timeouts.clickRetryInterval);
    }
    LOG('多次尝试仍未能点击目标项');
    return false;
  }

  // ---- "开始学习"按钮查找与点击 ----
  function isVisible(el) {
    if (!el) return false;
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
  }

  function findStartLearningButton() {
    const candidates = Array.from(document.querySelectorAll('button.button-component.filled, .button-component.filled'));
    // 文案匹配
    const matches = candidates.filter(el => CONFIG.startButtonText.test(el.textContent || ''));
    // 取第一个可见的
    return matches.find(isVisible) || null;
  }

  function waitForStartLearningButton({ timeout = CONFIG.timeouts.waitForStartButton } = {}) {
    return new Promise((resolve) => {
      const now = findStartLearningButton();
      if (now) return resolve(now);
      const timer = setTimeout(() => {
        obs.disconnect();
        resolve(null);
      }, timeout);
      const obs = new MutationObserver(() => {
        const btn = findStartLearningButton();
        if (btn) {
          clearTimeout(timer);
          obs.disconnect();
          resolve(btn);
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    });
  }

  async function clickStartLearningOnce() {
    if (sessionStorage.getItem(START_CLICKED_KEY) === '1') return true;
    const btn = await waitForStartLearningButton();
    if (!btn) {
      LOG('未找到"开始学习"按钮');
      return false;
    }
    LOG('点击"开始学习"按钮');
    const ok = simulateClick(btn);
    if (ok) sessionStorage.setItem(START_CLICKED_KEY, '1');
    return ok;
  }

  // ---- 主流程 ----
  async function openAndPickAndStart() {
    // 每次进入 hub 新尝试一次
    sessionStorage.removeItem(OPENED_KEY);
    sessionStorage.removeItem(PICKED_KEY);
    sessionStorage.removeItem(START_CLICKED_KEY);

    LOG('开始自动语言切换流程');

    // 1) 打开弹窗
    if (!openLanguagePopupOnce()) {
      LOG('语言按钮未立即出现，等待中...');
      const opened = await new Promise((resolve) => {
        const start = Date.now();
        const obs = new MutationObserver(() => {
          if (openLanguagePopupOnce()) {
            obs.disconnect();
            resolve(true);
          } else if (Date.now() - start > 8000) {
            obs.disconnect();
            resolve(false);
          }
        });
        obs.observe(document.documentElement, { childList: true, subtree: true });
      });
      if (!opened) {
        LOG('未能打开语言选择弹窗');
        return;
      }
    }

    // 2) 选择目标语言
    await sleep(300);
    const picked = await pickTargetLanguageOnce();
    if (!picked) {
      LOG('未能选择目标语言');
    }

    // 3) 等到主界面出现"开始学习"并点击
    await sleep(400);
    const clicked = await clickStartLearningOnce();
    if (!clicked) {
      LOG('未能自动点击"开始学习"按钮');
    }
  }

  function onRouteChange() {
    if (inHub()) {
      openAndPickAndStart();
    }
  }

  // 初始化
  LOG('脚本已加载，当前配置:', CONFIG);
  if (inHub()) {
    openAndPickAndStart();
  }

  // 监听 SPA 导航
  const _pushState = history.pushState;
  history.pushState = function (...args) {
    const ret = _pushState.apply(this, args);
    setTimeout(onRouteChange, 0);
    return ret;
  };
  window.addEventListener('popstate', onRouteChange);
  window.addEventListener('hashchange', onRouteChange);
})();
