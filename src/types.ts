export interface Contact {
  PERSONAL_CITY: string;
  PERSONAL_ZIP: string;
  AGE_RANGE: string;
  CHILDREN: string;
  GENDER: string;
  HOMEOWNER: string;
  MARRIED: string;
  NET_WORTH: string;
  INCOME_RANGE: string;
  SKIPTRACE_CREDIT_RATING: string;
  PERSONAL_EMAIL: string;
  BUSINESS_EMAIL: string;
  MOBILE_PHONE: string;
  DIRECT_PHONE: string;
  LINKEDIN_URL: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}