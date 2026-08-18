export type TimelineBadge = {
  label: string
  tone: 'outline' | 'solid'
}

export type TimelineStep = {
  title: string
  badges?: TimelineBadge[]
  description: string
}

export type SportEvent = {
  id: string
  sport: string
  category: string
  location: string
  dateRange: string
  price: number
  priceUnit: 'per team' | 'per person'
  registerBy: string
  spotsLeft: number
  eligibility: {
    team: string[]
    participant: string[]
  }
  steps: TimelineStep[]
  rulesUpdated: string
}

export const sportName = 'Basketball'
export const seasonLabel = 'PESTA SUKAN 2027'

export const basketballEvents: SportEvent[] = [
  {
    id: 'boys-u18-5v5',
    sport: 'Basketball',
    category: "Boys' U18 5v5",
    location: 'Clementi Sport Hall',
    dateRange: '27 Jun to 2 Aug 2027',
    price: 135,
    priceUnit: 'per team',
    registerBy: '15 June 2027',
    spotsLeft: 6,
    eligibility: {
      team: ['5 to 10 members'],
      participant: [
        'Male',
        'Under 18 years old (born 2010 or later)',
        'A Singapore citizen, permanent resident or foreigner with valid pass',
      ],
    },
    steps: [
      {
        title: 'Register your team and pay',
        badges: [{ label: 'By 15 June 2027', tone: 'outline' }],
        description:
          'One person registers and pays for the team. This person becomes the team manager.',
      },
      {
        title: 'Invite your team members',
        badges: [
          { label: 'By 30 June 2027', tone: 'outline' },
          { label: 'NEW', tone: 'solid' },
        ],
        description:
          'Share an invite link so your team members can submit their own details.\n\nYou can also enter their details for them.',
      },
      {
        title: "Attend team manager's meeting",
        description: 'Date to be announced.',
      },
      {
        title: 'Play!',
        description: "Schedule will be released after team manager's meeting.",
      },
    ],
    rulesUpdated: '9 Apr 2027, 4:27pm',
  },
  {
    id: 'mens-corporate-5v5',
    sport: 'Basketball',
    category: "Men's Corporate 5v5",
    location: 'Clementi Sport Hall',
    dateRange: '27 Jun to 2 Aug 2027',
    price: 135,
    priceUnit: 'per team',
    registerBy: '15 June 2027',
    spotsLeft: 9,
    eligibility: {
      team: ['5 to 10 members', 'At least 70% Singapore citizens or permanent residents'],
      participant: [
        'Male',
        'At least 18 years old',
        'Currently employed, with an employer letter',
      ],
    },
    steps: [
      {
        title: 'Register your team and pay',
        badges: [{ label: 'By 15 June 2027', tone: 'outline' }],
        description:
          'One person registers and pays for the team. This person becomes the team manager.',
      },
      {
        title: 'Invite your team members',
        badges: [
          { label: 'By 30 June 2027', tone: 'outline' },
          { label: 'NEW', tone: 'solid' },
        ],
        description:
          'Share an invite link so your team members can submit their own details.\n\nYou can also enter their details for them.',
      },
      {
        title: "Attend team manager's meeting",
        description: 'Date to be announced.',
      },
      {
        title: 'Play!',
        description: "Schedule will be released after team manager's meeting.",
      },
    ],
    rulesUpdated: '9 Apr 2027, 4:27pm',
  },
  {
    id: 'womens-open-5v5',
    sport: 'Basketball',
    category: "Women's Open 5v5",
    location: 'Clementi Sport Hall',
    dateRange: '27 June – 2 August 2027',
    price: 15,
    priceUnit: 'per person',
    registerBy: '15 June 2027',
    spotsLeft: 13,
    eligibility: {
      team: ['9 to 15 members', 'At least 70% Singapore citizens or permanent residents'],
      participant: [
        'Female',
        'At least 13 years old (born 2014 or earlier)',
        'A Singapore citizen, permanent resident or foreigner with valid pass',
      ],
    },
    steps: [
      {
        title: 'Register your team and pay',
        badges: [{ label: 'By 15 June 2027', tone: 'outline' }],
        description:
          'One person registers and pays for the team. This person becomes the team manager.',
      },
      {
        title: 'Invite your team members',
        badges: [
          { label: 'By 30 June 2027', tone: 'outline' },
          { label: 'NEW', tone: 'solid' },
        ],
        description:
          'Share an invite link so your team members can submit their own details.\n\nYou can also enter their details for them.',
      },
      {
        title: "Attend team manager's meeting",
        description: 'Date to be announced.',
      },
      {
        title: 'Play!',
        description: "Schedule will be released after team manager's meeting.",
      },
    ],
    rulesUpdated: '9 Apr 2027, 4:27pm',
  },
  {
    id: 'boys-u15-3v3',
    sport: 'Basketball',
    category: "Boys' U15 3v3",
    location: 'Toa Payoh Sports Hall',
    dateRange: '10 Jul to 24 Jul 2027',
    price: 90,
    priceUnit: 'per team',
    registerBy: '20 June 2027',
    spotsLeft: 4,
    eligibility: {
      team: ['3 to 6 members'],
      participant: [
        'Male',
        'Under 15 years old (born 2013 or later)',
        'A Singapore citizen, permanent resident or foreigner with valid pass',
      ],
    },
    steps: [
      {
        title: 'Register your team and pay',
        badges: [{ label: 'By 20 June 2027', tone: 'outline' }],
        description:
          'One person registers and pays for the team. This person becomes the team manager.',
      },
      {
        title: 'Invite your team members',
        badges: [{ label: 'By 4 July 2027', tone: 'outline' }],
        description:
          'Share an invite link so your team members can submit their own details.\n\nYou can also enter their details for them.',
      },
      {
        title: "Attend team manager's meeting",
        description: 'Date to be announced.',
      },
      {
        title: 'Play!',
        description: "Schedule will be released after team manager's meeting.",
      },
    ],
    rulesUpdated: '9 Apr 2027, 4:27pm',
  },
  {
    id: 'girls-u18-5v5',
    sport: 'Basketball',
    category: "Girls' U18 5v5",
    location: 'Jurong West Sports Hall',
    dateRange: '3 Jul to 14 Aug 2027',
    price: 135,
    priceUnit: 'per team',
    registerBy: '15 June 2027',
    spotsLeft: 2,
    eligibility: {
      team: ['5 to 10 members'],
      participant: [
        'Female',
        'Under 18 years old (born 2010 or later)',
        'A Singapore citizen, permanent resident or foreigner with valid pass',
      ],
    },
    steps: [
      {
        title: 'Register your team and pay',
        badges: [{ label: 'By 15 June 2027', tone: 'outline' }],
        description:
          'One person registers and pays for the team. This person becomes the team manager.',
      },
      {
        title: 'Invite your team members',
        badges: [
          { label: 'By 30 June 2027', tone: 'outline' },
          { label: 'NEW', tone: 'solid' },
        ],
        description:
          'Share an invite link so your team members can submit their own details.\n\nYou can also enter their details for them.',
      },
      {
        title: "Attend team manager's meeting",
        description: 'Date to be announced.',
      },
      {
        title: 'Play!',
        description: "Schedule will be released after team manager's meeting.",
      },
    ],
    rulesUpdated: '9 Apr 2027, 4:27pm',
  },
  {
    id: 'mixed-masters-5v5',
    sport: 'Basketball',
    category: 'Mixed Masters 5v5 (35+)',
    location: 'Yio Chu Kang Sports Hall',
    dateRange: '18 Jul to 8 Aug 2027',
    price: 150,
    priceUnit: 'per team',
    registerBy: '25 June 2027',
    spotsLeft: 7,
    eligibility: {
      team: ['5 to 10 members', 'At least 2 female players on court at all times'],
      participant: [
        'At least 35 years old (born 1992 or earlier)',
        'A Singapore citizen, permanent resident or foreigner with valid pass',
      ],
    },
    steps: [
      {
        title: 'Register your team and pay',
        badges: [{ label: 'By 25 June 2027', tone: 'outline' }],
        description:
          'One person registers and pays for the team. This person becomes the team manager.',
      },
      {
        title: 'Invite your team members',
        badges: [{ label: 'By 9 July 2027', tone: 'outline' }],
        description:
          'Share an invite link so your team members can submit their own details.\n\nYou can also enter their details for them.',
      },
      {
        title: "Attend team manager's meeting",
        description: 'Date to be announced.',
      },
      {
        title: 'Play!',
        description: "Schedule will be released after team manager's meeting.",
      },
    ],
    rulesUpdated: '9 Apr 2027, 4:27pm',
  },
]

export function getEventById(id: string) {
  return basketballEvents.find((event) => event.id === id)
}
