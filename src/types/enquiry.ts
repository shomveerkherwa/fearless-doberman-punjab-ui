import type { DogId } from './dog'

// ─── Enums ────────────────────────────────────────────────────────────────────

// Where the enquiry stands in Gurinder's review process
export type EnquiryStatus =
  | 'new'         // just submitted, not yet looked at
  | 'reviewing'   // Gurinder is evaluating
  | 'approved'    // serious buyer, proceed with conversation
  | 'rejected'    // not the right fit

// How the buyer prefers to be contacted — their choice, no pressure
export type ContactPreference =
  | 'email'
  | 'phone'
  | 'either'

// Purpose — why do they want a Dobermann?
export type DogPurpose =
  | 'companion'       // family/personal pet
  | 'sport'           // IPO, Schutzhund, working trials
  | 'protection'      // personal or property protection
  | 'breeding'        // they intend to breed
  | 'other'           // anything else, explained in notes

// Living situation
export type LivingSpace =
  | 'house_with_garden'
  | 'house_without_garden'
  | 'apartment'
  | 'farmhouse'
  | 'other'


// ─── Enquiry ──────────────────────────────────────────────────────────────────

export interface Enquiry {

  // Identity
  id                 : string             // e.g. "ENQ-k7x2m9"
  submittedAt        : string             // "YYYY-MM-DD"
  status             : EnquiryStatus      // new | reviewing | approved | rejected

  // Person
  fullName           : string
  email              : string
  phone              : string
  city               : string
  state              : string
  contactPreference  : ContactPreference  // their preferred way to be reached

  // Which dog they are interested in
  dogId             ?: DogId              // optional — they may not have a specific dog in mind

  // Experience
  ownedDobermann     : boolean            // have they owned a Dobermann before?
  currentDogs        : number             // how many dogs do they currently have?
  dogBreeds         ?: string             // what breeds, if any

  // Living situation
  livingSpace        : LivingSpace
  hasOutdoorSpace    : boolean

  // Intent
  purpose            : DogPurpose         // why do they want a Dobermann?
  message            : string             // their own words — open text field

  // Internal — Gurinder's notes, not shown to the buyer
  internalNotes     ?: string

}
