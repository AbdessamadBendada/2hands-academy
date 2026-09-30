import type { Language } from './site';

export type TestimonialId = 'nisae' | 'my-shala' | 'meryem-el-aoufir' | 'meryeme-belmrhar';

export interface Testimonial {
  id: TestimonialId;
  quote: string[];
  excerpt: string;
  name: string;
  role: string;
  organisation?: string;
  context: string;
  translationNote?: string;
}

export const testimonials: Record<Language, Record<TestimonialId, Testimonial>> = {
  en: {
    nisae: {
      id: 'nisae',
      quote: [
        'Brooke trained one of our massage practitioners, and we couldn\u2019t be more pleased with the quality of her teaching. She shares the fundamentals with exceptional clarity, kindness and a true commitment to excellence. Beyond technique, she teaches all the thoughtful touches that elevate a massage and make it truly memorable, well above the usual standards.',
        'What we especially appreciated is her ability to raise awareness among massage therapists about posture, energy management and the healthy habits needed to practise sustainably and with joy.',
        'It has been a real privilege to collaborate with such a complete, professional and inspiring trainer.',
      ],
      excerpt: 'She shares the fundamentals with exceptional clarity, kindness and a true commitment to excellence. Beyond technique, she teaches the thoughtful touches that make a massage truly memorable.',
      name: 'Kenza & Salma',
      role: 'Co-founders',
      organisation: 'Nisae',
      context: 'Spa-team training',
    },
    'my-shala': {
      id: 'my-shala',
      quote: [
        'Brooke has been part of the heart of My Shala for many years. Before we stopped yoga classes after Covid, she was one of our most beloved teachers, sharing a deep, intuitive knowledge of the body and movement.',
        'She is also an exceptional massage therapist. Her hands are truly magical. She has fine-tuned the training of our Asian massage therapist, generously sharing an entire approach: how to breathe during the massage, stand in a way that protects your own body and make every movement fluid and intentional.',
        'She teaches how to feel beneath the hands, the muscles, the tension and the energy, turning every massage into a unique, deeply healing experience.',
        'We are so grateful for your presence, your skill and all that you so beautifully pass on.',
      ],
      excerpt: 'She generously shares an entire approach: how to breathe during the massage, protect your own body and make every movement fluid and intentional.',
      name: 'Sofia Zniber',
      role: 'Founder',
      organisation: 'My Shala, formerly Yoga Shala',
      context: 'Technique and practitioner development',
    },
    'meryem-el-aoufir': {
      id: 'meryem-el-aoufir',
      quote: [
        'I had the pleasure of attending Brooke\u2019s prenatal massage training over a year ago. From the very beginning, Brooke was incredibly warm and welcoming. She has a remarkable ability to explain things with clarity and precision.',
        'What I appreciated the most was her generosity. She covers every detail: client relationship, practitioner posture, how to set up the massage space, every single gesture and technique, and the right products to use. Nothing is left to chance.',
        'I was able to start practising immediately with confidence. I am truly looking forward to joining more training with her in the future.',
      ],
      excerpt: 'Brooke has a remarkable ability to explain things with clarity and precision. I was able to start practising immediately with confidence.',
      name: 'Meryem El Aoufir',
      role: 'Doula',
      context: 'Prenatal massage training',
    },
    'meryeme-belmrhar': {
      id: 'meryeme-belmrhar',
      quote: [
        'I had the great pleasure of training in prenatal massage with Brooke from 2Hands, and I was truly impressed. She is not only professional and fully present, but also deeply passionate and incredibly generous in the way she shares her knowledge.',
        'The training included many hours of hands-on practice, supported by a manual. Brooke guided us through both the theoretical and practical aspects of prenatal massage, but what stood out most was how she embodied the presence and posture of a true prenatal massage practitioner.',
        'Her teaching went far beyond technique. It was a heartfelt transmission of care, respect and deep listening.',
        'I feel truly honoured to have learned from her.',
      ],
      excerpt: 'Her teaching went far beyond technique. It was a heartfelt transmission of care, respect and deep listening.',
      name: 'Meryeme Belmrhar',
      role: 'Midwife & Doula',
      organisation: 'Founder of Centre Matrescence',
      context: 'Prenatal massage training',
    },
  },
  fr: {
    nisae: {
      id: 'nisae',
      quote: [
        'Brooke a form\u00e9 l\u2019une de nos praticiennes en massage, et nous sommes absolument ravies de la qualit\u00e9 de son enseignement. Elle transmet les bases avec une grande douceur, une pr\u00e9cision remarquable et surtout une vraie exigence de qualit\u00e9. Elle va bien au-del\u00e0 de la simple technique : elle partage toutes ces petites attentions qui rendent un massage inoubliable, raffin\u00e9 et au-dessus des standards habituels.',
        'Ce que nous avons particuli\u00e8rement appr\u00e9ci\u00e9, c\u2019est sa capacit\u00e9 \u00e0 sensibiliser les massoth\u00e9rapeutes \u00e0 l\u2019importance de leur posture, de leur \u00e9nergie et des bonnes habitudes \u00e0 adopter pour exercer durablement et avec plaisir.',
        'C\u2019est une chance d\u2019avoir pu collaborer avec une formatrice aussi compl\u00e8te, professionnelle et inspirante.',
      ],
      excerpt: 'Elle transmet les bases avec une grande douceur, une pr\u00e9cision remarquable et une vraie exigence de qualit\u00e9. Au-del\u00e0 de la technique, elle partage les attentions qui rendent un massage inoubliable.',
      name: 'Kenza & Salma',
      role: 'Co-fondatrices',
      organisation: 'Nisae',
      context: 'Formation d\u2019une \u00e9quipe spa',
    },
    'my-shala': {
      id: 'my-shala',
      quote: [
        'Brooke fait partie du c\u0153ur de My Shala depuis de nombreuses ann\u00e9es. Avant l\u2019arr\u00eat de nos cours de yoga apr\u00e8s le Covid, elle \u00e9tait l\u2019une de nos enseignantes les plus appr\u00e9ci\u00e9es, partageant une connaissance profonde et intuitive du corps et du mouvement.',
        'Elle est \u00e9galement une massoth\u00e9rapeute exceptionnelle. Ses mains sont v\u00e9ritablement magiques. Elle a affin\u00e9 la formation de notre praticienne asiatique en partageant g\u00e9n\u00e9reusement une approche compl\u00e8te : respirer pendant le massage, adopter une posture qui prot\u00e8ge son propre corps et rendre chaque mouvement fluide et intentionnel.',
        'Elle apprend \u00e0 ressentir sous les mains les muscles, les tensions et l\u2019\u00e9nergie, afin de transformer chaque massage en une exp\u00e9rience unique et profond\u00e9ment r\u00e9paratrice.',
        'Nous sommes profond\u00e9ment reconnaissants pour ta pr\u00e9sence, ton talent et tout ce que tu transmets avec tant de g\u00e9n\u00e9rosit\u00e9.',
      ],
      excerpt: 'Elle partage g\u00e9n\u00e9reusement une approche compl\u00e8te : respirer pendant le massage, prot\u00e9ger son propre corps et rendre chaque mouvement fluide et intentionnel.',
      name: 'Sofia Zniber',
      role: 'Fondatrice',
      organisation: 'My Shala, anciennement Yoga Shala',
      context: 'Technique et d\u00e9veloppement du praticien',
      translationNote: 'Traduit de l\u2019anglais',
    },
    'meryem-el-aoufir': {
      id: 'meryem-el-aoufir',
      quote: [
        'J\u2019ai eu le plaisir de suivre la formation de Brooke au massage pr\u00e9natal il y a plus d\u2019un an. D\u00e8s le d\u00e9but, Brooke a \u00e9t\u00e9 incroyablement chaleureuse et accueillante. Elle poss\u00e8de une remarquable capacit\u00e9 \u00e0 expliquer avec clart\u00e9 et pr\u00e9cision.',
        'Ce que j\u2019ai le plus appr\u00e9ci\u00e9, c\u2019est sa g\u00e9n\u00e9rosit\u00e9. Elle aborde chaque d\u00e9tail : la relation avec la cliente, la posture du praticien, l\u2019installation de l\u2019espace de massage, chaque geste et chaque technique, ainsi que les produits adapt\u00e9s. Rien n\u2019est laiss\u00e9 au hasard.',
        'J\u2019ai pu commencer \u00e0 pratiquer imm\u00e9diatement, avec confiance. J\u2019ai vraiment h\u00e2te de participer \u00e0 d\u2019autres formations avec elle.',
      ],
      excerpt: 'Brooke poss\u00e8de une remarquable capacit\u00e9 \u00e0 expliquer avec clart\u00e9 et pr\u00e9cision. J\u2019ai pu commencer \u00e0 pratiquer imm\u00e9diatement, avec confiance.',
      name: 'Meryem El Aoufir',
      role: 'Doula',
      context: 'Formation au massage pr\u00e9natal',
      translationNote: 'Traduit de l\u2019anglais',
    },
    'meryeme-belmrhar': {
      id: 'meryeme-belmrhar',
      quote: [
        'J\u2019ai eu le grand plaisir de me former au massage pr\u00e9natal avec Brooke de 2Hands, et j\u2019ai \u00e9t\u00e9 profond\u00e9ment impressionn\u00e9e. Elle est non seulement professionnelle et pleinement pr\u00e9sente, mais aussi passionn\u00e9e et incroyablement g\u00e9n\u00e9reuse dans sa fa\u00e7on de transmettre son savoir.',
        'La formation comprenait de nombreuses heures de pratique, soutenues par un manuel. Brooke nous a guid\u00e9es \u00e0 travers les dimensions th\u00e9oriques et pratiques du massage pr\u00e9natal. Ce qui m\u2019a le plus marqu\u00e9e, c\u2019est la fa\u00e7on dont elle incarnait la pr\u00e9sence et la posture d\u2019une v\u00e9ritable praticienne du massage pr\u00e9natal.',
        'Son enseignement allait bien au-del\u00e0 de la technique. C\u2019\u00e9tait une transmission sinc\u00e8re du soin, du respect et de l\u2019\u00e9coute profonde.',
        'Je me sens sinc\u00e8rement honor\u00e9e d\u2019avoir appris aupr\u00e8s d\u2019elle.',
      ],
      excerpt: 'Son enseignement allait bien au-del\u00e0 de la technique. C\u2019\u00e9tait une transmission sinc\u00e8re du soin, du respect et de l\u2019\u00e9coute profonde.',
      name: 'Meryeme Belmrhar',
      role: 'Sage-femme & Doula',
      organisation: 'Fondatrice du Centre Matrescence',
      context: 'Formation au massage pr\u00e9natal',
      translationNote: 'Traduit de l\u2019anglais',
    },
  },
};

export const selectTestimonials = (lang: Language, ids: TestimonialId[]) =>
  ids.map((id) => testimonials[lang][id]);
