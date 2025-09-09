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

// Impressum Component
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

// Datenschutz Component
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

// Terms Component
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

function App() {
  return (
    <Router>
      <main style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/:tournamentId" element={<TournamentPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
