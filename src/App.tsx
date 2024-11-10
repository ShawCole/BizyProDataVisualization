import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, Users, MapPin, Mail, Phone,
  Smartphone, PhoneCall, AtSign, Briefcase, Linkedin
} from 'lucide-react';
import FileUpload from './components/FileUpload';
import ChartCard from './components/ChartCard';
import StatCard from './components/StatCard';
import ContactMethodCard from './components/ContactMethodCard';
import { processData, calculateStats } from './utils/chartHelpers';
import type { Contact } from './types';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const stats = useMemo(() => {
    if (contacts.length === 0) return null;
    return calculateStats(contacts);
  }, [contacts]);

  const contactMethods = useMemo(() => {
    if (contacts.length === 0) return null;
    return {
      personalEmails: contacts.filter(c => c.PERSONAL_EMAIL?.trim()).length,
      businessEmails: contacts.filter(c => c.BUSINESS_EMAIL?.trim()).length,
      mobilePhones: contacts.filter(c => c.MOBILE_PHONE?.trim()).length,
      directPhones: contacts.filter(c => c.DIRECT_PHONE?.trim()).length,
      linkedin: contacts.filter(c => c.LINKEDIN_URL?.trim()).length,
    };
  }, [contacts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Contact List Analytics</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {contacts.length === 0 ? (
          <div className="max-w-xl mx-auto">
            <FileUpload onDataLoaded={setContacts} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Contacts"
                value={contacts.length}
                icon={Users}
              />
              <StatCard
                title="Unique Cities"
                value={stats?.uniqueCities || 0}
                icon={MapPin}
              />
              <StatCard
                title="Email Coverage"
                value={`${stats?.emailCoverage || 0}%`}
                icon={Mail}
              />
              <StatCard
                title="Phone Coverage"
                value={`${stats?.phoneCoverage || 0}%`}
                icon={Phone}
              />
            </div>

            {/* Contact Methods Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <ContactMethodCard
                  title="Mobile Numbers"
                  count={contactMethods?.mobilePhones || 0}
                  total={contacts.length}
                  icon={Smartphone}
                />
                <ContactMethodCard
                  title="Direct Numbers"
                  count={contactMethods?.directPhones || 0}
                  total={contacts.length}
                  icon={PhoneCall}
                />
                <ContactMethodCard
                  title="Personal Emails"
                  count={contactMethods?.personalEmails || 0}
                  total={contacts.length}
                  icon={AtSign}
                />
                <ContactMethodCard
                  title="Business Emails"
                  count={contactMethods?.businessEmails || 0}
                  total={contacts.length}
                  icon={Briefcase}
                />
                <ContactMethodCard
                  title="LinkedIn Profiles"
                  count={contactMethods?.linkedin || 0}
                  total={contacts.length}
                  icon={Linkedin}
                />
              </div>
            </section>

            {/* Distribution Charts */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ChartCard
                  title="City Distribution"
                  data={processData(contacts, 'PERSONAL_CITY')}
                  type="doughnut"
                />
                <ChartCard
                  title="Age Range Distribution"
                  data={processData(contacts, 'AGE_RANGE')}
                  type="doughnut"
                />
                <ChartCard
                  title="Income Range Distribution"
                  data={processData(contacts, 'INCOME_RANGE')}
                  type="doughnut"
                />
                <ChartCard
                  title="Credit Rating Distribution"
                  data={processData(contacts, 'SKIPTRACE_CREDIT_RATING')}
                  type="doughnut"
                />
                <ChartCard
                  title="Net Worth Distribution"
                  data={processData(contacts, 'NET_WORTH')}
                  type="doughnut"
                />
                <ChartCard
                  title="Gender Distribution"
                  data={processData(contacts, 'GENDER')}
                  type="doughnut"
                />
              </div>
            </section>

            {/* Status Charts */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ChartCard
                  title="Parental Status"
                  data={processData(contacts, 'CHILDREN')}
                  type="bar"
                />
                <ChartCard
                  title="Homeownership Status"
                  data={processData(contacts, 'HOMEOWNER')}
                  type="bar"
                />
                <ChartCard
                  title="Marital Status"
                  data={processData(contacts, 'MARRIED')}
                  type="bar"
                />
              </div>
            </section>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setContacts([])}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Upload New File
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;