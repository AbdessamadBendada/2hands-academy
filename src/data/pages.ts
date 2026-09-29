import { routes, type Language } from './site';

export interface SitePage {
  slug: string;
  lang: Language;
  enPath: string;
  frPath: string;
  eyebrow: string;
  title: string;
  description: string;
  lead: string;
  image: 'teaching' | 'treatment' | 'portrait';
  points: string[];
}

export const sitePages: SitePage[] = [
  {
    slug: 'services', lang: 'en', enPath: routes.en.services, frPath: routes.fr.services,
    eyebrow: 'Hotels & Spas', title: 'One connected approach to stronger spa performance.',
    description: 'Assessment, spa team training, signature treatment development and ongoing performance support for hospitality properties.',
    lead: 'From understanding current treatment quality to strengthening teams and developing signature experiences, 2Hands shapes each engagement around the property’s real priorities.', image: 'teaching',
    points: ['Assess current treatment quality', 'Strengthen practical team performance', 'Create and maintain distinctive standards'],
  },
  {
    slug: 'services/assessment', lang: 'en', enPath: routes.en.assessment, frPath: routes.fr.assessment,
    eyebrow: 'Hospitality services · Assess', title: 'Understand the treatment your guests actually receive.',
    description: 'Practical spa team assessment for hotels, resorts, riads and spas in Morocco.',
    lead: 'A focused assessment reveals where technique, consistency and guest experience are already strong, and where development will have the greatest impact.', image: 'treatment',
    points: ['Announced or guest-perspective assessment', 'Individual and team-level observations', 'Clear priorities and a development roadmap'],
  },
  {
    slug: 'services/team-training', lang: 'en', enPath: routes.en.training, frPath: routes.fr.training,
    eyebrow: 'Hospitality services · Strengthen', title: 'Develop the team around the standards that matter most.',
    description: 'Targeted on-site massage and spa team training with Brooke Wescott.',
    lead: 'Practical training turns real operational needs into focused development that therapists can understand, apply and sustain.', image: 'teaching',
    points: ['Treatment flow, timing and pressure', 'Guest communication and room standards', 'Body mechanics and practitioner longevity'],
  },
  {
    slug: 'services/signature-treatment', lang: 'en', enPath: routes.en.signature, frPath: routes.fr.signature,
    eyebrow: 'Hospitality services · Differentiate', title: 'Create a signature treatment guests remember and teams can deliver.',
    description: 'Signature spa treatment concept, protocol and therapist training for hospitality properties.',
    lead: '2Hands translates a property’s identity into a coherent treatment concept, protocol and training experience without losing sight of technique or operational reality.', image: 'treatment',
    points: ['Concept and treatment story', 'Detailed protocol and quality guidance', 'Pilot, refinement and team transfer'],
  },
  {
    slug: 'services/ongoing-support', lang: 'en', enPath: routes.en.support, frPath: routes.fr.support,
    eyebrow: 'Hospitality services · Maintain', title: 'Protect treatment standards after the first intervention.',
    description: 'Continuing reassessment, recalibration and spa team performance support.',
    lead: 'Ongoing support helps management reinforce progress, respond to team changes and keep treatment quality from gradually drifting.', image: 'teaching',
    points: ['Scheduled reassessment', 'Focused recalibration and coaching', 'Visible progress for management'],
  },
  {
    slug: 'about', lang: 'en', enPath: routes.en.about, frPath: routes.fr.about,
    eyebrow: 'Brooke Wescott', title: '25+ years of international practice, guided by skilled touch.',
    description: 'Discover Brooke Wescott, massage and spa performance consultant and founder of 2Hands.',
    lead: 'Brooke’s career spans private practice, luxury hospitality, international clientele and the practical development of massage professionals.', image: 'portrait',
    points: ['Hands-on international experience', 'Technique-focused assessment and development', 'Guest experience and practitioner longevity'],
  },
  {
    slug: 'references', lang: 'en', enPath: routes.en.references, frPath: routes.fr.references,
    eyebrow: 'Selected experience', title: 'Experience built through real people, teams and treatment environments.',
    description: 'Selected hospitality, wellness and professional references for 2Hands and Brooke Wescott.',
    lead: 'This area will present verified collaborations, approved testimonials and project outcomes without unsupported claims.', image: 'treatment',
    points: ['Hospitality and wellness experience', 'Approved client references', 'Verified project stories as they become available'],
  },
  {
    slug: 'academy', lang: 'en', enPath: routes.en.academy, frPath: routes.fr.academy,
    eyebrow: '2Hands Academy', title: 'Build a massage practice that is skilled, thoughtful and sustainable.',
    description: 'Hands-on massage training for beginners, practitioners and professionals with Brooke Wescott.',
    lead: 'Training pathways support beginners, practising therapists and professionals who want to strengthen technique, confidence and treatment quality.', image: 'teaching',
    points: ['Foundations for beginners', 'Technique refinement for practitioners', 'Focused development for professionals'],
  },
  {
    slug: 'contact', lang: 'en', enPath: routes.en.contact, frPath: routes.fr.contact,
    eyebrow: 'Contact 2Hands', title: 'Tell us what you want to improve, create or learn.',
    description: 'Contact 2Hands about spa assessment, hotel team training, signature treatments or individual massage training.',
    lead: 'Hospitality projects and individual training enquiries follow separate routes so Brooke receives the right context from the beginning.', image: 'portrait',
    points: ['Hospitality project enquiries', 'Individual training enquiries', 'Based in Morocco, working across the country'],
  },
  {
    slug: 'fr/services', lang: 'fr', enPath: routes.en.services, frPath: routes.fr.services,
    eyebrow: 'Hôtellerie & Spas', title: 'Une approche connectée pour renforcer la performance spa.',
    description: 'Diagnostic, formation, création de soins signature et accompagnement continu pour les établissements hôteliers.',
    lead: 'Comprendre la qualité actuelle, développer les équipes, créer des expériences signature et maintenir les progrès. Chaque intervention part des priorités réelles de l’établissement.', image: 'teaching',
    points: ['Évaluer la qualité actuelle des soins', 'Renforcer la performance pratique de l’équipe', 'Créer et maintenir des standards distinctifs'],
  },
  {
    slug: 'fr/services/diagnostic', lang: 'fr', enPath: routes.en.assessment, frPath: routes.fr.assessment,
    eyebrow: 'Services hôteliers · Évaluer', title: 'Comprendre le soin que vos clients reçoivent réellement.',
    description: 'Diagnostic pratique des équipes spa pour les hôtels, resorts, riads et spas au Maroc.',
    lead: 'Un diagnostic ciblé révèle les points forts, les écarts de régularité et les axes de développement qui auront le plus d’impact.', image: 'treatment',
    points: ['Diagnostic annoncé ou du point de vue client', 'Observations individuelles et collectives', 'Priorités claires et feuille de route'],
  },
  {
    slug: 'fr/services/formation-equipe', lang: 'fr', enPath: routes.en.training, frPath: routes.fr.training,
    eyebrow: 'Services hôteliers · Renforcer', title: 'Développer l’équipe autour des standards qui comptent vraiment.',
    description: 'Formation pratique sur site des équipes massage et spa avec Brooke Wescott.',
    lead: 'La formation transforme les besoins opérationnels réels en développement ciblé que les praticiens peuvent comprendre, appliquer et maintenir.', image: 'teaching',
    points: ['Fluidité, rythme et adaptation de la pression', 'Communication client et standards cabine', 'Mécanique corporelle et longévité'],
  },
  {
    slug: 'fr/services/soin-signature', lang: 'fr', enPath: routes.en.signature, frPath: routes.fr.signature,
    eyebrow: 'Services hôteliers · Différencier', title: 'Créer un soin signature mémorable et maîtrisé par l’équipe.',
    description: 'Concept, protocole et formation pour créer un soin signature hôtelier distinctif.',
    lead: '2Hands traduit l’identité d’un établissement en concept, protocole et expérience de formation cohérents, sans perdre de vue la technique ni les opérations.', image: 'treatment',
    points: ['Concept et histoire du soin', 'Protocole détaillé et repères qualité', 'Test, ajustement et transmission à l’équipe'],
  },
  {
    slug: 'fr/services/accompagnement', lang: 'fr', enPath: routes.en.support, frPath: routes.fr.support,
    eyebrow: 'Services hôteliers · Maintenir', title: 'Protéger les standards après la première intervention.',
    description: 'Réévaluation, recalibrage et accompagnement continu des équipes spa.',
    lead: 'Le suivi aide la direction à consolider les progrès, répondre aux changements d’équipe et éviter que la qualité des soins ne se dilue.', image: 'teaching',
    points: ['Réévaluation planifiée', 'Recalibrage et coaching ciblés', 'Progression visible pour la direction'],
  },
  {
    slug: 'fr/a-propos', lang: 'fr', enPath: routes.en.about, frPath: routes.fr.about,
    eyebrow: 'Brooke Wescott', title: 'Plus de 25 ans de pratique internationale guidée par la maîtrise du toucher.',
    description: 'Découvrez Brooke Wescott, consultante en performance massage et spa et fondatrice de 2Hands.',
    lead: 'Le parcours de Brooke couvre la pratique privée, l’hôtellerie de luxe, une clientèle internationale et le développement pratique des professionnels du massage.', image: 'portrait',
    points: ['Expérience pratique internationale', 'Évaluation et développement centrés sur la technique', 'Expérience client et longévité du praticien'],
  },
  {
    slug: 'fr/references', lang: 'fr', enPath: routes.en.references, frPath: routes.fr.references,
    eyebrow: 'Expériences sélectionnées', title: 'Une expérience construite auprès de personnes, d’équipes et d’environnements de soin réels.',
    description: 'Références hôtelières, wellness et professionnelles sélectionnées de 2Hands et Brooke Wescott.',
    lead: 'Cette section présentera les collaborations vérifiées, les témoignages approuvés et les résultats de projets sans affirmation non documentée.', image: 'treatment',
    points: ['Expérience hôtelière et wellness', 'Références clients approuvées', 'Histoires de projets vérifiées au fil de leur validation'],
  },
  {
    slug: 'fr/formations', lang: 'fr', enPath: routes.en.academy, frPath: routes.fr.academy,
    eyebrow: '2Hands Academy', title: 'Construire une pratique du massage précise, réfléchie et durable.',
    description: 'Formations pratiques en massage avec Brooke Wescott pour débutants, praticiens et professionnels.',
    lead: 'Des parcours pour débutants, praticiens et professionnels qui souhaitent renforcer leur technique, leur confiance et la qualité de leur travail.', image: 'teaching',
    points: ['Fondations pour débutants', 'Perfectionnement technique des praticiens', 'Développement ciblé pour professionnels'],
  },
  {
    slug: 'fr/contact', lang: 'fr', enPath: routes.en.contact, frPath: routes.fr.contact,
    eyebrow: 'Contacter 2Hands', title: 'Parlez-nous de ce que vous souhaitez améliorer, créer ou apprendre.',
    description: 'Contactez 2Hands pour un diagnostic spa, une formation d’équipe, un soin signature ou une formation individuelle.',
    lead: 'Les projets hôteliers et les demandes de formation individuelle suivent deux parcours distincts afin que Brooke reçoive le bon contexte dès le départ.', image: 'portrait',
    points: ['Demandes de projets hôteliers', 'Demandes de formation individuelle', 'Basée au Maroc, interventions dans tout le pays'],
  },
];
