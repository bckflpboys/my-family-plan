
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfUse() {
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
          <h1 className="text-3xl font-bold">Terms of Use</h1>
          <p className="mt-2 text-white/80">Last Updated: May 28, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-3 border-indigo-400 mb-8">
          <div className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using the MY-FAMILY platform, you agree to be bound by these Terms of Use. These Terms of Use specifically govern how you may use our platform and services.
              </p>
              <p className="text-gray-700">
                If you do not agree to these Terms of Use, please do not use our platform. Your continued use of MY-FAMILY constitutes your acceptance of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Platform Usage</h2>
              <p className="text-gray-700 mb-4">
                MY-FAMILY is designed to help users organize and manage family subscription sharing. Our platform allows you to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Create family groups for subscription sharing</li>
                <li>Join existing family groups</li>
                <li>Manage shared subscriptions</li>
                <li>Track subscription costs and savings</li>
                <li>Communicate with family group members</li>
              </ul>
              <p className="text-gray-700">
                You agree to use these features only for their intended purposes and in compliance with all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                To use certain features of MY-FAMILY, you must create a user account. When creating your account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Update your information promptly if there are any changes</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate accounts that violate these Terms of Use or that have been inactive for an extended period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                When you join a family group, certain information will be shared with other members of that group, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Your nickname (as provided during registration)</li>
                <li>Your email address (for communication purposes)</li>
                <li>Subscription details you choose to share</li>
                <li>Payment status for shared subscriptions</li>
              </ul>
              <p className="text-gray-700 mb-4">
                By using our platform, you consent to this information being shared with other members of your family group. You should not join a family group if you are uncomfortable with this level of information sharing.
              </p>
              <p className="text-gray-700">
                We implement reasonable security measures to protect your information, but we cannot guarantee the conduct of other family group members. Please exercise caution when joining family groups with people you do not know personally.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Subscription Management</h2>
              <p className="text-gray-700 mb-4">
                MY-FAMILY helps you organize and manage subscription sharing, but we do not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide the subscription services themselves</li>
                <li>Process payments for subscriptions</li>
                <li>Guarantee the quality or availability of third-party subscription services</li>
                <li>Mediate disputes between family group members</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You are responsible for ensuring that your use of subscription services complies with the terms and conditions of the subscription providers. MY-FAMILY does not endorse or encourage the violation of any subscription service's terms.
              </p>
              <p className="text-gray-700">
                Some subscription services may have restrictions on family sharing or account sharing. It is your responsibility to understand and comply with these restrictions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Geographical Restrictions</h2>
              <p className="text-gray-700 mb-4">
                MY-FAMILY allows users to create family groups with different geographical restrictions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Single country: Limited to members from a specific country</li>
                <li>Regional: Limited to members from countries within a specific geographical region</li>
                <li>Global: Open to members from any country</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These restrictions are designed to help users comply with the geographical limitations of various subscription services. However, it is your responsibility to ensure that your use of subscription services complies with any geographical restrictions imposed by the subscription providers.
              </p>
              <p className="text-gray-700">
                MY-FAMILY does not endorse or encourage the use of VPNs or other methods to circumvent geographical restrictions imposed by subscription providers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">
                When using MY-FAMILY, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Use our platform for any illegal purpose</li>
                <li>Violate the terms of any subscription service</li>
                <li>Share account credentials for subscription services in an unauthorized manner</li>
                <li>Harass, intimidate, or threaten other users</li>
                <li>Post false, misleading, or deceptive information</li>
                <li>Attempt to gain unauthorized access to other user accounts or our systems</li>
                <li>Use automated scripts or bots to access our platform</li>
                <li>Interfere with the proper functioning of our platform</li>
              </ul>
              <p className="text-gray-700">
                Violation of these prohibitions may result in the suspension or termination of your account and, in serious cases, legal action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content and functionality on the MY-FAMILY platform, including but not limited to text, graphics, logos, icons, images, audio clips, and software, is the property of MY-FAMILY or our licensors and is protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700 mb-4">
                You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on our platform without our written consent.
              </p>
              <p className="text-gray-700">
                The MY-FAMILY name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of MY-FAMILY or our affiliates. You may not use these marks without our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may revise these Terms of Use at any time by updating this page. Your continued use of our platform after we post changes to these Terms of Use means that you accept those changes.
              </p>
              <p className="text-gray-700">
                We will make reasonable efforts to notify users of significant changes to these Terms of Use, but it is your responsibility to check this page periodically to ensure you are aware of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to our platform immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms of Use.
              </p>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use our platform will immediately cease. All provisions of these Terms of Use that by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
              <p className="text-gray-700">
                You may also terminate your account at any time by contacting us and requesting account deletion. Please note that some information may be retained in our systems even after account deletion, as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              <div className="mt-4 text-gray-700">
                <p>MY-FAMILY Support</p>
                <p>Email: support@myfamily.com</p>
                <p>Address: 123 Family Way, Suite 100, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>© 2025 MY-FAMILY. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/terms-of-service" className="text-indigo-600 hover:text-indigo-800 mx-2">Terms of Service</Link>
            <span className="text-gray-400">|</span>
            <Link to="/privacy-policy" className="text-indigo-600 hover:text-indigo-800 mx-2">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;
