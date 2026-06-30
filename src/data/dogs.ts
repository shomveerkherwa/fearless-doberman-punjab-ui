// ── Types ─────────────────────────────────────────────────────────────────────

export interface PedigreeEntry {
  name      : string
  kciNumber?: string
  registry ?: string   // e.g. RKF, JR, PKR
}

export interface Pedigree {
  sire: PedigreeEntry & {
    sire?: PedigreeEntry & { sire?: PedigreeEntry; dam?: PedigreeEntry }
    dam ?: PedigreeEntry & { sire?: PedigreeEntry; dam?: PedigreeEntry }
  }
  dam: PedigreeEntry & {
    sire?: PedigreeEntry & { sire?: PedigreeEntry; dam?: PedigreeEntry }
    dam ?: PedigreeEntry & { sire?: PedigreeEntry; dam?: PedigreeEntry }
  }
}

export interface DogSummary {
  internalId  : string
  name        : string
  callName   ?: string
  slug        : string
  kciNumber   : string
  microchip  ?: string
  sex         : 'male' | 'female'
  dateOfBirth : string
  colour      : string
  origin      : string
  sire        : string
  dam         : string
  breeder     : string
  coverPhoto  : string
  photos      : string[]    // all photo paths relative to src/assets/
  pedigree    : Pedigree
}


// ── Ranger "Dollar" ───────────────────────────────────────────────────────────
export const dollar: DogSummary = {
  internalId  : 'FDP-HOM-k7x2m9',
  name        : 'Ranger',
  callName    : 'Dollar',
  slug        : 'dollar',
  kciNumber   : '2025/000704',
  microchip   : '978101085183802',
  sex         : 'male',
  dateOfBirth : '2024-11-24',
  colour      : 'Black & Tan',
  origin      : 'European Lines',
  sire        : 'CH. Dicasa Oro Excalibur Unbeatable',
  dam         : 'Atina',
  breeder     : 'Mr. Gurinder Singh',
  coverPhoto  : 'dogs/dollar/dollar_solo.png',
  photos      : [
    'dogs/dollar/dollar_solo.png',
    'dogs/dollar/herotogether.png',
    'dogs/dollar/dollar_2.png',
    'dogs/dollar/dollar_3.png',
    'dogs/dollar/dollar_4.png',
  ],
  pedigree: {
    sire: {
      name: 'Dicasa Oro Excalibur Unbeatable', kciNumber: '2023/006315',
      sire: {
        name: 'CH. Dicasa Oro Yan-Go', kciNumber: 'RKF 5333326',
        sire: { name: 'CH. Sant Kreal Ganzel',        kciNumber: 'RKF 3687471' },
        dam:  { name: 'CH. Perfekto Istinnaya Lady',  kciNumber: 'RKF 3158243' },
      },
      dam: {
        name: 'CH. Dicasa Oro Tsefani', kciNumber: 'RKF 4763466',
        sire: { name: 'CH. Smart Wood Hills Aivengo', kciNumber: 'RKF 3514376' },
        dam:  { name: 'CH. Teana For Golden Mitte',   kciNumber: 'RKF 4038775' },
      },
    },
    dam: {
      name: 'Atina', kciNumber: '2022/006478',
      sire: {
        name: 'Ser.CH. Quai Alba Avis', kciNumber: '2021/020010',
        sire: { name: 'INT.CH. Valdo From Lipar Land IPO1', kciNumber: 'JR 708186' },
        dam:  { name: 'CH. Norma Alba Avis',                kciNumber: 'JR 706663' },
      },
      dam: {
        name: 'Bicoid of Magical Double Helix', kciNumber: '2019/036511',
        sire: { name: 'Smac of Magical Double Helix',    kciNumber: '2018/034288' },
        dam:  { name: "Magical Double Helix's Della",    kciNumber: '2016/022081' },
      },
    },
  },
}


// ── Pedra Dona De Galius ──────────────────────────────────────────────────────
export const dona: DogSummary = {
  internalId  : 'FDP-HOM-p3n8qw',
  name        : 'Pedra Dona De Galius',
  callName    : 'Dona',
  slug        : 'dona',
  kciNumber   : '2025/017688',
  microchip   : '688052000224674',
  sex         : 'female',
  dateOfBirth : '2022-07-12',
  colour      : 'Black & Tan',
  origin      : 'European Lines',
  sire        : 'CH Simba Ginga House JR 718579',
  dam         : 'CH Ninell Nero Kukla JR 713384',
  breeder     : 'Gencic Sasa',
  coverPhoto  : 'dogs/dona/dona1.jpeg',
  photos      : [
    'dogs/dona/dona1.jpeg',
    'dogs/dona/dona2.jpeg',
  ],
  pedigree: {
    sire: {
      name: 'CH Simba Ginga House', kciNumber: 'JR 718579',
      sire: {
        name: 'INTCH Efes Eto Ginga House CHSRB IPO-1', kciNumber: 'JR 705971',
        sire: { name: 'CH Oscar Z Padoku',        kciNumber: 'PKR II-102182' },
        dam:  { name: 'CH Atina Ginga House',     kciNumber: 'JR 704066'    },
      },
      dam: {
        name: 'CH Elen Ely Ginga House', kciNumber: 'JR 711957',
        sire: { name: 'CH Pride of Russia Taymir', kciNumber: 'LOP 486287'  },
        dam:  { name: 'Rubin Ginga House',          kciNumber: 'JR 708065'  },
      },
    },
    dam: {
      name: 'CH Ninell Nero Kukla', kciNumber: 'JR 713384',
      sire: {
        name: 'CH Filimamont Direct Hit', kciNumber: 'RKF 3681070',
        sire: { name: 'CH Teraline Heartland IPO-1',  kciNumber: 'RKF 3275581' },
        dam:  { name: 'May-B Roi',                    kciNumber: '10/204914'   },
      },
      dam: {
        name: 'INTCH Ekskalibur Noemi For Ninell Nero', kciNumber: 'RKF 3661883',
        sire: { name: 'CH Pride of Russia Hermes',      kciNumber: 'RKF 3304241' },
        dam:  { name: 'CH Ekskalibur Innis Izida',       kciNumber: 'RKF 2704969' },
      },
    },
  },
}


// ── All dogs — add new entries here as kennel grows ───────────────────────────
export const allDogs: DogSummary[] = [dollar, dona]
