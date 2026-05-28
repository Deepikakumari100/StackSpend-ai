import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { HowItWorks } from '../components/HowItWorks';
import { AuditForm } from '../components/AuditForm';
import { Methodology } from '../components/Methodology';

export function LandingPage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <HowItWorks />
      <AuditForm />
      <Methodology />
    </>
  );
}
