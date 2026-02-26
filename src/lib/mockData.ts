export const mockLessons = [
  {
    id: '1',
    title: 'The Nitrogen Cycle',
    subject: 'Biology',
    description: 'An inquiry-based module exploring how nitrogen moves through aquatic ecosystems.',
    date: '2 hours ago',
    tags: ['NGSS', 'HS-LS2', 'Inquiry'],
    blueprint: {
      title: 'The Nitrogen Cycle',
      modules: [
        {
          id: 'm1',
          title: 'Initial Equilibrium',
          objectives: ['Identify key chemical forms of nitrogen', 'Describe bacterial roles'],
          standards: ['HS-LS2-4', 'HS-LS2-5']
        },
        {
          id: 'm2',
          title: 'Human Impact Simulation',
          objectives: ['Analyze effects of fertilizer runoff', 'Predict population changes'],
          standards: ['HS-LS2-7']
        }
      ]
    }
  },
  {
    id: '2',
    title: 'The Great Gatsby: Symbolism',
    subject: 'ELA',
    description: 'Deconstructing the Green Light through close reading and color theory.',
    date: 'Yesterday',
    tags: ['Common Core', '9-10.RL', 'Symbolism'],
    blueprint: {
      title: 'The Great Gatsby: Symbolism',
      modules: [
        {
          id: 'm1',
          title: 'Contextualizing West Egg',
          objectives: ['Map character locations to themes', 'Define historical opulence'],
          standards: ['CCSS.ELA-LITERACY.RL.11-12.3']
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Linear Algebraic Equations',
    subject: 'Math',
    description: 'Solving multi-step equations using the "Balance" method visualization.',
    date: '3 days ago',
    tags: ['Grade 8', 'Expressions & Equations'],
    blueprint: null
  }
];
export const educationalStandards = [
  { id: 'HS-LS2-4', description: 'Use mathematical representations to support claims for the cycling of matter.' },
  { id: 'CCSS.ELA-LITERACY.RL.11-12.3', description: 'Analyze the impact of the author’s choices regarding how to develop and relate elements of a story.' }
];