import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

import scrollIntoView from 'scroll-into-view';

import Header from './components/Header.jsx';
import DwChartContainer from './components/DwChartContainer.jsx';
import ChapterHeader from './components/ChapterHeader.jsx';
import ParallaxImage from './components/ParallaxImage.jsx';
import ScrollingText from './components/ScrollingText.jsx';

function App() {
  const appRef = useRef();
  const overviewRef = useRef();
  const isVisibleChapterOverview = useIsVisible(overviewRef);
  const chaptersContainerRef = useRef();
  const chapter1Ref = useRef();
  const isVisibleChapter1 = useIsVisible(chapter1Ref);
  const chapter2Ref = useRef();
  const isVisibleChapter2 = useIsVisible(chapter2Ref);
  const chapter3Ref = useRef();
  const isVisibleChapter3 = useIsVisible(chapter3Ref);
  const chapter4Ref = useRef();
  const isVisibleChapter4 = useIsVisible(chapter4Ref);
  const chapter5Ref = useRef();
  const isVisibleChapter5 = useIsVisible(chapter5Ref);

  const [offset, setOffset] = useState(false);

  const analytics = window.gtag || undefined;
  const track = useCallback((label_event = false, value_event = false) => {
    if (typeof analytics !== 'undefined' && label_event !== false && value_event !== false) {
      analytics('event', 'project_interaction', {
        label: label_event,
        project_name: '2025-ldc_report',
        transport_type: 'beacon',
        value: value_event
      });
    }
  }, [analytics]);

  const seenChapter = useCallback((chapter) => {
    track('Scroll', chapter);
  }, [track]);

  useEffect(() => {
    if (!overviewRef.current.classList.contains('seen') && isVisibleChapterOverview) {
      overviewRef.current.classList.add('seen');
      seenChapter('Overview');
    }
  }, [overviewRef, seenChapter, isVisibleChapterOverview]);

  useEffect(() => {
    if (!chapter1Ref.current.classList.contains('seen') && isVisibleChapter1) {
      chapter1Ref.current.classList.add('seen');
      seenChapter('Chapter 1');
    }
  }, [chapter1Ref, seenChapter, isVisibleChapter1]);

  useEffect(() => {
    if (!chapter2Ref.current.classList.contains('seen') && isVisibleChapter2) {
      chapter2Ref.current.classList.add('seen');
      seenChapter('Chapter 2');
    }
  }, [chapter2Ref, seenChapter, isVisibleChapter2]);

  useEffect(() => {
    if (!chapter3Ref.current.classList.contains('seen') && isVisibleChapter3) {
      chapter3Ref.current.classList.add('seen');
      seenChapter('Chapter 3');
    }
  }, [chapter3Ref, seenChapter, isVisibleChapter3]);

  useEffect(() => {
    if (!chapter4Ref.current.classList.contains('seen') && isVisibleChapter4) {
      chapter4Ref.current.classList.add('seen');
      seenChapter('Chapter 4');
    }
  }, [chapter4Ref, seenChapter, isVisibleChapter4]);

  useEffect(() => {
    if (!chapter5Ref.current.classList.contains('seen') && isVisibleChapter5) {
      chapter5Ref.current.classList.add('seen');
      seenChapter('Chapter 5');
    }
  }, [chapter5Ref, seenChapter, isVisibleChapter5]);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const windowHeight = 0;
    setSectionProgress((offset > chaptersContainerRef.current.offsetTop - windowHeight) ? (Math.min(((offset - (chaptersContainerRef.current.offsetTop - windowHeight)) / chaptersContainerRef.current.offsetHeight) * 100, 100)) : 0);
  }, [offset]);

  useEffect(() => {
    const paragraphs = appRef.current.querySelectorAll('.text_content p, .text_content ul, .text_content ol, .text_content h3, .text_content blockquote');

    // Options for the observer (when the p tag is 50% in the viewport)
    const options = {
      threshold: 0.5, // Trigger when 50% of the paragraph is visible
    };

    // Callback function for when the intersection occurs
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
        // Add the visible class when the element is in view
          entry.target.classList.add('visible');
        }
      });
    };

    // Create an IntersectionObserver instance with the callback and options
    const observer = new IntersectionObserver(observerCallback, options);

    // Observe each paragraph
    paragraphs.forEach(p => observer.observe(p));
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 500); // A short delay ensures the DOM is ready
  }, []);

  const chapterTitles = ['Introduction', 'Services in the structural transformation process of least developed countries', 'Trade in services', 'Services sector development: Expectations versus realities', 'Conclusions and policy directions'];

  const downloadDocument = (event) => {
    track('Anchor', `${event.currentTarget.href}`);
    event.stopPropagation();
  };

  const scrollTo = useCallback((target, name) => {
    track('Button', name);
    if (target.includes('anchor_')) {
      setTimeout(() => {
        scrollIntoView(document.querySelector(target), {
          align: {
            left: 0,
            leftOffset: 0,
            lockX: false,
            lockY: false,
            top: 0,
            topOffset: 40
          },
          cancellable: false,
          ease(value) {
            return value;
          },
          time: 1000
        });
      }, 50);
    } else {
      setTimeout(() => {
        scrollIntoView(appRef.current.querySelector(target), {
          align: {
            left: 0,
            leftOffset: 0,
            lockX: false,
            lockY: false,
            top: 0,
            topOffset: 60
          },
          cancellable: false,
          ease(value) {
            return value;
          },
          time: 1000
        });
      }, 50);
    }
  }, [track]);

  return (
    <div className="app" ref={appRef}>
      <Header downloadDocument={downloadDocument} scrollTo={scrollTo} chapterTitles={chapterTitles} />
      { /* Overview */}
      <div className="content_container" ref={overviewRef}>
        <div className="text_container">
          <div className="text_content">
            <h3>Services are playing an increasingly important role in the global economy, including in least developed countries (LDCs). This shift, fuelled by digital transformation, is promoted as a new pathway to prosperity.</h3>
            <p>From tourism and transport to finance and telecommunications, services now account for around half of economic output in the average LDC.</p>
            <p>Yet this expansion has not yet delivered on its promises. Most service jobs in LDCs are low-skill and they remain sidelined from the most dynamic segments. In digitally deliverable services – the fastest-growing segment – LDCs account for just 0.16% of global exports.</p>
            <p>This report examines whether services can become a driver of structural transformation — and under what conditions. It finds that services are not a shortcut to development.</p>
            <p>They contribute to transformation only when tightly linked to manufacturing, agriculture and other productive sectors and supported by investment in digital skills and infrastructure. This also requires active trade and investment policies, regional cooperation and stronger multilateral support aligned with LDCs’ supply capacities.</p>
            <blockquote>
              <div className="quote">Services can reinforce industrialization, expand trade and enhance competitiveness, but only when supported by coherent national strategies and an enabling global environment. Without both, the same forces that create opportunity will deepen exclusion.</div>
              <div className="author">
                <span className="name">Rebeca Grynspan</span>
                <span className="title">Secretary-General of UN Trade and Development (UNCTAD)</span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="chapters_container" ref={chaptersContainerRef}>
        <div className="progress_indicator_container">
          <div className="section">
            <div className="progress_bar" style={{ width: `${sectionProgress}%` }} />
          </div>
        </div>
        <div className="backtotop_container">
          <div>
            <button type="button" onClick={() => scrollTo('.header_container', 'Top')}>Back to top</button>
          </div>
        </div>
        <ScrollingText texts={['Are services the new pathway to prosperity? ']} chapter_text="Chapter 1" />
        <div className="content_container chapter_header_1" ref={chapter1Ref}>
          <div className="text_container">
            <ChapterHeader
              chapter_number="1"
              subtitle=""
              title={chapterTitles[0]}
            />
            <div className="download_buttons_container">
              <a href="https://unctad.org/system/files/official-document/ldc2025ch1_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="chapter_download" aria-label="Download Chapter 1" rel="noreferrer">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/2025ldc_chapter1.jpg" /></div></div>
            <div className="text_content">
              <p className="large">Services are increasingly promoted as a pathway to prosperity for least developed countries (LDCs) – a view reinforced by the rise of the digital economy.</p>
              <p>The services-led narrative promises a pathway for LDCs to bypass the traditional development path based on industrialization. Historically, manufacturing has been the key for countries to raise productivity, adopt new technologies and create abundant jobs for low-skilled workers.</p>
              <p>But that route has become harder, with new barriers to entry:</p>
              <ul>
                <li>Global manufacturing is now more capital and skill-intensive</li>
                <li>Automation and artificial intelligence has reduced manufacturing’s low-skill job-creation potential</li>
                <li>Production has become increasingly concentrated in a small number of countries.</li>
              </ul>
              <p>These trends help explain the growing focus on services. But whether services can deliver sustained growth, better jobs and rising incomes in LDCs remains uncertain.</p>
              <p>The report frames services not as a substitute for manufacturing, but as a complement to it.</p>
              <ul>
                <li>Services already account for nearly half of GDP in the average LDC, yet this has not translated into broad-based prosperity.</li>
                <li>The core concern is job quality, not job numbers alone. LDCs must absorb 13.2 million new job seekers every year in economies where working poverty, informality and low productivity remain widespread.</li>
              </ul>
              <p>The message is clear. Services can drive transformation only if backed by coherent national strategies and an enabling global environment. Without them, expansion risks deepening marginalization rather than reducing it.</p>
            </div>
          </div>
        </div>
        <ScrollingText texts={['What has the shift toward services meant for jobs and productivity in LDCs?']} chapter_text="Chapter 2" />
        <div className="content_container chapter_header_2" ref={chapter2Ref}>
          <div className="text_container">
            <ChapterHeader
              chapter_number="2"
              subtitle=""
              title={chapterTitles[1]}
            />
            <div className="download_buttons_container">
              <a href="https://unctad.org/system/files/official-document/ldc2025ch2_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="chapter_download" aria-label="Download Chapter 2" rel="noreferrer">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/2025ldc_chapter2.jpg" /></div></div>
            <div className="text_content">
              <p className="large">Least developed countries (LDCs) face a dual challenge: accelerating growth while creating enough quality jobs for a fast-growing labour force.</p>
              <ul>
                <li>Average per capita growth in LDCs was just 1% in 2024, leaving them further behind other developing economies.</li>
              </ul>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="v8jvA" title="Least developed countries are falling further behind in output per capita" />
            </div>
            <div className="text_content">
              <ul>
                <li>Labour productivity in the median LDC is 11 times lower than in the median developed economy.</li>
              </ul>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="wCWXR" title="Labour productivity growth is lagging further behind in least developed countries" />
            </div>
            <div className="text_content">
              <ul>
                <li>Over 30% of workers in LDCs live in poverty, with the share reaching above 75% in some countries.</li>
                <li>LDCs must absorb around 13.2 million new workers every year until 2050 while raising productivity fast enough to lift incomes.</li>
              </ul>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="a8T09" title="Least developed countries face mounting demographic pressure" />
            </div>
            <div className="text_content">
              <p>Services already account for almost half of economic output in the average LDC and are absorbing new workers, but mainly in low-productivity and informal activities. Employment is concentrated in less knowledge-intensive segments. Trade services, including retail and vehicle repair, employ nearly four in ten services workers.</p>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="Encz3" title="The rise of services in least developed countries" />
            </div>
            <div className="text_content">
              <p>Despite the rise of services, agriculture remains the largest employer in LDCs, accounting for 48.6% of total jobs in 2023.</p>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="pezab" title="Services are narrowing agriculture’s lead as the main employer in least developed countries" />
            </div>
            <div className="text_content">
              <p>Upgrading towards higher value-added services is constrained by weak digital ecosystems, limited innovation capacity and skills gaps. Many LDCs face a mismatch between workforce skills and the demands of digitally driven services, such as data analysis, coding and cyber security.</p>
              <p>Digital divides also remain entrenched.</p>
              <ul>
                <li>Women are 42% less likely than men to use mobile internet.</li>
                <li>Rural populations are 50% less likely than urban ones.</li>
              </ul>
              <p>Country examples show how digital technologies can lower barriers to services upgrading.</p>
              <ul>
                <li>In Senegal, mobile-based financial services have helped informal microenterprises streamline transactions and reach broader markets.</li>
                <li>In Bangladesh, investments in digital infrastructure and skills have supported the emergence of ICT-enabled services.</li>
              </ul>
              <p>But these examples illustrate potential rather than large-scale transformation.</p>
              <p>The message is clear. Services will deliver transformation only if digital ecosystems and skills are strengthened, and services are linked to higher-productivity activities across the economy.</p>
            </div>
          </div>
        </div>
        <ScrollingText texts={['Can LDCs compete in global services markets? ']} chapter_text="Chapter 3" />
        <div className="content_container chapter_header_3" ref={chapter3Ref}>
          <div className="text_container">
            <ChapterHeader
              chapter_number="3"
              subtitle=""
              title={chapterTitles[2]}
            />
            <div className="download_buttons_container">
              <a href="https://unctad.org/system/files/official-document/ldc2025ch3_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="chapter_download" aria-label="Download Chapter 3" rel="noreferrer">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/2025ldc_chapter3.jpg" /></div></div>
            <div className="text_content">
              <p className="large">Trade in services is expanding globally, but exports from least developed countries (LDCs) are growing from a very low base and mainly in less dynamic segments. Merchandise exports still dominate, and LDCs run a persistent services trade deficit.</p>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="7YOvE" title="Services’ share of exports has rebounded but remains low in least developed countries" />
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="Drpnr" title="Least developed countries have a persistent deficit in services trade" />
            </div>
            <div className="text_content">
              <p>Also, LDC services exports remain concentrated in a small number of countries, limiting their development impact.</p>
            </div>

            <div className="charts_container">
              <DwChartContainer chart_id="Pzwc0" title="Services exports from least developed countries are concentrated in a few economies but share of exports varies more" />
            </div>
            <div className="text_content">
              <p>Travel and transport dominate LDC services exports, creating structural vulnerabilities These sectors were among the hardest hit during COVID-19 and remain exposed to demand, mobility and cost-of-living shocks.</p>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="M4iJn" title="Travel and transport dominate the services exports of least developed countries, 2015" />
              <DwChartContainer chart_id="N8rV7" title="Travel and transport dominate the services exports of least developed countries, 2024" />
            </div>
            <div className="text_content">
              <p>In 2024, travel accounted for 36.9% of exports ($19.2 billion) and transport for 31.7% ($16.5 billion). Together, they made up 68.5% of LDC services exports. Yet LDCs’ combined share of global travel and transport exports was just 1.1%, underscoring limited competitiveness.</p>
              <p>LDCs are also falling behind in digitally deliverable services – the most dynamic segment. Their share fell to 0.16% in 2024, the lowest level since records began.</p>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="VK941" title="Least developed countries remain on the sidelines of fast-growing digitally deliverable services" />
            </div>
            <div className="text_content">
              <p>Moreover, digitally deliverable exports are concentrated in a handful of countries, led by Bangladesh, Ethiopia, Senegal, Nepal, Cambodia and Uganda, and in narrow categories such as telecommunications, computer services and professional consulting.</p>
              <p>Barriers operate both internationally and domestically.</p>
              <ul>
                <li>Abroad, restrictive visa regimes and the non-recognition of qualifications limit the movement of service suppliers from LDCs.</li>
                <li>At home, weak regulation and limited competition constrain productivity and export capacity.</li>
              </ul>
              <p>Where policies have been targeted, progress has followed. ICT parks and skills programmes in Bangladesh, investment in broadband and innovation in Rwanda and partial liberalization of logistics and telecommunications in Ethiopia show how policy support can lower entry barriers – even if employment effects remain modest.</p>
              <p>The message is clear. Without diversification, productivity gains and supportive trade and regulatory frameworks, LDC services exports will remain vulnerable and their impact limited.</p>
            </div>
          </div>
        </div>
        <ScrollingText texts={['What strategies are LDCs using to build services sectors – and with what results? ']} chapter_text="Chapter 4" />
        <div className="content_container chapter_header_4" ref={chapter4Ref}>
          <div className="text_container">
            <ChapterHeader
              chapter_number="4"
              subtitle=""
              title={chapterTitles[3]}
            />
            <div className="download_buttons_container">
              <a href="https://unctad.org/system/files/official-document/ldc2025ch4_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="chapter_download" aria-label="Download Chapter 4" rel="noreferrer">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/2025ldc_chapter4.jpg" /></div></div>
            <div className="text_content">
              <p className="large">Least developed countries (LDCs) are increasingly adopting “hub” strategies, concentrating investment and policy support in specific services or locations.</p>
              <p>Most focus on logistics hubs. While these can boost competitiveness and fiscal revenues, their capital-intensive nature limits direct employment. Sectors with stronger job potential – such as technology, tourism and business process outsourcing – remain less common.</p>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="uFQKo" title="Least developed countries prioritize logistics hubs" />
            </div>
            <div className="text_content">
              <p> The report highlights several examples.</p>
              <ul>
                <li>The expansion of the Port of Maputo in Mozambique: a $600 million investment is expected to raise capacity by nearly 90%, delivering sizeable gains for GDP and public revenues but only modest job creation relative to its scale.</li>
                <li>Similar patterns are seen in Djibouti and Togo.</li>
                <li>In Cambodia, logistics upgrading has supported manufacturing and tourism, but most jobs were created outside the logistics sector through spillovers.</li>
              </ul>
              <p>Tourism contributes more than 5% of GDP in most LDCs, yet high revenues do not automatically translate into jobs or value retention. Infrastructure gaps, weak connectivity and reliance on narrow source markets – as seen in Madagascar and Malawi – limit its impact on employment and transformation.</p>
            </div>
            <div className="charts_container">
              <DwChartContainer chart_id="n2bhH" title="Tourism’s economic weight is not always reflected in employment in least developed countries" />
            </div>
            <div className="text_content">
              <p>Only a few LDCs, notably Rwanda and Senegal, are actively pursuing hub strategies in financial services and ICT-enabled activities. Bangladesh stands out in business process outsourcing but is dominated by freelancing.</p>
              <p>The risks are significant. Services hub strategies can be costly and potentially deepen debt vulnerabilities at a time when around half of LDCs are already in debt distress. They do not automatically generate highquality jobs or contribute to the development of the productive capabilities necessary to move into highervalue activities.</p>
              <p>The message is clear. Without strategic policy design grounded in realistic expectations, services hubs are unlikely to deliver transformative economic progress.</p>
            </div>
          </div>
        </div>
        <ScrollingText texts={['What’s needed for services to deliver transformation in LDCs?']} chapter_text="Chapter 5" />
        <div className="content_container chapter_header_5" ref={chapter5Ref}>
          <div className="text_container">
            <ChapterHeader
              chapter_number="5"
              subtitle=""
              title={chapterTitles[4]}
            />
            <div className="download_buttons_container">
              <a href="https://unctad.org/system/files/official-document/ldc2025ch5_en.pdf" target="_blank" onClick={(event) => downloadDocument(event)} type="button" className="chapter_download" aria-label="Download Chapter 4" rel="noreferrer">Download</a>
            </div>
            <div className="media_container"><div className="image_container"><ParallaxImage src="assets/img/2025ldc_chapter5.jpg" /></div></div>
            <div className="text_content">
              <p className="large">Services are not a shortcut to development. They support structural transformation and competitiveness only when they raise productivity and are closely linked to the rest of the economy. When services expand in isolation, they fail to deliver broad-based transformation.</p>
              <p>Closing the digital divide is essential for least developed countries (LDCs) to compete in modern services. Access gaps, skills shortages and infrastructure deficits limit participation in fast-growing digitally deliverable services and risk widening trade deficits. The report underscores the need for investment in ICT infrastructure, reliable energy and human capital.</p>
              <p>Services growth translates into better jobs only when workers and firms can move into higher value-added activities.</p>
              <p>Governments are encouraged to invest in:</p>
              <ul>
                <li>Capacity-building and vocational training</li>
                <li>Innovation hubs and incubators</li>
                <li>Targeted programmes for women and rural communities.</li>
              </ul>
              <p>Practical examples include </p>
              <ul>
                <li>Rwanda’s Digital Ambassadors Programme </li>
                <li>Malawi’s mHub supporting women-led businesses.</li>
              </ul>
              <p>Trade and investment policies also need to actively support services exporters, especially small and medium-sized firms. Better export promotion and finance designed for services – where activities are intangible and firms often lack physical collateral – can help them grow and compete internationally.</p>
              <p>Regional integration can help overcome small domestic markets, provided LDCs retain policy flexibility. Cross-border links – such as Bangladesh and Myanmar’s access to the Indian market, or Cambodia and Lao People’s Democratic Republic’s participation in Mekong tourism circuits – illustrate the potential.</p>
              <p>At the multilateral level, joint action is critical. Extending the World Trade Organization services waiver for LDCs beyond 2030 and aligning preferences with real supply capacities could help turn services trade into a genuine development tool.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
