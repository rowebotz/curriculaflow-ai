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
      pedagogicalLayers: {
        spacedRepetition: true,
        retrievalPractice: true,
        formativeCheckpoints: true
      },
      rigorLevel: 'Standard',
      modules: [
        {
          id: 'm1',
          title: 'Initial Equilibrium',
          objectives: ['Identify key chemical forms of nitrogen', 'Describe bacterial roles'],
          standards: ['HS-LS2-4', 'HS-LS2-5'],
          rationale: {
            'HS-LS2-4': 'Connects chemical cycles to biological energy transfer.',
            'HS-LS2-5': 'Models carbon/nitrogen flows as interlocking systems.'
          }
        },
        {
          id: 'm2',
          title: 'Human Impact Simulation',
          objectives: ['Analyze effects of fertilizer runoff', 'Predict population changes'],
          standards: ['HS-LS2-7'],
          rationale: {
            'HS-LS2-7': 'Evaluates human-caused changes on ecosystem stability.'
          }
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
      rigorLevel: 'Advanced',
      pedagogicalLayers: {
        spacedRepetition: false,
        retrievalPractice: true,
        formativeCheckpoints: true
      },
      modules: [
        {
          id: 'm1',
          title: 'Contextualizing West Egg',
          objectives: ['Map character locations to themes', 'Define historical opulence'],
          standards: ['CCSS.ELA-LITERACY.RL.11-12.3'],
          rationale: {
            'CCSS.ELA-LITERACY.RL.11-12.3': 'Deep dive into complex character motivation vs setting.'
          }
        }
      ]
    }
  }
];
export const mockAnalyticsData = {
  engagement: [
    { name: 'Mon', value: 65, predicted: 60 },
    { name: 'Tue', value: 82, predicted: 75 },
    { name: 'Wed', value: 74, predicted: 78 },
    { name: 'Thu', value: 91, predicted: 85 },
    { name: 'Fri', value: 88, predicted: 89 },
  ],
  mastery: [
    { name: 'HS-LS2-4', value: 92 },
    { name: 'HS-LS2-7', value: 58 },
    { name: 'CCSS.ELA.1', value: 85 },
    { name: 'NGSS.PS.2', value: 77 },
  ],
  studentGroups: {
    readyForExtension: ['Alice W.', 'David L.', 'Elena R.'],
    interventionNeeded: ['Mark S.', 'Chloe B.'],
    ellSupport: ['Juan P.', 'Yuki T.']
  },
  predictiveOutlook: [
    { name: 'Unit 1', score: 85 },
    { name: 'Unit 2', score: 72 },
    { name: 'Unit 3', score: 78 },
    { name: 'Unit 4', score: 84 },
  ],
  suggestions: [
    "Increase scaffolding for HS-LS2-7 standard.",
    "Introduce more visual modeling for the Nitrogen cycle.",
    "Differentiate Module 2 for Group C learners."
  ]
};
export const pedagogicalFrameworks = [
  { id: 'retrieval', name: 'Retrieval Practice', description: 'Actively recalling information strengthens long-term memory.' },
  { id: 'spaced', name: 'Spaced Reinforcement', description: 'Reviewing content at increasing intervals to combat the forgetting curve.' },
  { id: 'formative', name: 'Formative Checkpoints', description: 'Low-stakes assessments to gauge understanding mid-lesson.' }
];
export const educationalStandards = [
  { id: 'HS-LS2-4', description: 'Use mathematical representations to support claims for the cycling of matter.' },
  { id: 'CCSS.ELA-LITERACY.RL.11-12.3', description: 'Analyze the impact of the author’s choices regarding how to develop and relate elements of a story.' }
];