/**
 * MusikZone — Каталог музыкальных альбомов
 * База данных: альбомы, исполнители, жанры, рецензии и подборки «Лучшее за год»
 */

const MUSIC_DATA = {
    genres: [
        { id: 'all', name: 'Все жанры', count: 14, icon: 'disc' },
        { id: 'electronic', name: 'Электроника', count: 4, icon: 'cpu', color: '#6366F1' },
        { id: 'rock', name: 'Рок', count: 4, icon: 'zap', color: '#EC4899' },
        { id: 'hip-hop', name: 'Хип-хоп', count: 3, icon: 'mic', color: '#F59E0B' },
        { id: 'jazz', name: 'Джаз', count: 2, icon: 'music', color: '#10B981' },
        { id: 'ambient', name: 'Эмбиент', count: 2, icon: 'wind', color: '#38BDF8' },
        { id: 'indie-pop', name: 'Инди и Поп', count: 3, icon: 'heart', color: '#A855F7' }
    ],

    albums: [
        {
            id: 'ram-daftpunk',
            title: 'Random Access Memories',
            artist: 'Daft Punk',
            artistId: 'daft-punk',
            year: 2013,
            releaseDate: '17 мая 2013',
            genre: 'Электроника',
            subgenres: ['Disco', 'Funk', 'Synthpop', 'French House'],
            label: 'Columbia Records',
            duration: '74:24',
            trackCount: 13,
            rating: 9.6,
            criticsScore: 97,
            userScore: 9.5,
            ratingsCount: 3840,
            coverColor: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #d97706 100%)',
            coverImage: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80',
            badge: 'Выбор редакции',
            bestOfYear: { year: 2013, rank: 1, category: 'Альбом года' },
            description: 'Четвертый и финальный студийный альбом легендарного французского дуэта Daft Punk. Дань уважения музыке конца 70-х и начала 80-х годов с живыми инструментами, оркестровыми аранжировками и участием Джорджо Мородера, Найла Роджерса и Фаррелла Уильямса. Настоящий шедевр аналогового продакшена XXI века.',
            tracks: [
                { number: 1, title: 'Give Life Back to Music', duration: '4:34', plays: '142M' },
                { number: 2, title: 'The Game of Love', duration: '5:21', plays: '48M' },
                { number: 3, title: 'Giorgio by Moroder', duration: '9:04', plays: '95M' },
                { number: 4, title: 'Within', duration: '3:48', plays: '56M' },
                { number: 5, title: 'Instant Crush (feat. Julian Casablancas)', duration: '5:37', plays: '320M', isHit: true },
                { number: 6, title: 'Lose Yourself to Dance (feat. Pharrell Williams)', duration: '5:53', plays: '185M' },
                { number: 7, title: 'Touch (feat. Paul Williams)', duration: '8:18', plays: '44M' },
                { number: 8, title: 'Get Lucky (feat. Pharrell Williams)', duration: '6:07', plays: '940M', isHit: true },
                { number: 9, title: 'Beyond', duration: '4:50', plays: '39M' },
                { number: 10, title: 'Motherboard', duration: '5:41', plays: '31M' },
                { number: 11, title: 'Fragments of Time (feat. Todd Edwards)', duration: '4:39', plays: '52M' },
                { number: 12, title: 'Doin\' It Right (feat. Panda Bear)', duration: '4:11', plays: '110M' },
                { number: 13, title: 'Contact', duration: '6:21', plays: '42M' }
            ],
            reviews: [
                {
                    id: 'rev-1',
                    author: 'Александр Пистолетов',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2m5l88apemBgia0DM9_aGmj-x4aOEh1MQIqYF4XGNHg&s=10',
                    role: 'Музыкальный исполнитель',
                    rating: 10,
                    date: '12 января 2026',
                    title: 'Памятник золотой эре звукозаписи',
                    text: 'Альбом звучит как непреходящая классика. Запись живых барабанов, басовые партии Роджерса и вокодерные гармонии вызывают мурашки при каждом прослушивании. Трек «Giorgio by Moroder» — образец кинематографичного повествования в электронике.',
                    pros: ['Идеальный аналоговый мастеринг', 'Звездный состав музыкантов', 'Атмосфера ностальгии без копирования'],
                    cons: ['Некоторые композиции требуют терпения'],
                    likes: 128
                },
                {
                    id: 'rev-2',
                    author: 'Олег Монгол',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTORqy-5TFRslFa1dzZ4Xi26Ka7aJtQRFDLicjNKLtdTA&s=10',
                    role: 'Слушатель',
                    rating: 9,
                    date: '28 февраля 2026',
                    title: 'Альбом, который взрослеет вместе с тобой',
                    text: 'В 2013-м казалось, что это просто приятный фанк, но спустя годы понимаешь масштаб проделанной работы. Звук кристально чистый, даже в обычных наушниках сцена раскрывается потрясающе.',
                    pros: ['Многослойный звук', 'Эмоциональный трек «Touch»'],
                    cons: ['Мало клубных бэнгеров в стиле старых Daft Punk'],
                    likes: 64
                }
            ]
        },
        {
            id: 'ok-computer-radiohead',
            title: 'OK Computer',
            artist: 'Radiohead',
            artistId: 'radiohead',
            year: 1997,
            releaseDate: '21 мая 1997',
            genre: 'Рок',
            subgenres: ['Alternative Rock', 'Art Rock', 'Post-Rock'],
            label: 'Parlophone / Capitol',
            duration: '53:21',
            trackCount: 12,
            rating: 9.8,
            criticsScore: 99,
            userScore: 9.8,
            ratingsCount: 5210,
            coverColor: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #38bdf8 100%)',
            coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
            badge: 'Золотая классика',
            bestOfYear: { year: 1997, rank: 1, category: 'Альбом века' },
            description: 'Определяющий рок-альбом конца 90-х годов. Том Йорк и музыканты Radiohead исследовали отчуждение, страх перед надвигающейся цифровизацией общества и потребительским хаосом. Плотные гитарные стены сменяются хрупкими электронными текстурами.',
            tracks: [
                { number: 1, title: 'Airbag', duration: '4:44', plays: '76M' },
                { number: 2, title: 'Paranoid Android', duration: '6:23', plays: '240M', isHit: true },
                { number: 3, title: 'Subterranean Homesick Alien', duration: '4:27', plays: '52M' },
                { number: 4, title: 'Exit Music (For a Film)', duration: '4:24', plays: '190M', isHit: true },
                { number: 5, title: 'Let Down', duration: '4:59', plays: '98M' },
                { number: 6, title: 'Karma Police', duration: '4:21', plays: '480M', isHit: true },
                { number: 7, title: 'Fitter Happier', duration: '1:57', plays: '22M' },
                { number: 8, title: 'Electioneering', duration: '3:50', plays: '31M' },
                { number: 9, title: 'Climbing Up the Walls', duration: '4:45', plays: '41M' },
                { number: 10, title: 'No Surprises', duration: '3:48', plays: '590M', isHit: true },
                { number: 11, title: 'Lucky', duration: '4:19', plays: '47M' },
                { number: 12, title: 'The Tourist', duration: '5:24', plays: '35M' }
            ],
            reviews: [
                {
                    id: 'rev-3',
                    author: 'Антон Евгеньевич',
                    avatar: 'https://static.wikia.nocookie.net/hunterxhunter/images/5/54/6b7c9ff99ae7a0019ecc3ba763d0407b.jpg/revision/latest?cb=20200815174831&path-prefix=ru',
                    role: 'Куратор каталога',
                    rating: 10,
                    date: '5 марта 2026',
                    title: 'Пророческая пластинка, не потерявшая актуальности',
                    text: 'Сложно найти более цельный концептуальный альбом в альтернативной музыке. «Paranoid Android» — это Богемская Рапсодия девяностых, меняющая темп и структуру трижды за 6 минут.',
                    pros: ['Гениальная композиция треков', 'Невероятный вокал Тома Йорка', 'Глубокая лирика'],
                    cons: ['Нет'],
                    likes: 215
                }
            ]
        },
        {
            id: 'tpab-kendrick',
            title: 'To Pimp a Butterfly',
            artist: 'Kendrick Lamar',
            artistId: 'kendrick-lamar',
            year: 2015,
            releaseDate: '15 марта 2015',
            genre: 'Хип-хоп',
            subgenres: ['Conscious Hip-Hop', 'Jazz Rap', 'Funk', 'Neo-Soul'],
            label: 'Top Dawg / Aftermath / Interscope',
            duration: '78:51',
            trackCount: 16,
            rating: 9.7,
            criticsScore: 98,
            userScore: 9.7,
            ratingsCount: 4620,
            coverColor: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #71717a 100%)',
            coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
            badge: 'Шедевр десятилетия',
            bestOfYear: { year: 2015, rank: 1, category: 'Альбом года' },
            description: 'Монументальный магнум опус Кендрика Ламара, объединивший афроамериканскую музыкальную традицию — джаз, фанк, спокен-ворд и классический хип-хоп Западного побережья с виртуозной продюсерской работой Flying Lotus, Thundercat и Kamasi Washington.',
            tracks: [
                { number: 1, title: 'Wesley\'s Theory (feat. George Clinton & Thundercat)', duration: '4:47', plays: '130M' },
                { number: 2, title: 'For Free? (Interlude)', duration: '2:10', plays: '65M' },
                { number: 3, title: 'King Kunta', duration: '3:54', plays: '480M', isHit: true },
                { number: 4, title: 'Institutionalized', duration: '4:31', plays: '72M' },
                { number: 5, title: 'These Walls (feat. Bilal & Anna Wise)', duration: '5:00', plays: '115M' },
                { number: 6, title: 'u', duration: '4:28', plays: '88M' },
                { number: 7, title: 'Alright', duration: '3:39', plays: '620M', isHit: true },
                { number: 8, title: 'For Sale? (Interlude)', duration: '4:51', plays: '55M' },
                { number: 9, title: 'Momma', duration: '4:43', plays: '49M' },
                { number: 10, title: 'Hood Politics', duration: '4:52', plays: '78M' },
                { number: 11, title: 'How Much a Dollar Cost', duration: '4:21', plays: '92M' },
                { number: 12, title: 'Complexion (A Zulu Love)', duration: '4:23', plays: '54M' },
                { number: 13, title: 'The Blacker the Berry', duration: '5:28', plays: '140M', isHit: true },
                { number: 14, title: 'You Ain\'t Gotta Lie (Momma Said)', duration: '4:01', plays: '41M' },
                { number: 15, title: 'i', duration: '5:36', plays: '210M' },
                { number: 16, title: 'Mortal Man', duration: '12:07', plays: '38M' }
            ],
            reviews: [
                {
                    id: 'rev-4',
                    author: 'Даниил Орлов',
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
                    role: 'Хип-хоп журналист',
                    rating: 10,
                    date: '18 апреля 2026',
                    title: 'Учебник музыки и социальной драматургии',
                    text: 'Удивительно, как этот альбом звучит сейчас: свежо, агрессивно и в то же время невероятно интеллигентно. Живые соло Камаси Вашингтона и безумный бас Thundercat делают каждую секунду насыщенной.',
                    pros: ['Блестящая джазовая инструменталка', 'Мощнейшие тексты', 'Катарсический финал'],
                    cons: ['Требует внимательного вдумчивого прослушивания'],
                    likes: 180
                }
            ]
        },
        {
            id: 'dark-side-pink-floyd',
            title: 'The Dark Side of the Moon',
            artist: 'Pink Floyd',
            artistId: 'pink-floyd',
            year: 1973,
            releaseDate: '1 марта 1973',
            genre: 'Рок',
            subgenres: ['Progressive Rock', 'Psychedelic Rock', 'Art Rock'],
            label: 'Harvest / EMI',
            duration: '42:50',
            trackCount: 10,
            rating: 9.9,
            criticsScore: 100,
            userScore: 9.8,
            ratingsCount: 7890,
            coverColor: 'linear-gradient(135deg, #09090b 0%, #1c1917 50%, #e11d48 100%)',
            coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
            badge: 'Легенда всех времён',
            bestOfYear: { year: 1973, rank: 1, category: 'Альбом всех времен' },
            description: 'Один из самых продаваемых и влиятельных альбомов в истории человечества. Темы безумия, быстротечности времени, алчности и смерти, сплетенные звукоинженером Аланом Парсонсом в непрерывное звуковое полотно с использованием инновационных синтезаторов EMS VCS 3.',
            tracks: [
                { number: 1, title: 'Speak to Me', duration: '1:05', plays: '120M' },
                { number: 2, title: 'Breathe (In the Air)', duration: '2:49', plays: '290M', isHit: true },
                { number: 3, title: 'On the Run', duration: '3:45', plays: '95M' },
                { number: 4, title: 'Time', duration: '6:53', plays: '410M', isHit: true },
                { number: 5, title: 'The Great Gig in the Sky', duration: '4:44', plays: '280M', isHit: true },
                { number: 6, title: 'Money', duration: '6:22', plays: '510M', isHit: true },
                { number: 7, title: 'Us and Them', duration: '7:50', plays: '230M' },
                { number: 8, title: 'Any Colour You Like', duration: '3:26', plays: '89M' },
                { number: 9, title: 'Brain Damage', duration: '3:47', plays: '180M' },
                { number: 10, title: 'Eclipse', duration: '2:12', plays: '140M' }
            ],
            reviews: [
                {
                    id: 'rev-5',
                    author: 'Артем Резников',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
                    role: 'Звукорежиссер',
                    rating: 10,
                    date: '10 февраля 2026',
                    title: 'Звуковой эталон для аудиофилов',
                    text: 'Этот альбом тестирует вашу аудиосистему: переход от биения сердца к гитарным партиям Гилмора в «Time» — чистая магия. Сведение 1973 года превосходит многие современные цифровые релизы.',
                    pros: ['Идеальный динамический диапазон', 'Бессмертные гитарные соло', 'Концептуальное единство'],
                    cons: ['Нет'],
                    likes: 310
                }
            ]
        },
        {
            id: 'hit-me-hard-billie',
            title: 'HIT ME HARD AND SOFT',
            artist: 'Billie Eilish',
            artistId: 'billie-eilish',
            year: 2024,
            releaseDate: '17 мая 2024',
            genre: 'Инди и Поп',
            subgenres: ['Alt-Pop', 'Chamber Pop', 'Electronica'],
            label: 'Darkroom / Interscope',
            duration: '43:45',
            trackCount: 10,
            rating: 9.3,
            criticsScore: 92,
            userScore: 9.4,
            ratingsCount: 2950,
            coverColor: 'linear-gradient(135deg, #082f49 0%, #0369a1 50%, #0284c7 100%)',
            coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
            badge: 'Топ 2024 года',
            bestOfYear: { year: 2024, rank: 1, category: 'Лучший поп/инди альбом' },
            description: 'Третий альбом Билли Айлиш и Финнеаса, получивший единодушное признание за смелые звуковые контрасты: от интимного шёпота укулеле до грандиозных оркестровых дропов и синти-диско ритмов в треках вроде «L\'AMOUR DE MA VIE» и «CHIHIRO».',
            tracks: [
                { number: 1, title: 'SKINNY', duration: '3:39', plays: '160M' },
                { number: 2, title: 'LUNCH', duration: '2:59', plays: '480M', isHit: true },
                { number: 3, title: 'CHIHIRO', duration: '5:03', plays: '390M', isHit: true },
                { number: 4, title: 'BIRDS OF A FEATHER', duration: '3:30', plays: '810M', isHit: true },
                { number: 5, title: 'WILDFLOWER', duration: '4:21', plays: '310M', isHit: true },
                { number: 6, title: 'THE GREATEST', duration: '4:53', plays: '190M' },
                { number: 7, title: 'L\'AMOUR DE MA VIE', duration: '5:33', plays: '240M' },
                { number: 8, title: 'THE DINER', duration: '3:06', plays: '120M' },
                { number: 9, title: 'BITTERSUITE', duration: '4:58', plays: '110M' },
                { number: 10, title: 'BLUE', duration: '5:43', plays: '175M' }
            ],
            reviews: [
                {
                    id: 'rev-6',
                    author: 'София Миронова',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
                    role: 'Музыкальный блогер',
                    rating: 9,
                    date: '14 января 2026',
                    title: 'Взрослый, ранимый и технически безупречный альбом',
                    text: 'Финнеас превзошел сам себя в продакшене трека «CHIHIRO» — этот пульсирующий бас в стиле французского хауса вводит в гипноз. А «BIRDS OF A FEATHER» — самая светлая баллада года.',
                    pros: ['Удивительные модуляции темпа в треках', 'Зрелая лирика', 'Широкая звуковая палитра'],
                    cons: ['Хотелось бы еще 2-3 композиции'],
                    likes: 142
                }
            ]
        },
        {
            id: 'kind-of-blue-miles',
            title: 'Kind of Blue',
            artist: 'Miles Davis',
            artistId: 'miles-davis',
            year: 1959,
            releaseDate: '17 августа 1959',
            genre: 'Джаз',
            subgenres: ['Modal Jazz', 'Cool Jazz', 'Hard Bop'],
            label: 'Columbia Records',
            duration: '45:33',
            trackCount: 5,
            rating: 9.8,
            criticsScore: 100,
            userScore: 9.7,
            ratingsCount: 3100,
            coverColor: 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #3b82f6 100%)',
            coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80',
            badge: 'Золотая классика',
            bestOfYear: { year: 1959, rank: 1, category: 'Джазовый эталон' },
            description: 'Священный грааль модального джаза. Записанный за две сессии секстетом в составе Майлза Дэвиса, Джона Колтрейна, Билла Эванса, Кэннонбола Эддерли, Пола Чемберса и Джимми Кобба. Музыка свободного дыхания и чистой импровизации.',
            tracks: [
                { number: 1, title: 'So What', duration: '9:22', plays: '240M', isHit: true },
                { number: 2, title: 'Freddie Freeloader', duration: '9:46', plays: '95M' },
                { number: 3, title: 'Blue in Green', duration: '5:37', plays: '180M', isHit: true },
                { number: 4, title: 'All Blues', duration: '11:33', plays: '110M' },
                { number: 5, title: 'Flamenco Sketches', duration: '9:26', plays: '75M' }
            ],
            reviews: [
                {
                    id: 'rev-7',
                    author: 'Игорь Капустин',
                    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
                    role: 'Преподаватель гармонии',
                    rating: 10,
                    date: '20 февраля 2026',
                    title: 'Тишина между нотами имеет такое же значение, как и сами ноты',
                    text: 'Вступительные аккорды фортепиано Билла Эванса в «Blue in Green» — это чистая поэзия. Не существует человека, который послушал бы эту пластинку в темноте и остался равнодушным.',
                    pros: ['Идеальный состав мастеров', 'Медитативная атмосфера', 'Вечный стиль'],
                    cons: ['Нет'],
                    likes: 95
                }
            ]
        },
        {
            id: 'currents-tame-impala',
            title: 'Currents',
            artist: 'Tame Impala',
            artistId: 'tame-impala',
            year: 2015,
            releaseDate: '17 июля 2015',
            genre: 'Рок',
            subgenres: ['Psychedelic Pop', 'Synthpop', 'Disco', 'Neo-Psychedelia'],
            label: 'Modular / Interscope',
            duration: '51:12',
            trackCount: 13,
            rating: 9.3,
            criticsScore: 90,
            userScore: 9.4,
            ratingsCount: 4120,
            coverColor: 'linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #ec4899 100%)',
            coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
            badge: 'Топ выбор',
            bestOfYear: { year: 2015, rank: 2, category: 'Лучший психоделик альбом' },
            description: 'Кевин Паркер в одиночку создал триумфальный синтезаторно-психоделический манифест о расставании и внутренней трансформации. Басовые риффы «The Less I Know the Better» стали одним из самых узнаваемых гимнов поколения.',
            tracks: [
                { number: 1, title: 'Let It Happen', duration: '7:46', plays: '410M', isHit: true },
                { number: 2, title: 'Nangs', duration: '1:47', plays: '120M' },
                { number: 3, title: 'The Moment', duration: '4:15', plays: '160M' },
                { number: 4, title: 'Yes I\'m Changing', duration: '4:30', plays: '185M' },
                { number: 5, title: 'Eventually', duration: '5:19', plays: '340M', isHit: true },
                { number: 6, title: 'Gossip', duration: '0:55', plays: '45M' },
                { number: 7, title: 'The Less I Know the Better', duration: '3:36', plays: '1420M', isHit: true },
                { number: 8, title: 'Past Life', duration: '3:47', plays: '89M' },
                { number: 9, title: 'Disciples', duration: '1:48', plays: '76M' },
                { number: 10, title: '\'Cause I\'m a Man', duration: '4:01', plays: '130M' },
                { number: 11, title: 'Reality in Motion', duration: '4:12', plays: '68M' },
                { number: 12, title: 'Love/Paranoia', duration: '3:06', plays: '92M' },
                { number: 13, title: 'New Person, Same Old Mistakes', duration: '6:02', plays: '250M', isHit: true }
            ],
            reviews: [
                {
                    id: 'rev-8',
                    author: 'Максим Левин',
                    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
                    role: 'Слушатель',
                    rating: 9,
                    date: '11 января 2026',
                    title: 'Звуковая лавина, от которой невозможно оторваться',
                    text: 'То, как Паркер сводит фазинг на тарелках и живой компрессированный бас — это магия. Семь минут «Let It Happen» пролетают за одно мгновение.',
                    pros: ['Гипнотический грув', 'Уникальный продакшн', 'Прилипчивые мелодии'],
                    cons: ['Пара интерлюдий кажутся короткими'],
                    likes: 77
                }
            ]
        },
        {
            id: 'chromakopia-tyler',
            title: 'CHROMAKOPIA',
            artist: 'Tyler, the Creator',
            artistId: 'tyler-creator',
            year: 2024,
            releaseDate: '28 октября 2024',
            genre: 'Хип-хоп',
            subgenres: ['Experimental Hip-Hop', 'Neo Soul', 'Jazz Fusion'],
            label: 'Columbia Records',
            duration: '52:58',
            trackCount: 14,
            rating: 9.4,
            criticsScore: 93,
            userScore: 9.5,
            ratingsCount: 3140,
            coverColor: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)',
            coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
            badge: 'Топ 2024 года',
            bestOfYear: { year: 2024, rank: 2, category: 'Лучший хип-хоп релиз' },
            description: 'Глубоко интимный, театральный и зрелый альбом Тайлера, в котором он исследует страх старения, отцовство, паранойю славы и моногамию через альтер-эго St. Chroma. Плотные военные марши соединяются с роскошными соул-гармониями.',
            tracks: [
                { number: 1, title: 'St. Chroma (feat. Daniel Caesar)', duration: '3:17', plays: '240M', isHit: true },
                { number: 2, title: 'Rah Tah Tah', duration: '2:45', plays: '180M' },
                { number: 3, title: 'Noid', duration: '4:44', plays: '210M', isHit: true },
                { number: 4, title: 'Darling, I (feat. Teezo Touchdown)', duration: '4:13', plays: '190M', isHit: true },
                { number: 5, title: 'Hey Jane', duration: '4:00', plays: '98M' },
                { number: 6, title: 'I Killed You', duration: '2:48', plays: '115M' },
                { number: 7, title: 'Judge Judy', duration: '4:29', plays: '89M' },
                { number: 8, title: 'Sticky (feat. GloRilla, Sexyy Red & Lil Wayne)', duration: '4:15', plays: '310M', isHit: true },
                { number: 9, title: 'Take Your Mask Off', duration: '4:04', plays: '130M' },
                { number: 10, title: 'Tomorrow', duration: '3:02', plays: '95M' },
                { number: 11, title: 'Thought I Was Dead (feat. ScHoolboy Q)', duration: '3:27', plays: '140M' },
                { number: 12, title: 'Like Him (feat. Lola Young)', duration: '4:38', plays: '185M' },
                { number: 13, title: 'Balloon (feat. Doechii)', duration: '2:34', plays: '120M' },
                { number: 14, title: 'I Hope You Find Your Way Home', duration: '4:29', plays: '110M' }
            ],
            reviews: [
                {
                    id: 'rev-9',
                    author: 'Кирилл Шахов',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                    role: 'Музыкальный обозреватель',
                    rating: 10,
                    date: '3 ноября 2024',
                    title: 'Исповедь взрослеющего гения',
                    text: 'Тайлер продолжает эволюционировать от бунтаря до выдающегося продюсера и мыслителя. Трек «Like Him» разбивает сердце, а продакшен «Sticky» заставляет прыгать на месте.',
                    pros: ['Исключительная честность', 'Оркестровые и хор-элементы', 'Бешеная энергетика'],
                    cons: ['Контрастные переходы могут показаться резкими'],
                    likes: 165
                }
            ]
        },
        {
            id: 'saw-aphex-twin',
            title: 'Selected Ambient Works 85-92',
            artist: 'Aphex Twin',
            artistId: 'aphex-twin',
            year: 1992,
            releaseDate: '12 февраля 1992',
            genre: 'Эмбиент',
            subgenres: ['Ambient Techno', 'IDM', 'Acid House'],
            label: 'Apollo / R&S Records',
            duration: '74:40',
            trackCount: 13,
            rating: 9.6,
            criticsScore: 98,
            userScore: 9.6,
            ratingsCount: 2890,
            coverColor: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)',
            coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
            badge: 'Веха жанра',
            bestOfYear: { year: 1992, rank: 1, category: 'Электронный шедевр' },
            description: 'Краеугольный камень интеллектуальной танцевальной музыки (IDM) и эмбиент-техно. Ричард Д. Джеймс записал эти мерцающие, теплые и медитативные композиции на самодельном оборудовании и кассетах в подростковом возрасте в Корнуолле.',
            tracks: [
                { number: 1, title: 'Xtal', duration: '4:54', plays: '140M', isHit: true },
                { number: 2, title: 'Tha', duration: '9:06', plays: '65M' },
                { number: 3, title: 'Pulsewidth', duration: '3:48', plays: '82M' },
                { number: 4, title: 'Ageispolis', duration: '5:23', plays: '98M', isHit: true },
                { number: 5, title: 'i', duration: '1:17', plays: '40M' },
                { number: 6, title: 'Green Calx', duration: '6:05', plays: '45M' },
                { number: 7, title: 'Heliosphan', duration: '4:51', plays: '76M', isHit: true },
                { number: 8, title: 'We Are the Music Makers', duration: '7:43', plays: '55M' },
                { number: 9, title: 'Schottkey 7th Path', duration: '4:26', plays: '38M' },
                { number: 10, title: 'Ptolemy', duration: '4:10', plays: '49M' },
                { number: 11, title: 'Hedphelym', duration: '6:00', plays: '34M' },
                { number: 12, title: 'Delphium', duration: '5:26', plays: '39M' },
                { number: 13, title: 'Actium', duration: '7:32', plays: '42M' }
            ],
            reviews: [
                {
                    id: 'rev-10',
                    author: 'Полина Белова',
                    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
                    role: 'Звуковой дизайнер',
                    rating: 10,
                    date: '15 января 2026',
                    title: 'Тёплое аналоговое свечение вне времени',
                    text: '«Xtal» открывает альбом звуками, которые будто пробиваются сквозь туман сновидений. Потрясающе, как музыка, созданная более 30 лет назад на кассетах, звучит футуристичнее современного EDM.',
                    pros: ['Неповторимая атмосфера', 'Мягкий ритмический рисунок', 'Идеально для работы и медитации'],
                    cons: ['Нет'],
                    likes: 88
                }
            ]
        },
        {
            id: 'mezzanine-massive-attack',
            title: 'Mezzanine',
            artist: 'Massive Attack',
            artistId: 'massive-attack',
            year: 1998,
            releaseDate: '20 апреля 1998',
            genre: 'Электроника',
            subgenres: ['Trip-Hop', 'Dark Wave', 'Post-Punk', 'Dub'],
            label: 'Circa / Virgin',
            duration: '63:29',
            trackCount: 11,
            rating: 9.5,
            criticsScore: 97,
            userScore: 9.6,
            ratingsCount: 3410,
            coverColor: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #dc2626 100%)',
            coverImage: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&auto=format&fit=crop&q=80',
            badge: 'Золотая классика',
            bestOfYear: { year: 1998, rank: 1, category: 'Трип-хоп икона' },
            description: 'Мрачный, тяжелый, чувственный трип-хоп с перегруженными дисторшн-гитарами и гипнотическим вокалом Элизабет Фрейзер (Cocteau Twins). Трек «Teardrop» стал символом эпохи и эталоном атмосферного продакшена.',
            tracks: [
                { number: 1, title: 'Angel', duration: '6:18', plays: '210M', isHit: true },
                { number: 2, title: 'Risingson', duration: '4:58', plays: '98M' },
                { number: 3, title: 'Teardrop', duration: '5:29', plays: '480M', isHit: true },
                { number: 4, title: 'Inertia Creeps', duration: '5:56', plays: '88M', isHit: true },
                { number: 5, title: 'Exchange', duration: '4:11', plays: '42M' },
                { number: 6, title: 'Dissolved Girl', duration: '6:07', plays: '76M' },
                { number: 7, title: 'Man Next Door', duration: '5:55', plays: '54M' },
                { number: 8, title: 'Black Milk', duration: '6:20', plays: '62M' },
                { number: 9, title: 'Mezzanine', duration: '5:54', plays: '49M' },
                { number: 10, title: 'Group Four', duration: '8:13', plays: '41M' },
                { number: 11, title: '(Exchange)', duration: '4:08', plays: '29M' }
            ],
            reviews: [
                {
                    id: 'rev-11',
                    author: 'Роман Кравцов',
                    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
                    role: 'Слушатель',
                    rating: 10,
                    date: '12 февраля 2026',
                    title: 'Нуарный шедевр, который затягивает в темноту',
                    text: 'Нарастающий бас в треке «Angel» до сих пор заставляет затаить дыхание. Это пластинка для ночных поездок и глубокого погружения в меланхолию.',
                    pros: ['Кинематографический звук', 'Вокал Элизабет Фрейзер', 'Тяжелый глубокий бас'],
                    cons: ['Не для легкого настроения'],
                    likes: 112
                }
            ]
        },
        {
            id: 'after-hours-weeknd',
            title: 'After Hours',
            artist: 'The Weeknd',
            artistId: 'the-weeknd',
            year: 2020,
            releaseDate: '20 марта 2020',
            genre: 'Инди и Поп',
            subgenres: ['Synthwave', 'R&B', 'Electropop', 'New Wave'],
            label: 'XO / Republic',
            duration: '56:19',
            trackCount: 14,
            rating: 9.2,
            criticsScore: 89,
            userScore: 9.3,
            ratingsCount: 5400,
            coverColor: 'linear-gradient(135deg, #450a0a 0%, #991b1b 50%, #ef4444 100%)',
            coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
            badge: 'Мировой блокбастер',
            bestOfYear: { year: 2020, rank: 1, category: 'Поп-альбом года' },
            description: 'Кинематографичный нео-нуарный шедевр The Weeknd в сотрудничестве с Максом Мартином и Oneohtrix Point Never. Сингл «Blinding Lights» побил исторические рекорды чарта Billboard Hot 100, а сам альбом возродил эстетику ретровейва 80-х в глобальном масштабе.',
            tracks: [
                { number: 1, title: 'Alone Again', duration: '4:10', plays: '180M' },
                { number: 2, title: 'Too Late', duration: '3:59', plays: '210M' },
                { number: 3, title: 'Hardest to Love', duration: '3:31', plays: '260M' },
                { number: 4, title: 'Scared to Live', duration: '3:11', plays: '190M' },
                { number: 5, title: 'Snowchild', duration: '4:07', plays: '175M' },
                { number: 6, title: 'Escape from LA', duration: '5:55', plays: '220M' },
                { number: 7, title: 'Heartless', duration: '3:18', plays: '890M', isHit: true },
                { number: 8, title: 'Faith', duration: '4:43', plays: '240M', isHit: true },
                { number: 9, title: 'Blinding Lights', duration: '3:20', plays: '4300M', isHit: true },
                { number: 10, title: 'In Your Eyes', duration: '3:57', plays: '980M', isHit: true },
                { number: 11, title: 'Save Your Tears', duration: '3:35', plays: '2100M', isHit: true },
                { number: 12, title: 'Repeat After Me (Interlude)', duration: '3:15', plays: '140M' },
                { number: 13, title: 'After Hours', duration: '6:01', plays: '520M', isHit: true },
                { number: 14, title: 'Until I Bleed Out', duration: '3:10', plays: '110M' }
            ],
            reviews: [
                {
                    id: 'rev-12',
                    author: 'Алина Зимина',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                    role: 'Слушатель',
                    rating: 9,
                    date: '19 января 2026',
                    title: 'Поп-музыка высшей пробы',
                    text: 'После мрачного вступления альбом несется на безумной скорости через ночной Лас-Вегас. Комбинация синтвейва и фирменного фальцета Эйбела звучит безупречно.',
                    pros: ['Хит за хитом', 'Невероятный визуальный стиль', 'Продюсирование OPN'],
                    cons: ['Некоторые треки заиграны на радио'],
                    likes: 99
                }
            ]
        }
    ],

    // Подборки «Лучшее за год»
    bestOfYearRankings: {
        '2026': {
            year: 2026,
            headline: 'Главные музыкальные открытия и релизы 2026 года',
            subhead: 'Ежегодный выбор музыкальных критиков и десятков тысяч пользователей MusikZone',
            albums: [
                { rank: 1, albumId: 'hit-me-hard-billie', badge: 'Альбом года 2026', nomination: 'Лучший поп/инди релиз', reason: 'Утонченная звуковая архитектура, где тишина и динамические взрывы создают новый стандарт поп-музыки.' },
                { rank: 2, albumId: 'chromakopia-tyler', badge: 'Выбор критиков', nomination: 'Лучший концептуальный хип-хоп', reason: 'Мощнейшая исповедь поколения, стирающая грань между джазом, рэпом и оперой.' },
                { rank: 3, albumId: 'ram-daftpunk', badge: 'Переиздание года', nomination: 'Лучшее аудиофильское издание', reason: 'Специальное юбилейное ремастеринг-издание с неизданными сессиями Moroder.' }
            ]
        },
        '2024': {
            year: 2024,
            headline: 'Музыкальный калейдоскоп 2024 года',
            subhead: 'Год масштабных концептуальных возвращений и смелых жанровых экспериментов',
            albums: [
                { rank: 1, albumId: 'hit-me-hard-billie', badge: '#1 Альбом года', nomination: 'Выбор слушателей', reason: 'Рекордные прослушивания и единодушное признание музыкальных критиков.' },
                { rank: 2, albumId: 'chromakopia-tyler', badge: '#2 Лучший продакшн', nomination: 'Хип-хоп событие', reason: 'Театральная постановка на стыке альтернативы и рэпа.' }
            ]
        },
        'all-time': {
            year: 'All-Time',
            headline: 'Золотой пантеон: Лучшие альбомы всех времён',
            subhead: 'Фундаментальные пластинки, сформировавшие современную звуковую культуру',
            albums: [
                { rank: 1, albumId: 'dark-side-pink-floyd', badge: 'Безусловный шедевр #1', nomination: 'Прогрессив-рок', reason: 'Эталон аудиофилии и философской мысли в рок-музыке.' },
                { rank: 2, albumId: 'ok-computer-radiohead', badge: 'Веха 90-х #2', nomination: 'Альтернативный рок', reason: 'Пластинка, предсказавшая цифровое одиночество XXI века.' },
                { rank: 3, albumId: 'kind-of-blue-miles', badge: 'Джазовая вершина #3', nomination: 'Модальный джаз', reason: 'Альбом, после которого мир музыки уже не мог остаться прежним.' },
                { rank: 4, albumId: 'tpab-kendrick', badge: 'Триумф века #4', nomination: 'Хип-хоп & Джаз', reason: 'Синтез афроамериканской культуры в бескомпромиссном звуке.' }
            ]
        }
    },

    // Статистика каталога для Hero / Dashboard
    stats: {
        totalAlbums: '14 820+',
        totalReviews: '86 400+',
        activeCritics: '1 250',
        genresCount: '34'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MUSIC_DATA;
}
