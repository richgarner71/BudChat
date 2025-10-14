class KnowledgeService {
  getStateInfo(state) {
    const complianceService = require('./complianceService');
    return complianceService.getStateInfo(state);
  }
  
  getProductInfo() {
    return {
      categories: [
        {
          name: 'Flower',
          description: 'Dried cannabis buds, the most traditional form',
          types: ['Indica', 'Sativa', 'Hybrid'],
          consumption: ['Smoking', 'Vaporizing']
        },
        {
          name: 'Concentrates',
          description: 'Extracted cannabis products with higher potency',
          types: ['Wax', 'Shatter', 'Live Resin', 'Rosin'],
          consumption: ['Dabbing', 'Vaporizing']
        },
        {
          name: 'Edibles',
          description: 'Cannabis-infused food and beverages',
          types: ['Gummies', 'Chocolates', 'Beverages', 'Baked Goods'],
          consumption: ['Oral ingestion'],
          notes: 'Effects take 30-120 minutes, last 4-8 hours'
        },
        {
          name: 'Tinctures',
          description: 'Liquid cannabis extracts',
          consumption: ['Sublingual', 'Added to food/drinks'],
          notes: 'Fast-acting when taken sublingually'
        },
        {
          name: 'Topicals',
          description: 'Cannabis-infused creams, balms, and lotions',
          consumption: ['Topical application'],
          notes: 'Non-intoxicating, used for localized relief'
        }
      ],
      cannabinoids: [
        {
          name: 'THC',
          fullName: 'Tetrahydrocannabinol',
          effects: 'Psychoactive, euphoria, relaxation, pain relief',
          notes: 'Primary intoxicating compound'
        },
        {
          name: 'CBD',
          fullName: 'Cannabidiol',
          effects: 'Non-intoxicating, anti-inflammatory, anxiety relief',
          notes: 'Does not produce a "high"'
        },
        {
          name: 'CBG',
          fullName: 'Cannabigerol',
          effects: 'Non-intoxicating, potential antibacterial properties',
          notes: 'Found in smaller quantities'
        },
        {
          name: 'CBN',
          fullName: 'Cannabinol',
          effects: 'Mildly psychoactive, sedative properties',
          notes: 'Formed from THC degradation'
        }
      ]
    };
  }
  
  getConsumptionMethods() {
    return [
      {
        method: 'Smoking',
        onset: '1-5 minutes',
        duration: '2-4 hours',
        pros: ['Fast-acting', 'Easy to control dosage'],
        cons: ['Respiratory irritation', 'Odor']
      },
      {
        method: 'Vaporizing',
        onset: '1-5 minutes',
        duration: '2-4 hours',
        pros: ['Less harsh than smoking', 'Discreet'],
        cons: ['Equipment cost', 'Learning curve']
      },
      {
        method: 'Edibles',
        onset: '30-120 minutes',
        duration: '4-8 hours',
        pros: ['Long-lasting', 'No smoking', 'Discreet'],
        cons: ['Delayed onset', 'Harder to dose', 'Intense effects']
      },
      {
        method: 'Tinctures',
        onset: '15-45 minutes',
        duration: '4-6 hours',
        pros: ['Precise dosing', 'Discreet', 'No smoking'],
        cons: ['Taste', 'Slower than inhalation']
      },
      {
        method: 'Topicals',
        onset: '15-30 minutes',
        duration: '2-4 hours',
        pros: ['Non-intoxicating', 'Localized relief'],
        cons: ['Limited to topical effects']
      }
    ];
  }
}

module.exports = new KnowledgeService();