import React from 'react'

import CaesarCipherWidget from '../components/CaesarWidget';
import CaesarBreakWidget from '../components/CaesarBreakWidget'
import { caesarText } from './cipherTexts'
import { encipher } from '../ciphers/caesar'
import SteganographyWidget from '../components/SteganographyWidget'
import NextChapterLink from '../components/NextChapterLink'
import NavigationContainer from '../components/NavigationContainer/index'
import CcBySa from '../components/CreativeCommons'
import NewTabLink from '../components/NewTabLink'


export default function ChapterOne() {
  return (
<NavigationContainer linkForward='/2' level={1}>
<article>
<h1>
  <span>Історія таємного письма: <br/></span>
  <span>як зберегти свої секрети <br/></span>
  <span>і викрасти чужі</span>
</h1>

<summary className="main-text">
  <p>
    Сивочолі мужі минулого зрекли немало гарних слів про секрети. Більшість із
    них зводиться до двох порад:
    по-перше, своїх таємниць не слід довіряти навіть найближчим друзям,
    по-друге, взагалі ліпше їх не заводити (секрети, не друзів).
  </p>
  <p>
    Але, сивочолі мужі, як же бути з паролем до Інстаграму чи Твіттеру?
    Хоч ці сервіси&nbsp;— не наші найрідніші друзі,
    а треба повідомляти їм свій секретний пароль при кожному вході.
    Багато таємниць створені саме для того, щоби ними ділитися,
    і часто це доводиться робити письмово.
    Тому люди придумали безліч хитрих методів писати так, щоб повідомлення зрозуміли тільки ті,
    кому воно адресоване.
    Та охочих бути в курсі чужих таємниць теж не бракувало,
    і вони додумалися, як обхитрити ці хитрі методи.
    Тоді інші вигадали ще хитріші методи. Тоді їх перемогли ще хитрішими способами…
    Такі змагання «хто кого» тривають і досі.
  </p>
  <p>
    У&nbsp;цій статті ти познайомишся із кількома історичними методами таємного письма,
    дізнаєшся, як вони працюють, хто їх використовував, і найважливіше&nbsp;— де їхні
    слабкі місця, по яких можна завдати руйнівного удару.
  </p>
</summary>

<p className="main-text">
  Давним-давно, за півтисячоліття до нашої ери, одному колишньому мілетському тирану на ім’я Гістіей
  треба було послати таємне повідомлення своєму небожеві Аристагору,
  щоби підбурити того до повстання.
  Справа нехитра, взяв він свого найвідданішого раба,
  поголив йому голову, витатуював там те, що хотів сказати,
  зачекав, поки волосся відросте, і послав його у подорож на кілька тисяч кілометрів.
  Добравшися до Аристагора, раб сказав, так і так, я від Гістіея, поголи мені голову.
  Це був один із перших задокументованих випадків успішної передачі секретного послання.
</p>

<div className="command">
  <p className="command__phrase">
    Клацни і совгай мишкою, щоб стерти зачіски цих греків і побачити таємний діалог на їхніх головах.
  </p>

  <SteganographyWidget width={800} />
  <p className="media-attribution">
    Зображення створено на основі <NewTabLink
      href="https://commons.wikimedia.org/w/index.php?title=File%3ABerl%C3%ADn_Pistoxenos.TIF&page=1">
      фотографії
    </NewTabLink> Miguel Hermoso Cuesta (<CcBySa/>)
  </p>
</div>

<p className="main-text">
  У Гістіеєвого методу багато недоліків, особливо добре їх, певне, відчув той раб.
  А з технічного боку найбільша його слабкість в тому,
  що він намагається приховати не зміст послання, а сам факт його існування.
  Щоб метод спрацював, треба було, аби вороги Гістіея не здогадалися,
  що секретний напис&nbsp;— на голові посланця.
  У багатьох випадках вдавати, що ніякого таємного листування не відбувається&nbsp;— не варіант.
  Тому слід зробити так, щоб навіть, якщо вороги доберуться до листа,
  вони не змогли його зрозуміти.
  Іншими словами, текст треба <em>зашифрувати</em>&nbsp;— перетворити його в якусь тарабарщину,
  яку зможе прочитати тільки людина, яка має секретний ключ.
</p>

<h2>Шифр Цезаря</h2>

<p className="main-text">
  Подивімося крок за кроком, як працює шифрування.
  Поточні досягнення <em>криптографії</em>&nbsp;— науки про секретний обмін інформацією&nbsp;— надзвичайно складні,
  тому почнемо з простого древнього методу&nbsp;— шифру Цезаря.
  Його використовував, звичайно, Цезар&nbsp;— правитель Стародавнього Риму.
  Скажімо, одного дня він вирішив повідомити оратору й адвокату Цицеронові таке:
  <span className='msg-quote'> «Прочитав твою книжку&nbsp;— чудово написано!»</span>.
  Він бере цей текст, і кожну букву в ньому заміняє на ту,
  що стоїть в алфавіті на три позиції далі від неї: А&nbsp;— на Г, Б&nbsp;—&nbsp;на Ґ і так далі;
  третя з кінця буква Ь заміниться на першу&nbsp;— А, так наче абетка замкнена у коло.
</p>

<div className="command">
  <p className="command__phrase">
    Вистав число 3 у полі «ключ», щоб побачити, як виглядає Цезареве повідомлення зашифрованим.
  </p>

  <CaesarCipherWidget title='Метод Цезаря: Шифрування'
    text='прочитав твою книжку&nbsp;— чудово написано!'
    successKey={3} />
</div>


<p className="main-text">
  Тепер Цезар може надіслати цю безглузду тарабарщину Цицерону.
  Але той не розгубиться, бо знає, чого чекати від Цезаря.
  Він може провести зворотну операцію&nbsp;— взяти кожну літеру зашифрованого тексту
  і зсунути її в абетці на три позиції назад.
  Так він отримає початкове повідомлення і втішиться, що Цезар високо оцінив його книжку.
  Свою відповідь він може зашифрувати тим самим способом.
</p>

<div className="command">
<p className="command__phrase">
  Використай ключ 3, щоб прочитати Цицеронову відповідь.
</p>

<CaesarCipherWidget title='Метод Цезаря: Розшифрування'
  text='жвнцб, в фхгугдфв' successKey={3} reverse />
</div>

<p className="main-text">
  Початкове повідомлення, як-то <span className='msg-quote'>«Прочитав твою книжку&nbsp;— чудово написано!»</span>,
  називається <em>відкритим текстом</em>, зашифроване&nbsp;— <em>шифротекстом</em>.
  Послідовність дій, яку треба виконати,
  щоби перетворити перше повідомлення, у друге звуть <em>алгоритмом шифрування</em>.
  Крім самого тексту, він використовує <em>ключ</em>&nbsp;— у цьому випадку число три.
  Ключ може змінюватися без зміни алгоритму, наприклад, якби Цезар шифрував ключем 5,
  то всі букви слід було би зсовувати на п’ять позицій в алфавіті.
  Отримувач повідомлення, щоби прочитати його,
  повинен знати ключ і <em>алгоритм розшифрування</em>&nbsp;—
  послідовність дій, зворотну до шифрування.
  Пару алгоритмів шифрування/дешифрування називають <em>шифром</em>.
</p>

<p className="main-text">
  Отже, двоє людей, які хочуть таємно переписуватися, мають зустрітися,
  домовитися про шифр і ключ, а тоді вже спокійно обмінюватися засекреченими листами, коли треба.
  Звісно, ключ слід тримати у найстрогішій таємниці.
  Краще, щоб вороги не знали також і про вибраний шифр.
  Але якщо він надійний, то це знання не повинно допомогти їм докопатися до суті повідомлення.
  Єдиним ключем до розшифрування має бути, власне, ключ.
</p>

<p className="main-text">
  Шифр Цезаря&nbsp;— ненадійний. Щоб розгадати його,
  зловмисникам вистачить мінімальних знань з <em>криптоаналітики</em>&nbsp;—
  розділу криптографії про злом шифрів, або навіть просто клепки в голові.
  Це тому, що шифр Цезаря можна атакувати найпростішим способом&nbsp;— <em>«грубою силою»</em>.
  Для цього слід узяти всі можливі ключі і пробувати кожен підряд,
  поки не вийде щось схоже на людську мову.
  Варіантів не так вже й багато&nbsp;— на один менше, ніж довжина абетки.
  Навіть вручну&nbsp;— це раз плюнути, а з допомогою комп’ютера&nbsp;— то як плюнути одну тисячну разу.
</p>

<div className="command">
  <p className="command__phrase">
    Спробуй підібрати ключа до такого тексту:
  </p>

  <CaesarBreakWidget title='Метод Цезаря: Злом' text={encipher(5, caesarText.toLowerCase())}
    successKey={5} />
</div>

<NextChapterLink keyword="одноалфавіт" link="/2" level={1}/>
</article>
</NavigationContainer>
)}