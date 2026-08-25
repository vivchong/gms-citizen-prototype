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
  ageRange: string
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
  ageRange: string,
  ageEligibility: string,
  opts: Partial<Pick<SportEvent, 'price' | 'priceUnit' | 'spotsLeft' | 'eligibility'>> = {},
): SportEvent {
  const is3x3 = category.includes('3x3')
  const sex = category.startsWith("Boys'") || category.startsWith("Men's")
    ? 'Male'
    : category.startsWith("Girls'") || category.startsWith("Women's")
      ? 'Female'
      : null

  const participantReqs: string[] = []
  if (sex) participantReqs.push(sex)
  participantReqs.push(ageEligibility)
  participantReqs.push('A Singapore citizen, permanent resident or foreigner with valid pass')

  return {
    id,
    sport: 'Basketball',
    category,
    location: 'Clementi Sport Hall',
    dateRange: '27 Jun to 2 Aug 2027',
    ageRange,
    price: opts.price ?? (is3x3 ? 90 : 135),
    priceUnit: opts.priceUnit ?? 'per team',
    registerBy: '15 June 2027',
    spotsLeft: opts.spotsLeft ?? 8,
    eligibility: opts.eligibility ?? {
      team: [
        is3x3 ? '3 to 4 members' : '9 to 15 members',
        'At least 70% Singapore citizens or permanent residents',
      ],
      participant: participantReqs,
    },
    steps: defaultSteps,
    rulesUpdated: '9 Apr 2027, 4:27pm',
  }
}

export const basketballEvents: SportEvent[] = [
  makeEvent('boys-u10-3x3', "Boys' U10 3x3", '8 to 10 yrs old', 'Born between 2017 and 2019', { price: 30 }),
  makeEvent('boys-u12-3x3', "Boys' U12 3x3", '11 to 12 yrs old', 'Born between 2015 and 2016', { price: 30 }),
  makeEvent('boys-u14-3x3', "Boys' U14 3x3", '13 to 14 yrs old', 'Born between 2013 and 2014', { price: 30 }),
  makeEvent('boys-u16-3x3', "Boys' U16 3x3", '15 to 16 yrs old', 'Born between 2011 and 2012', { price: 30 }),
  makeEvent('boys-u18-3x3', "Boys' U18 3x3", '17 to 18 yrs old', 'Born between 2009 and 2010', { price: 30 }),
  makeEvent('boys-u23-5v5', "Boys' U23 5v5", '13 to 23 yrs old', 'Born between 2004 and 2014', { price: 90 }),
  makeEvent('girls-u10-3x3', "Girls' U10 3x3", '8 to 10 yrs old', 'Born between 2017 and 2019', { price: 30 }),
  makeEvent('girls-u12-3x3', "Girls' U12 3x3", '11 to 12 yrs old', 'Born between 2015 and 2016', { price: 30 }),
  makeEvent('girls-u14-3x3', "Girls' U14 3x3", '13 to 14 yrs old', 'Born between 2013 and 2014', { price: 30 }),
  makeEvent('girls-u16-3x3', "Girls' U16 3x3", '15 to 16 yrs old', 'Born between 2011 and 2012', { price: 30 }),
  makeEvent('girls-u18-3x3', "Girls' U18 3x3", '17 to 18 yrs old', 'Born between 2009 and 2010', { price: 30 }),
  makeEvent('girls-u23-5v5', "Girls' U23 5v5", '13 to 23 yrs old', 'Born between 2004 and 2014', { price: 90 }),
  makeEvent('mens-corporate-open-5v5', "Men's Corporate Open 5v5", '18 yrs old and above', 'Born 2009 or earlier', {
    price: 135,
    eligibility: {
      team: [
        '9 to 15 members',
        'At least 70% Singapore citizens or permanent residents',
        'At least 70% full-time or contract staff of the same organisation',
      ],
      participant: [
        'Male',
        'At least 18 years old (born 2009 or earlier)',
        'Currently employed, with a valid staff ID or employer letter',
        'A Singapore citizen, permanent resident or foreigner with valid pass',
      ],
    },
  }),
  makeEvent('mens-masters-40-5v5', "Men's Masters 40 5v5", '40 yrs old and above', 'Born 1987 or earlier', { price: 135 }),
  makeEvent('mens-masters-45-5v5', "Men's Masters 45 5v5", '45 yrs old and above', 'Born 1982 or earlier', { price: 135 }),
  makeEvent('mens-masters-50-5v5', "Men's Masters 50 5v5", '50 yrs old and above', 'Born 1977 or earlier', { price: 135 }),
  makeEvent('mens-open-3x3', "Men's Open 3x3", '13 yrs old and above', 'Born 2014 or earlier', { price: 45 }),
  makeEvent('mens-open-5v5', "Men's Open 5v5", '13 yrs old and above', 'Born 2014 or earlier', { price: 135 }),
  makeEvent('wheelchair-mixed-open-3x3', "Wheelchair Mixed Open 3x3", '13 to 70 yrs old', 'Born between 1957 and 2014', { price: 15 }),
  makeEvent('womens-masters-35-5v5', "Women's Masters 35 5v5", '35 yrs old and above', 'Born 1992 or earlier', { price: 135 }),
  makeEvent('womens-open-3x3', "Women's Open 3x3", '13 yrs old and above', 'Born 2014 or earlier', { price: 45 }),
  makeEvent('womens-open-5v5', "Women's Open 5v5", '13 yrs old and above', 'Born 2014 or earlier', { price: 135 }),
]

export function getEventById(id: string) {
  return basketballEvents.find((event) => event.id === id)
}
