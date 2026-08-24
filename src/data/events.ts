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

const defaultSteps: TimelineStep[] = [
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
]

function makeEvent(
  id: string,
  category: string,
  opts: Partial<Pick<SportEvent, 'location' | 'dateRange' | 'price' | 'priceUnit' | 'spotsLeft' | 'eligibility'>> = {},
): SportEvent {
  const is3x3 = category.includes('3x3')
  return {
    id,
    sport: 'Basketball',
    category,
    location: opts.location ?? 'Clementi Sport Hall',
    dateRange: opts.dateRange ?? '27 Jun to 2 Aug 2027',
    price: opts.price ?? (is3x3 ? 90 : 135),
    priceUnit: opts.priceUnit ?? 'per team',
    registerBy: '15 June 2027',
    spotsLeft: opts.spotsLeft ?? 8,
    eligibility: opts.eligibility ?? {
      team: is3x3 ? ['3 to 6 members'] : ['5 to 10 members'],
      participant: [
        'A Singapore citizen, permanent resident or foreigner with valid pass',
      ],
    },
    steps: defaultSteps,
    rulesUpdated: '9 Apr 2027, 4:27pm',
  }
}

export const basketballEvents: SportEvent[] = [
  makeEvent('boys-u10-3x3', "Boys' U10 3x3", { location: 'Toa Payoh Sports Hall', spotsLeft: 12 }),
  makeEvent('boys-u12-3x3', "Boys' U12 3x3", { location: 'Toa Payoh Sports Hall', spotsLeft: 10 }),
  makeEvent('boys-u14-3x3', "Boys' U14 3x3", { location: 'Toa Payoh Sports Hall', spotsLeft: 6 }),
  makeEvent('boys-u16-3x3', "Boys' U16 3x3", { spotsLeft: 4 }),
  makeEvent('boys-u18-3x3', "Boys' U18 3x3", { spotsLeft: 5 }),
  makeEvent('boys-u23-5v5', "Boys' U23 5v5", { spotsLeft: 6 }),
  makeEvent('girls-u10-3x3', "Girls' U10 3x3", { location: 'Jurong West Sports Hall', spotsLeft: 14 }),
  makeEvent('girls-u12-3x3', "Girls' U12 3x3", { location: 'Jurong West Sports Hall', spotsLeft: 11 }),
  makeEvent('girls-u14-3x3', "Girls' U14 3x3", { location: 'Jurong West Sports Hall', spotsLeft: 9 }),
  makeEvent('girls-u16-3x3', "Girls' U16 3x3", { spotsLeft: 7 }),
  makeEvent('girls-u18-3x3', "Girls' U18 3x3", { spotsLeft: 3 }),
  makeEvent('girls-u23-5v5', "Girls' U23 5v5", { spotsLeft: 8 }),
  makeEvent('mens-corporate-open-5v5', "Men's Corporate Open 5v5", {
    spotsLeft: 9,
    eligibility: {
      team: ['5 to 10 members', 'At least 70% Singapore citizens or permanent residents'],
      participant: ['Male', 'At least 18 years old', 'Currently employed, with an employer letter'],
    },
  }),
  makeEvent('mens-masters-40-5v5', "Men's Masters 40 5v5", { spotsLeft: 6 }),
  makeEvent('mens-masters-45-5v5', "Men's Masters 45 5v5", { spotsLeft: 7 }),
  makeEvent('mens-masters-50-5v5', "Men's Masters 50 5v5", { spotsLeft: 5 }),
  makeEvent('mens-open-3x3', "Men's Open 3x3", { spotsLeft: 10 }),
  makeEvent('mens-open-5v5', "Men's Open 5v5", { spotsLeft: 4 }),
  makeEvent('wheelchair-mixed-open-3x3', "Wheelchair Mixed Open 3x3", {
    location: 'OCBC Arena',
    spotsLeft: 16,
  }),
  makeEvent('womens-masters-35-5v5', "Women's Masters 35 5v5", { spotsLeft: 11 }),
  makeEvent('womens-open-3x3', "Women's Open 3x3", { spotsLeft: 13 }),
  makeEvent('womens-open-5v5', "Women's Open 5v5", { spotsLeft: 8 }),
]

export function getEventById(id: string) {
  return basketballEvents.find((event) => event.id === id)
}
