/*
 * Mock content for the Home screen, matching Figma "FINAL" (2501:18369).
 *
 * IMAGES — exported by hand from Figma (its asset CDN isn't reachable from the
 * build environment) and imported here so Vite fingerprints and bundles them:
 *
 *   sportsg-logo-on-dark.png   Figma 2501:18375  "SportSG Logo White 1"  68x31
 *   sportsg-logo-on-light.png  Figma 2501:18684  "SportSG Logo White 3"  68x31
 *   team-basketball.png        Figma 2501:18396  "image 139"             75x40
 *   bike-adventure.png         Figma 2501:18420  "image 169"             53x40
 *   activesg-circle.png        Figma 2588:11763  "image 184"            310x79
 *
 * The two logos are genuinely different assets, not one file recoloured — the
 * swap happens in markup via the .dark-only / .light-only helpers.
 *
 * The filenames say which BACKGROUND each belongs on, not what colour the
 * artwork is: `-on-dark` is the white wordmark, `-on-light` is the black one.
 * (Both Figma nodes are named "…White…", which is what makes this easy to get
 * backwards — the first export pair arrived swapped.)
 */

import logoDark from '../assets/sportsg-logo-on-dark.png'
import logoLight from '../assets/sportsg-logo-on-light.png'
import teamBasketball from '../assets/team-basketball.png'
import bikeAdventure from '../assets/bike-adventure.png'
import activesgCircle from '../assets/activesg-circle.png'

export const homeImages = {
  logoDark,
  logoLight,
  teamBasketball,
  bikeAdventure,
  activesgCircle,
}

export type ActionTask = {
  id: string
  title: string
  description: string
  registration: {
    image: string
    name: string
    event: string
  }
}

export type UpcomingEvent = {
  id: string
  title: string
  detail: string
  image: string
}

export const greeting = 'READY FOR THE GAMES?'

export const actionTasks: ActionTask[] = [
  {
    id: 'indemnity',
    title: 'Submit indemnity form',
    description: 'For your child/ward to participate.',
    registration: {
      image: homeImages.teamBasketball,
      name: 'Muhammad Adyan',
      event: "Basketball Boys' U18 5v5",
    },
  },
  {
    id: 'add-members',
    title: 'Add at least 6 more members',
    description: 'Team Rocket has 3 members now. You need at least 9 to compete.',
    registration: {
      image: homeImages.teamBasketball,
      name: 'Team Rocket',
      event: "Basketball Women's Open 5v5",
    },
  },
]

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'riba',
    title: 'Round Island Bike Adventure',
    detail: 'Yishun Sport Centre · 1 Aug 2027',
    image: homeImages.bikeAdventure,
  },
  {
    id: 'womens-open-5v5',
    title: "Basketball Women's Open 5v5",
    detail: 'Clementi Sport Centre · 27 Jun to 2 Aug 2027',
    image: homeImages.teamBasketball,
  },
]

export const featureCard = {
  image: homeImages.activesgCircle,
  title: 'Looking for more ways to play?',
  body: 'Find more sport events and programmes for all ages on ActiveSG Circle.',
  linkLabel: 'Visit activesgcircle.gov.sg',
  href: 'https://www.activesgcircle.gov.sg',
}
