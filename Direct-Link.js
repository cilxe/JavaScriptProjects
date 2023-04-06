// ==UserScript==
// @name         Direct Link
// @name:zh-CN   重定向链接转直链
// @namespace    https://greasyfork.org/en/scripts/463408/
// @version      0.1.1
// @description  Replace the redirect links with direct links
// @description:zh-CN  将重定向式的链接替换为直链
// @author       cilxe
// @match        *://www.landiannews.com/*
// @match        *://act.hoyolab.com/*
// @match        *://*.jianshu.com/*
// @match        *://*.juejin.cn/*
// @match        *://*.youtube.com/*
// @match        *://*.epicgames.com/*
// @icon         https://www.youtube.com/img/favicon.ico
// @run-at       document-start
// @license      MIT
// ==/UserScript==

/*
## Main features
- **Replace the redirect links with direct links**

## Currently supported sites
- www.landiannews.com
- act.hoyolab.com (adjust.com)
- juejin.cn
- youtube.com
- epicgames.com

This script has not been fully tested yet, so if you encounter broken links replaced by this script, you can submit feedback here.
*/

(() => {
  let timeoutID;
  const DELAY_TIME = { fast: 600, normal: 1000, slow: 2500 };
  const INDEX_LANDIAN = 'ourl.co'; // Landian
  const INDEX_ADJUST = 'redirect'; // Adjust
  const INDEX_JIANSHU = 'to'; // Jianshu
  const INDEX_JUEJIN = 'target'; // Juejin
  const INDEX_YOUTUBE = 'redirect'; // youtube
  const INDEX_YOUTUBE_S = 'q';
  const INDEX_EPIC = 'redirectTo'; // epicgame

  // replace to direct url
  function linkDirect(siteParam) {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      // eslint-disable-next-line max-len
      const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      if (urlRegex.test(links[i].href)) {
        const url = new URL(links[i].href);
        const params = url.searchParams;
        if (params.has(siteParam)) {
          links[i].href = decodeURIComponent(params.get(siteParam));
        }
      }
    }
  }
  function deferredLinkDirect(siteParam, delayTime) {
    timeoutID = setTimeout(() => { linkDirect(siteParam); clearTimeout(timeoutID); }, delayTime);
  }

  // Landiannews specifed actions
  function landianDirect() {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      if (links[i].href.includes(INDEX_LANDIAN) && links[i].innerText.includes('http')) {
        links[i].href = links[i].innerText;
      }
    }
  }
  function deferredLandianDirect(delayTime) {
    timeoutID = setTimeout(() => { landianDirect(); clearTimeout(timeoutID); }, delayTime);
  }

  // Youtube extra actions
  function youtubeDirect() {
    linkDirect(INDEX_YOUTUBE);
    linkDirect(INDEX_YOUTUBE_S);
    deferredLinkDirect(INDEX_YOUTUBE, DELAY_TIME.normal);
    deferredLinkDirect(INDEX_YOUTUBE_S, DELAY_TIME.normal);

    const btns = document.getElementsByTagName('button');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i].addEventListener('click', () => {
        deferredLinkDirect(INDEX_YOUTUBE, DELAY_TIME.fast);
        deferredLinkDirect(INDEX_YOUTUBE_S, DELAY_TIME.normal);
      }, true);
    }
    const divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i += 1) {
      divs[i].addEventListener('click', () => {
        deferredLinkDirect(INDEX_YOUTUBE, DELAY_TIME.fast);
        deferredLinkDirect(INDEX_YOUTUBE_S, DELAY_TIME.normal);
      }, true);
    }
  }

  window.onload = () => {
    const realLocation = window.location;
    const isLandian = realLocation.hostname.includes('landiannews.com');
    const isHoyolab = realLocation.hostname.includes('act.hoyolab.com');
    const isJianshu = realLocation.hostname.includes('jianshu.com');
    const isJuejin = realLocation.hostname.includes('juejin.cn');
    const isYoutube = realLocation.hostname.includes('youtube.com');
    const isEpicgame = realLocation.hostname.includes('epicgames.com');
    switch (true) {
      case isLandian:
        deferredLandianDirect(DELAY_TIME.normal);
        deferredLandianDirect(DELAY_TIME.slow);
        break;
      case isHoyolab:
        deferredLinkDirect(INDEX_ADJUST, DELAY_TIME.normal);
        deferredLinkDirect(INDEX_ADJUST, DELAY_TIME.slow);
        break;
      case isJianshu:
        deferredLinkDirect(INDEX_JIANSHU, DELAY_TIME.normal);
        deferredLinkDirect(INDEX_JIANSHU, DELAY_TIME.slow);
        break;
      case isJuejin:
        deferredLinkDirect(INDEX_JUEJIN, DELAY_TIME.normal);
        deferredLinkDirect(INDEX_JUEJIN, DELAY_TIME.slow);
        break;
      case isYoutube:
        // eslint-disable-next-line max-len
        youtubeDirect();
        break;
      case isEpicgame:
        deferredLinkDirect(INDEX_EPIC, DELAY_TIME.normal);
        deferredLinkDirect(INDEX_EPIC, DELAY_TIME.slow);
        break;
      default:
        break;
    }
  };
})();

/*
v0.1.1 2023.04.06
- Spelling correction.

v0.1.0 2023.04.06
- Script optimisation.
- Fix youtube matching.

v0.0.6  2023.03.27
Replace direct url on Epicgames.com.

v0.0.5  
- Remove [Youtube.com] event redirection.

v0.0.4 2023.02.24  
- Added [Juejin.cn] redirecting.

v0.0.3 2023.01.25  
- Added [Jianshu.com] redirecting.

v0.0.2 2023.01.06  
- Clean Hoyolab [app.adjust.com] tracking urls.

v0.0.1 2022.12.27  
- Initial release, direct link for landiannews.com
*/
