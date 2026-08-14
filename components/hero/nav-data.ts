// Static nav config for the hero. 4 families / 18 links.

export type MegaFamily = { title: string; links: string[] };

export const megaFamilies: MegaFamily[] = [
  { title: "Company", links: ["About", "Leadership", "Clients", "Careers"] },
  {
    title: "Equipment",
    links: [
      "Forklifts",
      "Loader Systems",
      "Industrial Cranes",
      "Conveyor Systems",
      "Pallet Handling",
    ],
  },
  {
    title: "Services",
    links: [
      "Engineering & Design",
      "Manufacture & Assembly",
      "Installation & Activation",
      "Maintenance & Support",
    ],
  },
  {
    title: "Resources",
    links: ["Insights", "Case Studies", "Leasing", "Industries", "FAQ"],
  },
];

// Top-level desktop nav. `mega` opens the ALL PAGES panel; `family` links
// a mobile accordion row to one of the families above.
export type TopNavItem = {
  label: string;
  href: string;
  family?: string;
  mega?: boolean;
};

export const topNav: TopNavItem[] = [
  { label: "About Us", href: "#" },
  { label: "Services", href: "#", family: "Services" },
  { label: "Equipment", href: "#", family: "Equipment" },
  { label: "Pricing", href: "#" },
  { label: "All Pages", href: "#", mega: true },
];
