import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-white/80">Last Updated: May 28, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-3 border-indigo-400 mb-8">
          <div className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                At MY-FAMILY ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").
              </p>
              <p className="text-gray-700">
                Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect several types of information from and about users of our Service:
              </p>
              <h3 className="text-lg font-medium text-gray-800 mb-2">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                When you register for an account, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Your name</li>
                <li>Email address</li>
                <li>Nickname (as provided during registration)</li>
                <li>Country of residence</li>
                <li>Password (stored in encrypted form)</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">2.2 Family Group Information</h3>
              <p className="text-gray-700 mb-4">
                When you create or join a family group, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Family group name and description</li>
                <li>Subscription services you are sharing</li>
                <li>Payment status for shared subscriptions</li>
                <li>Communication between family group members</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">2.3 Usage Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect certain information about your device and how you interact with our Service, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>IP address</li>
                <li>Device type and operating system</li>
                <li>Browser type</li>
                <li>Pages visited and features used</li>
                <li>Time and date of visits</li>
                <li>Referring website or application</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To create and manage your account</li>
                <li>To facilitate family group creation and membership</li>
                <li>To process subscription sharing arrangements</li>
                <li>To communicate with you about your account, family groups, and our Service</li>
                <li>To improve our Service and develop new features</li>
                <li>To detect, prevent, and address technical issues or fraudulent activity</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">4.1 Sharing with Family Group Members</h3>
              <p className="text-gray-700 mb-4">
                When you join a family group, certain information will be shared with other members of that group:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Your nickname (as provided during registration)</li>
                <li>Your email address (for communication purposes)</li>
                <li>Subscription details you choose to share</li>
                <li>Payment status for shared subscriptions</li>
                <li>Your country of residence</li>
              </ul>
              <p className="text-gray-700 mb-4">
                By joining a family group, you consent to this information being shared with other members of the group.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">4.2 Sharing with Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with third-party service providers who perform services on our behalf, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Hosting and infrastructure providers</li>
                <li>Analytics providers</li>
                <li>Customer support services</li>
                <li>Email and communication services</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These service providers are contractually obligated to use your information only as necessary to provide services to us and in accordance with this Privacy Policy.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">4.3 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency). We may also disclose your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Enforce our Terms of Service or other agreements</li>
                <li>Protect and defend our rights or property</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of users of the Service or the public</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Secure authentication processes</li>
                <li>Regular security assessments</li>
                <li>Access controls and monitoring</li>
                <li>Secure data storage practices</li>
              </ul>
              <p className="text-gray-700 mb-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information about you.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                <li><strong>Restriction:</strong> You can request that we restrict the processing of your information in certain circumstances.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your information in a structured, commonly used, and machine-readable format.</li>
                <li><strong>Objection:</strong> You can object to our processing of your personal information in certain circumstances.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within the timeframe required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
              </p>
              <p className="text-gray-700 mb-4">
                If you are located outside the United States and choose to provide information to us, please note that we transfer the data to the United States and process it there. Your submission of such information represents your agreement to that transfer.
              </p>
              <p className="text-gray-700">
                We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy, and no transfer of your personal information will take place to an organization or a country unless there are adequate controls in place.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Cookies and Similar Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
              </p>
              <p className="text-gray-700 mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>To maintain your session and authentication status</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze how you use our Service</li>
                <li>To improve our Service based on your usage patterns</li>
              </ul>
              <p className="text-gray-700">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
              <p className="text-gray-700">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 text-gray-700">
                <p>MY-FAMILY Privacy Team</p>
                <p>Email: privacy@myfamily.com</p>
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
            <Link to="/terms-of-use" className="text-indigo-600 hover:text-indigo-800 mx-2">Terms of Use</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
