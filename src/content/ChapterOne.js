import React from 'react'

import CaesarCipherWidget from '../components/CaesarWidget';
import CaesarBreakWidget from '../components/CaesarBreakWidget'
import { caesarText } from './cipherTexts'
import { encipher } from '../ciphers/caesar'

export default function ChapterOne() {
  return (
<article>
<h1>Історія таємного письма: як зберегти свої секрети і викрасти чужі</h1>

<summary>
  Більшість авторів красивих цитат, сивочолих мужів минулого,
  пропонують нам дві поради про секрети:
  по-перше, не довіряти їх навіть найближчим друзям,
  по-друге, взагалі їх не мати.
  Але, сиволочолі мужі, як же бути з паролем до Інстраграму чи Твіттеру?
  Хоч ці сервіси й не є нашими найлішпими друзями,
  а треба повідомляти їм свій секретний пароль при кожному вході.
  Багато таємниць створені саме для того, щоби ділилися ними з кимось конкретним
  і часто це доводиться робити письмово.
  Тому люди придумали багато хитрих методів,
  як писати так, щоб зрозуміли тільки ті, кому повідомлення адресоване.
  Та охочих бути в курсі чужих таємниць теж не бракувало,
  тому вони додумалися, як обхитрити ці хитрі методи.
  Тоді вигадали ще хитріші методи. Тоді їх перемогли ще хитрішими способами.
  Такі змагання «хто кого» не припинилися і досі.
  У цій статті ми познайомимося із кількома історичними методами таємного письма,
  виявимо їхні слабкі місця, і, як справжні негідники, відразу ж нанесемо по них удар.
</summary>

<p>
  Давним давно, за півтисячоліття до нашої ери, одному чоловікові на ім’я Гістіей
  треба було послати таємне повідомлення своєму небожеві Аристагору,
  щоби підбурити того до повстання.
  Справа нехитра, взяв він свого найвідданішого раба,
  поголив йому голову, витатуював там те, що хотів сказати,
  зачекав, поки волосся відросте і послав його у подорож на кілька тисяч кілометрів.
  Добравшися до Аристагора раб сказав, так і так, я від Гістіея, поголи мені голову.
  Це був один із перших задокументованих випадків успішної передачі секретного послання.
</p>

<p>{'<поголи голову посланцеві>'}</p>

<p>
  У Гістіеєвого методу багато недоліків, особливо добре їх, певне, відчув той раб.
  А з технічного боку, найбільша його слабкість в тому,
  що він намагається приховати не зміст послання, а сам факт його існування.
  Вороги Гістісея мали би просто не здогадатися, що секретний напис — на голові посланця.
  У багатьох випадках вдавати, що ніякої секретної переписки не відбувається — не варіант.
  Тому треба зробити так, щоб навіть, якщо вороги доберуться до листа,
  вони не змогли його зрозуміти.
  Іншими словами, текст треба <em>зашифрувати</em> — перетворити його в якусь тарабарщину,
  яку зможе прочитати тільки людина, яка має секретний ключ.
</p>

<h2>Цезарів шифр</h2>

<p>
  Подивімося крок за кроком, як працює шифрування.
  Але поточні досягнення криптографії — науки про секретний обмін інформацією — надзвичайно складні,
  тому почнемо з простого древнього методу — шифру Цезаря.
  Його використовував Цезар — правитель Стародавнього Риму.
  Скажімо, одного дня він вирішив повідомити оратору й адвокату Цицеронові таке:
  «Прочитав твою книжку — чудово написано!».
  Він бере цей текст, і кожну букву в ньому заміняє на ту,
  що стоїть в алфавіті на три позиції далі від неї: А — на Г, Б — на Ґ і так далі;
  третя з кінця буква Ь заміниться на першу — А, так наче абетка замкнена у коло.
</p>

<p className="command">
  Вистав число 3 у полі «ключ», щоб побачити, як виглядає Цезареве повідомлення зашифрованим.
</p>

<CaesarCipherWidget title='Метод Цезаря: Шифрування'
text='прочитав твою книжку — чудово написано!' />

<p>
  Тепер Цезар може надіслати цю безглузду тарабарщину Цицерону.
  Але той не розгубиться, бо знає, чого чекати від Цезаря.
  Він може провести зворотну операцію — взяти кожну літеру зашифрованого повідомлення
  і зсунути її в абетці на три позиції назад.
  Так він отримає початкове повідомлення і втішиться, що Цезар так високо оцінив його книжку.
  Свою відповідь він може зашифрувати тим самим способом.
</p>
<p className="command">
  Використай ключ 3, щоб прочитати Цицеронову відповідь.
</p>

<CaesarCipherWidget title='Метод Цезаря: Розшифрування'
  text='жвнцб, в фхгугдфв' reverse />

<p>
  Початкове повідомлення, як то «Прочитав твою книжку — чудово написано!»,
  називається <em>відкритим текстом</em>, зашифоване — <em>шифротекстом</em>.
  Послідовність дій, яку треба виконати,
  щоби перетворити перше повідомлення у друге звуть <em>алгоритмом шифрування</em>.
  Крім самого тексту він використовує <em>ключ</em> — у цьому випадку число три.
  Ключ може змінюватися без зміни алгоритму, наприклад, якби Цезар шифрував ключем 5,
  то всі букви слід було би зсовувати на п’ять позицій в алфавіті.
  Отримувач повідомлення, щоби прочитати його,
  повинен знати ключ і <em>алгоритм розшифрування</em> —
  послідовність дій зворотну до шифрування.
  Пару алгоритмів шифрування/дешифрування називають <em>шифром</em>.
</p>

<p>
  Отже двоє людей, які хочуть таємно переписуватися, мають зустрітися,
  домовитися про шифр і ключ, а тоді вже спокійно обмінюватися засекреченими листами, коли треба.
  Звісно, ключ слід тримати у найстрогішій таємниці.
  Краще, щоб вороги не знали також і про вибраний шифр.
  Але якщо він надійний, то це знання не повинно допомогти їм докопатися до суті повідомлення.
  Єдиним ключем до розшифрування має бути, власне, ключ.
</p>

<p>
  Шифр Цезаря — не надійний.
  Зловмисникам вистачить наймінімальніших знань з криптоаналітики —
  розділу криптографії про злом шифрів, або навіть просто клепки в голові, щоб розгадати його.
  Це тому, що шифр Цезаря можна атакувати найпростішим способом — <em>«грубою силою»</em>.
  Для цього слід узяти всі можливі ключі і пробувати кожен по порядку,
  поки не вийде щось схоже на людську мову.
  Варіантів не так вже й багато — на один менше, ніж довжина абетки.
  Навіть вручну — це раз плюнути, а з допомогою комп’ютера, то як плюнути одну тисячну разу.
</p>
<p className="command">
  Спробуй підібрати ключа до такого тексту:
</p>

<CaesarBreakWidget title='Метод Цезаря: Злом' text={encipher(19, caesarText.toLowerCase())} />
</article>
)}