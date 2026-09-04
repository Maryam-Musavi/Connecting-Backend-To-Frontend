export type Language = 'en' | 'fa';

export type Section = 'home' | 'company' | 'capabilities' | 'presence' | 'contact';

export interface TranslationContent {
  companyName: string;
  companySubName: string;
  tagline: string;
  nav: {
    home: string;
    company: string;
    capabilities: string;
    presence: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    whoWeAreHeading: string;
    whoWeAreText: string;
    capabilitiesHeading: string;
    capabilitiesIntro: string;
    presenceHeading: string;
    presenceText: string;
    ctaHeading: string;
    ctaButton: string;
  };
  company: {
    heroTitle: string;
    companyStatementHeading: string;
    companyStatementText: string;
    missionHeading: string;
    missionText: string;
    visionHeading: string;
    visionText: string;
    orgValuesHeading: string;
    organizationalValues: Array<{
      id: string;
      title: string;
      desc: string;
    }>;
    coreValuesHeading: string;
    principleLabel: string;
    partnerTitle: string;
    partnerText: string;
    scopeHeading: string;
    scopeIntro: string;
    scopeItems: Array<{ code: string; text: string }>;
    values: Array<{ title: string; desc: string }>;
  };
  capabilities: {
    heroTitle: string;
    intro: string;
    importExportHeading: string;
    importExportText: string;
    comprehensiveHeading: string;
    comprehensiveText: string;
    perspectives: Array<{
      title: string;
      description: string;
    }>;
    inquireTitle: string;
    inquireSub: string;
    items: Array<{
      id: string;
      title: string;
      statement: string;
    }>;
  };
  presence: {
    heroTitle: string;
    statement: string;
    partnershipHeading: string;
    partnershipText: string;
    corridorArchitecture: string;
    coordinationDesk: string;
    inquireCorridors: string;
    hubs: Array<{
      name: string;
      shortName?: string;
      region: string;
      role: string;
      coords: { x: number; y: number };
    }>;
    targetCountriesHeading: string;
    targetCountriesIntro: string;
    countriesList: Array<{
      id: string;
      name: string;
      direction: string;
      role: string;
    }>;
  };
  eyebrows: {
    hero: string;
    profile: string;
    capabilities: string;
    corridors: string;
    companyOverview: string;
    commercialPosition: string;
    purpose: string;
    outlook: string;
    orgValues: string;
    principles: string;
    capabilitiesFramework: string;
    presenceGlobal: string;
    positionStatement: string;
  };
  buttons: {
    readProfile: string;
    viewCapabilities: string;
    expandNetwork: string;
  };
  ticker: {
    coreScope: string;
    coreScopeVal: string;
    financing: string;
    financingVal: string;
    exchange: string;
    exchangeVal: string;
    logistics: string;
    logisticsVal: string;
  };
  map: {
    architecture: string;
    activeHub: string;
    strategicHub: string;
    regionLabel: string;
    commercialScope: string;
    selectCorridor: string;
  };
  contact: {
    heroTitle: string;
    contactCategory: string;
    opportunityHeading: string;
    opportunityText: string;
    formHeading: string;
    formSubheading: string;
    formName: string;
    formFirm: string;
    formPhone: string;
    formCountry: string;
    formMessage: string;
    formSubmit: string;
    sending: string;
    sendingError: string;
    formSuccess: string;
    directContact: string;
    commercialCommTitle: string;
    emailTitle: string;
    phoneTitle: string;
    phone: string;
    faxTitle: string;
    fax: string;
    addressTitle: string;
    address: string;
    linkedIn: string;
    networkTitle: string;
    transmissionConfirmed: string;
    submitAnother: string;
    placeholderName: string;
    placeholderFirm: string;
    placeholderPhone: string;
    placeholderCountry: string;
    placeholderMessage: string;
    // === Form section header ===
    formSectionEyebrow: string;
    formSectionTitle: string;
    formSectionIntro: string;
    // === Validation ===
    validationRequired: string;
    validationPhone: string;
    // === Buttons / summary ===
    formReset: string;
    formSummaryTitle: string;
    summaryEyebrow: string;
  };
}
