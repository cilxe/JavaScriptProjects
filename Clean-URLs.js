// ==UserScript==
// @name               跟踪链接净化
// @name:zh-CN         跟踪链接净化
// @name:zh-TW         跟蹤鏈接凈化
// @name:en            Clean Tracking URLs
// @name:ja            トラッカーの浄化
// @name:ko            추적 URL 정리
// @name:ru            Очистить ссылки отслеживания
// @name:de            Tracking-URLs bereinigen
// @name:fr            Nettoyer les URLs de suivi
// @name:es            Limpiar URLs de seguimiento
// @namespace          https://github.com/cilxe/JavaScriptProjects
// @author             cilxe
// @version            0.6.5
// @description        净化所有网站的跟踪链接和事件
// @description:zh-CN  净化所有网站的跟踪链接和事件
// @description:zh-TW  凈化網際網路上的所有網站鏈接和事件
// @description:en     Clean all tracking URLs, block tracking events on all websites
// @description:ja     すべてのサイトの追跡リンクとイベントをサニタイズする
// @description:ko     모든 추적 URL 정리, 모든 웹사이트에서 추적 이벤트 차단
// @description:ru     Очистить все ссылки отслеживания, заблокировать события отслеживания на всех веб-сайтах
// @description:de     Alle Tracking-URLs bereinigen, Tracking-Ereignisse auf allen Websites blockieren
// @description:fr     Nettoyer toutes les URLs de suivi, bloquer les événements de suivi sur tous les sites
// @description:es     Limpiar todas las URLs de seguimiento, bloquear eventos de seguimiento en todos los sitios web
// @match              *://*/*
// @exclude            /^https?:\/\/([a-z0-9-.]{0,52})(hdslb.com|csdnimg.cn)\/.*$/
// @run-at             document-start
// @grant              GM_registerMenuCommand
// @grant              GM_getValue
// @grant              GM_setValue
// @icon               data:image/png;base64,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
// @license            MIT
// ==/UserScript==
/*
## Main features
- Auto clean up all URLs and block tracking events by default.
- Manually clean all links with keyboard shortcuts (Shift + Alt + X). `(v0.6.3~)`

## Additional features (via the script menu)
- Manually clean up the links again. `(v0.5.2~)`
- Add specific tracking params for the current site (host). `(v0.6.1~)`
- Remove custom added params for the current site (host). `(v0.6.2~)`

## Websites that support common cleaning
- All websites on the internet.

## Websites that support additional cleaning
- Bilibili
- Baidu (Unencrypted) URLs
- CSDN
- Alibaba sites
  - alibaba.com/aliyun.com/alibabagroup.com/alimama.com
  - taobao.com/tmall.com/tmall.hk/1688.com/aliexpress.com/trendyol/lazada
  - youku.com
- Douyin/Tiktok.com
- Amazon
- Youtube
*/
(() => {
  const DELAY_TIME = { fast: 600, normal: 1000, slow: 3000 };
  const hostRegex = /[a-z0-9-.]{1,128}\.[a-z]{2,6}$/;
  let topScroll = 0;
  const doc = document;
  const pageHost = window.location.hostname;
  const pageURL = window.location.href;
  const pagePath = window.location.pathname;

  const commonParamsReg = /^(utm_|spm_|from_|ref|track|trk)/i; // Matches all tracking params contains with the name
  // Common tracking params for all sites
  const commonParams = [
    'spm', 'mkt', 'from', 'page_from', 'src', 'response_type', 'source', 'alias', 'vd_source', 'redirect_uri',
    'curator_clanid', 'snr', 'redir', // Steam
  ];
  // Tracking or other params for certain sites
  const bilibiliParams = ['spm_id_from', 'spm_id', 'vd_source', 'from_spmid', 'csource', 'sourceFrom',
    'hotRank', 'live_from', 'from', 'launch_id', 'msource', 'popular_rank', 'session_id', 'business',
    'sort_field', 'broadcast_type', 'is_room_feed', 'dynamicspm_id_from', 'is_live_full_webview',
    'is_live_webview', 'refer_from', 'vt', 'from_source', 'theme', 'visit_id', 'share_source',
    'share_plat', 'share_session_id', 'share_tag', 'timestamp', 'unique_k', 'hasBack', 'noReffer',
    'jumpLinkType', 'goFrom', 'noTitleBar'];
  const baiduParams = ['rsv_idx', 'hisfilter', 'rsf', 'rsv_pq', 'rsv_t', 'qid', 'rsv_dl', 'sa', 'rqid', // baidu
    'oq', 'gpc', 'usm', 'tfflag', 'ie', 'bs', 'rqlang', 'tn', 'sc_us', 'wfr', 'fenlei', 'platform',
    'base_query', 'entry', 'qbl', 'for', 'from', 'topic_pn', 'rsp', 'rs_src', 'f', 'rsv_page', 'dyTabStr',
    'ct', 'lm', 'site', 'sites', 'fr', 'cl', 'bsst', 'lid', 'rsv_spt', 'rsv_bp', 'src', 'sfrom', 'refer',
    'zp_fr', 'channel', 'p_from', 'n_type', 'eqid', '_at_',
    'uname', 'uid', 'client_type', 'task', 'locate', 'page', 'type', 'is_new_user', 'frwh', 'obj_id', 'fid', // tieba
    'fname', '_t', 'topic_name', 'frs', 'share_from', 'idfrom', 'tpl', 'u', 'tb_mod', 'tb_fr', 'share', 'sfc',
    'client_version', 'unique', 'is_video', 'st',
    '_wkts_', 'ai', 'ck', 'shh', // wenku
    'utm_source', 'utm_medium', 'utm_term', 'utm_campaign', 'utm_content', 'utm_id',
  ];
  const douyinParams = ['rsv_idx', 'hisfilter', 'source', 'aid', 'enter_from', 'focus_method', 'gid', // douyin
    'previous_page', 'extra_params',
    'is_from_webapp', 'sender_device', 'web_id']; // tiktok
  const csdnParams = commonParams.concat(['source', 'ops_request_misc', 'request_id', 'biz_id', 'from_wecom', 'ydreferer']);
  const youkuParams = ['spm', 'scm', 'from', 's', 'playMode', 'client_id'];
  const aliParams = [ // ali
    'spm', 'lwfrom', 'from', 'scene', 'utm_content', 'utm_term', 'utm_source', 'utm_campaign', 'utm_medium', 'utm_id',
    // taobao.com/tmall.com/1688.com/tmall.hk
    'scm', 'stats_click', 'initiative_id', 'wh_pid', 'wh_random_str', 'source', 'suggest', 'suggest_query', 'pvid',
    'iconType', 'detailSharePosition', 'traceId', 'relationId', 'union_lens', 'ref', 'ali_trackid', 'ak',
    'topOfferIds', 'search_condition', 'industryCatId', 'tbSocialPopKey', 'bxsign', 'shareUniqueId', 'sp_abtk', 'acm',
    'clickTrackInfo', 'wx_navbar_transparent', 'wh_weex', 'data_prefetch', 'at_iframe', 'prefetch_replace', 'wc', // lazada, trendyol
  ];
  const amazonParams = ['sprefix'];
  // If <true> block [Lucky Draw (The Selection)] popups on live.bilibili.com.
  const BlockLivePopups = true;

  (() => { // Binds 'urlchange' event for pushState and replaceState   [https://stackoverflow.com/a/52809105]
    const originPushState = window.history.pushState;
    const originReplaceState = window.history.replaceState;
    window.history.pushState = function pushState(...args) {
      const newPushState = originPushState.apply(this, args);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('urlchange'));
      return newPushState;
    };
    window.history.replaceState = function replaceState(...args) {
      const newReplaceState = originReplaceState.apply(this, args);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('urlchange'));
      return newReplaceState;
    };
  })();
  //  Restore history state, remove redundant params (Common)
  function restoreState(siteParams) {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
    Array.from(params.keys()).forEach((k) => { if (commonParamsReg.test(k)) { params.delete(k); } });
    if (url.href !== window.location.href) { window.history.replaceState({}, 'Restore', url.href); }
  }
  let cleanLinks; // Clean <a> links
  switch (true) {
    case /(taobao|tmall|aliyun|alibaba|alimama|1688|aliexpres).(com|hk)$|(lazada|trendyol).[a-z.]{2,6}$/.test(pageHost):
      cleanLinks = (siteParams) => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (hostRegex.test(links[i].hostname)) {
            const url = new URL(links[i].href);
            const params = url.searchParams;
            if (params.has('q')) { params.set('q', links[i].innerText); } // //  1. Ali sites (decoding error)
            siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
            const paramsRegex = /^(utm_|spm_|from_|ref|track)/i; // Matches all tracking params that contains the name
            Array.from(params.keys()).forEach((k) => { if (paramsRegex.test(k)) { params.delete(k); } });
            if (links[i].href !== url.href) { links[i].href = url.href; }
          }
        }
      };
      break;
    case /baidu.com$/.test(pageHost):
      cleanLinks = (siteParams) => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (hostRegex.test(links[i].hostname)) {
            const url = new URL(links[i].href);
            const params = url.searchParams;
            if (links[i].innerText === '应用中心') { params.set('kw', links[i].innerText); } //  2. Tieba.baidu.com
            siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
            if (links[i].href !== url.href) { links[i].href = url.href; }
          }
        }
      };
      break;
    case /(bilibili|biligame).com$/.test(pageHost):
      cleanLinks = (siteParams) => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (hostRegex.test(links[i].hostname)) {
            const url = new URL(links[i].href);
            const params = url.searchParams;
            siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
            if (links[i].href !== url.href) { links[i].href = url.href; }
          }
          // Remove Bilibili Card Ads
          if (links[i].hostname.endsWith('cm.bilibili.com')) { links[i].remove(); } // 3. Bilibili
          // Clean <a> link data-url on bilibili.com/video
          const dataLink = links[i].getAttribute('data-url');
          if (dataLink !== null) {
            if (dataLink.endsWith('bilibili.com') && dataLink.startsWith('//')) {
              const dlURL = new URL(`https:${dataLink}`);
              const dlParams = dlURL.searchParams;
              siteParams.forEach((k) => { if (dlParams.has(k)) { dlParams.delete(k); } });
              links[i].setAttribute('data-url', dlURL.href);
            }
          }
        }
      };
      break;
    case /amazon.[a-z.]{2,6}$/.test(pageHost):
      cleanLinks = (siteParams) => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (hostRegex.test(links[i].hostname)) {
            const url = new URL(links[i].href);
            const params = url.searchParams;
            siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
            const paramsRegex = /^(utm_|ref|pd_rd_|pf_rd_|track|sc_|ld$)/i; // Matches all tracking param-names which contains the name
            Array.from(params.keys()).forEach((k) => { if (paramsRegex.test(k)) { params.delete(k); } });
            if (links[i].href !== url.href) { links[i].href = url.href; }
          }
          if (/amazon.[a-z.]{2,6}$/.test(links[i].hostname) && links[i].pathname.startsWith('/ref')) { // 4. Amazon
            links[i].pathname = links[i].pathname.substring(links[i].pathname.indexOf('/ref'), 1);
          }
        }
      };
      break;
    case /google.[a-z.]{2,6}$|about.google/.test(pageHost):
      cleanLinks = (siteParams) => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (hostRegex.test(links[i].hostname)) {
            const url = new URL(links[i].href);
            const params = url.searchParams;
            siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
            Array.from(params.keys()).forEach((k) => { if (commonParamsReg.test(k)) { params.delete(k); } });
            if (links[i].href !== url.href) { links[i].href = url.href; }
            // Clean params at the hash of urls   // 5. Google
            if (/utm_/.test(url.hash)) {
              const ua = url.hash.substring(1).split('&');
              ua.forEach((key, index) => { if (/^utm_/.test(key)) ua.splice(index, 5); });
              links[i].hash = `#${ua.toString().replaceAll(',', '&')}`;
            }
          }
        }
      };
      break;
    default:
      cleanLinks = (siteParams) => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (hostRegex.test(links[i].hostname)) {
            const url = new URL(links[i].href);
            const params = url.searchParams;
            siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
            Array.from(params.keys()).forEach((k) => { if (commonParamsReg.test(k)) { params.delete(k); } });
            if (links[i].href !== url.href) { links[i].href = url.href; }
          }
        }
      };
      break;
  }
  function deferredCleanLinks(siteParams, delayTime) {
    const tid = setTimeout(() => {
      restoreState(siteParams); cleanLinks(siteParams); clearTimeout(tid);
    }, delayTime);
  }
  // Block link clicking events (Common)
  function blockClickEvents(siteParams, delayTime) {
    const tid = setTimeout(() => {
      cleanLinks(siteParams);
      const handleLinkClick = () => { cleanLinks(siteParams); };
      const handleLinkCM = (e) => { e.stopImmediatePropagation(); cleanLinks(siteParams); };
      const handleLinkClickN = () => { cleanLinks(siteParams); deferredCleanLinks(siteParams, DELAY_TIME.normal); };
      const divs = doc.getElementsByTagName('div');
      for (let i = 0; i < divs.length; i += 1) {
        if (divs[i].className) {
          divs[i].removeEventListener('click', handleLinkClickN, true);
          divs[i].addEventListener('click', handleLinkClickN, true);
        }
      }
      const btns = doc.getElementsByTagName('button');
      for (let i = 0; i < btns.length; i += 1) {
        if (btns[i].className) { btns[i].addEventListener('click', handleLinkClickN, true); }
      }
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (hostRegex.test(links[i].hostname)) {
          links[i].removeEventListener('mousedown', handleLinkClick);
          links[i].addEventListener('mousedown', handleLinkClick);
          links[i].removeEventListener('keyup', handleLinkClick);
          links[i].addEventListener('keyup', handleLinkClick);
          links[i].removeEventListener('click', handleLinkClick);
          links[i].addEventListener('click', handleLinkClick);
          links[i].removeEventListener('auxclick', handleLinkClick);
          links[i].addEventListener('auxclick', handleLinkCM);
          links[i].removeEventListener('contextmenu', handleLinkClick);
          links[i].addEventListener('contextmenu', handleLinkCM); // Block tracking events on context menu
        }
      }
      clearTimeout(tid);
    }, delayTime);
  }
  // Hide  popups
  function hideElement(attrs, interval, duration) {
    const intervalID = setInterval(() => {
      attrs.forEach((attr) => { document.querySelector(attr).style.visibility = 'hidden'; });
    }, interval);
    const timeoutId = setTimeout(() => { clearInterval(intervalID); clearTimeout(timeoutId); }, duration);
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Common sites ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function commonClean() {
    switch (true) { // additional params for certain sites
      case /google.[a-z.]{2,6}$|about.google/.test(pageHost):
        commonParams.push('device', 'pcampaignid', 'subid', 'hl', 'fg');
        break;
      case pageHost.endsWith('reddit.com'):
        commonParams.push('embed_host_url');
        break;
      case pageHost.endsWith('github.com'):
        commonParams.push('ref_cta', 'ref_loc', 'ref_page');
        break;
      case /(microsoft|bing|xbox).com/.test(pageHost):
        commonParams.push('response_mode', 'exp', 'FORM', 'xr', 'cat0');
        break;
      case pageHost.endsWith('linkedin.com'):// eslint-disable-next-line max-len
        commonParams.push('trk', 'trkInfo', 'original_referer', 'origin', 'upsellOrderOrigin', 'lipi', 'desktopBackground', 'profileFormEntryPoint', 'entityUrn', 'veh', 'miniCompanyUrn');
        document.addEventListener('DOMContentLoaded', () => {
          blockClickEvents(commonParams, 8500); deferredCleanLinks(commonParams, DELAY_TIME.normal * 2);
        });
        break;
      case pageHost.endsWith('twitter.com'):
        commonParams.push('screen_name');
        break;
      case pageHost.endsWith('zhihu.com'):
        commonParams.push('search_source', 'hybrid_search_source', 'hybrid_search_extra'); // eslint-disable-next-line max-len
        hideElement(['.Modal-wrapper'], 50, 3500);
        break;
      case /(163|126|yeah).(com|net)$/.test(pageHost):
        commonParams.push('scene', 'session_id', 'fromDlpro', 'dltype');
        break;
      case pageHost.endsWith('weibo.com'):
        commonParams.push('mark_id', 'entry', '_rand', 'sudaref', 'refer', 'band_rank', 'gid', 'ua');
        break;
      case pageHost.endsWith('jd.com'):
        commonParams.push('gx', 'ad_od', 'needRecommendFlag', 'uabt', 'd');
        break;
      case pageHost.endsWith('yangkeduo.com'):
        commonParams.push('gx', 'ad_od', 'needRecommendFlag', 'uabt', 'd');
        break;
      case pageHost.endsWith('ebay.com'):
        commonParams.push('_trkparms', '_trksid', 'ssPageName', 'amdata');
        break;
      case pageHost.endsWith('msn.com'): // No effect on the [Shadow Root] elements.
        commonParams.push('ocid', 'cvid', 'ei');
        break;
      case pageHost.endsWith('vk.com'):
        commonParams.push('scheme', 'initial_stats_info');
        break;
      case pageHost.endsWith('facebook.com'): // eslint-disable-next-line max-len
        commonParams.push('privacy_mutation_token', 'ars', 'helpref', 'search_session_id', 'entry_point', 'campaign_id', 'nav_source', 'placement', 'privacy_source', '__cft__[0]', '__tn__');
        doc.addEventListener('mousemove', (e) => { if (e.clientY > 700) cleanLinks(commonParams); });
        break;
      case pageHost.endsWith('stackoverflow.com'):
        commonParams.push('so_medium', 'so_source', 'so_content', 'so_term', 'so_campaign', 'so_id');
        break;
      case /(hoyolab|hoyoverse|mihoyo|miyoushe|mihoyogift).com$/.test(pageHost): // eslint-disable-next-line max-len
        commonParams.push('hyl_auth_required', 'hyl_presentation_style', 'bbs_theme', 'bbs_theme_device', 'bbs_presentation_style', 'mhy_presentation_style', 'hyl_hide_status_bar', 'hyl_landscape', 'device_type', 'game_version', 'plat_type', 'visit_device');
        hideElement(['.mhy-account-flow-dialog'], 50, 7500);
        break;
      case pageHost.endsWith('douban.com'):
        commonParams.push('target_user_id', 'from_', 'dcs', 'dcm', 'dt_time_source', 'channel');
        break;
      case pageHost.endsWith('imdb.com'):
        commonParams.push('rf', 'imdbPageAction');
        break;
      case pageHost.endsWith('xda-developers.com'):
        commonParams.push('tag', 'ascsubtag', 'asc_refurl', 'asc_campaign', 'newsletter_popup');
        break;
      case pageHost.endsWith('cctv.com'):
        commonParams.push('toc_style_id', 'share_to', 'track_id');
        break;
      default: break;
    }
    const params = commonParams; restoreState(params); cleanLinks(params);
    document.addEventListener('DOMContentLoaded', () => {
      blockClickEvents(params, 1200); deferredCleanLinks(params, 1000); deferredCleanLinks(params, 7000);
    });

    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrolls - topScroll > 120) { cleanLinks(params); topScroll = scrolls; }
    };
    return params;
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Bilibili ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  // Remove Bilibili metadata
  function removeBiliMetadData() {
    const metas = doc.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i += 1) { if (metas[i].name === 'spm_prefix') { metas[i].remove(); } }
  }
  // Remove Bilibili Annoyances [Login popups, Ads]
  function removeBiliAnnoyances(delayTime) {
    const tid = setTimeout(() => {
      let index = 0;
      do {
        const cardAds = doc.getElementsByTagName('a');
        for (let i = 0; i < cardAds.length; i += 1) {
          if (cardAds[i].hostname.endsWith('cm.bilibili.com')) { cardAds[i].remove(); } // bilibili ads
        }
        index += 1;
      } while (index < 2); // bilibili login tips
      // eslint-disable-next-line max-len
      if (doc.getElementsByClassName('right-entry-item')[0] && doc.getElementsByClassName('right-entry-item')[0].innerText.includes('登录')) {
        hideElement(['.lt-row', '.bili-login-card', '.bili-feed4', '.bili-mini-mask', 'is-bottom'], 50, 3500);
        const rightEntyItems = doc.getElementsByClassName('right-entry-item'); // eslint-disable-next-line max-len
        if (/登录/.test(rightEntyItems[0].innerText)) { rightEntyItems[0].getElementsByTagName('span')[0].outerHTML = '<a href="https://passport.bilibili.com/login" target="_blank" onmouseup="cleanLinks(bilibiliParams)">登录</a>'; }
      } clearTimeout(tid);
    }, delayTime);
  }
  // block clicking events (link, button, li)
  function blockBClickEvents() {
    function blockBLinkEvents() {
      const handleBClick = (e) => { e.stopImmediatePropagation(); };
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (links[i].getAttribute('data-video-time') === null && hostRegex.test(links[i].hostname)) {
          const isLinkJump = links[i].classList.contains('jump-link');
          const isLinkJumpVideo = links[i].classList.contains('video-time') || links[i].classList.contains('video');
          if (!(isLinkJump && isLinkJumpVideo)) {
            links[i].removeEventListener('click', handleBClick);
            links[i].addEventListener('click', handleBClick);
            links[i].removeEventListener('contextmenu', handleBClick);
            links[i].addEventListener('contextmenu', handleBClick); // Block tracking events on context menu
          }
        }
      }
    }
    blockBLinkEvents();
    function deferredBlockBLinkEvents(delayTime) {
      const tid = setTimeout(() => {
        cleanLinks(bilibiliParams); removeBiliAnnoyances(0); blockBLinkEvents(); clearTimeout(tid);
      }, delayTime);
    }
    const handleClickFast = () => { deferredBlockBLinkEvents(DELAY_TIME.fast); };
    const buttons = doc.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].className) {
        buttons[i].removeEventListener('click', handleClickFast, true);
        buttons[i].addEventListener('click', handleClickFast, true);
      }
    }
    const lines = doc.getElementsByTagName('li');
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].className && !lines[i].classList.contains('context-sub-menu-item')) {
        lines[i].removeEventListener('click', handleClickFast, true);
        lines[i].addEventListener('click', handleClickFast, true);
      }
    }
  }
  function deferredBlockBClickEvents(delayTime) {
    restoreState(bilibiliParams);
    const tid = setTimeout(() => { blockBClickEvents(); clearTimeout(tid); }, delayTime);
  }
  // Loop execution when the mouse moves
  function bilibiliListenMoving() {
    let x = 0; let y = 0;
    if (/live.bilibili.com$/.test(pageHost) || /^https?:\/\/(www|m).bilibili.com\/(video|bangumi)/.test(pageURL)) {
      doc.onmousemove = (e) => { if (e.clientY < 200) { cleanLinks(bilibiliParams); blockBClickEvents(); } };
    } else {
      document.onmousemove = (e) => {
        if (Math.abs(e.clientX - x) > 20 || Math.abs(e.clientY - y) > 20) {
          cleanLinks(bilibiliParams); blockBClickEvents(); x = e.clientX; y = e.clientY;
        }
      };
    }
  }
  // Loop execution when scrolling
  function biliListenScrolling() {
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrolls - topScroll > 120) {
        cleanLinks(bilibiliParams); removeBiliAnnoyances(0); blockBClickEvents();
        topScroll = scrolls;
      }
    };
  }
  // bilibili search events
  function blockBSearchItemEvents() {
    function blockSearchEvents() {
      // input suggested items
      const suggestItems = doc.getElementsByClassName('suggest-item');
      const handleBSearchClick = () => { deferredBlockBClickEvents(DELAY_TIME.fast); };
      for (let i = 0; i < suggestItems.length; i += 1) {
        suggestItems[i].addEventListener('click', handleBSearchClick, true);
      }
      // search trending items
      const topSearchs = doc.getElementsByClassName('trending-item');
      for (let i = 0; i < topSearchs.length; i += 1) {
        topSearchs[i].addEventListener('click', handleBSearchClick, true);
      }
      // search history items
      const historyItems = doc.getElementsByClassName('history-item');
      for (let i = 0; i < historyItems.length; i += 1) {
        historyItems[i].addEventListener('click', handleBSearchClick, true);
      }
    }
    const handleBSearchClickB = () => {
      const tid = setTimeout(() => { blockSearchEvents(); clearTimeout(tid); }, DELAY_TIME.fast);
    };
    // search input area
    if (doc.querySelector('.search-input-el')) {
      doc.querySelector('.search-input-el').addEventListener('click', handleBSearchClickB, true);
    }
    // clear icon
    if (doc.querySelector('.clear-icon')) {
      doc.querySelector('.clear-icon').addEventListener('click', handleBSearchClickB, true);
    }
  }
  // search.bilibili.com/*
  function cleanBSearch() {
    blockBSearchItemEvents();
    // paging button clicking event
    const pageButtons = doc.getElementsByClassName('vui_pagenation--btn'); // div
    for (let i = 0; i < pageButtons.length; i += 1) {
      pageButtons[i].addEventListener('click', () => { deferredBlockBClickEvents(DELAY_TIME.fast); }, true);
    }
    deferredBlockBClickEvents(DELAY_TIME.normal); deferredCleanLinks(bilibiliParams, DELAY_TIME.slow - 600);
  }
  // www.bilibili.com/video/*
  function cleanBVideoURL() {
    cleanLinks(bilibiliParams);
    doc.addEventListener('DOMContentLoaded', () => {
      if (doc.querySelector('.rec-footer')) {
        doc.querySelector('.rec-footer').addEventListener('click', () => {
          deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
          deferredBlockBClickEvents(bilibiliParams, DELAY_TIME.fast);
        }, true);
      }
      // Clean copying of video URLs (copy share)
      let toolBar; let sharInner; let sharOuter;
      if (/^\/video\//.test(pagePath)) {
        toolBar = '#arc_toolbar_report'; sharOuter = 'share-btn-outer'; sharInner = 'share-btn-inner';
      } else if (/^\/bangumi\//.test(pagePath)) {
        toolBar = '.toolbar'; sharOuter = 'share-container-id'; sharInner = 'link_copy';
      }
      let vid; const url = new URL(window.location.href);
      const handleWriteText = () => { navigator.clipboard.writeText(pageURL); };
      doc.querySelector(toolBar).addEventListener('mousemove', () => {
        doc.getElementById(sharOuter).removeEventListener('click', handleWriteText);
        doc.getElementById(sharOuter).addEventListener('click', handleWriteText);
        doc.getElementById(sharInner).addEventListener('click', (event) => {
          event.stopPropagation();
          if (doc.getElementById(sharInner).innerText.includes('精准')) {
            if (pagePath.indexOf('/video/') === 0) {
              vid = doc.querySelector('video') || doc.querySelector('bwp-video'); // Chrome Firefox Edge ..
            } else if (pagePath.indexOf('/bangumi/') === 0) {
              vid = doc.getElementsByTagName('video')[1] || doc.querySelector('bwp-video'); // Chrome Firefox Edge ..
            }
            url.searchParams.set('t', vid.currentTime.toFixed(2));
            navigator.clipboard.writeText(url.toString());
          } else { navigator.clipboard.writeText(pageURL); }
        });
      });
    });
  }
  // live.bilibili.com/*
  function cleanBLive(delayTime) {
    // live.bilibili.com popups
    const livePopupBlock = (selection) => {
      if (selection && doc.getElementById('anchor-guest-box-id')) {
        doc.getElementById('anchor-guest-box-id').style.display = 'none';
      } else if (!selection) { doc.getElementById('anchor-guest-box-id').style.display = ''; }
      const iframes = doc.getElementsByTagName('iframe');
      for (let i = 0; i < iframes.length; i += 1) {
        if (iframes[i].src.includes('live-lottery')) {
          if (selection) { iframes[i].style.visibility = 'hidden'; } else { iframes[i].style.visibility = ''; }
        }
      }
    };
    const tid1 = setTimeout(() => {
      const navis = doc.getElementsByClassName('tabs__tag-item'); // cat
      for (let i = 0; i < navis.length; i += 1) {
        navis[i].addEventListener('click', () => { deferredCleanLinks(bilibiliParams, DELAY_TIME.fast); }, true);
      }
      const tabItems = doc.getElementsByClassName('tab-item'); // sort
      for (let i = 0; i < tabItems.length; i += 1) {
        tabItems[i].addEventListener('click', () => {
          blockBClickEvents(); deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
        }, true);
      } clearTimeout(tid1);
    }, delayTime);
    const intervalID = setInterval(livePopupBlock(BlockLivePopups), DELAY_TIME.normal * 2);
    const tid2 = setTimeout(() => { clearInterval(intervalID); clearTimeout(tid2); }, DELAY_TIME.slow + 3000 * 300);
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Baidu ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  // Baidu related search, Hot search URL cleaning
  function cleanBaidu() {
    if (pageHost.endsWith('news.baidu.com')) { baiduParams.push('toc_style_id', 'share_to', 'track_id'); }
    restoreState(baiduParams);
    function removeBDAds() {
      const searchAds = document.getElementsByClassName('EC_result');
      for (let i = 0; i < searchAds.length; i += 1) { searchAds[i].remove(); }
    }
    function cleanBDLinks(siteParams) {
      cleanLinks(baiduParams);
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (hostRegex.test(links[i].hostname)) {
          if (links[i].hostname.endsWith('zhidao.baidu.com') && links[i].pathname === '/q') {
            links[i].pathname = '/search';
          }
          links[i].href = links[i].href.replace('from=', '');
        }
      }
      if (doc.querySelector('area')) {
        const areaURL = new URL(doc.querySelector('area').href);
        const params = areaURL.searchParams;
        siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
        doc.querySelector('area').href = areaURL.href;
      }
    }
    function blockBDTrackingEvents() {
      doc.addEventListener('DOMContentLoaded', () => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (links[i].href !== '') { links[i].addEventListener('click', () => { cleanBDLinks(baiduParams); }, true); }
        }
      });
    }
    cleanBDLinks(baiduParams); blockBDTrackingEvents();
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) { cleanLinks(baiduParams); topScroll = scrolls; }
      if (pagePath === '/s') { removeBDAds(); }
    };
    if (pagePath === '/s') { // Baidu search ads
      removeBDAds();
      window.onscroll = () => {
        const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
        removeBDAds(); topScroll = scrolls;
      };
    }
    let x = 0; let y = 0;
    doc.onmousemove = (e) => {
      if (Math.abs(e.clientX - x) > 20 || Math.abs(e.clientY - y) > 20) {
        cleanLinks(baiduParams); x = e.clientX; y = e.clientY;
      }
    };
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ CSDN ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanCSDN() {
    restoreState(csdnParams); cleanLinks(csdnParams);
    // CSDN.net tracking events
    function blockCSDNEvents() {
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (links[i].hostname) { links[i].addEventListener('click', (e) => { e.stopImmediatePropagation(); }); }
      }
    }
    doc.onmousemove = (e) => {
      if (e.clientY < 170 || e.clientY > 450) { cleanLinks(csdnParams); blockCSDNEvents(); }
    };
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) { cleanLinks(csdnParams); blockCSDNEvents(); topScroll = scrolls; }
    };
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Ali Sites ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanAliSites() {
    restoreState(aliParams); cleanLinks(aliParams); deferredCleanLinks(aliParams, DELAY_TIME.slow);
    doc.addEventListener('DOMContentLoaded', () => { blockClickEvents(aliParams, DELAY_TIME.fast); });
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrolls - topScroll > 120) { cleanLinks(aliParams); blockClickEvents(aliParams, 0); topScroll = scrolls; }
    };
    doc.addEventListener('mousemove', (e) => {
      if (e.clientY < 120) { cleanLinks(aliParams); blockClickEvents(aliParams, 0); }
    });
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Youtube ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanYoutube() {
    doc.addEventListener('DOMContentLoaded', () => {
      deferredCleanLinks(commonParams, DELAY_TIME.normal); blockClickEvents(commonParams, 0);
    });
    doc.addEventListener('contextmenu', () => {
      cleanLinks(commonParams);
      if (/(^\/watch$|^\/embed)/.test(pagePath)) { // Copy clean video urls after right-click at the video player zone on `youtube.com`
        const videoCM = doc.getElementsByClassName('ytp-contextmenu')[0].getElementsByClassName('ytp-menuitem');
        videoCM[1].addEventListener('click', () => { navigator.clipboard.writeText(pageURL); });
        const vid = doc.getElementsByTagName('video')[0];
        const url = new URL(pageURL); url.searchParams.set('t', vid.currentTime.toFixed(0));
        videoCM[2].addEventListener('click', () => { navigator.clipboard.writeText(url.toString()); });
      }
      if (pagePath.startsWith('/embed')) { // Embedded youtube videos
        const videoCM = doc.getElementsByClassName('ytp-contextmenu')[0].getElementsByClassName('ytp-menuitem');
        videoCM[2].addEventListener('click', () => { navigator.clipboard.writeText(pageURL); });
        const vid = doc.getElementsByTagName('video')[0];
        const url = new URL(pageURL); url.searchParams.set('t', vid.currentTime.toFixed(0));
        videoCM[3].addEventListener('click', () => { navigator.clipboard.writeText(url.toString()); });
      }
    });
    if (pagePath === '/results') {
      doc.addEventListener('pointerenter', (e) => { e.stopPropagation(); cleanLinks(commonParams); }, true);
    }
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrolls - topScroll > 120) { cleanLinks(commonParams); topScroll = scrolls; }
    };
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Custom clean ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  // Youku, Douyin, Amazon
  function customClean(siteParams) {
    restoreState(siteParams); cleanLinks(siteParams);
    let x = 0; let y = 0;
    doc.addEventListener('mousemove', (e) => {
      if (Math.abs(e.clientX - x) > 20 || Math.abs(e.clientY - y) > 20) {
        cleanLinks(siteParams); x = e.clientX; y = e.clientY;
      }
    });
    doc.addEventListener('mousedown', (e) => { e.stopImmediatePropagation(); });
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Main Funtion ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  (() => {
    // Menu language (May not change properly due to browser settings)
    let MenuClean; let MenuAddParams; let InputTitle; let invalidFormat; let MenuRemoveParam; let noParam;
    switch (navigator.language) {
      case 'zh-CN' || 'zh-SG':
        MenuClean = '手动清理链接'; MenuAddParams = '添加自定义参数'; InputTitle = '请输入单个指定的参数（仅支持字母，数字，下划线与任意类型的括号）';
        invalidFormat = '无效的参数格式 '; MenuRemoveParam = '移除一个手动添加的参数（页面刷新后生效）'; noParam = '无此参数';
        break;
      case 'zh-TW' || 'zh-HK':
        MenuClean = '手動清理鏈接'; MenuAddParams = '添加自定義参数'; InputTitle = '請輸入單個指定的參數（僅支持字母，數字，下劃線與任意類型的括號）';
        invalidFormat = '無效的參數格式 '; MenuRemoveParam = '移除一個手動添加的參數（頁面刷新後生效）'; noParam = '無此參數';
        break;
      default: // English and others
        MenuClean = 'Manually retry links cleaning'; MenuAddParams = 'Add a custom parameter'; // eslint-disable-next-line max-len
        InputTitle = 'Please enter a single parameter below \n(only support letters, numbers, underscore and all types of brackets):';
        invalidFormat = 'Not a valid parameter format ';
        MenuRemoveParam = 'Remove a custom added parameter (Effect after refresh)'; noParam = 'No such parameter.';
        break;
    }
    // Add custom params from the Script menu (Submenu of addons)
    function addCustomParam(inputParam) {
      if (/^[a-zA-Z0-9()[\]{}<>_]*$/.test(inputParam)) {
        let list;
        // eslint-disable-next-line no-undef
        if (GM_getValue(pageHost)) { list = GM_getValue(pageHost); } else { list = []; }
        // eslint-disable-next-line no-undef
        if (inputParam) { list.push(inputParam); GM_setValue(pageHost, list); }
        list.forEach((v) => { if (!commonParams.includes(v)) { commonParams.push(v); } });
      } else { alert(invalidFormat); }
    }
    function removeCustomAddedParam(inputParam) { // Remove a parameter that has been added from the script menu
      if (inputParam !== null && inputParam !== undefined) {
        let list;
        // eslint-disable-next-line no-undef
        if (GM_getValue(pageHost)) { list = GM_getValue(pageHost); } else { list = []; }
        if (list.includes(inputParam)) { // eslint-disable-next-line no-undef
          list = list.filter((item) => item !== inputParam); GM_setValue(pageHost, list);
        } else { alert(noParam); }
      }
    }
    let siteParams; // For script menu
    switch (true) {
      case /(bilibili|biligame).com$/.test(pageHost): //  space passport account message member t app manga show link biligame mall
        siteParams = bilibiliParams; restoreState(bilibiliParams); cleanLinks(bilibiliParams);
        removeBiliAnnoyances(0); blockBClickEvents(); biliListenScrolling(); bilibiliListenMoving();
        if (pageHost.endsWith('www.bilibili.com')) cleanBVideoURL();
        if (pageHost.endsWith('search.bilibili.com')) cleanBSearch();
        if (pageHost.endsWith('live.bilibili.com')) cleanBLive(DELAY_TIME.normal);
        doc.addEventListener('DOMContentLoaded', () => { removeBiliMetadData(); removeBiliAnnoyances(1000); });
        break;
      case pageHost.endsWith('youtube.com'): // eslint-disable-next-line max-len
        commonParams.push('embeds_referring_euri', 'embeds_euri', 'source_ve_path', 'feature', 'embeds_referring_origin', 'redir_token', 'pp');
        siteParams = commonParams; cleanYoutube(commonParams);
        break;
      case pageHost.endsWith('baidu.com'):
        siteParams = baiduParams; cleanBaidu();
        break; // eslint-disable-next-line max-len
      case /(alibaba|alibabagroup|aliyun|alimama|aliexpress|taobao|tmall|1688)\.(com|hk|cn)$|(lazada|trendyol).[a-z.]{2,6}$/.test(pageHost):
        siteParams = aliParams; cleanAliSites();
        break;
      case /amazon.[a-z.]{2,6}$/.test(pageHost):
        siteParams = amazonParams; customClean(amazonParams);
        break;
      case pageHost.endsWith('csdn.net'):
        siteParams = csdnParams; cleanCSDN();
        break;
      case pageHost.endsWith('youku.com'):
        siteParams = youkuParams; customClean(youkuParams);
        break;
      case /(tiktok|douyin).com$/.test(pageHost):
        siteParams = douyinParams; customClean(douyinParams);
        break;
      default:
        siteParams = commonClean(); addCustomParam('');
        // eslint-disable-next-line no-undef
        GM_registerMenuCommand(MenuAddParams, () => { addCustomParam(prompt(InputTitle, '')); }); // Menu: Add a custom param
        // eslint-disable-next-line no-undef
        GM_registerMenuCommand(MenuRemoveParam, () => { removeCustomAddedParam(prompt(MenuRemoveParam, '')); }); // Menu: Remove custom added param
        break;
    } // eslint-disable-next-line no-undef
    GM_registerMenuCommand(MenuClean, () => { // Menu: Retry clean all links
      restoreState(siteParams); cleanLinks(siteParams); console.log(siteParams);
    }, 'C');
    window.addEventListener('urlchange', () => { restoreState(siteParams); cleanLinks(siteParams); });
    window.addEventListener('keydown', (e) => { // [Alt + Shift + X]
      if (e.key === 'X' && e.altKey && e.shiftKey) { restoreState(siteParams); cleanLinks(siteParams); }
    });
  })();
})();

/*
# Changelog
v0.6.5 2023.06.07  
- Clean more tracking params on `Google|Bilibili|Youtube|Stackoverflow|Bing.com|Xbox.com|Facebook|Amazon`, block more tracking events.
- Clean tracking params at the hash of URLs on `Google`.
- Allow using numbers and other types of brackets on the function of add custom parameters.
- More precise domain name matching. (function includes() >> startsWith/endsWith/Regular Expression)
- Fix most timeout issues, and other issue fixes and performance improvements (events listening optimisations).
- Additional feature: hide login popups for `zhihu.com|hoyolab.com`.

v0.6.4 2023.06.02  
- Reduce event blocking scope that binds to elements `<a>` (capturing >> bubbling).
- Clean more tracking params on `linkedin|tmall|facebook|google|ebay.com`, block tracking events on `linkedin.com`.
- Clean copying of video urls after right-click at the main video on `youtube.com` (unshorten without tracking params).
- Other improvements.

v0.6.3 2023.05.26  
- Description optimisation (Script menu).
- Script optimisation, update excludes.
- Remove more parameters for `Amazon, Taobao, Reddit`, bilibili.com/bangumi.
- Add a function of quick cleaning with keyboard (Shift + Alt + X), find in the script code to custom: `e.key === 'X'`.

v0.6.2.2 2023.05.22  
- Regex checking (when add custom param) optimisation (allow using `[]` in parameter).

v0.6.2.1 2023.05.22  
- Script language optimisation.

v0.6.2 2023.05.22  
- Script logic and performance optimisation.
- Add format validation before adding params (from GM_setValue to storage);
- Add a script menu function which can remove a custom added parameter.
- Remove more tracking params.
- Remove Baidu Search ad results (Testing).

v0.6.1 2023.05.18  
- Fix an error about array merging, from Array.push() to Array.concat().
- Clean more params for common sites and `Amazon`, `weibo|stackoverflow|tmall.com`.
- Reconstruct the functions of history (bind urlchange event to pushState and replaceState).
- Custom cleaning for `Amazon`.
- Added a submenu to support adding custom params for current site (host).

v0.6.0 2023.05.15  
- Clean more parameters for `(douban|imdb|vk|weibo|163|126|baidu.com)|yeah.net`.
- Resote some parameters for `xda-developers.com`.
- Add a function of copy cleaning precise time on the video pages of `bilibili`.
- Clean up copy link behavior on context menu.
- Script code and regexps matching optimisation, fix several bugs.

v0.5.8 2023.05.10  
- Fix an issue where the script submenu on github.com was not displayed successfully.
- Clean copy texts when share video on the video page of bilibili.
- Clean more parameters for `douyin|tiktok|zhihu|douban|twitter|xda-developers|baidu|cctv.com`.
- Block signin popups once when enter the pages of zhihu.com.
- Remove more params for `hoyolab|hoyoverse|mihoyo|miyoushe|miyougift.com` with futnion-commonClean.
- Timeuout logic optimisation.

v0.5.7 2023.05.05  
- Optiomise the monitoring of certain events.
- Remove more parameters for `github|medium|xda-developers|youku.(com)`.
- Bug fixes.

v0.5.6 2023.04.28  
- Restore a necessary parameter for baidu.com.

v0.5.5 2023.04.28  
- Restore normall events within the bili-live player under right-menu clicking.
- Fixed some coding errors and bug fixes.
- Update script icon.
- Add more tracking parameters.
- Several optimisations, improve cleaning speed.

v0.5.2 2023.04.20  
- Update site params (add, remove) (Duplicate or necessary parameters for certain sites).
- Add a condition before bind a event-listenser to button tags.
- Manually cleaning: Add a script menu on tampermonkey's drop-down menu during default situations.
- Fixed a problem that clicking to switch page number was invalid (Add label attribute url verificaiton).
- Code reduction.

v0.5.1 2023.04.15  
- Fix some bugs where block clicking-events on empty `<a>` link
- Update excludes pages.
- Clean some tracking links under space.bilibili.com after click expand more games.
- Clean `<a>` links with `data-url` as its target url instead of `href`.
- Clean the params at embedded youtube videos.

v0.5.0  2023.04.09  
- Added tmall.hk.
- Added common cleaning to support all websites.
- Now this script can clean common contents for all sites and specific cleaning for certain sites.
- Performance optimisation.

v0.4.10 2023.04.04  
- Added 1688.com.
- Script operating improvements.

v0.4.9 2023.04.03  
- Clean Ali sites URLs and block tracking events.
  - alibaba.com
  - alibabagroup.com
  - aliyun.com
  - aliexpress.com
  - alimama.com
  - taobao.com
  - tmall.com
  - youku.com
- Minor bug fixes.

v0.4.8-2023.03.25  
- Script optimisation.
- Minor bug fixes.

v0.4.7-2023.03.14  
- Clean Youku URLs. [Youku.com].(Testing)
- Code reduction.
- Performance optimisation and bug fixes.

v0.4.6-2023.03.11  
- Clean more baidu links. [Baidu]
- Clean CSDN URLs. [csdn.net]
- Script optimisation and bug fixes.
- Code reduction.

v0.4.5 2023.03.09  
- Clean more URL under Baidu.com, replace search URL state. [Baidu]
- Script optimisation and bug fixes. [bilibili]
- Code reduction.

v0.4.4 2023.03.05  
- Restore history state at live.bilibili.com. [Bilibili]
- Clean Bilibili Manga & Show links. [manga/show.bilibili.com]
- Clean redundant params at douyin.com search page. [Douyin]
- Code reduction.

v0.4.3.1 2023.03.01  
- Clean more links at live.bilibili.com. [Bilibili]
- Script optimisation.

v0.4.3 2023.02.24  
- Block more tracking events. [Bilibili]
- Clean more links.[Bilibili]
- Restore link jump events at comment area. [Bilibili]
- Script optimisation. [Bilibili]

v0.4.2.1 2023.02.22  
- Restore `<a>` link click-events on precise time jump at comment area.[www.bilibili.com/video]

v0.4.2 2023.02.07  
- Optimised events at the search-input-block. [Bilibili]
- Bug fixes. [search.bilibili.com, www.bilibili.com]

v0.4.1.2 2023.01.28  
- Bug fixes and performance optimisation. [Bilibili]

v0.4.1.1 2023.01.25  
- Expanded the effective pages of the script. [Bilibili]

v0.4.1.0 2023.01.23  
- Performance optimisation and bug fixes.
- Code reduction.

v0.4.0.1 2023.01.21  
- Clean other untracked links. [space.bilibili.com]
- Several bugs fixes. [bilibili.com]

v0.4.0 2023.01.20  
- Clean Bilibili Video page collections clicking event URL state changes. [www.bilibili.com/video/]
- Clean Bilibili Search tracking events. [search.bilibili.com]
- Clean other tracking events (top-menu clicking). [Bilibili]

v0.3.8.3 2023.01.20  
- Fixed tracking event after video sorting navigation bar items clicked. [space.bilibili.com]

v0.3.8.2 2023.01.19  
- Fixed navibar items click events [www.bilibili.com/v/popular].

v0.3.8.1 2023.01.13  
- Clean more links of Baidu.com

v0.3.8 2023.01.06  
- Block Card-Ads for Bilibili. (And now blocked banner-ads & card-ads for Bilibili)
- Block [Lucky Draw (The Selection)] popup at [live.bilibili.com]. Disabled by default.
- (SET [{BlockLivePopups} = true] to enable it.)
- The script may add menus to unlock custom setting.

v0.3.7.1 2023.01.02  
- Fixed [space.bilibili.com] effects after paged, navi-bar clicked or menu-item clicked.
- Added support to clean tracking url at [search.bilibili.com].

v0.3.7 2023-01-02  
- Naming optimisation.
- Script handling optimisation. (Bilibili)
- Added support to block part of Bilibili Ads.

v0.3.6 2022.12.28  
- Optimise Baidu related search URL, paging URL processing method.

v0.3.5 2022.12.27  
- Script logic optimisation.

v0.3.4 2022.12.23  
- Code optimisation. Fixed script's effect range. [Bilibili]

v0.3.3 2022.12.23  
- Added site support：Clean Baidu <Related Search> URLs.
- Script optimisations. [space.bilibili.com]

v0.3.2 2022.12.22  
- Restore pushstate session (address bar url display, replace history). [Bilibili]
- Minor optimisations. [Bilibili]

v0.3.1 2022.12.22  
- Optimized the effective range. [Bilibili]

v0.3 2022.12.22  
- Added Bilibili Home page, Popular/Rank page, now it can takeeffect on most pages.  [Bilibili]

v0.2 2022.12.21  
- Added missing tags.  [Bilibili]

v0.1 2022.12.20  
- Initial release.
*/
