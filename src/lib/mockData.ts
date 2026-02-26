export const mockLessons = [
  {
    id: '1',
    title: 'The Nitrogen Cycle',
    subject: 'Biology',
    description: 'A comprehensive investigation into the biogeochemical cycling of nitrogen within aquatic systems.',
    date: '2 hours ago',
    tags: ['NGSS', 'HS-LS2', 'Mastery'],
    blueprint: {
      title: 'The Nitrogen Cycle',
      standardsGuideUrl: 'https://mheducation.com/standards/science/biology',
      pedagogicalLayers: {
        spacedRepetition: true,
        retrievalPractice: true,
        formativeCheckpoints: true
      },
      rigorLevel: 'Standard',
      modules: [
        {
          id: 'm1',
          title: 'Biotic Nitrogen Conversion',
          objectives: ['Analyze chemical transformations of nitrogen', 'Evaluate microbial catalytic roles'],
          standards: ['HS-LS2-4', 'HS-LS2-5'],
          rationale: {
            'HS-LS2-4': 'Requires students to model how energy flows through cycles to sustain biological systems.',
            'HS-LS2-5': 'Direct alignment with systems modeling of matter conservation in closed ecosystems.'
          },
          mode: 'Direct Instruction'
        },
        {
          id: 'm2',
          title: 'Anthropogenic Influence',
          objectives: ['Model fertilizer runoff perturbations', 'Assess ecosystem stability thresholds'],
          standards: ['HS-LS2-7'],
          rationale: {
            'HS-LS2-7': 'Targets higher-order evaluation of human intervention on biodiversity and stability.'
          },
          mode: 'Inquiry-Based Discovery'
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Gatsby: The Symbolic Landscape',
    subject: 'ELA',
    description: 'Structuralist analysis of setting and color as thematic drivers in 20th-century literature.',
    date: 'Yesterday',
    tags: ['Common Core', 'RL.11-12', 'Symbolism'],
    blueprint: {
      title: 'Gatsby: Symbolic Landscape',
      standardsGuideUrl: 'https://mheducation.com/standards/ela/curriculum-guide',
      rigorLevel: 'Advanced',
      pedagogicalLayers: {
        spacedRepetition: false,
        retrievalPractice: true,
        formativeCheckpoints: true
      },
      modules: [
        {
          id: 'm1',
          title: 'Setting as Antagonist',
          objectives: ['Correlate physical setting to character degradation', 'Synthesize historical luxury motifs'],
          standards: ['CCSS.ELA-LITERACY.RL.11-12.3'],
          rationale: {
            'CCSS.ELA-LITERACY.RL.11-12.3': 'Deep analysis of the interaction between plot trajectory and setting constraints.'
          },
          mode: 'Collaborative Seminar'
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
    readyForExtension: ['Advanced Tier: 12 Students', 'Elite Mastery: 4 Students'],
    interventionNeeded: ['Remedial Track: 3 Students', 'ELL Support: 5 Students'],
    ellSupport: ['Tier 3 Vocabulary Focus: 8 Students']
  },
  predictiveOutlook: [
    { name: 'Unit 1', score: 85 },
    { name: 'Unit 2', score: 72 },
    { name: 'Unit 3', score: 78 },
    { name: 'Unit 4', score: 84 },
  ],
  suggestions: [
    "Increase scaffolding for HS-LS2-7 standard in Tier 2 groups.",
    "Prioritize visual modeling for non-standard ELA tracks.",
    "Deploy adaptive retrieval blocks for Unit 3 preview."
  ]
};