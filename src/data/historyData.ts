export interface HistoricalYearData {
  year: number;
  isFuture: boolean;
  title: string;
  era: string;
  leader: string;
  leaderTitle: string;
  leaderBio: string;
  population: string;
  technology: string;
  transport: string;
  music: string;
  language: string;
  environment: string;
  description: string;
  facts: string[];
  events: {
    title: string;
    description: string;
    category: 'politics' | 'culture' | 'infrastructure' | 'nature';
  }[];
  mediaUrl?: string;
  kiswahiliSummary: string;
}

export interface CountyData {
  id: string;
  name: string;
  capital: string;
  description: string;
  coordinates: [number, number]; // [lat, lng]
  historicalHighlight: string;
}

export interface LeaderData {
  name: string;
  years: string;
  title: string;
  legacy: string;
  imagePrompt: string;
}

export const COUNTIES: CountyData[] = [
  {
    id: 'mombasa',
    name: 'Mombasa',
    capital: 'Mombasa City',
    description: 'An ancient port city on the Indian Ocean with a rich history of maritime trade, coastal Swahili culture, and ancient fortifications.',
    coordinates: [-4.0435, 39.6682],
    historicalHighlight: 'Home to Fort Jesus, built by the Portuguese in 1593 to guard the Old Port, a UNESCO World Heritage Site.'
  },
  {
    id: 'kwale',
    name: 'Kwale',
    capital: 'Kwale',
    description: 'A lush coastal county known for its beautiful white-sand beaches (Diani), mineral wealth, and coastal forests like Shimba Hills.',
    coordinates: [-4.1744, 39.4606],
    historicalHighlight: 'Features the sacred Kaya forests, ancient fortified residential sites of the Mijikenda people, preserved as UNESCO heritage sites.'
  },
  {
    id: 'kilifi',
    name: 'Kilifi',
    capital: 'Kilifi',
    description: 'A scenic coastal county famed for its beautiful creeks, sandy beaches, marine parks, and historical ruins.',
    coordinates: [-3.6307, 39.8499],
    historicalHighlight: 'Home to the Gede Ruins, an abandoned 12th-century Swahili town that displays advanced medieval urban plumbing and architecture.'
  },
  {
    id: 'tana_river',
    name: 'Tana River',
    capital: 'Hola',
    description: 'A vast county named after Kenya\'s longest river, boasting diverse wildlife, riverine forests, and pastoralist cultures.',
    coordinates: [-1.5035, 40.0274],
    historicalHighlight: 'Hola was the site of the infamous Hola detention camp during the Mau Mau emergency, prompting British colonial policy reforms.'
  },
  {
    id: 'lamu',
    name: 'Lamu',
    capital: 'Lamu Town',
    description: 'An archipelago steeped in history, Lamu is the oldest and best-preserved Swahili settlement in East Africa.',
    coordinates: [-2.2717, 40.9020],
    historicalHighlight: 'Lamu Old Town is a UNESCO World Heritage Site, retaining its 14th-century stone houses, narrow streets, and dhow culture.'
  },
  {
    id: 'taita_taveta',
    name: 'Taita-Taveta',
    capital: 'Wundanyi',
    description: 'A picturesque county featuring the spectacular Taita Hills, extensive Tsavo National Park, and mining of precious gemstones like Tsavorite.',
    coordinates: [-3.3994, 38.3644],
    historicalHighlight: 'A major battleground between British and German forces during World War I, leaving rich archaeological relics.'
  },
  {
    id: 'garissa',
    name: 'Garissa',
    capital: 'Garissa',
    description: 'A vibrant commercial hub in northeastern Kenya, located on the Tana River, rich in pastoralist heritage and wildlife.',
    coordinates: [-0.4569, 39.6401],
    historicalHighlight: 'Acts as a critical gateway connecting Kenya to the Horn of Africa, serving as a historic trading hub.'
  },
  {
    id: 'wajir',
    name: 'Wajir',
    capital: 'Wajir',
    description: 'A semi-arid county with a unique history of pastoralist resilience, oasis agriculture, and camel trading.',
    coordinates: [1.7471, 40.0573],
    historicalHighlight: 'Home to the historic Yahut Water Wells, dug centuries ago, which have sustained trade caravans across the dry northern frontier.'
  },
  {
    id: 'mandera',
    name: 'Mandera',
    capital: 'Mandera',
    description: 'The extreme northeastern corner of Kenya bordering both Somalia and Ethiopia, characterized by sun-drenched plains.',
    coordinates: [3.9368, 41.8569],
    historicalHighlight: 'Historically famous for its cross-border cultural interactions and its role as an ancient caravan outpost.'
  },
  {
    id: 'marsabit',
    name: 'Marsabit',
    capital: 'Marsabit',
    description: 'A majestic county featuring a volcanic crater lake (Lake Paradise) in the middle of a desert forest, and home to diverse nomadic communities.',
    coordinates: [2.3369, 37.9902],
    historicalHighlight: 'Fossil sites in Sibiloi National Park on the shores of Lake Turkana have yielded some of the world\'s oldest hominid remains.'
  },
  {
    id: 'isiolo',
    name: 'Isiolo',
    capital: 'Isiolo',
    description: 'The geographic center of Kenya, designated as a resort city under Kenya\'s Vision 2030 development plan.',
    coordinates: [0.3541, 37.5822],
    historicalHighlight: 'Established as an administrative outpost in the early 1920s to manage trade with the northern frontier districts.'
  },
  {
    id: 'meru',
    name: 'Meru',
    capital: 'Meru',
    description: 'A rich agricultural county on the fertile northeastern slopes of Mount Kenya, famous for coffee, tea, and Miraa production.',
    coordinates: [0.0515, 37.6495],
    historicalHighlight: 'Historically governed by the Council of Elders (Njuri Ncheke), an ancient indigenous judicial system recognized by UNESCO.'
  },
  {
    id: 'tharaka_nithi',
    name: 'Tharaka-Nithi',
    capital: 'Chuka',
    description: 'A scenic county featuring the spectacular Chogoria route up Mount Kenya, rushing rivers, and rich agricultural highlands.',
    coordinates: [-0.3292, 37.6453],
    historicalHighlight: 'Known for the legendary Chuka Drummers, whose traditional high-energy acrobatics and drumming are celebrated nationally.'
  },
  {
    id: 'embu',
    name: 'Embu',
    capital: 'Embu',
    description: 'Lying on the windward slopes of Mount Kenya, Embu is a major tea and coffee production hub with beautiful waterfalls.',
    coordinates: [-0.5311, 37.4511],
    historicalHighlight: 'Served as the colonial headquarters of the old Eastern Province, featuring deep-rooted traditions of agriculture.'
  },
  {
    id: 'kitui',
    name: 'Kitui',
    capital: 'Kitui',
    description: 'A dry, mineral-rich county famous for coal deposits in the Mui Basin, honey production, and traditional wood carving.',
    coordinates: [-1.3686, 38.0106],
    historicalHighlight: 'Homeland of Syokimau, a legendary Kamba medicine woman who prophesied the arrival of the Uganda Railway (the Iron Snake).'
  },
  {
    id: 'machakos',
    name: 'Machakos',
    capital: 'Machakos',
    description: 'A fast-growing county bordering Nairobi, hosting the Konza Technopolis ("Silicon Savannah") project.',
    coordinates: [-1.5177, 37.2634],
    historicalHighlight: 'Established in 1887 as the first administrative capital of the Imperial British East Africa Company, before being bypassed by the railway.'
  },
  {
    id: 'makueni',
    name: 'Makueni',
    capital: 'Wote',
    description: 'A pioneer county in decentralized sand-dam water harvesting and mango processing in southeastern Kenya.',
    coordinates: [-1.7808, 37.6291],
    historicalHighlight: 'Mbooni Hills served as a historic refuge and trade hub for Kamba communities during pre-colonial caravan days.'
  },
  {
    id: 'nyandarua',
    name: 'Nyandarua',
    capital: 'Ol Kalou',
    description: 'Located in the Aberdare ranges, Nyandarua is a cold, fertile potato-farming and dairy powerhouse.',
    coordinates: [-0.2644, 36.3789],
    historicalHighlight: 'The primary operational base for the Mau Mau fighters, where General Dedan Kimathi hid and established his headquarters.'
  },
  {
    id: 'nyeri',
    name: 'Nyeri',
    capital: 'Nyeri Town',
    description: 'Situated in the Central Highlands, famous for its rich agricultural output, coffee plantations, and proximity to Mt. Kenya.',
    coordinates: [-0.4211, 36.9472],
    historicalHighlight: 'The epicentre of the Mau Mau liberation struggle and the final resting place of Lord Baden-Powell, founder of the Boy Scouts.'
  },
  {
    id: 'kirinyaga',
    name: 'Kirinyaga',
    capital: 'Kerugoya',
    description: 'Home to the massive Mwea Irrigation Scheme, producing over 80% of Kenya\'s aromatic long-grain rice.',
    coordinates: [-0.4984, 37.2797],
    historicalHighlight: 'Named after Kirinyaga (Mount Kenya), the sacred seat of the creator (Ngai) in traditional Kikuyu mythology.'
  },
  {
    id: 'muranga',
    name: 'Murang\'a',
    capital: 'Murang\'a',
    description: 'The cradle of the Kikuyu community (Mukurwe wa Nyagathanga), famous for coffee, avocados, and the Ndakaini Dam water reservoir.',
    coordinates: [-0.7210, 37.1517],
    historicalHighlight: 'Historically known as Fort Hall, it was a central administrative post during early colonization and the emergency era.'
  },
  {
    id: 'kiambu',
    name: 'Kiambu',
    capital: 'Kiambu',
    description: 'A populous county bordering Nairobi, featuring vast tea estates, high-end real estate, and rapid industrial growth.',
    coordinates: [-1.1643, 36.8313],
    historicalHighlight: 'Home to the historic Githunguri independent schools, established by Jomo Kenyatta in the 1930s to protest colonial educational limits.'
  },
  {
    id: 'turkana',
    name: 'Turkana',
    capital: 'Lodwar',
    description: 'A vast, mineral-rich northern county bordering Lake Turkana (the Jade Sea), containing substantial underground aquifers and petroleum deposits.',
    coordinates: [3.1191, 35.5961],
    historicalHighlight: 'The "Cradle of Mankind," where the famous Turkana Boy (1.5-million-year-old Homo erectus fossil) was discovered by Richard Leakey\'s team.'
  },
  {
    id: 'west_pokot',
    name: 'West Pokot',
    capital: 'Kapenguria',
    description: 'A mountainous county characterized by beautiful scenic ridges, agricultural highlands, and pastoral plains.',
    coordinates: [1.2384, 35.1147],
    historicalHighlight: 'Site of the Kapenguria Cells, where the founding father Jomo Kenyatta and five other nationalists were detained and tried in 1952.'
  },
  {
    id: 'samburu',
    name: 'Samburu',
    capital: 'Maralal',
    description: 'A ruggedly beautiful northern county featuring pristine nature reserves, teeming wildlife, and colorful traditional cultures.',
    coordinates: [1.0968, 36.6980],
    historicalHighlight: 'Maralal House was where Jomo Kenyatta was placed under house arrest in 1961 just before his final release.'
  },
  {
    id: 'trans_nzoia',
    name: 'Trans-Nzoia',
    capital: 'Kitale',
    description: 'A major national maize-production powerhouse located between Mount Elgon and the Cherangany Hills.',
    coordinates: [1.0191, 35.0023],
    historicalHighlight: 'Kitale served as a primary railway terminus in the 1920s to export grain from the large colonial settler farms.'
  },
  {
    id: 'uasin_gishu',
    name: 'Uasin Gishu',
    capital: 'Eldoret',
    description: 'The agricultural breadbasket and the cradle of Kenya\'s world-beating long-distance runners.',
    coordinates: [0.5143, 35.2698],
    historicalHighlight: 'The plateau was originally home to the Uasin Gishu clan of the Maasai, later settled by Afrikaner farmers in the early 1900s.'
  },
  {
    id: 'elgeyo_marakwet',
    name: 'Elgeyo-Marakwet',
    capital: 'Iten',
    description: 'Home of the spectacular Kerio Valley, high-altitude athletic camps, and paragliding hotspots.',
    coordinates: [0.6728, 35.5085],
    historicalHighlight: 'Iten is globally renowned as the "Home of Champions," producing dozens of Olympic and World marathon gold medalists.'
  },
  {
    id: 'nandi',
    name: 'Nandi',
    capital: 'Kapsabet',
    description: 'A lush county characterized by rolling green tea canopies and high-altitude training tracks.',
    coordinates: [0.2031, 35.1054],
    historicalHighlight: 'Birthplace of the legendary Koitalel Arap Samoei, the Nandi Orkoiyot who led an 11-year armed resistance against the British railway construction.'
  },
  {
    id: 'baringo',
    name: 'Baringo',
    capital: 'Kabarnet',
    description: 'A beautiful Rift Valley county famous for spectacular hot springs, Lake Baringo, Lake Bogoria, and rich paleontological fossils.',
    coordinates: [0.4914, 35.7412],
    historicalHighlight: 'The Tugen Hills contain some of the oldest hominid fossils ever found, including Orrorin tugenensis dating back 6 million years.'
  },
  {
    id: 'laikipia',
    name: 'Laikipia',
    capital: 'Nanyuki',
    description: 'A massive high-altitude plateau hosting private wildlife conservancies, the British Army training hub, and spectacular views of Mt. Kenya.',
    coordinates: [0.0150, 37.0722],
    historicalHighlight: 'Laikipia became a critical ranching zone in the early 20th century, later pioneering community-owned wildlife conservancies.'
  },
  {
    id: 'nakuru',
    name: 'Nakuru',
    capital: 'Nakuru City',
    description: 'Located in the Great Rift Valley, famous for its flamingo-filled lake, rich agricultural highlands, and archaeological sites.',
    coordinates: [-0.3031, 36.0800],
    historicalHighlight: 'Close to Hyrax Hill, an archaeological site showing evidence of human habitation dating back 3,000 years.'
  },
  {
    id: 'narok',
    name: 'Narok',
    capital: 'Narok',
    description: 'The home of the world-famous Maasai Mara Game Reserve, wheat farming, and deep-rooted Maasai cultural heritage.',
    coordinates: [-1.0784, 35.8601],
    historicalHighlight: 'The Maasai Mara hosts the Great Wildebeest Migration, named one of the Seven New Wonders of the World.'
  },
  {
    id: 'kajiado',
    name: 'Kajiado',
    capital: 'Kajiado',
    description: 'A vast county stretching to the Amboseli National Park at the foot of Mt. Kilimanjaro, blending industrial cement factories with pastoral lands.',
    coordinates: [-1.8524, 36.7768],
    historicalHighlight: 'Home to Olorgesailie, a world-famous pre-historic hand-axe manufacturing site showing early human tool innovation.'
  },
  {
    id: 'kericho',
    name: 'Kericho',
    capital: 'Kericho',
    description: 'The global capital of black tea, featuring breathtaking, endless rolling green tea plantations and cool highland climates.',
    coordinates: [-0.3689, 35.2863],
    historicalHighlight: 'Home of the Kipsigis community, who resisted early colonial land allocation and established pioneer local tea co-operatives.'
  },
  {
    id: 'bomet',
    name: 'Bomet',
    capital: 'Bomet',
    description: 'A lush agricultural county known for high-yield dairy farming, tea cultivation, and water towers.',
    coordinates: [-0.7811, 35.3416],
    historicalHighlight: 'Historically part of the old Kericho district, it has evolved into an independent agricultural and administrative powerhouse.'
  },
  {
    id: 'kakamega',
    name: 'Kakamega',
    capital: 'Kakamega',
    description: 'Home to the magnificent Kakamega Forest, the only remaining equatorial rainforest patch in Kenya, and thriving sugarcane farming.',
    coordinates: [0.2827, 34.7519],
    historicalHighlight: 'Famous for the Crying Stone of Ilesi, a natural basalt monument that water flows from, wrapped in local Luhya folklore.'
  },
  {
    id: 'vihiga',
    name: 'Vihiga',
    capital: 'Mbale',
    description: 'One of the most densely populated counties in Kenya, characterized by spectacular granite rock kopjes and tea farms.',
    coordinates: [0.0784, 34.7214],
    historicalHighlight: 'Home to the annual Maragoli Cultural Festival, which preserves and celebrates Luhya music, food, and oral histories.'
  },
  {
    id: 'bungoma',
    name: 'Bungoma',
    capital: 'Bungoma',
    description: 'A populous western county bordering Uganda, famous for Mount Elgon, sugar mills, and rich musical heritage.',
    coordinates: [0.5635, 34.5606],
    historicalHighlight: 'Home of Elijah Masinde, the charismatic founder of Dini ya Msambwa, a traditional spiritual movement that resisted colonial rule.'
  },
  {
    id: 'busia',
    name: 'Busia',
    capital: 'Busia',
    description: 'A major international border county on the highway to Uganda, handling the majority of overland trade to Central Africa.',
    coordinates: [0.4608, 34.1115],
    historicalHighlight: 'Served as an ancient migration route and meeting point between Bantu and Nilotic communities entering Kenya.'
  },
  {
    id: 'siaya',
    name: 'Siaya',
    capital: 'Siaya',
    description: 'Bordering Lake Victoria, Siaya is a cultural cradle famous for its academics, literary giants, and fish industry.',
    coordinates: [-0.0612, 34.2882],
    historicalHighlight: 'Home to Kogelo village, the ancestral home of Barack Obama Sr., father of the 44th President of the United States.'
  },
  {
    id: 'kisumu',
    name: 'Kisumu',
    capital: 'Kisumu City',
    description: 'A vibrant port city on Lake Victoria, serving as a hub for lake commerce and the ancestral homeland of the Luo community.',
    coordinates: [-0.1022, 34.7617],
    historicalHighlight: 'Founded in 1901 as "Port Florence", the terminal point of the Uganda Railway on Lake Victoria.'
  },
  {
    id: 'homa_bay',
    name: 'Homa Bay',
    capital: 'Homa Bay',
    description: 'Boasts the longest shoreline of Lake Victoria, famous for fish trade, Ruma National Park (home of the rare Roan Antelope), and beautiful volcanic islands.',
    coordinates: [-0.5273, 34.4571],
    historicalHighlight: 'Home to Tom Mboya Mausoleum on Rusinga Island, celebrating one of Kenya\'s most brilliant young founding nationalists.'
  },
  {
    id: 'migori',
    name: 'Migori',
    capital: 'Migori',
    description: 'A diverse, mineral-rich county bordering Tanzania, known for gold mining, agriculture, and cross-border trade.',
    coordinates: [-1.0634, 34.4731],
    historicalHighlight: 'Features the Thimlich Ohinga dry-stone walled ruins, a UNESCO World Heritage Site dating back to the 15th century.'
  },
  {
    id: 'kisii',
    name: 'Kisii',
    capital: 'Kisii',
    description: 'A densely populated, highly fertile highlands county famous for producing soapstone carvings, bananas, and high-quality tea.',
    coordinates: [-0.6817, 34.7717],
    historicalHighlight: 'Home of the Gusii resistance led by prophetess Moraa Ng\'iti against early British punitive expeditions in the early 1900s.'
  },
  {
    id: 'nyamira',
    name: 'Nyamira',
    capital: 'Nyamira',
    description: 'A lush agricultural county in the Nyanza highlands, famed for high-yield tea farms, coffee, and dairy husbandry.',
    coordinates: [-0.5634, 34.9358],
    historicalHighlight: 'Part of the historic Gusii highland settlements, preserving deep oral traditions of agricultural self-reliance.'
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    capital: 'Nairobi City',
    description: 'The green city in the sun, originating from a swampy Maasai watering hole and growing into East Africa\'s economic powerhouse.',
    coordinates: [-1.2921, 36.8219],
    historicalHighlight: 'Founded in 1899 as a simple railway depot on the Uganda Railway, replacing Machakos as the capital in 1907.'
  }
];

export const LEADERS: LeaderData[] = [
  {
    name: 'Dedan Kimathi',
    years: '1920 – 1957',
    title: 'Field Marshal, Mau Mau Movement',
    legacy: 'Led the armed military struggle against British colonial rule from the Aberdare forests. A symbol of revolutionary courage and unwavering patriotism.',
    imagePrompt: 'A powerful afro-futuristic portrait of Dedan Kimathi wearing dreadlocks, standing proudly in the lush green Aberdare forest with soft golden sunlight.'
  },
  {
    name: 'Mzee Jomo Kenyatta',
    years: '1963 – 1978',
    title: 'First President & Founding Father',
    legacy: 'Led Kenya to independence, popularized the national motto "Harambee" (Let us pull together), and established Kenya as an economically stable, sovereign republic.',
    imagePrompt: 'A majestic digital painting of Mzee Jomo Kenyatta holding his iconic beaded fly-whisk, wearing a traditional leather cap and formal suit.'
  },
  {
    name: 'Wangari Maathai',
    years: '1940 – 2011',
    title: 'Nobel Peace Prize Laureate & Founder',
    legacy: 'Founded the Green Belt Movement, mobilizing communities to plant over 50 million trees. First African woman to win the Nobel Peace Prize (2004) for her contribution to sustainable development and democracy.',
    imagePrompt: 'A bright, warm portrait of Prof. Wangari Maathai smiling, wrapped in colorful African head-tie and kitenge, holding a green sapling in her hands.'
  },
  {
    name: 'Eliud Kipchoge',
    years: '1984 – Present',
    title: 'Marathon Legend & Double Olympic Champion',
    legacy: 'The greatest marathoner in history, proving that "No Human Is Limited" by breaking the 2-hour marathon barrier (1:59:40) in Vienna in 2019.',
    imagePrompt: 'An athletic and inspiring portrait of Eliud Kipchoge running with a peaceful focus on a high-altitude red clay training track in Kaptagat, surrounded by green trees.'
  }
];

export const HISTORICAL_YEARS: HistoricalYearData[] = [
  {
    year: 1895,
    isFuture: false,
    title: 'The Great Frontier',
    era: 'Pre-Colonial & Early Protectorate',
    leader: 'Traditional Council of Elders / local Kings (e.g., Nabongo Mumia)',
    leaderTitle: 'Traditional Rulers',
    leaderBio: 'Sovereign decentralised nations governed by Councils of Elders (like the Kikuyu Kiama or Luo Buch Piny) and notable kings like Nabongo Mumia of Wanga.',
    population: 'Estimated 2.5 Million',
    technology: 'Iron-smithing, indigenous herbal medicine, astronomical stone calendars (Namoratunga).',
    transport: 'Caravans, walking trails, oxen carts, traditional wooden dhows on the coast.',
    music: 'Traditional polyrhythmic drums, stringed lyres (Nyatiti), horn trumpets (Ondati), spiritual dances.',
    language: 'Indigenous languages (Kikuyu, Dholuo, Kalenjin, Maa, etc.) and Coastal Swahili.',
    environment: 'Untamed pristine rainforests, vast open savannahs teeming with massive wildlife herds, undisturbed ecosystems.',
    description: 'The British Government declares the East Africa Protectorate. Outside of coastal Swahili city-states, the interior is dominated by thriving traditional African kingdoms and communities living in harmony with nature.',
    kiswahiliSummary: 'Uingereza inatangaza Himaya ya Afrika Mashariki. Jamii za kiasili zinaishi kwa amani na utamaduni wao thabiti.',
    facts: [
      'The coast had been a global trading hub for over a thousand years, exchanging goods with Arabia, Persia, India, and China.',
      'The interior communities used complex barter trade networks, utilizing cowrie shells and iron beads as currency.',
      'Traditional architecture consisted of beautifully designed mud, clay, and grass-thatched huts engineered for perfect climate control.'
    ],
    events: [
      {
        title: 'Protectorate Declaration',
        description: 'The British Foreign Office officially declares a protectorate over East Africa, beginning formal imperialism.',
        category: 'politics'
      },
      {
        title: 'Uganda Railway Surveys',
        description: 'British surveyors begin mapping out the path of a railway connecting Mombasa port to Lake Victoria.',
        category: 'infrastructure'
      }
    ]
  },
  {
    year: 1900,
    isFuture: false,
    title: 'The Iron Snake Arrives',
    era: 'Railway Construction Boom',
    leader: 'Sir Arthur Hardinge',
    leaderTitle: 'British Consul General',
    leaderBio: 'The head colonial administrator overseeing the initial layout of the protectorate and the construction of the railway.',
    population: 'Estimated 2.8 Million',
    technology: 'Steam engines, early telegraph lines along the rail tracks, industrial railway machinery.',
    transport: 'Steam locomotives, early horse carriages, dhows.',
    music: 'Indian railway work songs, early coastal Taarab, traditional instruments.',
    language: 'English, Swahili, Punjabi (brought by railway workers), local dialects.',
    environment: 'Swamps being drained, massive forests cleared around the Great Rift Valley for railway fuel.',
    description: 'Nairobi is founded as a modest rail depot in a swampy area known by the Maasai as "Enkare Nyrobi" (place of cool waters). The Uganda Railway, dubbed "The Iron Snake" by local prophets, crawls inland from Mombasa.',
    kiswahiliSummary: 'Nairobi inaanzishwa kama kituo kidogo cha reli kwenye dongo lenye kinamasi. Reli inaanza kubadilisha nchi.',
    facts: [
      'Nairobi replaced Machakos as the railroad headquarters because Machakos was too hilly for trains.',
      'The construction of the railway bridge over Tsavo River was halted for months by two notorious man-eating lions.',
      'Over 32,000 indentured laborers from British India were imported to construct the railway, giving rise to Kenya\'s Asian community.'
    ],
    events: [
      {
        title: 'Establishment of Nairobi Depot',
        description: 'A tent city is erected in Nairobi to store rail building materials, forever changing the geography of East Africa.',
        category: 'infrastructure'
      },
      {
        title: 'Tsavo Man-Eaters Incident',
        description: 'Lions terrorize railway workers in Tsavo, killing dozens before being hunted down by Lt. Col. John Patterson.',
        category: 'nature'
      }
    ]
  },
  {
    year: 1910,
    isFuture: false,
    title: 'The White Highlands',
    era: 'Early Colonial Settlement',
    leader: 'Sir Percy Girouard',
    leaderTitle: 'Governor of East Africa',
    leaderBio: 'Governor who promoted white settler agriculture, facilitating land acquisition in the fertile Rift Valley and Central regions.',
    population: 'Estimated 3.1 Million',
    technology: 'Telegraph network, agricultural milling machines, printing presses for early newspapers.',
    transport: 'Steam trains, ox-drawn wagons, early wooden buses, rare imported motor cars.',
    music: 'Early gramophone recordings, British military brass bands, Swahili coastal poetry sessions.',
    language: 'English, Kiswahili (lingua franca), settler slang, ethnic languages.',
    environment: 'Vast tracts of ancestral land cleared for structured coffee, tea, and sisal plantations.',
    description: 'Foreign settlers arrive in large numbers, claiming the fertile central highlands. Indigenous populations are pushed into native reserves, laying the seeds of future land-rights resistance.',
    kiswahiliSummary: 'Wakulima Wazungu wanawasili kwa wingi na kuchukua ardhi yenye rutuba ya nyanda za juu.',
    facts: [
      'The "East African Standard" newspaper, one of Kenya\'s oldest papers, established its foothold during this decade.',
      'Lord Delamere became the unofficial leader of the white settlers, pioneering large-scale wheat and cattle farming.',
      'Indigenous systems of agriculture were banned or severely limited in fertile settler-designated areas.'
    ],
    events: [
      {
        title: 'Land Ordinance Act',
        description: 'Colonial laws formalize the eviction of local communities from fertile volcanic lands to create white settler estates.',
        category: 'politics'
      },
      {
        title: 'Mombasa-Nairobi Road Connection',
        description: 'An extremely rough dirt trail is carved out, allowing brave drivers to attempt the journey between the major hubs.',
        category: 'infrastructure'
      }
    ]
  },
  {
    year: 1920,
    isFuture: false,
    title: 'Birth of Kenya Colony',
    era: 'Official Colonization & Resistance',
    leader: 'Harry Thuku',
    leaderTitle: 'Nationalist Pioneer',
    leaderBio: 'A brilliant young clerk who founded the East Africa Association, organizing the earliest mass protests against colonial forced labor and tax.',
    population: 'Estimated 3.5 Million',
    technology: 'Early radio receiver experiments, commercial telephone switchboards in cities, industrial coffee processing.',
    transport: 'Model T Fords, steam trains, rickshaws in Mombasa, motorbikes.',
    music: 'Early jazz fusion in coastal bars, traditional political protest songs.',
    language: 'English, Swahili, early urban hybrid dialects.',
    environment: 'Establishment of colonial boundaries, timber mills logging indigenous cedar forests.',
    description: 'The East Africa Protectorate officially becomes "Kenya Colony." Simultaneously, the first modern political resistance begins as Harry Thuku mobilizes thousands against the Kipande (identity card) and forced labor laws.',
    kiswahiliSummary: 'Himaya inakuwa Koloni rasmi la Kenya. Harakati za kwanza za kisiasa dhidi ya kikoloni zinaanza chini ya Harry Thuku.',
    facts: [
      'Kenya was named after Mount Kenya (Kirinyaga), meaning "Mountain of Whiteness" in local language.',
      'The colonial "Kipande" system forced African men to wear a heavy metal container with their fingerprints around their necks.',
      'In 1922, a massive demonstration outside Nairobi Central Police Station led by women demanded Thuku\'s release.'
    ],
    events: [
      {
        title: 'Annexation of Kenya Colony',
        description: 'The British crown formally annexes the interior as a Crown Colony, while the coastal strip remains a Protectorate.',
        category: 'politics'
      },
      {
        title: 'Founding of East Africa Association',
        description: 'Harry Thuku forms the association, uniting different ethnic groups to fight oppressive labor taxes.',
        category: 'politics'
      }
    ]
  },
  {
    year: 1930,
    isFuture: false,
    title: 'Urban Awakening',
    era: 'Growth of Nairobi Municipal Council',
    leader: 'Alibhai Mulla Jeevanjee',
    leaderTitle: 'Philanthropist & Pioneer',
    leaderBio: 'An influential merchant and political leader who built much of early Nairobi and founded the country\'s first newspaper to champion equal rights.',
    population: 'Estimated 4.0 Million',
    technology: 'Cinema theatres (showing silent movies), electrical grids in major towns, commercial banking.',
    transport: 'Scheduled passenger buses, steam trains, sleek 1930s sedans.',
    music: 'Accordion-based Kikuyu music (pioneered by Mwangi wa Gachiriri), early Swahili coastal Rhumba.',
    language: 'Kiswahili, English, Kikuyu, Luo, Sheng (emerging early roots in Nairobi slums).',
    environment: 'Nairobi grows exponentially with organized residential segregation (European, Asian, and African quarters).',
    description: 'Nairobi gains municipal status and builds its central business district. African workers organize welfare associations, and native newspapers start circulating, raising political awareness.',
    kiswahiliSummary: 'Nairobi inakua haraka kama manispaa. Vyombo vya habari vya wenyeji vinaanza kuchapishwa.',
    facts: [
      'Jeevanjee Gardens in Nairobi was donated by Alibhai Mulla Jeevanjee as a recreation park for the public.',
      'The Kipande system was heavily protested through clever satirical songs distributed secretly on vinyl shellac discs.',
      'Gold was discovered in Kakamega, leading to a minor gold rush that temporarily drew settlers west.'
    ],
    events: [
      {
        title: 'Nairobi Municipal Charter',
        description: 'Nairobi is officially chartered, establishing structured municipal planning and public works.',
        category: 'infrastructure'
      },
      {
        title: 'Kakamega Gold Rush',
        description: 'Thousands of prospectors head to Western Kenya, leading to displacement of local communities.',
        category: 'nature'
      }
    ]
  },
  {
    year: 1940,
    isFuture: false,
    title: 'The Global Struggle',
    era: 'World War II Era',
    leader: 'Eliud Mathu',
    leaderTitle: 'First African MLC Member',
    leaderBio: 'The first African appointed to the colonial Legislative Council (LegCo), advocating for African education and labor rights.',
    population: 'Estimated 4.6 Million',
    technology: 'Radio broadcasting station (Cable & Wireless Ltd), military communications, early cinema newsreels.',
    transport: 'Military jeeps, cargo trains, early civilian airfield operations at Eastleigh.',
    music: 'Big Band Jazz, British swing, acoustic guitars introduced by returning soldiers.',
    language: 'English, Swahili, Military jargon, emerging vernacular literature.',
    environment: 'Rationing of resources, expansion of military barracks, intensive farming to supply Allied troops.',
    description: 'Over 100,000 Kenyan soldiers are drafted into the King\'s African Rifles to fight in WWII across Burma, Egypt, and Ethiopia. Returning soldiers bring back political ideas of self-determination and combat skills.',
    kiswahiliSummary: 'Kikosi cha wanajeshi wa Kenya kinatumwa kupigana kwenye Vita Kuu ya Pili. Wanarudi na ari ya ukombozi.',
    facts: [
      'Returning soldiers realized that Europeans were not invincible, destroying the myth of colonial superiority.',
      'Nairobi Eastleigh Airport served as a major strategic royal air force hub during the global conflict.',
      'The colonial administration imposed heavy agricultural quotas, causing widespread rural economic distress.'
    ],
    events: [
      {
        title: 'Mobilization of African Soldiers',
        description: 'Kenyans are conscripted into the army, exposing them to international geopolitical struggles.',
        category: 'politics'
      },
      {
        title: 'Appointment of Eliud Mathu',
        description: 'Under pressure, the Governor appoints the first African to the legislative council, a minor democratic concession.',
        category: 'politics'
      }
    ]
  },
  {
    year: 1952,
    isFuture: false,
    title: 'The Forest War',
    era: 'The Mau Mau Emergency',
    leader: 'Field Marshal Dedan Kimathi',
    leaderTitle: 'Mau Mau Supreme Commander',
    leaderBio: 'The legendary guerrilla leader who organized the Kenya Land and Freedom Army (Mau Mau) in the deep forests of the Aberdares.',
    population: 'Estimated 5.8 Million',
    technology: 'Military radio transmitters, aerial bombing planes, advanced field guerrilla camouflage.',
    transport: 'Armored trucks, military aircraft, forest tracking trails.',
    music: 'Mau Mau freedom hymns (sung to Christian melodies in secret meetings), acoustic guitar ballads.',
    language: 'Vernacular codes, Swahili, military English.',
    environment: 'Dense central forest reserves declared closed military zones, barbed-wire detention camps erected.',
    description: 'Governor Evelyn Baring declares a State of Emergency. The Mau Mau launch a fierce armed struggle for "Land and Freedom" from Mount Kenya forests, met with brutal colonial detention camps.',
    kiswahiliSummary: 'Hali ya Hatari inatangazwa. Wapigania uhuru wa Mau Mau wanaingia msituni kupigania ardhi na ukombozi.',
    facts: [
      'Princess Elizabeth was on a holiday at Treetops Hotel in Nyeri, Kenya, when her father died, making her Queen of England.',
      'The Mau Mau used extremely sophisticated secret signaling networks using birdcalls and bent twigs.',
      'Over one million Kikuyu citizens were forced into fortified colonial villages to isolate them from forest fighters.'
    ],
    events: [
      {
        title: 'Declaration of Emergency',
        description: 'The British colonial state suspends civil liberties, launching Operation Jock Scott to arrest nationalist leaders.',
        category: 'politics'
      },
      {
        title: 'Arrest of the Kapenguria Six',
        description: 'Jomo Kenyatta, Bildad Kaggia, Ramogi Achieng Oneko, Paul Ngei, Fred Kubai, and Kung\'u Karumba are jailed.',
        category: 'politics'
      }
    ]
  },
  {
    year: 1963,
    isFuture: false,
    title: 'Uhuru Sasa!',
    era: 'Independence Day (Dec 12)',
    leader: 'Mzee Jomo Kenyatta',
    leaderTitle: 'Prime Minister / First President',
    leaderBio: 'The charismatic nationalist who emerged from colonial detention to lead Kenya into a sovereign, independent republic.',
    population: 'Estimated 8.9 Million',
    technology: 'Black and white television (KBC launch), national radio grid, early agricultural research laboratories.',
    transport: 'Classic British saloons (Peugeot 404, Ford Cortina), steam and early diesel trains, colorful municipal buses.',
    music: 'Classic Kenyan Twist, early Benga music, patriotic choirs, Swahili coastal Rhumba.',
    language: 'English (official), Kiswahili (national), vernacular languages.',
    environment: 'National flags unfurled, British statues dismantled, colonial boundaries replaced with national administrative units.',
    description: 'On December 12th, the Union Jack is lowered and the Kenyan flag is hoisted at Uhuru Gardens. Kenya achieves independence, ushering in an era of national rebuilding under the motto "Harambee!"',
    kiswahiliSummary: 'Mamlaka ya bendera ya Uingereza yanatamatika. Kenya inapata Uhuru wake Desemba 12, huku kaulimbiu ikiwa Harambee!',
    facts: [
      'The Kenyan national anthem was adapted from a traditional Pokomo lullaby, chosen by a dedicated music commission.',
      'The peak of Mount Kenya was climbed on independence night by Kisoi Munyao to hoist the national flag and light a flare.',
      'The flag colors represent: Black for the people, Red for the blood shed during liberation, Green for the natural wealth, and White for peace.'
    ],
    events: [
      {
        title: 'Independence Day Ceremony',
        description: 'A massive celebration takes place at Uhuru Gardens in Nairobi, attended by global leaders and massive crowds.',
        category: 'politics'
      },
      {
        title: 'Launch of Kenya Broadcasting Corporation',
        description: 'State television and radio are established to broadcast news and local cultural programs.',
        category: 'culture'
      }
    ]
  },
  {
    year: 1978,
    isFuture: false,
    title: 'The Nyayo Era Begins',
    era: 'Transition of Power',
    leader: 'Mzee Daniel arap Moi',
    leaderTitle: 'Second President of Kenya',
    leaderBio: 'The former teacher who became Vice President and succeeded Kenyatta, introducing the "Nyayo" philosophy of Peace, Love, and Unity.',
    population: 'Estimated 14.8 Million',
    technology: 'Color television broadcasting, automatic telephone switching, regional hydroelectric power grids.',
    transport: 'Peugeot 504 matatus, diesel-powered trains, Kenya Airways (established 1977) flying international routes.',
    music: 'Classic Benga (by Joseph Kamaru, D.O. Misiani), Swahili dance bands (Les Wanyika, Simba Wanyika).',
    language: 'Kiswahili, English, Sheng (gaining massive popularity among youth in Nairobi).',
    environment: 'Aggressive reforestation campaigns, protection of elephant populations from ivory poaching.',
    description: 'Following the peaceful passing of Jomo Kenyatta, Daniel arap Moi takes the oath of office. He travels across counties, distributing free school milk and building "gabions" to control soil erosion.',
    kiswahiliSummary: 'Kufuatia kufariki kwa Jomo Kenyatta, Daniel arap Moi anakuwa Rais wa pili na kuanzisha falsafa ya Nyayo.',
    facts: [
      'President Moi introduced free primary school milk ("Maziwa ya Nyayo"), drastically increasing primary school enrollment.',
      'Kenya Airways, "The Pride of Africa", began operations after the collapse of the East African Community.',
      'National wildlife conservation reached a critical peak, setting up anti-poaching units to protect rhinos and elephants.'
    ],
    events: [
      {
        title: 'Passing of Jomo Kenyatta',
        description: 'The founding father dies peacefully in Mombasa, leading to a smooth constitutional transition of power.',
        category: 'politics'
      },
      {
        title: 'Introduction of Maziwa ya Nyayo',
        description: 'A historic social welfare program is launched, providing free packed milk to millions of primary school pupils daily.',
        category: 'culture'
      }
    ]
  },
  {
    year: 1985,
    isFuture: false,
    title: 'The Rise of Sheng',
    era: 'Economic Adaptation & Pop Culture',
    leader: 'Daniel arap Moi',
    leaderTitle: 'President of Kenya',
    leaderBio: 'Consolidating power in a single-party state while expanding the education sector and building universities across the republic.',
    population: 'Estimated 19.6 Million',
    technology: 'Cassette tape players, local assembly of electronic appliances, early computer trials in state corporations.',
    transport: 'Artistically decorated "Matatus" running on urban routes, Suzuki Maruti microcars, Nyayo buses.',
    music: 'Early hip hop influences, Zilizopendwa coastal classics, energetic gospel choirs.',
    language: 'Kiswahili, English, Sheng (fully structured urban dialect with sub-neighborhood slang).',
    environment: 'Expansion of arid land irrigation schemes, rise of dense informal urban settlements.',
    description: 'Kenya shifts to the 8-4-4 education system. The informal industrial sector, "Jua Kali" (Hot Sun), is recognized and funded, turning into the country\'s largest employer.',
    kiswahiliSummary: 'Mfumo wa elimu wa 8-4-4 unaanzishwa. Sekta ya Jua Kali inapata umaarufu mkubwa.',
    facts: [
      'The "Jua Kali" sector was so named because artisans worked under the scorching hot sun in open markets.',
      'Matatus began decorating their bodies with vibrant hand-painted pop culture murals and installing loud sound systems.',
      'Sheng, initially a code language to hide secrets from parents, evolved into a rich, creative language representing urban identity.'
    ],
    events: [
      {
        title: 'Launch of 8-4-4 Curriculum',
        description: 'The educational system is overhauled to emphasize practical vocational skills and Jua Kali training.',
        category: 'culture'
      },
      {
        title: 'Jua Kali Sector Formalization',
        description: 'The government allocates land and grants licenses to open-air metalworkers and carpenters in Gikomba.',
        category: 'infrastructure'
      }
    ]
  },
  {
    year: 1995,
    isFuture: false,
    title: 'The Cyber Revolution',
    era: 'Multiparty Democracy & Early Digital',
    leader: 'Kenneth Matiba / Jaramogi Oginga Odinga',
    leaderTitle: 'Opposition Trailblazers',
    leaderBio: 'Nationalist champions who fought tirelessly for the repeal of Section 2A, ushering in multi-party democratic freedom.',
    population: 'Estimated 27.2 Million',
    technology: 'Dial-up Internet, commercial cybercafes, early cellular mobile networks (KenCell/Safaricom foundations).',
    transport: 'Nissan matatus, imported Japanese second-hand sedans, commuter trains.',
    music: 'Early Kapuka and Genge music (pioneering Kenyan hip-hop), Benga classics, Congolese Soukous domination.',
    language: 'Sheng, Swahili, English.',
    environment: 'Threats to Karura Forest resisted by environmental activists led by Wangari Maathai.',
    description: 'Following the repeal of Section 2A in 1991, Kenya enjoys democratic multi-party elections. Concurrently, the first internet connections arrive, and cybercafes crop up across Nairobi, connecting Kenya to the world.',
    kiswahiliSummary: 'Demokrasia ya vyama vingi inachukua mkondo huku teknolojia ya mtandao na "Cybercafe" zikianza kuonekana.',
    facts: [
      'Karura Forest in Nairobi was saved from luxury housing developers by Wangari Maathai, who faced armed guards to plant trees.',
      'Cybercafes charged by the minute, with users patiently waiting for images to load on slow dial-up speeds.',
      'Kenyan hip hop was born in clubs like Florida 2000, fusing local stories, Sheng, and American beats.'
    ],
    events: [
      {
        title: 'Battle for Karura Forest',
        description: 'Prof. Wangari Maathai leads a highly publicized ecological defense of the city\'s green lung, suffering injuries but winning.',
        category: 'nature'
      },
      {
        title: 'Arrival of Commercial Internet',
        description: 'The first local ISPs set up satellite linkups, launching a digital revolution that would transform East Africa.',
        category: 'infrastructure'
      }
    ]
  },
  {
    year: 2005,
    isFuture: false,
    title: 'The Economic Renaissance',
    era: 'The Kibaki Coalition Era',
    leader: 'Mwai Kibaki',
    leaderTitle: 'Third President of Kenya',
    leaderBio: 'A brilliant economist who revitalized Kenya\'s stalled economy, introduced Free Primary Education, and initiated Vision 2030.',
    population: 'Estimated 35.6 Million',
    technology: 'Nokia mobile phones, early mobile money prototypes, high-speed optic fiber planning, widescreen flatscreen TVs.',
    transport: 'Toyota Hiace matatus, heavy infrastructure road projects, boda-boda (motorcycle taxis) boom.',
    music: 'The golden age of Ogopa Deejays, Calif Records, Genge (Nonini, Juacali), Kapuka (Nameless, E-Sir).',
    language: 'Sheng, English, Kiswahili.',
    environment: 'Rehabilitation of the Mau Forest complex, planting of urban bamboo greenbelts.',
    description: 'Under President Mwai Kibaki, Kenya undergoes an economic revival. Free Primary Education is declared, bringing millions of children to class. The country begins designing massive technological blueprints like Vision 2030.',
    kiswahiliSummary: 'Rais Kibaki anaimarisha uchumi. Elimu ya msingi inatolewa bure na kupatikana kwa mamilioni ya watoto.',
    facts: [
      'Free Primary Education allowed an 84-year-old great-grandfather, Kimani Maruge, to enroll in standard one, breaking a world record.',
      'The informal "Boda Boda" motorcycle taxi industry exploded, offering fast transport through congested urban roads.',
      'The "Silicon Savannah" blueprint was born, outlining the construction of tech cities and high-speed data trunks.'
    ],
    events: [
      {
        title: 'Free Primary Education Declaration',
        description: 'A sweeping social policy eliminates school fees overnight, leading to a massive spike in student enrollment.',
        category: 'culture'
      },
      {
        title: 'Nairobi-Thika Superhighway Design',
        description: 'Engineers begin drafting plans for Kenya\'s first multi-lane, world-class highway system.',
        category: 'infrastructure'
      }
    ]
  },
  {
    year: 2015,
    isFuture: false,
    title: 'The Silicon Savannah',
    era: 'Infrastructure & Tech Maturity',
    leader: 'Uhuru Kenyatta',
    leaderTitle: 'Fourth President of Kenya',
    leaderBio: 'Led Kenya during a period of massive infrastructural transformation, decentralized governance (devolution), and tech expansion.',
    population: 'Estimated 45.4 Million',
    technology: 'M-Pesa dominance, smartphone ecosystem, local tech startups, digital government services (e-Citizen), 4G LTE.',
    transport: 'Modern SGR Train (Mombasa-Nairobi), Uber/Taxify, ride-hailing bikes, modern transit buses.',
    music: 'Afropop fusion (Sauti Sol), local drill, Gengetone (urban youth music), digital streaming platforms.',
    language: 'Sheng, English, Kiswahili.',
    environment: 'National ban on single-use plastic carrier bags, expansion of geothermal power fields in Olkaria.',
    description: 'Kenya becomes the global capital of mobile money. The Standard Gauge Railway (SGR) replaces the old colonial line. Devolution establishes 47 county governments, distributing national wealth to rural communities.',
    kiswahiliSummary: 'M-Pesa inatawala miamala ya kifedha duniani. Reli mpya ya SGR inazinduliwa na ugatuzi unaanza.',
    facts: [
      'M-Pesa processed transaction volumes equivalent to over 40% of Kenya\'s GDP, making the country a fintech pioneer.',
      'Kenya passed a historic law banning plastic carrier bags, imposing some of the strictest environmental fines in the world.',
      'The SGR train, "Madaraka Express", shortened the journey between Nairobi and Mombasa from 12 hours to just 4.5 hours.'
    ],
    events: [
      {
        title: 'Launch of Madaraka Express',
        description: 'The Standard Gauge Railway is completed, representing the largest infrastructure project since independence.',
        category: 'infrastructure'
      },
      {
        title: 'Plastic Bags Ban',
        description: 'A revolutionary ecological policy successfully cleans up cities and protects livestock from plastic ingestion.',
        category: 'nature'
      }
    ]
  },
  {
    year: 2026,
    isFuture: false,
    title: 'The Geothermal Pioneer',
    era: 'Present Day',
    leader: 'Dr. William Samoei Ruto',
    leaderTitle: 'Fifth President of Kenya',
    leaderBio: 'Focuses on the "Bottom-Up" economic agenda, digital economy, agricultural subsidies, and pioneering green energy on the global stage.',
    population: '53.5 Million',
    technology: '5G network rollouts, local smartphone assembly, AI startup ecosystems, digital ID, mobile micro-investing platforms.',
    transport: 'Electric matatus (BasiGo), Nairobi Expressway, electric boda-bodas, smart traffic management.',
    music: 'Arbapop, Kenyan Amapiano, Afro-fusion, Spotify/Apple Music playlist chart-toppers.',
    language: 'Modern Sheng, Kiswahili, English, bilingual corporate tech speak.',
    environment: 'Target of planting 15 billion trees by 2032, 90%+ national grid powered by renewable green sources.',
    description: 'Kenya stands as a global green energy titan, with over 90% of electricity derived from geothermal, hydro, wind, and solar. Nairobi thrives as a bustling modern metropolis with sleek electric public transport.',
    kiswahiliSummary: 'Kenya inaongoza kwa nishati jadidifu duniani. Nairobi ni kitovu cha biashara, usafiri wa umeme, na 5G.',
    facts: [
      'Over 90% of Kenya\'s electricity is renewable, primarily fueled by massive steam-geothermal wells in the Rift Valley (Olkaria).',
      'Nairobi boasts a thriving electric vehicle ecosystem, with startups manufacturing electric matatus and bikes locally.',
      'The Nairobi Expressway, a majestic elevated highway, allows commuters to cross the city in under 20 minutes.'
    ],
    events: [
      {
        title: 'African Climate Summit',
        description: 'Nairobi hosts the inaugural continental summit, positioning Kenya as a global leader in green climate action.',
        category: 'politics'
      },
      {
        title: 'Silicon Savannah 5G Rollout',
        description: 'Ultra-fast 5G reaches rural townships, enabling smart farming and remote tech micro-work.',
        category: 'infrastructure'
      }
    ]
  },
  {
    year: 2050,
    isFuture: true,
    title: 'The Solarpunk Metro',
    era: 'Speculative Future (AI Prediction)',
    leader: 'National AI-Human Advisory Council',
    leaderTitle: 'Sovereign Decentralised Government',
    leaderBio: 'A cutting-edge collaborative direct-democracy council powered by real-time citizen polling, audited by ethical quantum-AI guides.',
    population: '75 Million',
    technology: 'Quantum cloud computing, vertical aeroponic smart-farms, ambient wireless charging, bioluminescent street lighting.',
    transport: 'Nairobi-Mombasa Hyperloop (20 mins), automated solar-gliders, vertical takeoff eVTOL pods.',
    music: 'Neuro-synaptic soundscapes, holographic live concerts, traditional-cyber benga fusion.',
    language: 'Unified Swahili-Sheng-Quantum Code (highly efficient, expressive hybrid language).',
    environment: 'Carbon-negative cities, zero-waste vertical agricultural towers, full restoration of historic forest corridors.',
    description: 'Nairobi has transformed into a breathtaking Solarpunk metropolis. Skyscrapers are wrapped in living photo-voltaic algae, public transport floats silently on magnetic tracks, and smart agriculture feeds the nation fully.',
    kiswahiliSummary: 'Utabiri wa AI: Nairobi inakuwa jiji la kijani kibichi linalotumia umeme wa jua na usafiri wa sumaku.',
    facts: [
      'Nairobi\'s building facades are fully active solar collectors, generating surplus electricity shared with rural micro-grids.',
      'The "Great Rift Wildlife Corridor" is completely restored, allowing elephants to migrate through automated wildlife-only underpasses.',
      'Hovering solar matatus transport commuters along magnetic altitude lanes, eliminating traffic congestion forever.'
    ],
    events: [
      {
        title: 'Hyperloop Inauguration',
        description: 'The East African Hyperloop goes live, linking Kisumu, Nairobi, and Mombasa ports in a closed vacuum-tube transit loop.',
        category: 'infrastructure'
      },
      {
        title: 'Zero-Emission Capital Decree',
        description: 'Nairobi becomes the first completely carbon-negative megacity in the southern hemisphere.',
        category: 'nature'
      }
    ]
  },
  {
    year: 2100,
    isFuture: true,
    title: 'The Quantum Savannah',
    era: 'Speculative Future (AI Prediction)',
    leader: 'Global Swahili Galactic Consulate',
    leaderTitle: 'Planetary Representatives',
    leaderBio: 'A unified East African governing system representing Kenya on the Planetary and Orbital Space Exploration Councils.',
    population: '95 Million',
    technology: 'Matter replication, anti-gravity levitation, climate-harmonizing atmospheric shields, neural knowledge synthesis.',
    transport: 'Equatorial Space Elevator (anchored at Mombasa), inter-continental vacuum tunnels, teleportation nodes.',
    music: 'Galactic Afro-Beat, direct emotional telepathic harmony, ambient orbital frequencies.',
    language: 'Telepathic Kiswahili (direct concept transfer), galactic-standard English.',
    environment: 'Fully balanced biosphere, molecular waste recycling, artificial rain-generation grids ensuring perfect Rift Valley harvests.',
    description: 'Kenya hosts the East African Equatorial Space Elevator, launching orbital spacecraft. Nairobi and Mombasa have merged into a massive green ribbon-metropolis, completely in sync with nature, powered by geothermal and deep-space solar arrays.',
    kiswahiliSummary: 'Utabiri wa AI: Kenya inazindua Kinu cha Angani (Space Elevator) Mombasa, ikisafirisha abiria kwenda angani.',
    facts: [
      'Mombasa Port hosts the base anchor of the Equatorial Space Elevator, a carbon-nanotube tether reaching geostationary orbit.',
      'The Sahara-Sahel expansion has been completely halted and reversed through smart molecular terraforming led by Kenyan bio-engineers.',
      'Physical currency is obsolete; resources are allocated dynamically based on absolute ecological harmony indices.'
    ],
    events: [
      {
        title: 'Equatorial Space Elevator Launch',
        description: 'The "Kipande Heights" elevator begins commercial runs, carrying heavy cargo and travelers into low-earth orbit.',
        category: 'infrastructure'
      },
      {
        title: 'Biosphere Equilibrium Celebration',
        description: 'Scientific markers confirm Kenya\'s indigenous wildlife species have completely stabilized and returned to historic baseline populations.',
        category: 'nature'
      }
    ]
  }
];
