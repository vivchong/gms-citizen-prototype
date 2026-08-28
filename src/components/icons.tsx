/*
 * Icon substitutions.
 *
 * The Figma designs use SGDS/custom icon components. Neither this build sandbox
 * nor the user's machine can reach Figma's asset CDN, so each one is mapped to
 * its closest [lucide-react](https://lucide.dev) equivalent here, in ONE place.
 *
 * Names on the left are the Figma component names, so this file doubles as the
 * mapping table — and as the single place to swap in the real exported SVGs
 * later: replace an export here and every screen picks it up.
 *
 * Known imperfect matches:
 *   ExclamationTriangle — Figma's is a FILLED triangle (variant Fill=Yes);
 *                         lucide's TriangleAlert is outline only.
 *
 * The bottom nav does NOT go through here: those four are Material Symbols
 * Rounded and use the real official glyphs — see MaterialIcon.tsx.
 */
export {
  Bell,
  TriangleAlert as ExclamationTriangle,
  ArrowRight as Arrow,
  ExternalLink as External,
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
