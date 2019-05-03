import React from 'react'

import { placeWithinRange } from '../../ciphers/mathHelpers'


const Hints = [
  {
    text: <p></p>,
    conditions: {},
  },
  {
    text: (<p>
      Почнемо із трьох найпоширеніших символів, у шифротексті це
      <span className="cipher-widget__text" > $</span>,
      <span className="cipher-widget__text" > %</span>,
      <span className="cipher-widget__text"> @</span>.
      Кожен з них займає приблизно 9% тексту, а наступний
      <span className="cipher-widget__text"> h</span> суттєво менш поширений (~6.5%).
      Схожу закономірність бачимо і в нижньому рядку, три найчастіші букви — голосні
      <span className="cipher-widget__text_plain"> А</span>,
      <span className="cipher-widget__text_plain"> О</span>,
      <span className="cipher-widget__text_plain"> И</span>.
      Поширення букв у тексті-зразку і шифротексті точно трохи відрізняється, але навряд чи настільки сильно,
      щоби якась з цих голосних опинилася на четвертому чи дальшому місці, тому зараз потрібно лише
      знайти відповідність між
      <span className="cipher-widget__text" > $</span>,
      <span className="cipher-widget__text" > %</span>,
      <span className="cipher-widget__text"> @ </span>
      з одного боку і
      <span className="cipher-widget__text_plain"> А</span>,
      <span className="cipher-widget__text_plain"> О</span>,
      <span className="cipher-widget__text_plain"> И </span>
      з іншого. На щастя, ми знаємо, що
      слова в українській мові не починаються з букви И.
      Також може стати в пригоді припущення, що драматичний вигук «О» у цьому тексті не дуже ймовірний,
      а от сполучник «а» — цілком.
    </p>
  ),
  conditions: {'$': 'и', '%': 'а', '@': 'о'}
  },
  {text: (<p>
    Просуваємося далі списком найпоширеніших символів, наступний на черзі
    <span className="cipher-widget__text"> h</span>.
    Розгадати, що це за буква допоможе слово
    <span className="cipher-widget__text"> hh</span>
    <span className="cipher-widget__text_plain">А</span>
    <span className="cipher-widget__text">w</span>
    <span className="cipher-widget__text_plain">А</span>
    <span className="cipher-widget__text">h^v </span>
    у передостанньому рядку.
    Серед букв зі схожою частотою у тексті-зразку (
    <span className="cipher-widget__text_plain">т</span>,
    <span className="cipher-widget__text_plain"> н</span>,
    <span className="cipher-widget__text_plain"> і</span>,
    <span className="cipher-widget__text_plain"> в</span>,
    <span className="cipher-widget__text_plain"> р</span>,
    <span className="cipher-widget__text_plain"> с</span>) тільки одна
    подвоюється на початку слова.
  </p>),
  conditions: {h: 'в'}
  },
  {text: (
    <p>
      Також ми маємо достатньо інформації, щоби відгадати символ
      <span className="cipher-widget__text"> j </span> (9-ий за поширенням).
      Він входить до складу таких слів з двох букв, як
      <span className="cipher-widget__text"> j</span><span className="cipher-widget__text_plain">И</span> і
      <span className="cipher-widget__text"> j</span><span className="cipher-widget__text_plain">А </span>
      , тому може бути приголосною
      <span className="cipher-widget__text_plain"> т</span>,
      <span className="cipher-widget__text_plain"> б</span>,
      <span className="cipher-widget__text_plain"> г</span> або
      <span className="cipher-widget__text_plain"> х</span>. Одна з них значно ймовірніша за інші.
    </p>),
  conditions: {j: 'т'}
  },
  {
    text: (<p>
      Тепер майже 40% шифротексту розгадано, тому ти можеш бачити довші слова, які
      нагадують щось людське, наприклад
      <span className="cipher-widget__text_plain"> ВИ</span>
      <span className="cipher-widget__text">k</span>
      <span className="cipher-widget__text_plain">О</span>
      <span className="cipher-widget__text">z</span>
      <span className="cipher-widget__text_plain">И</span>
      <span className="cipher-widget__text">^</span>
      <span className="cipher-widget__text_plain">ТОВ</span>
      <span className="cipher-widget__text">g</span>
      <span className="cipher-widget__text_plain">ВАТИ</span>
      . Можеш відгадати, що криється за
      символами
      <span className="cipher-widget__text"> k</span>,
      <span className="cipher-widget__text"> z</span>,
      <span className="cipher-widget__text"> ^</span>,
      <span className="cipher-widget__text"> g</span>?
    </p>),
    conditions: {k: 'к', z: 'р', '^': 'с', g: 'у'}
  },
  {
    text: (<p>
      Наступне майже розгадане слово
      <span className="cipher-widget__text_plain"> КРИ</span>
      <span className="cipher-widget__text">o</span>
      <span className="cipher-widget__text_plain">ТОА</span>
      <span className="cipher-widget__text">a</span>
      <span className="cipher-widget__text_plain">А</span>
      <span className="cipher-widget__text">in</span>
      <span className="cipher-widget__text_plain">ТИК</span>. Це ти зараз.
    </p>),
    conditions: {o: 'п', a: 'н', i: 'л', n: 'і'}
  },
  {
    text: (<p>
      Тепер уже зачіпок так багато, що очі розбігаються. Але, якщо не хочеш їх усі
      впольовувати, просто клацай далі, щоби побачити повний ключ.
    </p>)
  }
]


function getViolatedConditions(hintConditions, substDict) {
  const violated = {}
  for (let [key, val] of Object.entries(hintConditions)) {
    if (!(key in substDict) || (substDict[key] !== val)) {
      violated[key] = val
    }
  }
  return violated
}


function mergeHintCondsTill(hintIndex) {
  return Hints.slice(0, hintIndex + 1)
    .map(hint => hint.conditions)
    .reduce((acc, conds) => ({...acc, ...conds}), {})
}


function getHintButtonClasses(inactive) {
  const defualtClass = 'cipher-widget__hint-button'
  return inactive? defualtClass + ' cipher-widget__hint-button_inactive' : defualtClass
}


function Conditions(conditions) {
  const conds = Object.entries(conditions).map(
    ([key, val], index) => <React.Fragment key={key}>
      <span className="cipher-widget__text">{key}</span> -> <span className="cipher-widget__text_plain">{val + ' '}</span>
    </React.Fragment>
  )
  return <div className="cipher-widget__violated-conds">{conds}</div>
}

function HintWarning() {
  return <div className='cipher-widget__hint-warning'>
    Кожна наступна підказка спирається на всі попередні. Спершу дорозгадай цю.
  </div>
}


export default class HintContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hintIndex: 0,
      showWarning: false,
      showUnmetConditions: false,
    }

    this.showNextHint = this.showNextHint.bind(this)
    this.startShowingUnmetConds = this.startShowingUnmetConds.bind(this)
  }

  startShowingUnmetConds() {
    this.setState({showUnmetConditions: true})
  }

  showNextHint(increment) {
    const hintIndex = placeWithinRange(
      this.state.hintIndex + increment, 0, Hints.length - 1
    )
    if (hintIndex - this.state.hintIndex > 0) {
      const substDict = this.props.substDict
      const hintConidtions = mergeHintCondsTill(this.state.hintIndex)
      const violated = getViolatedConditions(hintConidtions, substDict)
      if (Object.keys(violated).length) {
        this.setState({showWarning: true})
        return
      }
    }
    this.setState({
      hintIndex: hintIndex,
      showWarning: false,
      showUnmetConditions: false,
    })
  }

  render() {
    const violatedConditions = getViolatedConditions(
      mergeHintCondsTill(this.state.hintIndex),
      this.props.substDict
    )
    const condsViolated = Object.keys(violatedConditions).length
    const violatedConditionsEl = this.state.showUnmetConditions
    ? Conditions(violatedConditions)
    : null
    return (
    <div className="cipher-widget__text_hint">
      <div className='cipehr-widget__hint-controls'>
        <button className={getHintButtonClasses(!(this.state.hintIndex > 0))} onClick={e => this.showNextHint(-1)}>{'<'}</button>
        <button className={getHintButtonClasses()} onClick={e => this.showNextHint(1)}>Мені потрібна підказка ></button>
        {this.state.showWarning && condsViolated? <HintWarning/> : null}
      </div>
      {Hints[this.state.hintIndex].text}
      {this.state.hintIndex
        ? <>
            <button className={getHintButtonClasses(!condsViolated || this.state.showUnmetConditions)}
              onClick={this.startShowingUnmetConds}>
              Показати потрібні заміни
            </button>
            {violatedConditionsEl}
          </>
        : null}
    </div>
    )
    }
}

