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
// Add this new function
export function getTopJobTitles(contacts: Contact[], limit: number = 5) {
  // Create a frequency map of job titles
  const jobCount = contacts.reduce((acc, contact) => {
    const jobTitle = contact.JOB_TITLE?.trim() || 'Not Specified';
    acc[jobTitle] = (acc[jobTitle] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array, sort by count, and take top N
  return Object.entries(jobCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([title, count]) => ({ title, count }));
}
export const processData = (contacts: Contact[], field: keyof Contact) => {
  const counts: { [key: string]: number } = {};

  contacts.forEach(contact => {
    const value = contact[field]?.toString().trim() || 'Unknown';
    counts[value] = (counts[value] || 0) + 1;
  });

  // Sort by count in descending order
  const sortedEntries = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10); // Limit to top 10 for better visualization

  const labels = sortedEntries.map(([label]) => label);
  const data = sortedEntries.map(([, count]) => count);
  const colors = generateRandomColors(labels.length);

  return {
    labels,
    datasets: [{
      label: field.toString().replace(/_/g, ' '),
      data,
      backgroundColor: colors.map(color => `${color}CC`), // Add transparency
      borderColor: colors,
      borderWidth: 1,
    }]
  };
};

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