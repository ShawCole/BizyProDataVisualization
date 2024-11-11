import type { Contact } from '../types';

const generateRandomColors = (count: number) => {
  const colors = [
    '#60A5FA', '#34D399', '#F472B6', '#A78BFA', '#FBBF24',
    '#4B5563', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6'
  ];

  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
};

export function processData(contacts: Contact[], field: keyof Contact) {
  const data = contacts.reduce((acc, contact) => {
    let value = contact[field]?.toString().trim() || 'Not Specified';

    // Remove dollar signs and commas for financial fields
    if (['INCOME_RANGE', 'NET_WORTH'].includes(field)) {
      value = value.replace(/[\$,]/g, '').trim();
    }

    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedEntries = Object.entries(data).sort((a, b) => {
    if (a[0] === 'Not Specified') return 1;
    if (b[0] === 'Not Specified') return -1;
    return 0;
  });

  return {
    labels: sortedEntries.map(([label]) => label),
    datasets: [{
      data: sortedEntries.map(([, count]) => count),
      backgroundColor: [
        '#3B82F6', // blue-500
        '#10B981', // emerald-500
        '#F59E0B', // amber-500
        '#EF4444', // red-500
        '#8B5CF6', // violet-500
        '#EC4899', // pink-500
        '#6366F1', // indigo-500
      ],
    }],
  };
}

export const calculateContactMethods = (contacts: Contact[]) => {
  const methods = {
    'Personal Emails': contacts.filter(c => c.PERSONAL_EMAIL?.trim()).length,
    'Business Emails': contacts.filter(c => c.BUSINESS_EMAIL?.trim()).length,
    'Mobile Numbers': contacts.filter(c => c.MOBILE_PHONE?.trim()).length,
    'Direct Numbers': contacts.filter(c => c.DIRECT_PHONE?.trim()).length,
    'LinkedIn Profiles': contacts.filter(c => c.LINKEDIN_URL?.trim()).length,
  };

  const colors = generateRandomColors(Object.keys(methods).length);

  return {
    labels: Object.keys(methods),
    datasets: [{
      label: 'Available Contact Methods',
      data: Object.values(methods),
      backgroundColor: colors.map(color => `${color}CC`),
      borderColor: colors,
      borderWidth: 1,
    }]
  };
};

// chartHelpers.ts
export const formatNumber = (value: number): string => {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`; // Format as millions
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}k`; // Format as thousands
  }
  return `$${value.toFixed(0)}`; // No formatting if less than 1,000
};

export const calculateStats = (contacts: Contact[]) => {
  const uniqueCities = new Set(contacts.map(c => c.PERSONAL_CITY?.trim()).filter(Boolean)).size;

  const emailCount = contacts.filter(c =>
    c.PERSONAL_EMAIL?.trim() || c.BUSINESS_EMAIL?.trim()
  ).length;

  const phoneCount = contacts.filter(c =>
    c.MOBILE_PHONE?.trim() || c.DIRECT_PHONE?.trim()
  ).length;

  return {
    uniqueCities,
    emailCoverage: Math.round((emailCount / contacts.length) * 100),
    phoneCoverage: Math.round((phoneCount / contacts.length) * 100),
  };
};