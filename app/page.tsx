import { SplineSceneBasic } from "@/components/ui/demo"
import { HeroContactSection } from "@/components/ui/hero-contact-section"
import { HeroProjectsSection } from "@/components/ui/hero-projects-section"
import { ProfileSection } from "@/components/ui/profile-section"
import { SlideTabs, type SlideTabItem } from "@/components/ui/slide-tabs"

const NAV_TABS: SlideTabItem[] = [
  { label: "Home", targetId: "home" },
  { label: "About", targetId: "about" },
  { label: "Projects", targetId: "projects" },
  { label: "Contact", targetId: "contact" },
]

export default function Page() {
  return (
    <div className="min-h-svh bg-white">
      <div className="px-4 pb-2 pt-0 md:px-10">
        <SlideTabs tabs={NAV_TABS} sticky />
      </div>

      <div className="px-4 pb-10 pt-24 md:px-10 md:pt-28">
        <section id="home" className="scroll-mt-28">
          <SplineSceneBasic />
        </section>
        <ProfileSection />
        <HeroProjectsSection />
        <HeroContactSection />
      </div>
    </div>
  )
}
