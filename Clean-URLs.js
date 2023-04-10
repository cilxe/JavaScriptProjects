// ==UserScript==
// @name         跟踪链接净化（通用及定向清理）
// @name:zh-TW   跟蹤鏈接凈化（通用及定向清理）
// @name:en      Clean Tracking URLs (Common and Specified Cleaning)
// @namespace    https://greasyfork.org/en/scripts/456881
// @version      0.5.1
// @description  净化所有网站的跟踪链接和事件，网站定向清理
// @description:zh-TW 凈化網際網路上的所有網站鏈接，網站定向清理
// @description:en Clean all websites' typical tracking contents, as well as targeted cleaning on the specific websites
// @author       cilxe
// @run-at       document-start
// @match        *://*/* 
// @icon         data:image/png;base64,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
// @license      MIT
// ==/UserScript==

/*
## Clean Tracking URLs & Block Tracking Events
### Sites that supported common cleaning
- All websites on the internet.

### Sites that supported specified cleaning
- Bilibili
- Baidu (Unencrypted) URLs
- CSDN
- Alibaba sites
  - alibaba.com/aliyun.com/alibabagroup.com/alimama.com
  - taobao.com/tmall.com/1688.com/tmall.hk
  - youku.com

This script sets a delay to ensure it load properly, you can customise {DELAY_TIME}(milliseconds) yourself if needed.

It is recommanded that you use CSS Selector with Ad block extensions (AdBlock, uBlock...) to block tricky Ads.  
It is more fast and convenient.  
Example:  Apply with [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) and uBlock:  
```
bilibili.com##[href*="cm.bilibili.com"]  
```
*/

(() => {
  const DELAY_TIME = { fast: 600, normal: 1000, slow: 3000 };
  let timeoutID; // Make sure one section up to one timeout
  let intervalID;
  let topScroll = 0; // onscroll events
  // If <true> block [Lucky Draw (The Selection)] popups on live.bilibili.com.
  const BlockLivePopups = true;

  // Common tracking params for all sites
  const commonParams = ['curator_clanid', 'snr', 'redir',
    'utm_source', 'utm_content', 'utm_medium', 'utm_campaign', 'utm_term', // gogl analytics
    'spm', 'spm_id_from', 'from',
    'mkt']; // microsoft

  // Tracking or other params for certain site
  const bilibiliParams = ['spm_id_from', 'spm_id', 'vd_source', 'from_spmid', 'csource',
    'sourceFrom', 'hotRank', 'live_from', 'from', 'launch_id', 'msource', 'popular_rank',
    'session_id', 'business', 'sort_field', 'broadcast_type', 'is_room_feed', 'dynamicspm_id_from',
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
  const csdnParams = ['spm', 'source', 'utm_source', 'ops_request_misc', 'request_id', 'biz_id',
    'utm_medium', 'utm_term', 'utm_medium', 'utm_campaign'];
  const youkuParams = ['spm', 'scm', 'from', 's', 'playMode'];
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
      if (links[i].href !== '') {
        links[i].addEventListener('mousedown', (e) => { e.stopPropagation(); }, true);
        links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
      }
    }
  }
  function deferredBlockClickEvents(delayTime) {
    timeoutID = setTimeout(() => { blockClickEvents(); clearTimeout(timeoutID); }, delayTime);
  }

  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Common ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function commonClean() {
    restoreState(commonParams);
    cleanLinks(commonParams);
    window.onscroll = () => {
      const scrolls = document.documentElement.scrollTop || document.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        cleanLinks(commonParams);
        topScroll = scrolls;
      }
    };
    const divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i += 1) {
      divs[i].addEventListener('click', () => {
        deferredCleanLinks(commonParams, DELAY_TIME.normal + 200);
      }, true);
    }
    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i].addEventListener('click', () => {
        deferredCleanLinks(commonParams, DELAY_TIME.normal + 200);
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
  // block clicking events (link, button, li)
  function blockBClickEvents() {
    function blockBLinkEvents() {
      const links = document.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (links[i].getAttribute('data-video-time') === null && links[i].href !== '') {
          const isLinkJump = links[i].classList.contains('jump-link');
          const isLinkJumpVideo = links[i].classList.contains('video-time') || links[i].classList.contains('video');
          if (!(isLinkJump && isLinkJumpVideo)) {
            links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
          }
        }
      }
    }
    blockBLinkEvents();
    function deferredBlockBevents(delayTime) {
      timeoutID = setTimeout(() => { blockBLinkEvents(); clearTimeout(timeoutID); }, delayTime);
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
      timeoutID = setTimeout(() => { blockSearchEvents(); clearTimeout(timeoutID); }, DELAY_TIME.fast);
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
        deferredBlockBClickEvents(DELAY_TIME.fast);
      });
    }
    deferredBlockBClickEvents(DELAY_TIME.normal);
  }
  // www.bilibili.com/video/*
  function cleanBVideoURL() {
    cleanLinks(bilibiliParams);
    blockBClickEvents();
    const unfoldVideos = document.getElementsByClassName('rec-footer');
    for (let i = 0; i < unfoldVideos.length; i += 1) {
      unfoldVideos[i].addEventListener('click', () => {
        restoreState(bilibiliParams);
        deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
        deferredBlockBClickEvents(bilibiliParams, DELAY_TIME.normal);
      });
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
      if (links[i].href !== '') {
        links[i].addEventListener('click', () => { deferredCleanBDLinks(DELAY_TIME.fast); }, true);
      }
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
        if (links[i].href !== '') {
          links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
        }
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
    const isBmain = CUR_HOST.includes('www.bilibili.com') || CUR_URL.includes('www.bilibili.com/index.html');
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
        cleanBLTopMenu();
        biliListenScrolling();
        deferredCleanLinks(bilibiliParams, DELAY_TIME.slow - 400);
        switch (isBilibili) {
          case isBmain:
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
        deferredCleanLinks(commonParams, DELAY_TIME.slow - 400);
        break;
    }
  };
})();
/*
# Changelog
v0.5.1 2023.04
- Fixed bugs where block clicking-events on empty `<a>` link

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
