// ==UserScript==
// @name         跟踪链接净化（通用及定向清理）
// @name:zh-TW   跟蹤鏈接凈化（通用及定向清理）
// @name:en      Clean Tracking URLs (Common and Specified Cleaning)
// @namespace    https://greasyfork.org/en/scripts/456881
// @version      0.5.0-2023.04.15
// @description  净化所有网站的跟踪链接和事件，网站定向清理
// @description:zh-TW 凈化網際網路上的所有網站鏈接，網站定向清理
// @description:en Clean common Tracking URLs and events for all sites and specified cleaning for certain sites.
// @author       cilxe
// @run-at       document-start
// @match        *://*/*
// @exclude      *://*.bilibili.com/api/*
// @exclude      *://api.bilibili.com/*
// @exclude      *://api.*.bilibili.com/*
// @exclude      *://bbq.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @license      MIT
// ==/UserScript==

/*
## Clean Tracking URLs & Block Tracking Events
### Sites that supported common cleaning
- All sites on the internet.

### Sites that supported specified cleaning
- Bilibili
- Baidu (Unencrypted) URLs
- CSDN
- Alibaba sites
  - alibaba.com/aliyun.com/alibabagroup.com/alimama.com
  - taobao.com/tmall.com/tmall.hk
  - youku.com
*/

(() => {
  const DELAY_TIME = { fast: 600, normal: 1000, slow: 3000 };
  let timeoutID; // Make sure one section up to one timeout
  let intervalID;
  let topScroll = 0; // onscroll events
  // If <true> block [Lucky Draw (The Selection)] popups on live.bilibili.com.
  const BlockLivePopups = true;

  // Common tracking params for all sites
  const commonParams = ['curator_clanid', 'snr', 'redir', 'utm_source', 'utm_content', 'utm_medium',
    'spm', 'spm_id_from', 'from'];

  // Tracking or other params for certain site
  const bilibiliParams = ['spm_id_from', 'spm_id', 'vd_source', 'from_spmid', 'csource',
    'sourceFrom', 'hotRank', 'live_from', 'from', 'launch_id', 'msource', 'popular_rank',
    'session_id', 'business', 'sort_field', 'broadcast_type', 'is_room_feed',
    'is_live_full_webview', 'is_live_webview', 'refer_from', 'vt', 't', 'from_source'];
  const baiduParams = ['rsv_idx', 'hisfilter', 'rsf', 'rsv_pq', 'rsv_t', 'qid', 'rsv_dl', // baidu
    'sa', 'rqid', 'oq', 'gpc', 'usm', 'tfflag', 'ie', 'bs', 'rqlang', 'tn', 'sc_us', 'wfr',
    'fenlei', 'platform',
    'fenlei',
    'for', 'from', 'topic_pn', 'rsp', 'rs_src', 'f', 'rsv_page', 'dyTabStr', 'tn', 'ct',
    'lm', 'site', 'sites', 'fr', 'cl', 'bsst', 'lid', 'rsv_spt', 'rsv_bp', 'src', 'sfrom',
    'utm_source', 'utm_medium', 'refer', 'zp_fr', 'channel', 'p_from', 'n_type', 'eqid',
    'uname', 'uid', 'client_type', 'task', 'locate', 'page', 'type', 'is_new_user', // tieba
    'frwh', 'obj_id', 'fid', 'fname', 'tid', '_t', 'topic_name', 'frs', 't',
    'tpl', 'u', 'tb_mod', 'tb_fr',
    '_wkts_', 'ai', 'ck', 'shh']; // wenku
  const douyinParams = ['rsv_idx', 'hisfilter', 'source', 'aid', 'enter_from', 'focus_method', 'gid'];
  const csdnParams = ['spm', 'source', 'utm_source', 'ops_request_misc', 'request_id', 'biz_id', 'utm_medium', 'utm_term'];
  const youkuParams = ['spm', 'scm', 'from', 's'];
  const aliParams = [
    // ali
    'spm', 'utm_content', 'lwfrom', 'from', 'scene',
    // taobao.com/tmall.com/1688.com
    'stats_click', 'initiative_id', 'wh_pid', 'wh_random_str', 'source', 'suggest',
    'suggest_query', 'scm', 'pvid', 'topOfferIds', 'search_condition', 'industryCatId',
  ];

  //  Restore history state, remove redundant params (Common)
  function restoreState(siteParams) {
    const OLD_URL = window.location.href;
    const url = new URL(OLD_URL);
    const params = url.searchParams;
    siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
    const NEW_URL = url.toString();
    window.history.replaceState({}, 'Restore', NEW_URL);
  }

  // Clean <a> links (Common)
  function cleanLinks(siteParams) {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      // Check if it is real link start with or without http:// or https://
      const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
      if (linkRegex.test(links[i].href)) {
        const url = new URL(links[i].href);
        const params = url.searchParams;
        siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
        // Specified site options
        if (siteParams === aliParams) { params.set('q', links[i].innerText); }
        links[i].href = url.toString();
      }
    }
  }
  function deferredCleanLinks(siteParams, delayTime) {
    timeoutID = setTimeout(() => {
      restoreState(siteParams); cleanLinks(siteParams); clearTimeout(timeoutID);
    }, delayTime);
  }

  // Block clicking events (Common)
  function blockClickEvents() {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      links[i].addEventListener('mousedown', (e) => { e.stopPropagation(); }, true);
      links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
    }
  }
  function deferredBlockClickEvents(delayTime) {
    timeoutID = setTimeout(() => { blockClickEvents(); clearTimeout(timeoutID); }, delayTime);
  }

  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Common ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function commonClean() {
    restoreState(commonParams);
    cleanLinks(commonParams);
    deferredCleanLinks(commonParams, DELAY_TIME.normal);
    window.onscroll = () => {
      const scrolls = document.documentElement.scrollTop || document.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        restoreState(commonParams);
        cleanLinks(commonParams);
        topScroll = scrolls;
      }
    };
    const divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i += 1) {
      divs[i].addEventListener('click', () => {
        deferredCleanLinks(commonParams, DELAY_TIME.fast);
      }, true);
    }
    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i].addEventListener('click', () => {
        deferredCleanLinks(commonParams, DELAY_TIME.fast);
      }, true);
    }
  }

  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Bilibili ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  // Remove Bilibili metadata
  function removeBiliMetadData() {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i += 1) {
      if (metas[i].name === 'spm_prefix') { metas[i].remove(); }
    }
  }
  // Remove Bilibili Card Ads
  function removeBiliAds() {
    let index = 0;
    do {
      const cardAds = document.getElementsByTagName('a');
      for (let i = 0; i < cardAds.length; i += 1) {
        if (cardAds[i].hostname.includes('cm.bilibili.com')) { cardAds[i].remove(); }
      }
      index += 1;
    } while (index < 2);
  }
  // block clicking events (link, button, li)
  function blockBClickEvents() {
    function blockBLinkEvents() {
      const links = document.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (links[i].getAttribute('data-video-time') === null) {
          const isLinkJump = links[i].classList.contains('jump-link');
          const isLinkJumpVideo = links[i].classList.contains('video-time') || links[i].classList.contains('video');
          if (!(isLinkJump && isLinkJumpVideo)) {
            links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
          }
        }
      }
    }
    blockBLinkEvents();
    function deferredBlockBevents(delayTime) { // blockBLinkEvents(); removeBiliAds();
      timeoutID = setTimeout(() => { blockBLinkEvents(); removeBiliAds(); clearTimeout(timeoutID); }, delayTime);
    }
    deferredBlockBevents(DELAY_TIME.fast);
    // knowing issue - www.bilibili.com homepage: 
    // click 'last/next' button on the left-side may stucked
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', () => {
        cleanLinks(bilibiliParams);
        deferredBlockBevents(DELAY_TIME.fast);
      });
    }
    const lines = document.getElementsByTagName('li');
    for (let i = 0; i < lines.length; i += 1) {
      lines[i].addEventListener('click', () => {
        cleanLinks(bilibiliParams);
        deferredBlockBevents(DELAY_TIME.fast);
      });
    }
  }
  function deferredBlockBClickEvents(delayTime) {
    restoreState(bilibiliParams);
    timeoutID = setTimeout(() => { blockBClickEvents(); clearTimeout(timeoutID); }, delayTime);
  }
  // Loop execution when mouse moving
  function bilibiliListenMoving() {
    document.onmousemove = (e) => {
      if (e.clientY < 200) {
        cleanLinks(bilibiliParams);
        blockBClickEvents();
      }
    };
  }
  // Loop execution when scrolling
  function biliListenScrolling() {
    window.onscroll = () => {
      // Current position
      const scrolls = document.documentElement.scrollTop || document.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        removeBiliAds();
        restoreState(bilibiliParams);
        cleanLinks(bilibiliParams);
        blockBClickEvents();
        topScroll = scrolls;
      }
    };
  }
  // clean top menu events
  function cleanBLTopMenu() {
    // bilibiliListenMoving();
    document.onmousemove = (e) => {
      if (e.clientY < 200) {
        cleanLinks(bilibiliParams);
        blockBClickEvents();
      }
    };
  }
  // www.bilibili.com/*, ww.bilibili.com/v/popular/*
  function cleanBMainURL() {
    cleanLinks(bilibiliParams);
    removeBiliAds();
    blockBClickEvents();
  }

  // bilibili search events
  function blockBSearchItemEvents() {
    function blockSearchEvents() {
      // input suggested items
      const suggestItems = document.getElementsByClassName('suggest-item');
      for (let i = 0; i < suggestItems.length; i += 1) {
        suggestItems[i].addEventListener('click', () => {
          blockBClickEvents(); deferredBlockBClickEvents(DELAY_TIME.fast);
        });
      }
      // search trending items
      const topSearchs = document.getElementsByClassName('trending-item');
      for (let i = 0; i < topSearchs.length; i += 1) {
        topSearchs[i].addEventListener('click', () => {
          deferredBlockBClickEvents(DELAY_TIME.fast);
        });
      }
      // search history items
      const historyItems = document.getElementsByClassName('history-item');
      for (let i = 0; i < historyItems.length; i += 1) {
        historyItems[i].addEventListener('click', () => {
          deferredBlockBClickEvents(DELAY_TIME.fast);
        });
      }
    }
    // search input area
    const searchInputs = document.getElementsByClassName('search-input-el');
    searchInputs[0].addEventListener('click', () => {
      blockSearchEvents();
    });
    // clear icon
    const clearIcon = document.getElementsByClassName('clear-icon')[0];
    clearIcon.addEventListener('click', () => {
      timeoutID = setTimeout(() => { blockSearchEvents(); clearTimeout(timeoutID); }, DELAY_TIME.fast);
    });
  }
  // search.bilibili.com/*
  function cleanBSearch() {
    blockBClickEvents();
    blockBSearchItemEvents();
    // paging button clicking event
    const pageButtons = document.getElementsByClassName('vui_pagenation--btn'); // div
    for (let i = 0; i < pageButtons.length; i += 1) {
      pageButtons[i].addEventListener('click', () => {
        blockBClickEvents(); deferredBlockBClickEvents(DELAY_TIME.fast);
      });
    }
    deferredBlockBClickEvents(DELAY_TIME.normal);
  }
  // www.bilibili.com/video/*
  function cleanBVideoURL() {
    cleanLinks(bilibiliParams);
    blockBClickEvents();
    const unfoldVideo = document.getElementsByClassName('rec-footer');
    unfoldVideo[0].addEventListener('click', () => {
      cleanLinks(bilibiliParams);
      blockBClickEvents();
      restoreState(bilibiliParams);
    });
    // video episodes/collections tracking state after clicked
    const episodes = document.getElementsByClassName('rec-footer'); // div
    for (let i = 0; i < episodes.length; i += 1) {
      episodes[i].addEventListener('click', () => {
        cleanLinks(bilibiliParams);
        removeBiliAds(); deferredBlockBClickEvents(DELAY_TIME.normal);
      }, true);
    }
    timeoutID = setTimeout(() => {
      restoreState(bilibiliParams);
      cleanLinks(bilibiliParams);
      blockBClickEvents();
      clearTimeout(timeoutID);
    }, DELAY_TIME.normal);
  }
  // space.bilibili.com/*
  function cleanBSpaceURL() {
    cleanLinks(bilibiliParams);
    blockBClickEvents();
    bilibiliListenMoving();
  }
  // live.bilibili.coom popups
  const livePopupBlock = (selection) => {
    const iframes = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i += 1) {
      if (iframes[i].src.includes('live-lottery')) {
        // document.getElementsByTagName('iframe')[i].style.visibility = 'hidden';
        // document.getElementsByTagName('iframe')[i].style.opacity = 0;
        // iframes[i].style.display = 'none';
        if (selection) {
          iframes[i].style.visibility = 'hidden';
        } else {
          iframes[i].style.visibility = '';
        }
      }
    }
  };
  // live.bilibili.com/*
  function cleanBLive() {
    cleanLinks(bilibiliParams);
    blockBClickEvents();
    const navis = document.getElementsByClassName('tabs__tag-item');
    for (let i = 0; i < navis.length; i += 1) {
      navis[i].addEventListener('click', () => {
        deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
      });
    }
    const tabItems = document.getElementsByClassName('tab-item');
    for (let i = 0; i < tabItems.length; i += 1) {
      tabItems[i].addEventListener('click', () => {
        blockBClickEvents();
        deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
      });
    }
    biliListenScrolling();
    intervalID = setInterval(livePopupBlock(BlockLivePopups), DELAY_TIME.normal);
    timeoutID = setTimeout(() => {
      clearInterval(intervalID); clearTimeout(timeoutID);
    }, DELAY_TIME.slow + 1000 * 300);
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Baidu ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanBDLinks(siteParams) {
    cleanLinks(baiduParams);
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      if (links[i].href !== '') {
        if (links[i].hostname.includes('zhidao.baidu.com') && links[i].pathname === '/q') {
          links[i].pathname = '/search';
        }
        links[i].href = links[i].href.replace('from=', '');
      }
    }
    const areas = document.getElementsByTagName('area');
    if (areas.length === 1) {
      const areaURL = new URL(areas[0].href);
      const params = areaURL.searchParams;
      siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
      areas[0].href = areaURL.toString();
    }
  }
  function deferredCleanBDLinks(delayTime) {
    timeoutID = setTimeout(() => { cleanBDLinks(baiduParams); clearTimeout(timeoutID); }, delayTime - 200);
  }
  function blockBDTrackingEvents() {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', () => { deferredCleanBDLinks(DELAY_TIME.fast); }, true);
    }
  }
  // Baidu related search, Hot search URL cleaning
  function cleanBaiduURL() {
    restoreState(baiduParams);
    cleanBDLinks(baiduParams);
    blockBDTrackingEvents();
    window.onscroll = () => {
      const scrolls = document.documentElement.scrollTop || document.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        cleanLinks(baiduParams);
        topScroll = scrolls;
      }
    };
    let x = 0; let y = 0;
    document.onmousemove = (e) => {
      if (Math.abs(e.clientX - x) > 10 || Math.abs(e.clientY - y) > 10) {
        cleanLinks(baiduParams);
        x = e.clientX; y = e.clientY;
      }
    };
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ CSDN ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanCSDN() {
    restoreState(csdnParams);
    cleanLinks(csdnParams);
    // CSDN.net tracking events
    function blockCSDNEvents() {
      const links = document.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
      }
    }
    document.onmousemove = (e) => {
      if (e.clientY < 170 || e.clientY > 450) {
        cleanLinks(csdnParams);
        blockCSDNEvents();
      }
    };
    window.onscroll = () => {
      const scrolls = document.documentElement.scrollTop || document.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        cleanLinks(csdnParams);
        blockCSDNEvents();
        topScroll = scrolls;
      }
    };
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Ali Sites ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanAliSites() {
    restoreState(aliParams);
    cleanLinks(aliParams);
    deferredCleanLinks(aliParams, DELAY_TIME.slow);
    blockClickEvents();
    deferredBlockClickEvents(DELAY_TIME.fast);
    window.onscroll = () => {
      const scrolls = document.documentElement.scrollTop || document.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        restoreState(aliParams);
        cleanLinks(aliParams);
        blockClickEvents();
        topScroll = scrolls;
      }
    };
  }
  window.onload = () => {
    const CUR_HOST = window.location.hostname;
    const CUR_URL = window.location.href;
    const isBilibili = CUR_HOST.includes('bilibili.com');
    const isBmain = CUR_HOST.includes('www.bilibili.com');
    const isBmain2 = CUR_URL.includes('www.bilibili.com/index.html');
    const isBvideo = CUR_URL.includes('www.bilibili.com/video');
    const isBsearch = CUR_HOST.includes('search.bilibili.com');
    const isBspace = CUR_HOST.includes('space.bilibili.com');
    const isBlive = CUR_HOST.includes('live.bilibili.com');
    const isBaidu = CUR_HOST.includes('baidu.com');
    const isDouyin = CUR_HOST.includes('douyin.com');
    const isCSDN = CUR_HOST.includes('csdn.net');
    const isAli = CUR_HOST.includes('alibaba.com') || CUR_HOST.includes('alibabagroup.com')
               || CUR_HOST.includes('aliyun.com') || CUR_HOST.includes('alimama.com')
               || CUR_HOST.includes('aliexpress.com') || CUR_HOST.includes('taobao.com')
               || CUR_HOST.includes('tmall.com') || CUR_HOST.includes('tmall.hk')
               || CUR_HOST.includes('1688.com');
    switch (true) {
      case isBilibili:
        restoreState(bilibiliParams);
        removeBiliMetadData();
        removeBiliAds();
        cleanBLTopMenu();
        biliListenScrolling();
        deferredCleanLinks(bilibiliParams, DELAY_TIME.slow - 400);
        switch (isBilibili) {
          case isBmain || isBmain2:
            if (isBvideo) {
              timeoutID = setTimeout(() => { cleanBVideoURL(); clearTimeout(timeoutID); }, DELAY_TIME.fast);
            } else {
              timeoutID = setTimeout(() => { cleanBMainURL(); clearTimeout(timeoutID); }, DELAY_TIME.fast);
            }
            break;
          case isBsearch:
            cleanBSearch();
            break;
          case isBspace:
            cleanBSpaceURL();
            break;
          case isBlive:
            cleanBLive();
            deferredCleanLinks(bilibiliParams, DELAY_TIME.normal + 200);
            deferredCleanLinks(bilibiliParams, DELAY_TIME.slow);
            break;
          default: // passport account message member t app manga show link
            cleanLinks(bilibiliParams);
            break;
        }
        break;
      case isBaidu:
        cleanBaiduURL();
        break;
      case isDouyin:
        restoreState(douyinParams);
        break;
      case isCSDN:
        cleanCSDN();
        break;
      case CUR_HOST.includes('youku.com'):
        cleanLinks(youkuParams);
        document.onmousemove = () => { cleanLinks(youkuParams); };
        break;
      case isAli:
        cleanAliSites();
        break;
      default: // For all other sites
        commonClean();
        break;
    }
  };
})();

/*
# Changelog
v0.5.0 0.5.0-2023.04.15  
- Added tmall.hk
- Added common cleaning, now this script can clean common contents for all sites and specified cleaning for certain sites.
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
