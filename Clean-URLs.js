// ==UserScript==
// @name         跟踪链接净化
// @name:en      Clean Tracking URLs
// @name:zh-TW   跟蹤鏈接凈化
// @namespace    https://greasyfork.org/en/scripts/456881
// @version      0.5.8
// @description       净化所有网站的跟踪链接和事件
// @description:en    Clean all tracking URLs, block tracking events on all websites
// @description:zh-TW 凈化網際網路上的所有網站鏈接和事件
// @author       cilxe
// @match        *://*/*
// @exclude      *:/*.hdslb.com/*
// @run-at       document-start
// @grant        GM_registerMenuCommand
// @icon         data:image/png;base64,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
// @license      MIT
// ==/UserScript==

/*
### Websites that support common cleaning
- All websites on the internet.

### Websites that support specified cleaning
- Bilibili
- Baidu (Unencrypted) URLs
- CSDN
- Alibaba sites
  - alibaba.com/aliyun.com/alibabagroup.com/alimama.com
  - taobao.com/tmall.com/tmall.hk/1688.com/aliexpress.com
  - youku.com
- Douyin/Tiktok.com
*/

(() => {
  const DELAY_TIME = { fast: 600, normal: 1000, slow: 3000 };
  const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  let timeoutID;
  let intervalID;
  let topScroll = 0;
  const doc = document;
  const pageHost = window.location.hostname;
  const pageURL = window.location.href;

  // If <true> block [Lucky Draw (The Selection)] popups on live.bilibili.com.
  const BlockLivePopups = true;
  // Common tracking params for all sites
  const commonParams = ['spm', 'from', 'mkt',
    'curator_clanid', 'snr', 'redir', // Steam
    'utm_source', 'utm_content', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_id', 'utm_sources', // google analytics
    'embeds_euri', 'source_ve_path', 'feature', 'spm_id_from', 'vd_source', // embedded video yt/bili
    'refer_flag', 'mark_id', 'page_from', 'src'];
  // Tracking or other params for certain site
  const bilibiliParams = ['spm_id_from', 'spm_id', 'vd_source', 'from_spmid', 'csource',
    'sourceFrom', 'hotRank', 'live_from', 'from', 'launch_id', 'msource', 'popular_rank',
    'session_id', 'business', 'sort_field', 'broadcast_type', 'is_room_feed', 'dynamicspm_id_from',
    'is_live_full_webview', 'is_live_webview', 'refer_from', 'vt', 'from_source',
    'share_source', 'share_plat', 'share_session_id', 'share_tag', 'timestamp', 'unique_k'];
  const baiduParams = ['rsv_idx', 'hisfilter', 'rsf', 'rsv_pq', 'rsv_t', 'qid', 'rsv_dl', // baidu
    'sa', 'rqid', 'oq', 'gpc', 'usm', 'tfflag', 'ie', 'bs', 'rqlang', 'tn', 'sc_us', 'wfr',
    'fenlei', 'platform', 'base_query',
    'for', 'from', 'topic_pn', 'rsp', 'rs_src', 'f', 'rsv_page', 'dyTabStr', 'ct', 'utm_content',
    'lm', 'site', 'sites', 'fr', 'cl', 'bsst', 'lid', 'rsv_spt', 'rsv_bp', 'src', 'sfrom',
    'utm_source', 'utm_medium', 'refer', 'zp_fr', 'channel', 'p_from', 'n_type', 'eqid',
    'uname', 'uid', 'client_type', 'task', 'locate', 'page', 'type', 'is_new_user', // tieba
    'frwh', 'obj_id', 'fid', 'fname', '_t', 'topic_name', 'frs', 't', 'share_from', 'idfrom',
    'tpl', 'u', 'tb_mod', 'tb_fr', 'share', 'sfc', 'client_version', 'unique', 'is_video', 'st',
    '_wkts_', 'ai', 'ck', 'shh']; // wenku
  const douyinParams = ['rsv_idx', 'hisfilter', 'source', 'aid', 'enter_from', 'focus_method', 'gid', // douyin
    'previous_page', 'extra_params',
    'is_from_webapp', 'sender_device', 'web_id']; // tiktok
  const csdnParams = ['spm', 'source', 'utm_source', 'ops_request_misc', 'request_id', 'biz_id', 'from_wecom',
    'utm_medium', 'utm_term', 'utm_medium', 'utm_campaign'];
  const youkuParams = ['spm', 'scm', 'from', 's', 'playMode', 'client_id'];
  const aliParams = [
    'spm', 'utm_content', 'lwfrom', 'from', 'scene', // ali
    // taobao.com/tmall.com/1688.com/tmall.hk
    'stats_click', 'initiative_id', 'wh_pid', 'wh_random_str', 'source', 'suggest',
    'suggest_query', 'scm', 'pvid', 'topOfferIds', 'search_condition', 'industryCatId',
  ];
  //  Restore history state, remove redundant params (Common)
  function restoreState(siteParams) {
    const url = new URL(pageURL);
    const params = url.searchParams;
    siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });

    // With regualr expression, matches all tracking param-names which contains: utm / spm / from
    // const paramsRegex = /^(utm|spm|from)/i;
    // Array.from(params.keys()).forEach((k) => { if (paramsRegex.test(k)) { params.delete(k); } });
    if (url.href !== pageURL) { window.history.replaceState({}, 'Restore', url.href); }
  }
  // Clean <a> links (Common)
  function cleanLinks(siteParams) {
    const links = doc.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      if (linkRegex.test(links[i].href)) {
        const url = new URL(links[i].href);
        const params = url.searchParams;
        //  ============== Specified site actions ==============
        //  1. Ali sites
        if (/([\w.]{0,})(taobao|tmall).com/.test(pageHost)) { params.set('q', links[i].innerText); }
        //  2. Tieba.baidu.com
        if (/([\w.]{0,})(baidu).com/.test(pageHost) && links[i].innerText === '应用中心') {
          params.set('kw', links[i].innerText);
        }
        //  3. Bilibili 
        if (siteParams === bilibiliParams) {
        // Remove Bilibili Card Ads
          if (links[i].hostname.includes('cm.bilibili.com')) { links[i].remove(); }
          // Clean <a> link data-url on bilibili.com/video
          const dataLink = links[i].getAttribute('data-url');
          if (dataLink !== null) {
            if (dataLink.includes('bilibili.com') && dataLink.startsWith('//')) {
              const dlURL = new URL(`https:${dataLink}`);
              const dlParams = dlURL.searchParams;
              siteParams.forEach((k) => { if (dlParams.has(k)) { dlParams.delete(k); } });
              links[i].setAttribute('data-url', url.href);
            }
          }
        }
        siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
        if (links[i].href !== url.href) { links[i].href = url.href; }
      }
    }
  }
  function deferredCleanLinks(siteParams, delayTime) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      restoreState(siteParams); cleanLinks(siteParams);
    }, delayTime);
  }

  // Block clicking events (Common)
  function blockClickEvents(delayTime) {
    timeoutID = setTimeout(() => {
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (linkRegex.test(links[i].href)) {
          links[i].addEventListener('mousedown', (e) => { e.stopPropagation(); }, true);
          links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
        }
      }
      clearTimeout(timeoutID);
    }, delayTime);
  }

  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Common sites ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function commonClean() {
    // additional params for certain sites
    if (pageHost.includes('github.com')) { commonParams.push('ref_cta', 'ref_loc', 'ref_page'); }
    if (pageHost.includes('medium.com')) { commonParams.push('source'); }
    if (pageHost.includes('douban.com')) { commonParams.push('target_user_id'); }
    if (pageHost.includes('xda-developers.com')) {
      commonParams.push('tag', 'ascsubtag', 'asc_refurl', 'asc_campaign', 'u', 'url', 'newsletter_popup');
    }
    if (pageHost.includes('zhihu.com')) {
      commonParams.push('search_source', 'hybrid_search_source', 'hybrid_search_extra');
    }
    const hoyoRegex = /([\w.]{0,})(hoyolab|hoyoverse|mihoyo|miyoushe|mihoyogift).com/;
    if (hoyoRegex.test(pageHost)) {
      commonParams.push(
        'hyl_auth_required',
        'hyl_presentation_style',
        'bbs_theme',
        'bbs_theme_device',
        'bbs_presentation_style',
        'mhy_presentation_style',
      );
    }
    if (pageHost.includes('cctv.com')) { commonParams.push('toc_style_id', 'share_to', 'track_id'); }
    const params = commonParams;
    restoreState(params);
    doc.addEventListener('DOMContentLoaded', () => {
      cleanLinks(params);
      const divs = doc.getElementsByTagName('div');
      for (let i = 0; i < divs.length; i += 1) {
        if (divs[i].className !== '') {
          divs[i].addEventListener('click', () => {
            deferredCleanLinks(params, DELAY_TIME.normal);
          }, true);
        }
      }
      const btns = doc.getElementsByTagName('button');
      for (let i = 0; i < btns.length; i += 1) {
        if (btns[i].className !== '') {
          btns[i].addEventListener('click', () => {
            deferredCleanLinks(params, DELAY_TIME.normal);
          }, true);
        }
      }
    });
    deferredCleanLinks(params, DELAY_TIME.slow - 400);
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrolls - topScroll > 150) { // executiing until scrolling to the bottom of the page
        cleanLinks(params);
        topScroll = scrolls;
      }
    };
    return params;
  }

  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Bilibili ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  // Remove Bilibili metadata
  function removeBiliMetadData() {
    const metas = doc.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i += 1) {
      if (metas[i].name === 'spm_prefix') { metas[i].remove(); }
    }
  }
  // Remove Bilibili Annoyances [Login popups, Ads]
  function removeBiliAnnoyances(delayTime) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      // bilibili ads
      let index = 0;
      do {
        const cardAds = doc.getElementsByTagName('a');
        for (let i = 0; i < cardAds.length; i += 1) {
          if (cardAds[i].hostname.includes('cm.bilibili.com')) { cardAds[i].remove(); }
        }
        index += 1;
      } while (index < 2);
      // bilibili login tips
      const loginTip = doc.getElementsByClassName('lt-row')[0];
      const loginCard = doc.getElementsByClassName('bili-login-card')[0];
      const loginMask = doc.getElementsByClassName('bili-mini-mask')[0];
      if (loginTip !== undefined) { loginTip.remove(); }
      if (loginCard !== undefined) { loginCard.remove(); }
      if (loginMask !== undefined) { loginMask.remove(); }
    }, delayTime);
  }
  // block clicking events (link, button, li)
  function blockBClickEvents() {
    function blockBLinkEvents() {
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (links[i].getAttribute('data-video-time') === null && linkRegex.test(links[i].href)) {
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
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        cleanLinks(bilibiliParams); removeBiliAnnoyances(0); blockBLinkEvents();
      }, delayTime);
    }
    deferredBlockBevents(DELAY_TIME.fast);
    const buttons = doc.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].className !== '') {
        buttons[i].addEventListener('click', () => {
          deferredBlockBevents(DELAY_TIME.fast);
        }, true);
      }
    }
    const lines = doc.getElementsByTagName('li');
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].className !== '' || !lines[i].className.includes('context-sub-menu-item')) {
        lines[i].addEventListener('click', () => {
          deferredBlockBevents(DELAY_TIME.fast);
        }, true);
      }
    }
  }
  function deferredBlockBClickEvents(delayTime) {
    restoreState(bilibiliParams); clearTimeout(timeoutID);
    timeoutID = setTimeout(() => { blockBClickEvents(); }, delayTime);
  }
  // Loop execution when mouse moving
  function bilibiliListenMoving() {
    doc.addEventListener('DOMContentLoaded', () => {
      let x = 0; let y = 0;
      document.onmousemove = (e) => {
        if (Math.abs(e.clientX - x) > 20 || Math.abs(e.clientY - y) > 20) {
          cleanLinks(bilibiliParams);
          blockBClickEvents();
          x = e.clientX; y = e.clientY;
        }
      };
    });
  }
  // Loop execution when scrolling
  function biliListenScrolling() {
    window.onscroll = () => {
      // Current position
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrolls - topScroll > 150) {
        restoreState(bilibiliParams);
        cleanLinks(bilibiliParams);
        removeBiliAnnoyances(0);
        blockBClickEvents();
        topScroll = scrolls;
      }
    };
  }
  // clean top menu events
  function cleanBLTopMenu() {
    doc.onmousemove = (e) => {
      if (e.clientY < 200) {
        cleanLinks(bilibiliParams); blockBClickEvents();
      }
    };
  }
  // bilibili search events
  function blockBSearchItemEvents() {
    function blockSearchEvents() {
      // input suggested items
      const suggestItems = doc.getElementsByClassName('suggest-item');
      for (let i = 0; i < suggestItems.length; i += 1) {
        suggestItems[i].addEventListener('click', () => {
          blockBClickEvents(); deferredBlockBClickEvents(DELAY_TIME.fast);
        }, true);
      }
      // search trending items
      const topSearchs = doc.getElementsByClassName('trending-item');
      for (let i = 0; i < topSearchs.length; i += 1) {
        topSearchs[i].addEventListener('click', () => {
          deferredBlockBClickEvents(DELAY_TIME.fast);
        }, true);
      }
      // search history items
      const historyItems = doc.getElementsByClassName('history-item');
      for (let i = 0; i < historyItems.length; i += 1) {
        historyItems[i].addEventListener('click', () => {
          deferredBlockBClickEvents(DELAY_TIME.fast);
        }, true);
      }
    }
    // search input area
    const searchInputs = doc.getElementsByClassName('search-input-el');
    searchInputs[0].addEventListener('click', () => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => { blockSearchEvents(); }, DELAY_TIME.fast);
    }, true);
    // clear icon
    const clearIcon = doc.getElementsByClassName('clear-icon')[0];
    clearIcon.addEventListener('click', () => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => { blockSearchEvents(); }, DELAY_TIME.fast);
    }, true);
  }
  // search.bilibili.com/*
  function cleanBSearch() {
    blockBSearchItemEvents();
    // paging button clicking event
    const pageButtons = doc.getElementsByClassName('vui_pagenation--btn'); // div
    for (let i = 0; i < pageButtons.length; i += 1) {
      pageButtons[i].addEventListener('click', () => {
        deferredBlockBClickEvents(DELAY_TIME.fast);
      }, true);
    }
    deferredBlockBClickEvents(DELAY_TIME.normal);
    deferredCleanLinks(bilibiliParams, DELAY_TIME.slow - 600);
  }
  // www.bilibili.com/video/*
  function cleanBVideoURL() {
    cleanLinks(bilibiliParams);
    doc.addEventListener('DOMContentLoaded', () => {
      const unfoldVideo = doc.getElementsByClassName('rec-footer')[0];
      unfoldVideo.addEventListener('click', () => {
        deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
        deferredBlockBClickEvents(bilibiliParams, DELAY_TIME.fast);
      }, true);
      // Clean copying url (share copy)
      doc.getElementById('arc_toolbar_report').addEventListener('mousemove', () => {
        doc.getElementById('share-btn-outer').addEventListener('click', (event) => {
          event.stopPropagation(); navigator.clipboard.writeText(`${doc.title}  ${pageURL}`);
        });
        doc.getElementById('share-btn-inner').addEventListener('click', (event) => {
          event.stopPropagation(); navigator.clipboard.writeText(pageURL);
        });
      });
    });
  }
  // live.bilibili.com/*
  function cleanBLive(delayTime) {
    // live.bilibili.com popups
    const livePopupBlock = (selection) => {
      if (selection) {
        doc.getElementById('anchor-guest-box-id').style.display = 'none';
      } else {
        doc.getElementById('anchor-guest-box-id').style.display = '';
      }
      const iframes = doc.getElementsByTagName('iframe');
      for (let i = 0; i < iframes.length; i += 1) {
        if (iframes[i].src.includes('live-lottery')) {
        // iframes[i].style.visibility = 'hidden';
        // iframes[i].style.opacity = 0;
        // iframes[i].style.display = 'none';
          if (selection) {
            iframes[i].style.visibility = 'hidden';
          } else {
            iframes[i].style.visibility = '';
          }
        }
      }
    };
    timeoutID = setTimeout(() => {
      const navis = doc.getElementsByClassName('tabs__tag-item'); // cat
      for (let i = 0; i < navis.length; i += 1) {
        navis[i].addEventListener('click', () => {
          deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
        }, true);
      }
      const tabItems = doc.getElementsByClassName('tab-item'); // sort
      for (let i = 0; i < tabItems.length; i += 1) {
        tabItems[i].addEventListener('click', () => {
          blockBClickEvents();
          deferredCleanLinks(bilibiliParams, DELAY_TIME.fast);
        }, true);
      }
    }, delayTime);
    intervalID = setInterval(livePopupBlock(BlockLivePopups), DELAY_TIME.normal * 2);
    timeoutID = setTimeout(() => {
      clearInterval(intervalID); clearTimeout(timeoutID);
    }, DELAY_TIME.slow + 3000 * 300);
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Baidu ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  // Baidu related search, Hot search URL cleaning
  function cleanBaidu() {
    if (pageHost.includes('news.baidu.com')) { baiduParams.push('toc_style_id', 'share_to', 'track_id'); }
    restoreState(baiduParams);
    function cleanBDLinks(siteParams) {
      cleanLinks(baiduParams);
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (linkRegex.test(links[i].href)) {
          if (links[i].hostname.includes('zhidao.baidu.com') && links[i].pathname === '/q') {
            links[i].pathname = '/search';
          }
          links[i].href = links[i].href.replace('from=', '');
        }
      }
      const areas = doc.getElementsByTagName('area');
      if (areas.length === 1) {
        const areaURL = new URL(areas[0].href);
        const params = areaURL.searchParams;
        siteParams.forEach((k) => { if (params.has(k)) { params.delete(k); } });
        areas[0].href = areaURL.href;
      }
    }
    function blockBDTrackingEvents() {
      doc.addEventListener('DOMContentLoaded', () => {
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i += 1) {
          if (links[i].href !== '') {
            links[i].addEventListener('click', () => { cleanBDLinks(baiduParams); }, true);
          }
        }
      });
    }
    cleanBDLinks(baiduParams);
    blockBDTrackingEvents();
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        cleanLinks(baiduParams);
        topScroll = scrolls;
      }
    };
    let x = 0; let y = 0;
    doc.onmousemove = (e) => {
      if (Math.abs(e.clientX - x) > 20 || Math.abs(e.clientY - y) > 20) {
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
      const links = doc.getElementsByTagName('a');
      for (let i = 0; i < links.length; i += 1) {
        if (links[i].href !== '') {
          links[i].addEventListener('click', (e) => { e.stopPropagation(); }, true);
        }
      }
    }
    doc.onmousemove = (e) => {
      if (e.clientY < 170 || e.clientY > 450) {
        cleanLinks(csdnParams);
        blockCSDNEvents();
      }
    };
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (Math.abs(scrolls - topScroll) > 150) {
        cleanLinks(csdnParams);
        blockCSDNEvents();
        topScroll = scrolls;
      }
    };
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Youku ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanYoukuDouyin(siteParams) {
    restoreState(siteParams); cleanLinks(siteParams);
    let x = 0; let y = 0;
    doc.addEventListener('mousemove', (e) => {
      if (Math.abs(e.clientX - x) > 20 || Math.abs(e.clientY - y) > 20) {
        cleanLinks(siteParams);
        x = e.clientX; y = e.clientY;
      }
    });
  }
  // ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Ali Sites ✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦
  function cleanAliSites() {
    restoreState(aliParams);
    cleanLinks(aliParams);
    deferredCleanLinks(aliParams, DELAY_TIME.slow);
    blockClickEvents(DELAY_TIME.fast);
    window.onscroll = () => {
      const scrolls = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrolls - topScroll > 150) {
        restoreState(aliParams);
        cleanLinks(aliParams);
        blockClickEvents();
        topScroll = scrolls;
      }
    };
  }

  (() => {
    // Menu language (May not properly changed due to browser settings)
    const userLanguage = navigator.language;
    let MenuTitle;
    switch (true) {
      case userLanguage === 'zh-CN' || userLanguage === 'zh-SG':
        MenuTitle = '手动清理链接';
        break;
      case userLanguage === 'zh-TW' || userLanguage === 'zh-HK':
        MenuTitle = '手動清理連結';
        break;
      default: // English and others
        MenuTitle = 'Manually retry link cleaning';
        break;
    }
    const isBilibili = pageHost.includes('bilibili.com') || pageHost.includes('biligame.com');
    const isBmain = pageHost.includes('www.bilibili.com') || pageURL.includes('www.bilibili.com/index.html');
    const aliRegex = /([\w.]{0,})(alibaba|alibabagroup|aliyun|alimama|aliexpress|taobao|tmall|1688).(com|hk|cn)/;
    let siteParams; // For script menu
    switch (true) {
      case isBilibili:
        siteParams = bilibiliParams;
        restoreState(bilibiliParams); cleanLinks(bilibiliParams); cleanBLTopMenu();
        removeBiliAnnoyances(0);
        blockBClickEvents(); biliListenScrolling();
        switch (isBilibili) {
          case isBmain:
            if (pageURL.includes('www.bilibili.com/video')) { cleanBVideoURL(); } else { bilibiliListenMoving(); }
            break;
          case pageHost.includes('search.bilibili.com'):
            cleanBSearch(); bilibiliListenMoving();
            break;
          case pageHost.includes('live.bilibili.com'):
            cleanBLive(DELAY_TIME.normal);
            break;
          default: // space passport account message member t app manga show link biligame
            bilibiliListenMoving();
            break;
        }
        doc.addEventListener('DOMContentLoaded', () => { removeBiliMetadData(); });
        break;
      case pageHost.includes('baidu.com'):
        siteParams = baiduParams; cleanBaidu();
        break;
      case aliRegex.test(pageHost):
        siteParams = aliParams; cleanAliSites();
        break;
      case pageHost.includes('csdn.net'):
        siteParams = csdnParams; cleanCSDN();
        break;
      case pageHost.includes('youku.com'):
        siteParams = youkuParams; cleanYoukuDouyin(youkuParams);
        break;
      case /([\w.]{0,})(tiktok|douyin).com/.test(pageHost):
        siteParams = douyinParams; cleanYoukuDouyin(douyinParams);
        break;
      default:
        siteParams = commonClean();
        break;
    }
    window.onload = () => {
      // eslint-disable-next-line no-undef
      GM_registerMenuCommand(MenuTitle, () => { cleanLinks(siteParams); }, 'C');
    };
  })();
})();

/*
# Changelog
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
