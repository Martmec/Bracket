import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import HomePage from './components/HomePage'
import TournamentPage from './components/TournamentPage'

// Legal Page Component
const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy2 to-brand-purple p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-brand-purple hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
        </div>
        <div className="bg-brand-panel/90 backdrop-blur-sm rounded-xl border border-brand-border p-6 sm:p-8">
          <div className="text-slate-300 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// German Impressum Component
const Impressum = () => {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Angaben gemäß § 5 TMG</h2>
        <p>
          <strong className="text-white">Your Tennis Bracket</strong><br />
          [Ihr Name]<br />
          [Ihre Straße]<br />
          [PLZ Ort]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Kontakt</h2>
        <p>
          Telefon: [Ihre Telefonnummer]<br />
          E-Mail: [Ihre E-Mail-Adresse]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          [Ihr Name]<br />
          [Ihre Straße]<br />
          [PLZ Ort]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Haftungsausschluss</h2>
        <h3 className="text-lg font-medium text-white mb-2">Haftung für Inhalte</h3>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen.
        </p>
        <h3 className="text-lg font-medium text-white mb-2 mt-4">Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        </p>
        <h3 className="text-lg font-medium text-white mb-2 mt-4">Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </section>
    </LegalPage>
  )
}

// English Impressum Component
const ImpressumEn = () => {
  return (
    <LegalPage title="Imprint">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Information according to § 5 TMG</h2>
        <p>
          <strong className="text-white">Your Tennis Bracket</strong><br />
          [Your Name]<br />
          [Your Street]<br />
          [ZIP City]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
        <p>
          Phone: [Your Phone Number]<br />
          E-Mail: [Your E-Mail Address]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Responsible for content according to § 55 Abs. 2 RStV</h2>
        <p>
          [Your Name]<br />
          [Your Street]<br />
          [ZIP City]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">Disclaimer</h2>
        <h3 className="text-lg font-medium text-white mb-2">Liability for Content</h3>
        <p>
          As service providers, we are liable for our own content on these pages according to general laws pursuant to § 7 Abs.1 TMG. However, according to §§ 8 to 10 TMG, we as service providers are not under obligation to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.
        </p>
        <h3 className="text-lg font-medium text-white mb-2 mt-4">Liability for Links</h3>
        <p>
          Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore we cannot guarantee for these external contents.
        </p>
        <h3 className="text-lg font-medium text-white mb-2 mt-4">Copyright</h3>
        <p>
          The content and works published on this website are governed by the copyright laws of Germany. Any duplication, processing, distribution or any form of commercialisation of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.
        </p>
      </section>
    </LegalPage>
  )
}

// German Datenschutz Component
const Datenschutz = () => {
  return (
    <LegalPage title="Datenschutzerklärung">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Datenschutz auf einen Blick</h2>
        <h3 className="text-lg font-medium text-white mb-2">Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Hosting</h2>
        <p>
          Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
        </p>
        <p>
          <strong className="text-white">Vercel Inc.</strong><br />
          340 S Lemon Ave #4133<br />
          Walnut, CA 91789<br />
          USA
        </p>
        <p>
          Die Erfassung und Verarbeitung Ihrer Daten erfolgt ausschließlich in Deutschland und wird in Übereinstimmung mit der geltenden Datenschutzgesetzgebung durchgeführt.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Verantwortliche Stelle</h2>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          [Ihr Name]<br />
          [Ihre Straße]<br />
          [PLZ Ort]<br />
          E-Mail: [Ihre E-Mail-Adresse]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
        </p>
      </section>
    </LegalPage>
  )
}

// English Privacy Policy Component
const Privacy = () => {
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Privacy at a Glance</h2>
        <h3 className="text-lg font-medium text-white mb-2">General Information</h3>
        <p>
          The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you could be personally identified.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Hosting</h2>
        <p>
          We host the content of our website with the following provider:
        </p>
        <p>
          <strong className="text-white">Vercel Inc.</strong><br />
          340 S Lemon Ave #4133<br />
          Walnut, CA 91789<br />
          USA
        </p>
        <p>
          The collection and processing of your data is carried out exclusively in Germany and in accordance with applicable data protection legislation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Responsible Party</h2>
        <p>
          The party responsible for processing data on this website is:
        </p>
        <p>
          [Your Name]<br />
          [Your Street]<br />
          [ZIP City]<br />
          E-Mail: [Your E-Mail Address]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Your Rights</h2>
        <p>
          You have the right to receive information about the origin, recipient, and purpose of your stored personal data at any time, free of charge. You also have the right to request that this data be corrected or deleted.
        </p>
      </section>
    </LegalPage>
  )
}

// German Terms Component
const Terms = () => {
  return (
    <LegalPage title="Nutzungsbedingungen">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Geltungsbereich</h2>
        <p>
          Diese Nutzungsbedingungen gelten für die Nutzung der Website "Your Tennis Bracket" und aller damit verbundenen Dienste. Mit der Nutzung unserer Website erklären Sie sich mit diesen Bedingungen einverstanden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Beschreibung des Dienstes</h2>
        <p>
          "Your Tennis Bracket" ist eine Plattform, die es Nutzern ermöglicht, Tennis-Turniere zu verfolgen und Vorhersagen zu erstellen. Der Dienst wird kostenlos zur Verfügung gestellt.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Haftungsausschluss</h2>
        <p>
          Die auf dieser Website bereitgestellten Informationen dienen nur zu Informationszwecken. Wir übernehmen keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Urheberrecht</h2>
        <p>
          Alle Inhalte dieser Website sind Eigentum von "Your Tennis Bracket" oder werden mit Erlaubnis verwendet und sind durch Urheberrechtsgesetze geschützt.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">5. Änderungen der Bedingungen</h2>
        <p>
          Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Änderungen werden auf dieser Seite veröffentlicht und treten sofort in Kraft.
        </p>
      </section>
    </LegalPage>
  )
}

// English Terms Component
const TermsEn = () => {
  return (
    <LegalPage title="Terms of Service">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Scope of Application</h2>
        <p>
          These terms of service apply to the use of the "Your Tennis Bracket" website and all associated services. By using our website, you agree to these terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
        <p>
          "Your Tennis Bracket" is a platform that allows users to follow tennis tournaments and make predictions. The service is provided free of charge.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Disclaimer</h2>
        <p>
          The information provided on this website is for informational purposes only. We make no warranty as to the accuracy, completeness, or timeliness of the information provided.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Copyright</h2>
        <p>
          All content on this website is the property of "Your Tennis Bracket" or is used with permission and is protected by copyright laws.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">5. Changes to Terms</h2>
        <p>
          We reserve the right to change these terms of service at any time. Changes will be published on this page and take effect immediately.
        </p>
      </section>
    </LegalPage>
  )
}

function App() {
  return (
    <Router>
      <main style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/impressum-en" element={<ImpressumEn />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/terms-en" element={<TermsEn />} />
          <Route path="/:tournamentId" element={<TournamentPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
