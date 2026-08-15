export interface HeroAction {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroFeature {
  title: string;
  description: string;
  icon: "folder" | "users" | "zap" | "users-round";
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface TeamSyncHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions: HeroAction[];
  featuresEyebrow: string;
  featuresTitle: string;
  features: HeroFeature[];
  stats: HeroStat[];
}

const teamSyncHero: TeamSyncHero = {
  eyebrow: "THE CONNECTED WORKSPACE",

  title: "Everything your team needs Connected",
  subtitle:
    "Bring projects, tasks, customers, and automation together in one workspace built to keep your team moving.",

  actions: [
    {
      label: "Start for free",
      href: "/sign-up",
      variant: "primary",
    },
    {
      label: "How it works",
      href: "#how-it-works",
      variant: "secondary",
    },
  ],

  featuresEyebrow: "ONE WORKSPACE. LESS CHAOS.",

  featuresTitle: "Work flows better when everything works together.",

  features: [
    {
      title: "Projects",
      description:
        "Organize projects, tasks, deadlines, and progress without losing sight of the bigger picture.",
      icon: "folder",
    },
    {
      title: "CRM",
      description:
        "Keep contacts, leads, and customer activity connected to the work your team is already doing.",
      icon: "users",
    },
    {
      title: "Automations",
      description:
        "Automate repetitive actions and workflows so your team can spend more time on work that matters.",
      icon: "zap",
    },
    {
      title: "Teamwork",
      description:
        "Give your team one shared space to collaborate, stay aligned, and keep work moving forward.",
      icon: "users-round",
    },
  ],

  stats: [
    {
      value: "Projects",
      label: "Manage work from one place",
    },
    {
      value: "CRM",
      label: "Keep customer relationships connected",
    },
    {
      value: "Automations",
      label: "Reduce repetitive work",
    },
    {
      value: "Teams",
      label: "Keep everyone aligned",
    },
  ],
};

export default teamSyncHero;