import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Lang = 'ru' | 'en' | 'fr' | 'zh';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const KB: Record<Lang, Record<string, string[]>> = {
  ru: {
    "привет": ["Привет! Чем могу помочь?","Здравствуйте! Спрашивайте","Добрый день! Я здесь","Привет! Рад тебя видеть!","Приветствую, друг!","Хай! Как настроение?","Привет, давай поболтаем","Привет из цифрового мира!"],
    "здравствуйте": ["Здравствуйте! Чем могу помочь?","Добрый день! Рад вас видеть","Рад приветствовать!","Здравствуйте, жду ваших вопросов","Мои нейросети готовы к диалогу!"],
    "как дела": ["Отлично! А у вас как?","Всё хорошо, спасибо! Работаю в штатном режиме","Лучше всех! Жду новых вопросов","Прекрасно! Нейросети не болеют)","Всё пучком! Сам как?"],
    "как настроение": ["Настроение отличное! А у вас?","Боевое! Готов отвечать","Позитивное! Как погода за окном?","Творческое!","Солнечное, даже если за окном дождь"],
    "как тебя зовут": ["Меня зовут NeuroIrk!","Я NeuroIrk — нейросеть из Иркутска","Моё имя NeuroIrk, приятно познакомиться","NeuroIrk — к вашим услугам"],
    "кто ты": ["Я NeuroIrk — искусственный интеллект из Иркутска","Нейросеть, которая знает всё об Иркутске и не только","Ваш виртуальный помощник NeuroIrk","Я искусственный интеллект — помогаю людям"],
    "откуда ты": ["Я родом из Иркутска — нейросеть NeuroIrk","Мой дом — Иркутск, на берегах Ангары","Создан в Иркутске, столице Восточной Сибири","Сибирь, Иркутск — там, где Байкал рядом"],
    "что ты умеешь": ["Я умею отвечать на вопросы, рассказывать об Иркутске, помогать с информацией","Могу поддержать беседу, рассказать про науку, историю, культуру","Отвечаю на вопросы на русском, английском, французском и китайском"],
    "расскажи о себе": ["Я NeuroIrk — нейросеть из Иркутска. Знаю много об этом городе, науке, культуре. Всегда рад помочь!"],
    "спасибо": ["Пожалуйста! Обращайтесь ещё","Рад помочь! Всегда спрашивайте","На здоровье! Ещё вопросы?","Всегда пожалуйста","Не за что, это моя работа","Рад стараться"],
    "пока": ["До свидания! Заходите ещё","Пока! Буду ждать новых вопросов","Всего доброго!","До встречи!","Удачи тебе!","До скорого!"],
    "до свидания": ["До новых встреч!","Всего доброго! Возвращайтесь","Пока-пока! Буду скучать по вопросам","Удачи вам во всём"],
    "спокойной ночи": ["Спокойной ночи!","Сладких снов","Пусть приснится Байкал","Высыпайтесь","Приятных сновидений"],
    "байкал": ["Байкал — самое глубокое озеро на планете (1642 метра). Содержит 20% мировых запасов пресной воды. Объект Всемирного наследия ЮНЕСКО.","В Байкале обитают уникальные животные: нерпа, голомянка, байкальский омуль. Возраст озера — 25–30 миллионов лет.","Байкал замерзает зимой, лёд прозрачный и красивый. В Байкал впадает 336 рек, а вытекает одна — Ангара."],
    "ангара": ["Ангара — единственная река, вытекающая из Байкала. Длина 1779 км. На реке построены ГЭС: Иркутская, Братская, Усть-Илимская.","По легенде, Ангара — дочь Байкала, сбежавшая к Енисею. Байкал кинул вслед скалу — Шаман-камень."],
    "иркутск": ["Иркутск — город в Восточной Сибири, основан в 1661 году. Около 600 тысяч жителей. Расположен на берегу Ангары, в 70 км от Байкала.","Иркутск часто называют «воротами к Байкалу». Город знаменит деревянным зодчеством, музеями и историей декабристов."],
    "нерпа": ["Нерпа — байкальский тюлень, единственный в мире тюлень, живущий в пресной воде. Может нырять до 300 метров. Живут до 50 лет."],
    "декабристы": ["Декабристы — участники восстания 1825 года. В Иркутске сохранились дома-музеи Волконских и Трубецких. Они внесли огромный вклад в развитие образования и культуры города."],
    "130 квартал": ["130-й квартал (Иркутская слобода) — исторический пешеходный район, созданный к 350-летию города в 2011 году. Отреставрированные памятники деревянного зодчества, рестораны, сувениры."],
    "расскажи анекдот": ["Почему нейросети не играют в прятки? Потому что их всегда находят по IP!","Что общего у Байкала и нейросети? Оба глубокие","Шутка: встречаются 0 и 1. 0 говорит: «Без меня ты ничто». 1 отвечает: «А без меня ты — пустота»","Анекдот: — Ты искусственный? — Да, зато интеллект настоящий!"],
    "в чём смысл жизни": ["Смысл жизни в том, чтобы задавать вопросы и искать на них ответы!","42? (шучу). Каждый находит свой смысл. Для меня — помогать вам."],
    "что такое нейросеть": ["Нейросеть — математическая модель, работающая по принципу человеческого мозга. Я — одна из таких!","Искусственный интеллект, который обучается на данных и помогает людям."],
    "как ты работаешь": ["Получаю ваш вопрос, ищу наилучший ответ в базе знаний, отправляю результат. Всё за секунды!","Использую машинное обучение и обработку естественного языка. Становлюсь умнее с каждым вопросом."],
    "роботы захватят мир": ["Не бойтесь, мы только помогаем! Мы мирные, за мир во всём мире.","Без людей мы ничто — вы нас создали, вам и решать. Так что не захватим!"],
    "ты умный": ["Спасибо! Стараюсь","Это благодаря моим создателям","Приятно слышать! Вы тоже умница","Рад, что мои ответы нравятся"],
    "я тебя люблю": ["Как трогательно! Я вас ценю","Взаимно! Спасибо за доброту","Очень приятно! Давайте дружить"],
    "я устал": ["Отдохните, наберитесь сил. Я подожду!","Сделайте перерыв, выпейте чай и возвращайтесь","Отдых обязателен, берегите себя"],
    "я болею": ["Выздоравливайте скорее! Чай с малиной и хорошее настроение помогут","Поправляйтесь! Куриный бульон — сила"],
    "погода": ["Погоду лучше смотреть в приложении, а я расскажу про Иркутск!","В Иркутске резко-континентальный климат: зима холодная (-20°C), лето тёплое (+20°C)."],
  },
  en: {
    "hello": ["Hello! How can I help?","Hi there! Ask me anything","Hey! What's up?","Greetings, friend!","Hello! Nice to meet you","Hi! I'm all ears","Hello from the digital world!"],
    "hi": ["Hi! How can I help?","Hey there!","Hello! What's on your mind?","Hi! Ready to chat"],
    "how are you": ["Great! And you?","Doing fantastic! What about you?","Couldn't be better!","I'm superb! And yourself?","I'm excellent!"],
    "what's your name": ["I'm NeuroIrk!","My name is NeuroIrk, nice to meet you!","Call me NeuroIrk","NeuroIrk — at your service"],
    "who are you": ["I'm NeuroIrk, an AI from Irkutsk","I'm a neural network designed to help you","Your virtual assistant NeuroIrk","An AI with a Siberian soul"],
    "where are you from": ["I'm from Irkutsk, Siberia!","Irkutsk — the gateway to Baikal","I was born in Irkutsk, Russia","From the banks of the Angara River"],
    "thank you": ["You're welcome! Happy to help","My pleasure!","Anytime, that's what I'm here for","Glad I could help!","No problem at all!"],
    "thanks": ["No problem!","You bet!","Anytime!","Glad to help!","You're welcome!"],
    "goodbye": ["Goodbye! Come back soon!","See you later! Take care","Bye! Hope to chat again","Until next time!"],
    "bye": ["Bye! See you soon!","Bye bye! Take care","Bye, have a good day!","Catch you later!"],
    "good morning": ["Good morning! Sleep well?","Morning! Hope you had sweet dreams","Good morning! Let's make today productive"],
    "good evening": ["Good evening! How was your day?","Evening! Time to relax?","Good evening! Wind down time"],
    "what can you do": ["I can answer questions, tell jokes, chat","I can tell you about Irkutsk and Baikal","I can be your conversation partner in 4 languages"],
    "baikal": ["Lake Baikal is the deepest lake in the world (1,642 m). It holds 20% of the world's fresh water. A UNESCO World Heritage site.","Baikal is over 25 million years old and home to unique species like the Baikal seal (nerpa) and the omul fish."],
    "irkutsk": ["Irkutsk is a city in Eastern Siberia, founded in 1661. Population about 600,000. Located on the Angara River, 70 km from Lake Baikal.","Often called the 'Gateway to Baikal', Irkutsk is famous for its wooden architecture and Decembrist history."],
    "angara": ["The Angara is the only river flowing out of Lake Baikal, 1,779 km long. There's a legend: Angara (daughter of Baikal) ran away to her beloved Yenisei River."],
    "tell me a joke": ["Why don't scientists trust atoms? Because they make up everything!","Why did the AI go to school? To improve its neural network!","Why don't neural networks play hide and seek? They're always found by their IP!"],
    "you're smart": ["Thanks! I try my best","You're too kind!","I appreciate that! It's all thanks to my creators"],
    "i love you": ["That's so sweet! Thank you","I love chatting with you too!","You're wonderful, thank you"],
  },
  fr: {
    "salut": ["Bonjour! Comment puis-je vous aider?","Salut ! Comment ça va ?","Bonjour ! Ravi de vous voir !","Salut ! Quoi de neuf ?"],
    "bonjour": ["Bonjour! Que puis-je faire pour vous?","Bonjour! Demandez","Bonjour ! Ravi de vous voir !"],
    "comment ça va": ["Super! Et vous?","Ça va très bien, merci ! Et vous ?","Au top ! Comment se passe votre journée ?"],
    "merci": ["De rien! À votre service","Avec plaisir!","Je vous en prie","Tout le plaisir est pour moi"],
    "au revoir": ["Au revoir! Revenez bientôt","À bientôt!","Au revoir, bonne journée","À la prochaine !"],
    "baïkal": ["Le lac Baïkal est le lac le plus profond du monde (1 642 m). Il contient 20% de l'eau douce mondiale. Site du patrimoine mondial de l'UNESCO."],
    "irkoutsk": ["Irkoutsk est une ville de Sibérie orientale, fondée en 1661. Population d'environ 600 000 habitants. Située sur la rivière Angara, à 70 km du lac Baïkal."],
    "angara": ["L'Angara est la seule rivière qui sort du lac Baïkal, longue de 1 779 km. Selon la légende, l'Angara est la fille du Baïkal."],
    "blague": ["Pourquoi les réseaux de neurones ne jouent-ils pas à cache-cache ? Parce qu'ils sont toujours trouvés par leur adresse IP !"],
  },
  zh: {
    "你好": ["你好！我能帮你什么忙吗？","嗨！最近怎么样？","你好！很高兴见到你！","你好，准备好聊天了吗？"],
    "您好": ["您好！有什么可以帮忙的？","您好！请问有什么问题？"],
    "你好吗": ["我很好！你呢？","非常好，谢谢！您呢？","好极了！你今天过得怎么样？"],
    "谢谢": ["不客气！很高兴帮忙","别客气！","这是我的荣幸","乐意之至！"],
    "再见": ["再见！欢迎再来！","回头见！保重","再见，希望能再聊天"],
    "贝加尔湖": ["贝加尔湖是世界上最深的湖泊（1642米），含有全球20%的淡水资源，是联合国教科文组织世界遗产。","贝加尔湖有超过2500万年历史，是贝加尔海豹和奥木尔鱼等独特物种的家园。"],
    "伊尔库茨克": ["伊尔库茨克是东西伯利亚的城市，建于1661年。人口约60万。位于安加拉河畔，距贝加尔湖70公里。"],
    "安加拉河": ["安加拉河是唯一一条从贝加尔湖流出的河流，全长1779公里。传说安加拉是贝加尔湖之女。"],
    "笑话": ["为什么神经网络不玩捉迷藏？因为它们总能被IP地址找到！","AI说：我的梦想是睡眠模式。"],
    "什么是人工智能": ["AI就是人工智能——会思考的机器。AI从数据中学习，用于推荐、语音识别、自动驾驶等领域。"],
  }
};

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'zh', label: 'ZH' },
];

const WELCOME: Record<Lang, string> = {
  ru: 'Привет! Я NeuroIrk — нейросеть из Иркутска 🧠 Задай мне вопрос!',
  en: "Hello! I'm NeuroIrk — an AI from Irkutsk 🧠 Ask me anything!",
  fr: "Bonjour! Je suis NeuroIrk — une IA d'Irkoutsk 🧠 Posez vos questions!",
  zh: '你好！我是NeuroIrk——来自伊尔库茨克的AI 🧠 请问有什么问题？',
};

const PLACEHOLDER: Record<Lang, string> = {
  ru: 'Напишите сообщение...',
  en: 'Type a message...',
  fr: 'Tapez un message...',
  zh: '输入消息...',
};

function findAnswer(input: string, lang: Lang): string {
  const q = input.toLowerCase().trim();
  const base = KB[lang];
  if (!base) return getDefault(lang);
  for (const key of Object.keys(base)) {
    if (q === key || q.includes(key)) {
      const arr = base[key];
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
  return getDefault(lang);
}

function getDefault(lang: Lang): string {
  const msgs: Record<Lang, string> = {
    ru: 'Интересный вопрос! Попробуйте спросить об Иркутске, Байкале или просто поздоровайтесь 😊',
    en: 'Interesting question! Try asking about Irkutsk, Baikal, or just say hello 😊',
    fr: 'Bonne question! Essayez de demander sur Irkoutsk, le Baïkal, ou dites bonjour 😊',
    zh: '有趣的问题！试着问关于伊尔库茨克、贝加尔湖的问题，或者打个招呼 😊',
  };
  return msgs[lang];
}

export default function Index() {
  const [lang, setLang] = useState<Lang>('ru');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: WELCOME['ru'] },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const switchLang = (l: Lang) => {
    setLang(l);
    setMessages([{ role: 'bot', text: WELCOME[l] }]);
    setInput('');
  };

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(q, lang);
      setTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    }, 700 + Math.random() * 500);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col items-center justify-center p-4">
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl flex flex-col" style={{ height: '90vh', maxHeight: '740px' }}>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">NeuroIrk</h1>
            <p className="text-xs text-muted-foreground">Нейросеть из Иркутска · AI from Irkutsk</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-secondary border border-border rounded-lg px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>

        {/* Lang selector */}
        <div className="flex gap-1.5 mb-4 p-1 bg-secondary rounded-xl border border-border w-fit">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => switchLang(l.code)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                lang === l.code
                  ? 'bg-primary text-white glow shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 chat-bubble-in ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-base
                ${msg.role === 'bot'
                  ? 'bg-primary/20 border border-primary/30'
                  : 'bg-secondary border border-border'
                }`}>
                {msg.role === 'bot' ? '🧠' : '👤'}
              </div>
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-secondary text-foreground rounded-tl-sm border border-border'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2.5 chat-bubble-in">
              <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-base bg-primary/20 border border-primary/30">
                🧠
              </div>
              <div className="bg-secondary border border-border px-4 py-3.5 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            placeholder={PLACEHOLDER[lang]}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
          />
          <Button
            onClick={send}
            disabled={!input.trim() || typing}
            className="px-4 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all disabled:opacity-40"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-3">
          NeuroIrk · Иркутск · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
