import type { DogId } from './dog'

// ─── Enums ────────────────────────────────────────────────────────────────────

// Where did this testimonial come from?
export type TestimonialSource =
  | 'external'    // screenshot from a social platform, links to original
  | 'internal'    // submitted directly on the website (future)

// Which platform?
export type TestimonialPlatform =
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'website'     // for internal submissions

// What type of content was the comment on? (reporting use)
export type ContentType =
  | 'post'
  | 'reel'
  | 'video'
  | 'story'
  | 'website_form'  // for internal submissions


// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {

  // Identity
  id           : string             // unique ID e.g. "TST-k7x2m9"
  source       : TestimonialSource  // external | internal
  platform     : TestimonialPlatform
  contentType  : ContentType        // post | reel | video | story | website_form

  // Content
  screenshotUrl : string            // image shown on the site
  text         ?: string            // extracted quote — optional, screenshot is primary
  authorName   ?: string            // person's name if known or submitted

  // For external testimonials — link to original for verification
  originalUrl  ?: string            // direct URL to the comment/post

  // Reporting & filtering
  dogId        ?: DogId             // which dog is being referenced, if identifiable
  date          : string            // "YYYY-MM-DD" — date of comment or submission
  approved      : boolean           // true = show publicly, false = pending review

}
