const ragService = require('../services/ragService');
require('dotenv').config();

const knowledgeData = [
  {
    content: 'Cannabis, also known as marijuana, is a plant that contains over 100 different cannabinoids. The two most well-known are THC (tetrahydrocannabinol) and CBD (cannabidiol). THC is psychoactive and produces the "high" associated with cannabis, while CBD is non-intoxicating and has potential therapeutic benefits.',
    metadata: { category: 'basics', topic: 'cannabinoids' }
  },
  {
    content: 'There are three main types of cannabis strains: Indica, Sativa, and Hybrid. Indica strains are typically associated with relaxing, sedative effects. Sativa strains are often described as energizing and uplifting. Hybrid strains combine characteristics of both.',
    metadata: { category: 'basics', topic: 'strains' }
  },
  {
    content: 'The entourage effect refers to the theory that cannabis compounds work better together than in isolation. This includes cannabinoids, terpenes, and flavonoids working synergistically to produce enhanced effects.',
    metadata: { category: 'science', topic: 'entourage-effect' }
  },
  {
    content: 'Terpenes are aromatic compounds found in cannabis that contribute to its smell and flavor. Common terpenes include myrcene (earthy, musky), limonene (citrus), pinene (pine), and linalool (floral). Terpenes may also influence the effects of cannabis.',
    metadata: { category: 'science', topic: 'terpenes' }
  },
  {
    content: 'When consuming edibles, start with a low dose (2.5-5mg THC) and wait at least 2 hours before consuming more. Edibles take longer to take effect (30-120 minutes) but last much longer (4-8 hours) than inhaled cannabis.',
    metadata: { category: 'consumption', topic: 'edibles', safety: true }
  },
  {
    content: 'Vaporizing cannabis heats the material to a temperature that releases cannabinoids and terpenes without combustion. This method is generally considered less harsh on the lungs than smoking.',
    metadata: { category: 'consumption', topic: 'vaporizing' }
  },
  {
    content: 'Cannabis topicals are applied directly to the skin and are typically non-intoxicating. They are used for localized relief and do not enter the bloodstream in significant amounts.',
    metadata: { category: 'consumption', topic: 'topicals' }
  },
  {
    content: 'Medical cannabis programs require patients to obtain a recommendation from a licensed healthcare provider and register with their state program. Qualifying conditions vary by state but often include chronic pain, PTSD, epilepsy, and cancer.',
    metadata: { category: 'medical', topic: 'programs' }
  },
  {
    content: 'Cannabis remains illegal under federal law in the United States, classified as a Schedule I substance. However, many states have legalized medical and/or recreational use. Always comply with your local laws.',
    metadata: { category: 'legal', topic: 'federal-law' }
  },
  {
    content: 'In California, adults 21 and older can legally possess up to 1 ounce (28.5 grams) of cannabis flower and up to 8 grams of concentrated cannabis. Consumption is prohibited in public spaces and while driving.',
    metadata: { category: 'legal', topic: 'possession', state: 'CA' }
  },
  {
    content: 'In Colorado, adults 21 and older can possess up to 1 ounce of cannabis flower. Home cultivation of up to 6 plants (3 mature) is permitted for personal use.',
    metadata: { category: 'legal', topic: 'possession', state: 'CO' }
  },
  {
    content: 'In New York, adults 21 and older can possess up to 3 ounces of cannabis flower and up to 24 grams of concentrated cannabis. Home cultivation is permitted with limits.',
    metadata: { category: 'legal', topic: 'possession', state: 'NY' }
  },
  {
    content: 'Responsible cannabis use includes: starting with low doses, avoiding driving or operating machinery while impaired, storing products securely away from children and pets, and being aware of potential interactions with medications.',
    metadata: { category: 'safety', topic: 'responsible-use' }
  },
  {
    content: 'Cannabis can interact with certain medications, including blood thinners, sedatives, and some antidepressants. Always consult with a healthcare provider before using cannabis, especially if you take prescription medications.',
    metadata: { category: 'medical', topic: 'interactions', safety: true }
  },
  {
    content: 'Cannabis should not be used during pregnancy or while breastfeeding. It may affect fetal development and can be passed to infants through breast milk.',
    metadata: { category: 'medical', topic: 'pregnancy', safety: true }
  },
  {
    content: 'The endocannabinoid system (ECS) is a complex cell-signaling system in the human body that plays a role in regulating various functions including sleep, mood, appetite, and immune response. Cannabis interacts with this system.',
    metadata: { category: 'science', topic: 'endocannabinoid-system' }
  },
  {
    content: 'Decarboxylation is the process of heating cannabis to activate its cannabinoids. Raw cannabis contains THCA and CBDA, which convert to THC and CBD when heated. This is why cannabis must be heated (smoked, vaped, or baked) to produce psychoactive effects.',
    metadata: { category: 'science', topic: 'decarboxylation' }
  },
  {
    content: 'Cannabis tolerance can develop with regular use, meaning higher doses may be needed to achieve the same effects. Taking tolerance breaks (T-breaks) can help reset sensitivity to cannabis.',
    metadata: { category: 'consumption', topic: 'tolerance' }
  },
  {
    content: 'Full-spectrum cannabis products contain all cannabinoids and terpenes from the plant, including trace amounts of THC. Broad-spectrum products contain multiple cannabinoids but no THC. Isolate products contain only a single cannabinoid.',
    metadata: { category: 'products', topic: 'spectrum' }
  },
  {
    content: 'Cannabis cultivation involves several stages: germination, seedling, vegetative growth, flowering, and harvest. Indoor cultivation allows for controlled environments, while outdoor cultivation relies on natural sunlight and seasons.',
    metadata: { category: 'cultivation', topic: 'growing' }
  }
];

async function seedKnowledge() {
  try {
    console.log('Seeding knowledge base...');
    
    for (let i = 0; i < knowledgeData.length; i++) {
      const { content, metadata } = knowledgeData[i];
      await ragService.addDocument(content, metadata);
      console.log(`✓ Added document ${i + 1}/${knowledgeData.length}`);
    }
    
    console.log('\n✅ Knowledge base seeding complete!');
    console.log(`Added ${knowledgeData.length} documents to the knowledge base.`);
    
  } catch (error) {
    console.error('❌ Knowledge base seeding failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedKnowledge();