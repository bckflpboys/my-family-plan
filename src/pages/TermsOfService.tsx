
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-6 mb-8 text-white border-3 border-indigo-500">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-white/80">Last Updated: May 28, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-3 border-indigo-400 mb-8">
          <div className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to MY-FAMILY ("we," "our," or "us"). By accessing or using our service, you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before using our service.
              </p>
              <p className="text-gray-700">
                MY-FAMILY is a platform that allows users to create and join family groups for sharing subscription services. These Terms govern your use of our website, applications, and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="text-gray-700 mb-4">
                To use MY-FAMILY, you must be at least 18 years old and capable of forming a legally binding contract. By using our service, you represent and warrant that you meet these requirements.
              </p>
              <p className="text-gray-700">
                If you are using the service on behalf of a company or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="text-gray-700 mb-4">
                To access certain features of our service, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="text-gray-700 mb-4">
                You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              <p className="text-gray-700">
                We reserve the right to disable your account if we determine, in our sole discretion, that you have violated these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Family Groups and Subscriptions</h2>
              <p className="text-gray-700 mb-4">
                MY-FAMILY allows users to create and join family groups for sharing subscription services. When creating a family group, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide accurate information about the subscriptions you are offering to share</li>
                <li>Comply with the terms of service of the subscription services you are sharing</li>
                <li>Not share subscriptions in a manner that violates the terms of the subscription provider</li>
                <li>Not use our service for any illegal or unauthorized purpose</li>
              </ul>
              <p className="text-gray-700">
                We are not responsible for any disputes that may arise between family group members regarding subscription sharing or payment arrangements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. User Conduct</h2>
              <p className="text-gray-700 mb-4">
                You agree not to use our service to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others, including intellectual property rights</li>
                <li>Harass, abuse, or harm another person</li>
                <li>Send spam or other unsolicited messages</li>
                <li>Interfere with or disrupt the service or servers connected to the service</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to terminate your access to our service if you violate these conduct guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our Privacy Policy describes how we collect, use, and share information about you when you use our service. By using our service, you agree to the collection, use, and sharing of your information as described in our Privacy Policy.
              </p>
              <p className="text-gray-700">
                We take reasonable measures to protect your personal information, but no method of transmission over the internet or electronic storage is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                Our service and its original content, features, and functionality are owned by MY-FAMILY and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p className="text-gray-700">
                You may not copy, modify, distribute, sell, or lease any part of our service without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700">
                We do not warrant that our service will be uninterrupted or error-free, that defects will be corrected, or that our service or the servers that make it available are free of viruses or other harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MY-FAMILY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE</li>
                <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE</li>
                <li>ANY CONTENT OBTAINED FROM THE SERVICE</li>
                <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may revise these Terms from time to time. The most current version will always be posted on our website. By continuing to use our service after those revisions become effective, you agree to be bound by the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us at support@myfamily.com.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>© 2025 MY-FAMILY. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/terms-of-use" className="text-indigo-600 hover:text-indigo-800 mx-2">Terms of Use</Link>
            <span className="text-gray-400">|</span>
            <Link to="/privacy-policy" className="text-indigo-600 hover:text-indigo-800 mx-2">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
