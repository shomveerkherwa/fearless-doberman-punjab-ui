// ─── ID & Origin ─────────────────────────────────────────────────────────────

// Three-part structure: FDP-HOM-k7x2m9
// Segment 1: kennel prefix (FDP)
// Segment 2: origin type (HOM/SUB/EXT/STD)
// Segment 3: random unique string
export type DogId = string

// Origin types — what is this dog's relationship to the kennel?
export type DogOrigin =
  | 'HOM'   // home bred — born and raised at the kennel
  | 'SUB'   // subsidiary — placed with a trusted person, kennel maintains oversight
  | 'EXT'   // external — acquired from another breeder
  | 'STD'   // stud lineage — born from kennel stud service, raised externally


// ─── Pedigree ─────────────────────────────────────────────────────────────────

// A single ancestor entry — same shape used at every level of the tree
export interface PedigreeEntry {
  name        : string
  kciNumber  ?: string    // not always available for older/foreign ancestors
  colour     ?: string
  registry   ?: string    // e.g. "RKF" (Russia), "FCI" (Europe), "KCI" (India)
}

// Four generations deep — sire and dam at each level
// ? means the field is optional (older records may be incomplete)
export interface Pedigree {
  sire : PedigreeEntry & {
    sire ?: PedigreeEntry & {
      sire ?: PedigreeEntry
      dam  ?: PedigreeEntry
    }
    dam  ?: PedigreeEntry & {
      sire ?: PedigreeEntry
      dam  ?: PedigreeEntry
    }
  }
  dam  : PedigreeEntry & {
    sire ?: PedigreeEntry & {
      sire ?: PedigreeEntry
      dam  ?: PedigreeEntry
    }
    dam  ?: PedigreeEntry & {
      sire ?: PedigreeEntry
      dam  ?: PedigreeEntry
    }
  }
}


// ─── Health ───────────────────────────────────────────────────────────────────

// A formal certified test — DCM, Holter, hip score etc.
// These are displayed publicly in the Health Vault
export interface HealthTest {
  name        : string    // e.g. "DCM1/DCM2 DNA Test"
  result      : string    // e.g. "Cleared", "Normal", "OFA Good"
  date        : string    // "YYYY-MM-DD"
  lab        ?: string    // lab or clinic that ran the test
  documentUrl?: string    // link to the actual report (PDF/image)
}

// A routine care entry — vaccines, vet visits, deworming
// These are internal records, not shown publicly
export interface CareEntry {
  type   : string         // e.g. "Vaccination", "Deworming", "Vet Visit"
  date   : string         // "YYYY-MM-DD"
  notes ?: string
}

export interface HealthRecord {
  certifiedTests : HealthTest[]   // formal results — shown in Health Vault
  routineCare    : CareEntry[]    // internal logbook — not shown publicly
}


// ─── Dog ──────────────────────────────────────────────────────────────────────

export interface Dog {

  // Identity
  internalId   : DogId        // e.g. "FDP-HOM-k7x2m9" — always present
  origin       : DogOrigin    // HOM | SUB | EXT | STD
  kciNumber   ?: string       // optional until KCI registration arrives
  microchip   ?: string       // microchip number

  // Names
  name         : string       // official KCI name e.g. "RANGER"
  callName    ?: string       // everyday nickname e.g. "Dollar"
  slug         : string       // URL path e.g. "FDP-HOM-k7x2m9"

  // Profile
  sex          : 'male' | 'female'
  breed        : string       // "Dobermann" — open field for future breeds
  colour       : string       // e.g. "Black & Tan"
  dateOfBirth  : string       // "YYYY-MM-DD"
  breeder      : string       // e.g. "Mr. Gurinder Singh"

  // Status
  status       : 'active' | 'retired' | 'rehomed' | 'deceased'

  // Pedigree
  pedigree     : Pedigree

  // Media
  coverPhoto   : string       // main photo shown on listing cards
  photos       : string[]     // full gallery array

  // Health
  health       : HealthRecord

  // Females only — optional field
  littersProduced ?: number

}
