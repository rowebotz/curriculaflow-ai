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
      standardsGuideUrl: 'https://standards.curriculaflow.io/science/biology',
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
    id: 'stem-ecosystem',
    title: 'Ecosystem Dynamics and Energy Transfer',
    subject: 'STEM',
    description: 'Advanced modeling of trophic levels, energy loss, and system stability in temperate biomes.',
    date: 'New Content',
    tags: ['NGSS', 'HS-LS2-4', 'DOK-3'],
    blueprint: {
      title: 'Ecosystem Dynamics & Energy',
      rigorLevel: 'Advanced',
      pedagogicalLayers: {
        spacedRepetition: true,
        retrievalPractice: true,
        formativeCheckpoints: true
      },
      modules: [
        {
          id: 's1',
          title: 'Retrieval Warmup: Biomass Basics',
          objectives: ['Recall energy source for producers', 'Identify primary vs secondary consumers'],
          standards: ['HS-LS2-3'],
          rationale: {
            'HS-LS2-3': 'Activates prior knowledge of aerobic and anaerobic cycling of matter.'
          },
          mode: 'Retrieval Warmup'
        },
        {
          id: 's2',
          title: 'Direct Instruction: The 10% Rule',
          objectives: ['Calculate energy transfer efficiency', 'Explain metabolic heat loss'],
          standards: ['HS-LS2-4'],
          rationale: {
            'HS-LS2-4': 'Quantitative modeling of energy flow through trophic levels.'
          },
          mode: 'Direct Instruction'
        },
        {
          id: 's3',
          title: 'Collaborative Modeling: Trophic Cascades',
          objectives: ['Synthesize impact of apex predator removal', 'Diagram feedback loops'],
          standards: ['HS-LS2-4', 'HS-LS2-6'],
          rationale: {
            'HS-LS2-6': 'Complex evaluation of ecosystem stability under perturbation.'
          },
          mode: 'Collaborative Modeling'
        },
        {
          id: 's4',
          title: 'Formative Checkpoint: Energy Pyramids',
          objectives: ['Validate model accuracy', 'Self-assess calculation fluency'],
          standards: ['HS-LS2-4'],
          rationale: {
            'HS-LS2-4': 'Ensures mathematical proficiency in energy distribution models.'
          },
          mode: 'Formative Checkpoint'
        },
        {
          id: 's5',
          title: 'Exit Reflection: Entropy in Systems',
          objectives: ['Relate thermodynamics to ecosystem decay'],
          standards: ['HS-LS2-3'],
          rationale: {
            'HS-LS2-3': 'Synthesizes chemical cycling with energy flow constraints.'
          },
          mode: 'Exit Reflection'
        }
      ]
    }
  },
  {
    id: 'math-systems',
    title: 'Solving Systems of Linear Equations',
    subject: 'Math',
    description: 'Mastery-based approach to linear systems via substitution and adaptive practice.',
    date: 'New Content',
    tags: ['CCSS', 'HSA.REI.C.6', 'Algebra'],
    blueprint: {
      title: 'Linear Systems Mastery',
      rigorLevel: 'Standard',
      pedagogicalLayers: {
        spacedRepetition: true,
        retrievalPractice: true,
        formativeCheckpoints: true
      },
      modules: [
        {
          id: 'math1',
          title: 'Prior Knowledge Activation',
          objectives: ['Solve for a single variable', 'Interpret coordinate pairs'],
          standards: ['HSA.REI.B.3'],
          rationale: {
            'HSA.REI.B.3': 'Scaffolds foundational equation solving before multivariate complexity.'
          },
          mode: 'Warmup'
        },
        {
          id: 'math2',
          title: 'Mastery Example: Substitution',
          objectives: ['Isolate variables strategically', 'Verify solutions graphically'],
          standards: ['HSA.REI.C.6'],
          rationale: {
            'HSA.REI.C.6': 'Direct alignment with solving systems of linear equations exactly and approximately.'
          },
          mode: 'Direct Instruction'
        },
        {
          id: 'math3',
          title: 'Adaptive Practice Block',
          objectives: ['Apply substitution to real-world scenarios', 'Debug algebraic errors'],
          standards: ['HSA.REI.C.6'],
          rationale: {
            'HSA.REI.C.6': 'Focuses on fluency and application in varying contexts.'
          },
          mode: 'Adaptive Practice'
        },
        {
          id: 'math4',
          title: 'Unit Assessment Preview',
          objectives: ['Evaluate system types (consistent vs inconsistent)'],
          standards: ['HSA.REI.C.6'],
          rationale: {
            'HSA.REI.C.6': 'Prepares students for high-stakes summative evaluation.'
          },
          mode: 'Checkpoint'
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
      standardsGuideUrl: 'https://standards.curriculaflow.io/ela/curriculum-guide',
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
    { name: 'HS-LS2-3', value: 88 },
    { name: 'HS-LS2-4', value: 92 },
    { name: 'HSA.REI.C.6', value: 74 },
    { name: 'HS-LS2-7', value: 58 },
    { name: 'CCSS.ELA.1', value: 85 },
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
    "Deploy adaptive retrieval blocks for HSA.REI.C.6 (Substitution)."
  ]
};