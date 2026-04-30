/**
 * Calculates delivery charge based on location and weight
 * @param {string} location - Customer location
 * @param {number} totalWeight - Total weight of items in kg
 * @returns {number} - Delivery charge
 */
export const calculateDeliveryCharge = (location, totalWeight) => {
  let baseCharge = location === 'Cox\'s Bazar' ? 70 : 120;
  
  if (totalWeight <= 1) {
    return baseCharge;
  }
  
  // Add 20 for every extra 0.5kg over 1kg
  const extraWeight = totalWeight - 1;
  const extraUnits = Math.ceil(extraWeight / 0.5);
  const additionalCharge = extraUnits * 20;
  
  return baseCharge + additionalCharge;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(price);
};
