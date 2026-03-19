import Navbar from '@/app/components/Navbar'
import HeroSection from '@/app/components/HeroSection'
import OpportunitySection from '@/app/components/OpportunitySection'
import ServicesSection from '@/app/components/ServicesSection'
import ServicesCarousel from './components/ServicesCarousel'
import ContactSection from '@/app/components/ContactSection'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <OpportunitySection />
      <ServicesSection />
      <ServicesCarousel/>
      <ContactSection />
      <Footer />
    </main>
  )
}