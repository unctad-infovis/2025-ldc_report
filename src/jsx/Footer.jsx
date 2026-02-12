import React, { /* useEffect /* , useState, useRef */ } from 'react';
import '../styles/styles.less';

function Footer() {
  return (
    <div className="app" id="app_footer">
      <div className="footer_container">
        <h2>What do you want to do next?</h2>
        <div className="footer_elements">
          <div className="footer_element footer_element_1">
            <div className="footer_content anchor_videos" id="anchor_videos">
              <h3>Watch the videos</h3>
              <div className="iframe_container youtube_iframe">
                <iframe
                  src="https://player.vimeo.com/video/1163335587?h=6f1dbf9ba2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
                  }}
                  title="Least Developed Countries Report 2025"
                />
                <script src="https://player.vimeo.com/api/player.js" />
              </div>
              <ul>
                <li>
                  <a href="https://vimeo.com/1163335587" target="_blank" rel="noreferrer">English</a>
                  {', '}
                  <a href="https://vimeo.com/1163711599/e117baf5e5" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="https://vimeo.com/1163657367/ac340e5146" target="_blank" rel="noreferrer">Español</a>
                  <div className="hidden">
                    {', '}
                    <a href="https://vimeo.com/1123267095" target="_blank" rel="noreferrer">العربية</a>
                    {', '}
                    <a href="https://vimeo.com/1122795449" target="_blank" rel="noreferrer">简体中文</a>
                    {', '}
                    <a href="https://vimeo.com/1123265387" target="_blank" rel="noreferrer">Русский</a>
                    {', '}
                    <a href="https://vimeo.com/1122840972" target="_blank" rel="noreferrer">Português</a>
                    {', '}
                    <a href="https://vimeo.com/1123266202" target="_blank" rel="noreferrer">Kiswahili</a>
                  </div>
                </li>
              </ul>
              <br />
              <h4>Watch the press conference</h4>
              <div className="iframe_container youtube_iframe">
                <iframe
                  src="https://player.vimeo.com/video/1163899921?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  title="UNCTAD’s Review of Maritime Transport Press Release 2025"
                />
                <script src="https://player.vimeo.com/api/player.js" />
              </div>
              <ul>
                <li>
                  <a href="https://vimeo.com/1163899921" target="_blank" rel="noreferrer">English</a>
                </li>
              </ul>
              <br />
              <h4>Media assets</h4>
              <ul>
                <li>
                  <a href="https://www.flickr.com/photos/unctad/albums/72177720331932485" target="_blank" rel="noreferrer">Photos</a>
                </li>
                <li className="hidden">
                  <a href="https://trello.com/b/5Rj98nG2/" target="_blank" rel="noreferrer">Digital assets</a>
                </li>
              </ul>
            </div>
            {/*       <div className="footer_content anchor_podcasts" id="anchor_podcasts">
              <h3>Podcast</h3>
              <p>Listen to the Weekly Tradecast episode that explore some of the main issues in the report</p>
              <div className="iframe_container">
                <iframe title="139. Rethinking investment: Making money work for development" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)' }} scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=j86uq-18def52-pb&btn-skin=009EDB&download=1&font-color=000000&fonts=Verdana&from=pb6admin&logo_link=none&rtl=0&share=1&size=240&skin=ffffff" allowFullScreen />
                <a href="/podcast/rethinking-investment-making-money-work-development" target="_blank">Rethinking investment: Making money work for development</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
