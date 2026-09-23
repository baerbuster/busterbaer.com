import { useState } from 'react'
import './App.css'
import Logo from './Logo'
import thinker from './assets/thinker.png'
import guide from './assets/exclaimer.png'
import family from './assets/Family.JPG'
import Typewriter from './Typewriter'
import script from './script'

function App() {
  const [hideGuide, sethideGuide] = useState(true)
  const speakerSpeed = 50
  const dialogueSpeed = 20
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const showSubmit = !hideGuide && script[index].speaker === 'Visitor:'

  function clickThinker() {
    sethideGuide(!hideGuide)
  }

  function clickGuide() {
    sethideGuide(!hideGuide)
    setIndex(0)
    setAnswers({})
  }

  function clickDialogue() {
    if (index < script.length - 1 && script[index].speaker === 'Aporius:') {
      setIndex(index + 1)
    }
  }

  function clickSubmit() {
    for (let i = 0; i < script[index].control.length; i++) {
      if (!answers[script[index].control[i].token]) {
        return
      }
    }
    if (index < script.length - 1 && script[index].speaker === 'Visitor:') {
      setIndex(index + 1)
    }
  }

  function answerSetter(token, value) {
    setAnswers({ ...answers, [token]: value })
  }

  function printDialogue() {
    const entry = script[index]
    const visitorStuff = []

    if (!entry.control) {
      return (
        <Typewriter
          text={fillTokens(entry.text)}
          speed={dialogueSpeed}
          delay={entry.delay + entry.speaker.length * speakerSpeed}
          key={index}
        />
      )
    }
    for (let i = 0; i < entry.control.length; i++) {
      if (entry.control[i].words) {
        visitorStuff.push(<span key={'words' + i}>{entry.control[i].words}</span>)
      }

      if (entry.control[i].type === 'number') {
        visitorStuff.push(
          <input
            key={i}
            type="number"
            value={answers[entry.control[i].token] || ''}
            onChange={event => answerSetter(entry.control[i].token, event.target.value)}
          ></input>
        )
      } else {
        const optionsList = []
        optionsList.push(
          <option key="blank" value="">
            ???
          </option>
        )
        for (let j = 0; j < entry.control[i].options.length; j++) {
          optionsList.push(
            <option key={j} value={entry.control[i].options[j]}>
              {entry.control[i].options[j]}
            </option>
          )
        }
        visitorStuff.push(
          <select
            key={i}
            value={answers[entry.control[i].token] || ''}
            onChange={event => answerSetter(entry.control[i].token, event.target.value)}
          >
            {optionsList}
          </select>
        )
      }
    }
    return visitorStuff
  }

  function fillTokens(text) {
    let filled = text
    const all = { ...answers, ...calculateStoic() }
    const tokens = Object.keys(all)

    for (let i = 0; i < tokens.length; i++) {
      filled = filled.replaceAll('{' + tokens[i] + '}', all[tokens[i]])
    }
    return filled
  }

  function calculateStoic() {
    const seasons_left = answers.deathAge - answers.age
    let time_scalar
    if (answers.time_unit === 'day') {
      time_scalar = 1
    } else if (answers.time_unit === 'week') {
      time_scalar = 1 / 7
    } else if (answers.time_unit === 'month') {
      time_scalar = 1 / 31
    } else if (answers.time_unit === 'year') {
      time_scalar = 1 / 365
    }
    const num_seasons_spent = Math.round((answers.hours * seasons_left * 365 * time_scalar) / (365 * 24))
    return { seasons_left: seasons_left, num_seasons_spent: num_seasons_spent }
  }

  return (
    <section className="App-root">
      <header className="App-header">
        <div className="App-logo-sec">
          <Logo />
          <div>
            {' '}
            Buster Baer's <br /> Digital Museum
          </div>
        </div>
        <nav className="App-nav">
          <ul>
            <li>
              Inventions <br />
              <div className="App-nav-arrow">{'\u2190'}</div>
            </li>
            <li>
              Research <br />
              <div className="App-nav-arrow">{'\u2190'}</div>
            </li>
            <li>
              Humanities <br />
              <div className="App-nav-arrow">{'\u2192'}</div>
            </li>
            <li>
              Community <br />
              <div className="App-nav-arrow">{'\u2192'}</div>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9">
                Resume
                <br />
                <div className="App-nav-arrow">{'\u2192'}</div>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="App-main">
        <div className="App-main-floor"></div>
        <div>
          <div className="App-main-hall App-main-hall-1"></div>
          <div className="App-main-hall App-main-hall-2"></div>
          <div className="App-main-hall App-main-hall-3"></div>
        </div>
        <div>
          <div className="App-main-window-border App-main-window-1-border"></div>
          <div className="App-main-window App-main-window-1"></div>
          <div className="App-main-window-border App-main-window-2-border"></div>
          <div className="App-main-window App-main-window-2"></div>
          <div className="App-main-window-border App-main-window-3-border"></div>
          <div className="App-main-window App-main-window-3"></div>
        </div>
        <div className="App-main-pedestal">
          <div className="App-main-pedestal-front"></div>
          <div className="App-main-pedestal-top-border"></div>
          <div className="App-main-pedestal-top"></div>
        </div>
        <img
          src={thinker}
          className={hideGuide ? 'App-main-thinker' : 'App-main-thinker App-main-thinker-hidden'}
          onClick={clickThinker}
        />
        <div className="App-main-sign">
          <div className="App-main-sign-bottom"></div>
          <div className="App-main-sign-post"></div>
          <div className="App-main-sign-backing"></div>
          <div className="App-main-sign-signage">DO NOT CLICK</div>
        </div>
      </main>

      <footer className="App-footer">
        <div className="App-footer-col-1">
          <div className="App-footer-col-1-top">
            <ul>
              <li>
                <div className="App-footer-question">?</div>
                <div className="App-footer-light App-footer-text-dark">
                  <h3>What is the Electric Cool Jelly Digital Museum?</h3>
                </div>
                <ul className="App-footer-item">
                  <li className="justify">
                    The ECJDM is home to the works of Buster Baer. The installations explore everything from programming
                    to art and writing. The ECJDM is committed to introducing you to life on this planet through
                    interactive and educational isntallations.
                  </li>
                  <li className="spacer"></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="App-footer-col-1-mid">
            <ul>
              <div>
                <li>
                  <ul className="App-footer-item">
                    <li className="push-left">Hours of Operation:</li>
                    <li className="push-right">Right Now - Right Then</li>
                  </ul>
                </li>
                <li>
                  <ul className="App-footer-item">
                    <li className="push-left">Admission:</li>
                    <li className="push-right">Suspension of Disimagination</li>
                  </ul>
                </li>
                <li>
                  <ul className="App-footer-item">
                    <li className="push-left">Rules:</li>
                    <li className="push-right">You must read this rule list</li>
                  </ul>
                </li>
              </div>
            </ul>
          </div>
          <img src={family} className="App-footer-family" />
        </div>
        <div className="App-footer-col-2">
          <div className="App-footer-col-2-top">
            <h3>Buster Baer: Founder, Proprietor, and Director</h3>
            <ul>
              <li>
                <ul className="App-footer-item">
                  <li className="push-left">Contact:</li>
                  <li className="push-right">Baerbuster@gmail.com</li>
                </ul>
              </li>
              <li>
                <ul className="App-footer-item">
                  <li className="push-left">Links:</li>
                  <li className="push-right">
                    <ul className="App-footer-item">
                      <li>Github</li>
                      <li>LinkedIn</li>
                      <li>Spotify</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="App-footer-item">
                  <li className="push-left">Colophon:</li>
                  <li className="push-right">
                    <ul className="App-footer-item">
                      <li>JSX + React</li>
                      <li>Vite</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="App-footer-col-2-bottom">
            <div className="App-footer-col-2-bottom-text">© Electric Cool Jelly 2026</div>
          </div>
        </div>
        <div className="App-footer-col-3">
          <div></div>
        </div>
      </footer>
      <div>
        <img src={guide} className={hideGuide ? 'App-guide App-guide-tucked' : 'App-guide'} onClick={clickGuide} />
        <div
          className={hideGuide ? 'App-dialogue-box App-dialogue-box-hidden' : 'App-dialogue-box'}
          onClick={clickDialogue}
        >
          <div className={hideGuide ? 'App-dialogue-speaker App-dialogue-speaker-hidden' : 'App-dialogue-speaker'}>
            {!hideGuide && (
              <Typewriter text={script[index].speaker} speed={speakerSpeed} delay={script[index].delay} key={index} />
            )}
          </div>
          <div className={hideGuide ? 'App-dialogue-dialogue App-dialogue-dialogue-hidden' : 'App-dialogue-dialogue'}>
            {!hideGuide && printDialogue()}
            <div
              className={showSubmit ? 'App-dialogue-submit' : 'App-dialogue-submit App-dialogue-submit-hidden'}
              onClick={clickSubmit}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
