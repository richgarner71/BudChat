class ComplianceService {
  constructor() {
    this.minAge = 21;
    this.prohibitedTerms = [
      'buy now', 'purchase', 'order', 'checkout', 'add to cart',
      'for sale', 'selling', 'ship', 'delivery'
    ];
  }
  
  checkAge(age) {
    return age >= this.minAge;
  }
  
  checkMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const term of this.prohibitedTerms) {
      if (lowerMessage.includes(term)) {
        return {
          allowed: false,
          message: 'I can provide educational information about cannabis, but I cannot facilitate sales or transactions. Please consult licensed dispensaries in your area for purchasing options.'
        };
      }
    }
    
    return { allowed: true };
  }
  
  getStateInfo(state) {
    const stateData = this.getStateData();
    return stateData[state.toUpperCase()] || {
      status: 'unknown',
      medical: false,
      recreational: false,
      notes: 'Please verify current laws in your state.'
    };
  }
  
  getStateData() {
    // Simplified state data - should be updated regularly
    return {
      'CA': { status: 'legal', medical: true, recreational: true, notes: 'Adults 21+ can possess up to 1 oz' },
      'CO': { status: 'legal', medical: true, recreational: true, notes: 'Adults 21+ can possess up to 1 oz' },
      'WA': { status: 'legal', medical: true, recreational: true, notes: 'Adults 21+ can possess up to 1 oz' },
      'OR': { status: 'legal', medical: true, recreational: true, notes: 'Adults 21+ can possess up to 1 oz' },
      'NY': { status: 'legal', medical: true, recreational: true, notes: 'Adults 21+ can possess up to 3 oz' },
      'FL': { status: 'medical', medical: true, recreational: false, notes: 'Medical use only with valid card' },
      'TX': { status: 'restricted', medical: false, recreational: false, notes: 'Very limited medical program' },
      // Add more states as needed
    };
  }
}

module.exports = new ComplianceService();