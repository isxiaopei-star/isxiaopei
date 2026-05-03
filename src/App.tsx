/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hls from 'hls.js';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useAnimationFrame } from "motion/react";
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  Linkedin, 
  Instagram, 
  ChevronRight, 
  ChevronLeft,
  Target, 
  Zap, 
  Layers, 
  BarChart3, 
  Users, 
  Share2,
  Menu,
  X,
  Plus,
  ArrowLeft,
  ArrowRight,
  Check,
  Sun,
  Moon,
  Loader2
} from "lucide-react";
import * as React from "react";
import { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

type Language = "en" | "zh";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  theme: "light",
  setTheme: () => {},
});

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "HOME",
    about: "ABOUT",
    works: "WORKS",
    services: "WORKS",
    contact: "CONTACT",
    backHome: "Back to Home",
    backServices: "Back Services",
    viewShowcase: "View Showcase",
    getInTouch: "Get in touch",
    getInTouchAlt: "Get in Touch",
    viewAllWorks: "View all works",
    aboutMe: "ABOUT ME",
    professionalJourney: "Professional Journey",
    downloadResume: "Download Resume",
    sendAMessage: "Send a message",
    learnMore: "Learn more",
    growthLeader: "Growth Leader & Brand Strategist",
    professionalServices: "Professional Services",
    strategyLedGrowth: "Strategy-led, Architecting Scalable Growth.",
    detailedExpertise: "Detailed Expertise",
    viewCaseStudy: "View Case Study",
    selectedWorksTitle: "Selected Works",
    solvingGrowthBottlenecks: "Solving Growth Bottlenecks",
    smartMarketExecution: "with Smart Market Execution.",
    readFullCaseStudy: "read full case study",
    readyToArchitect: "Ready to architect your next growth phase?",
    startAConversation: "Start a Conversation",
    copyright: "© 2024 Lexi Lin. All rights reserved.",
    letConnect: "Let's connect",
    transformBeautyTitle: "TRANSFORM YOUR PERCEPTION OF BEAUTY.",
    marketingContentP1: "Here, you will discover how I architect comprehensive marketing systems, drive scalable business growth, and transform products and technologies into commercial successes. I also showcase proven case studies in orchestrating global brand operations.",
    lookingForward: "Ready to explore the future of business growth?",
    contactDescription: "Please fill out the form below and I'll get back to you shortly.",
    synergySubtitle: "If you're seeking a growth consultant capable of transforming complex challenges into remarkable business success, I am always ready to listen to your needs. Whether it's strategic consulting, project collaboration, or a simple exchange of ideas, please feel free to reach out to me.",
    directInquiry: "Direct Inquiry",
    voiceCall: "Voice Call",
    sendAMessageSubtitle: "Please fill out the form below, and I will get back to you as soon as possible.",
    fullName: "FullName",
    emailAddress: "Email Address",
    company: "Company / Organization",
    yourMessage: "Your Message",
    sendMessage: "Send Message",
    performanceDriven: "Performance-Driven Marketing",
    validatingGrowth: "Validating growth through data-led metrics.",
    revenueGrowth: "Revenue Growth",
    highQualityLeads: "High-Quality Leads",
    ecommerceGMV: "E-commerce GMV",
    socialFollowers: "GET FOLLOWERS",
    contentMarketing: "Content Marketing",
    ecommerceWebsite: "E-commerce",
    liveStreaming: "Live streaming",
    socialMediaMatrix: "Social media",
    privateDomain: "Community Ops",
    emailMarketing: "Email marketing",
    advertisingMarketing: "Advertising Marketing",
    influencers: "Influencers",
    overseasSocial: "Overseas Social Media",
    overseasAds: "Overseas Advertising",
    showcase: "showcase",
    brandCampaigns: "Brand Campaigns",
    brandMediaStrategy: "Brand Media Strategy",
    brandPROpinion: "Brand PR & Public Opinion",
    brandEquity: "Brand Equity",
    expertiseMoats: "Establishing Expertise Moats",
    crossPlatformStrategic: "Cross-platform Strategic Linkage",
    techValueTransformation: "Technical Value Transformation",
    businessStorytelling: "Business Storytelling Showcases",
    strategicInsights: "Strategic Insights & Market Validation",
    growthEngineGTM: "Growth Engine & GTM Orchestration",
    lifecycleManagement: "Lifecycle Management & Retention",
    integratedOperations: "Integrated Operations & Systemic Efficiency",
    myStrengths: "My Strengths",
    strengthHighTicketTitle: "High-Ticket Specialist",
    strengthHighTicketDesc: "I specialize in navigating the complexities of high-ticket technical solutions. I understand that high-value decisions aren't made overnight—they require building deep trust and demonstrating undeniable expertise throughout a long-cycle sales funnel.",
    strengthAdaptabilityTitle: "Strategic Adaptability",
    strengthAdaptabilityDesc: "My career has been forged across diverse business landscapes—from the rigorous structures of global MNCs and listed corporations to the high-velocity environment of startups. This versatility allows me to pivot seamlessly between high-level strategic planning and agile, hands-on execution.",
    strengthProblemSolverTitle: "Growth-Oriented Problem Solver",
    strengthProblemSolverDesc: "I position myself as more than just a marketer; I am a growth consultant. I thrive on deconstructing complex business bottlenecks and transforming 'pain points'—like stagnant growth or low acquisition efficiency—into scalable, data-driven competitive advantages.",
    aboutHeroTitle: "HI, I’m Lexi Lin",
    aboutHeroSubtitle: "A growth strategy you’ve been looking for",
    backAbout: "Back to About",
    aboutHeroDescPart1: "With 7 years of experience in marketing and brand leadership (including 5 years in team management), I specialize in the nuances of high-ticket technical solutions. I understand that high-value decisions are built on a foundation of deep trust and undeniable expertise—cultivated through a meticulously designed, long-cycle sales funnel.",
    aboutHeroDescPart2: "My career has been forged at the intersection of global MNCs and high-velocity startups. This allows me to pivot seamlessly between high-level strategic orchestration and agile, hands-on execution. More than a marketer, I am a growth consultant. I deconstruct business bottlenecks and transform \"pain points\" into scalable, data-driven competitive advantages.",
    aboutHeroDesc: "With 7 years of experience in marketing and brand leadership (including 5 years in team management), I specialize in the nuances of high-ticket technical solutions. I understand that high-value decisions are built on a foundation of deep trust and undeniable expertise—cultivated through a meticulously designed, long-cycle sales funnel.\n\nMy career has been forged at the intersection of global MNCs and high-velocity startups. This allows me to pivot seamlessly between high-level strategic orchestration and agile, hands-on execution. More than a marketer, I am a growth consultant. I deconstruct business bottlenecks and transform \"pain points\" into scalable, data-driven competitive advantages.",
    aboutExperienceSubtitle: "A track record of building marketing systems from 0 to 1 and driving global brand influence across diverse product lines.",
    exp1RoleLine: "Senior Marketing Supervisor",
    exp1Highlight1: "Led globalization brand operations 13 business lines",
    exp1Highlight2: "Delivered 11.9% profit growth in Greater China",
    exp2RoleLine: "Marketing Lead",
    exp2Highlight1: "Built marketing system from 0 to 1",
    exp2Highlight2: "Achieved over 600% growth in 4 years",
    exp1Role: "Senior Marketing Supervisor",
    exp1Desc: "In a flat global business unit structure, I collaborated with Business Directors and C-level executives on strategic decisions. I was responsible for brand promotion and cross-industry partnerships across 13 product lines, including consumer electronics, renewable energy, semiconductors, and medical devices. Through high-level B2B resource integration in a highly competitive mature market, I helped leading clients achieve brand premium and sales growth, while strengthening SGS’s global brand influence and customer lifetime value.",
    exp1Achieve1: "Led globalization brand operations 13 LOBs",
    exp1Achieve2: "Delivered 11.9% profit growth in Greater China",
    exp2Role: "Marketing Lead",
    exp2Desc: "I built the marketing function from 0 to 1 and was responsible for market strategy planning and execution. I worked closely with sales and R&D teams to provide cross-marketing collaborations and complex commercial solutions for leading enterprises such as L’Oréal, Miniso, and By-Health (Tomson By-Health). I played a central role during the company’s critical expansion and organizational transformation period.",
    exp2Achieve1: "Built marketing system from 0 to 1",
    exp2Achieve2: "Achieved over 600% growth in 4 years",
    heroTitle: "Performance-Driven Marketing<br/>Validating growth through data-led metrics",
    heroDesc: "Here, you will discover how I architect comprehensive marketing systems, drive scalable business growth, transform products and technologies into commercial successes. I also showcase proven case studies in orchestrating global brand operations.",
    aboutSummaryTitle: "A growth strategy you’ve been looking for",
    aboutSummaryDesc: "With 7 years of experience in marketing and brand leadership (including 5 years in team management), I specialize in the nuances of high-ticket technical solutions. I understand that high-value decisions are built on a foundation of deep trust and undeniable expertise—cultivated through a meticulously designed, long-cycle sales funnel.",
    worksSummaryDesc: "Explore how I’ve helped forward-thinking brands unlock growth through tailored strategies, impactful storytelling, and performance-driven execution.",
    project1Title: "20M+ Revenue Growth",
    project1Desc: "Built an omni-channel engine delivering 50,000+ high-quality leads.",
    project2Title: "100M+ Brand Exposure",
    project2Desc: "Full-scale brand strategy, PR, and integrated communications.",
    project3Title: "80+ Strategic Partnerships",
    project3Desc: "Delivered 10M+ traffic through cross-industry marketing with Tech & FMCG giants.",
    capabilitiesTitle: "Strategy-led,\nArchitecting Scalable Growth.",
    capabilitiesDesc: "From strategy to execution, I offer a full suite of marketing services designed to grow your brand, reach your audience, and drive real results.",
    cap1Title: "Marketing Strategy",
    cap1Desc: "Formulate end-to-end marketing strategies across the entire business lifecycle to validate commercial logic and mitigate market entry risks.",
    cap2Title: "Digital Growth Engine",
    cap2Desc: "Align market activities with business growth and brand exposure through the strategic implementation of a comprehensive digital marketing matrix.",
    cap3Title: "Ecosystem Resource Expansion",
    cap3Desc: "Enhance technical leadership and industry standing by expanding supply chain resources and establishing benchmarks for cross-industry collaboration.",
    cap4Title: "Brand Building & Communication",
    cap4Desc: "Define top-level brand strategy design to increase brand premium and strengthen the ability to capture commercial value.",
    exploreAllServices: "explore all services",
    strategyLedGrowthDesc: "From strategy to execution, I offer a full suite of marketing services designed to grow your brand, reach your audience, and drive real results.",
    serv1Details: "In saturated markets, growth often stalls due to a lack of strategic focus. I architect full-lifecycle marketing strategies that turn technical innovation into market leadership. From MVP validation to engineering new growth curves, I bridge the gap between business logic and commercial scale. By neutralizing data-driven bottlenecks in conversion and retention, I help brands pivot from \"price wars\" to value-driven dominance.",
    serv2Details: "High-stakes B2B businesses often struggle with fragmented channels, opaque ROI, and escalating acquisition costs. I architect comprehensive lead generation ecosystems designed for complex sales cycles. By mapping multi-touchpoint journeys across content, digital commerce, social matrices, and private communities, I ensure no lead is left behind. My approach has consistently delivered seamless conversion—from first touch to final inquiry—achieving premium growth with maximum cost-efficiency.",
    serv3Details: "Many enterprises fall into the trap of viewing branding as a high-cost \"traffic game,\" resulting in blurred identities and fragmented narratives. I redefine branding by integrating a company's technical DNA with strategic top-level design. By bridging the gap between commercial narrative and business execution, I transform intangible brand equity into measurable market leadership. My approach ensures your brand isn’t just seen, but felt—driving higher premiums, customer loyalty, and a defensible competitive moat.",
    brandSentimentMonitoring: "Brand Sentiment Monitoring",
    brandCreativeConcepting: "Brand Creative & Concepting",
    mediaRelationsPartnerships: "Media Relations & Partnerships",
    prCommunications: "PR & Communications",
    imc: "IMC",
    brandActivations: "Brand Activations",
    brandIdentityAssets: "Brand Identity & Assets",
    brandMindshare: "Brand Mindshare",
    serv4Details: "Many businesses possess a distinct technical edge but remain siloed from the broader industry ecosystem, missing out on vital G2B (Government-to-Business) and cross-sector synergies. I specialize in bridging this gap by identifying a company’s unique value-chain niche. By orchestrating alliances between upstream/downstream partners, regulatory bodies, and trade associations, I evolve brands from standalone players into ecosystem leaders. Through standard-setting and strategic industry engagement, I transform technical superiority into a defensible \"professional moat\" and high-value commercial returns.",
    govtEnterpriseSynergy: "Government & Enterprise Synergy",
    buildingStrategicMoats: "Building Strategic Moats",
    commercialNarrativeCaseStudies: "Commercial Narrative & Case Studies",
    techValueMonetization: "Technical Value Monetization",
    industryAlliancePartnerships: "Industry Alliance & Partnerships",
    platformStrategicAlignment: "Platform Strategic Alignment",
    revenueHeroTitle: "Digital Growth Engine",
    revenueHeroDesc: "High-stakes B2B businesses often struggle with fragmented channels, opaque ROI, and escalating acquisition costs. I architect comprehensive lead generation ecosystems designed for complex sales cycles. By mapping multi-touchpoint journeys across content, digital commerce, social matrices, and private communities, I ensure no lead is left behind. My approach has consistently delivered seamless conversion—from first touch to final inquiry—achieving premium growth with maximum cost-efficiency.",
    brandHeroTitle: "Brand Building & Communication",
    brandHeroDesc: "In the process of building a brand from 0 to 1 or during brand upgrading, I often see companies facing several core challenges: vague brand positioning, uninspiring narratives, fragmented media resources, passive public opinion handling, and difficulty in quantifying brand assets.<br /><br />With my help, brands can rapidly establish a clear and distinctive image, significantly boost market awareness and emotional connection. Ultimately, this delivers stronger pricing power, higher average order value, increased repurchase rates, and sustainable competitive advantage.",
    partnerHeroTitle: "Ecosystem Resource Expansion",
    partnerHeroDesc: "Currently, most enterprises face structural dilemmas such as resource fragmentation, eroding technical moats, and insufficient brand visibility. The \"go-it-alone\" model is no longer viable in today’s complex environment.<br /><br />I specialize in \"Technical Leadership\" and \"Industry Positioning\" as core metrics. I help enterprises transition from isolated operations to ecosystem leadership, achieving resource sharing, technical co-creation, and symbiotic value growth.",
    marketingHeroTitle: "Marketing Strategy Development",
    marketingHeroDesc: "In highly competitive or mature markets, a robust strategy is the difference between stagnation and leadership. I provide comprehensive market analysis, competitor benchmarking, and strategic roadmaps tailored to specific product lines.<br /><br />Formulate end-to-end marketing strategies across the entire business lifecycle to validate commercial logic and mitigate market entry risks.",
    businessImpact: "Business Impact",
    theChallenge: "The Challenge",
    myStrategy: "My Strategy",
    keyResults: "Key Results",
    theResults: "The Results",
    operationalEfficiency: "Operational Efficiency",
    strategicInfluence: "Strategic Influence",
    ecosystemValue: "Ecosystem Value",
    caseStudy: "Case Study",
    moreCaseStudies: "More Hands-On Case Studies",
    revenueCaseTitle: "Overseas Channel Acquisition Strategy",
    revenueCaseSub: "The following section showcases 'Overseas Channel Operations' as a key customer acquisition case study:",
    revenueChallengeDesc: "Led overseas market operations for SGS China Connectivity & Products. In this high-ticket B2B solutions business, common challenges included fragmented acquisition channels, difficult ROI tracking, insufficient qualified leads, and low conversion rates.",
    revenueStrategyP1: "Built and optimized a comprehensive, full-funnel customer acquisition system across online and offline channels, including content marketing, official website and e-commerce store, live streaming, social media matrix, private domain communities, email marketing, webinars, and offline events/conferences.",
    revenueStrategyP2: "Utilized global paid search, email, and social media resources to drive content creation and publishing, performance data analysis, and conversion tracking for the Connectivity & Products overseas social media matrix.",
    revenueStrategyP3: "Expanded the reach of paid content by leveraging Meta Advantage+ Audience and LinkedIn Audience Network, successfully reducing Global CPM by 48.1% while significantly maximizing coverage and engagement. Clear customer touchpoints were established at every entry stage to effectively guide prospects to submit inquiries.",
    revenueResultsPerformanceMetrics: "Performance Metrics",
    revenueResultsTotalInquiries: "Total Inquiries (Dec)",
    revenueResultsWebsiteTraffic: "Website Traffic (Dec)",
    revenueResultsEmailOpens: "Email Opens (Dec)",
    revenueResultsYoYGrowth: "YoY Growth",
    revenueResultsStableEngagement: "Stable Engagement",
    revenueResultsChannelBreakdown: "Channel Breakdown (December)",
    channelWebsite: "Website",
    channelPaidSearch: "Paid Search",
    channelWebinar: "Webinar",
    channelSocialMedia: "Social Media",
    channelDivision: "Connectivity & Products",
    channelNotePrimary: "primary acquisition channel",
    channelNoteGrowth: "highest growth channel",
    revenueImpactP1: "The omnichannel acquisition strategy effectively addressed key pain points in high-ticket B2B lead generation. By combining broad-reach paid tools with precise content and engagement channels, the approach delivered stable, high-quality overseas leads at very low cost.",
    revenueImpactP2: "This data-driven framework proved highly effective for Connectivity & Products and provides a scalable model for future international market expansion.",
    moreCaseStudiesExpansion: "in Market Expansion and Lead Generation",

    brandCaseTitle: "Integrated Marketing/IMC Strategy",
    brandCaseSub: "The following section showcases 'Integrated Marketing/IMC' as a key brand campaign case study:",
    brandChallengeDesc: "In the process of building a brand from 0 to 1 or during brand upgrading and transformation, companies often face core challenges such as vague brand positioning, uninspiring brand narratives, fragmented media resources, passive public opinion handling, and difficulty in quantifying brand assets. In this project, as a technology-oriented B2B brand, SGS Electrical & Electronics Division faced similar challenges: highly technical products, difficult communication and conversion, limited reach to core decision-making circles, and slow growth in market recognition.",
    brandStrategyP1: "I led the full integrated marketing (IMC) campaign planning for SGS Electrical & Electronics Division at the China International Import Expo (CIIE). I systematically integrated four major modules — Visual, Content, Communication, and Interaction — while completing full execution across PR, direct sales, CI, packaging, and news media:",
    brandStrategyVisual: "Visual:",
    brandStrategyVisualDesc: "Booth visual creative design, on-site AI audio test room setup, collaboration with Tencent SSV Time Laboratory, simulated sandbox concept design",
    brandStrategyContent: "Content:",
    brandStrategyContentDesc: "Script and copywriting, product promotional video production",
    brandStrategyComm: "Communication:",
    brandStrategyCommDesc: "Offline media interviews, social media platforms and information flow placement, technical executive presentations / leadership speeches",
    brandStrategyInteract: "Interaction:",
    brandStrategyInteractDesc: "Product demonstration area",
    brandStrategyFooter: "Through deep integration of brand storytelling, brand activities, media strategies, and public relations, the project achieved a closed-loop from strategic top-level design to full implementation.",
    brandResultsCIIEPerformance: "CIIE Campaign Performance",
    brandResultsEventAttendance: "Event Attendance",
    brandResultsMediaCoverage: "Famous Media Coverage",
    brandResultsTransactions: "On-site Transactions",
    brandResultsFollowers: "New Account Followers",
    brandImpactP1: "This project set a new benchmark for communication and conversion of technology projects. It not only achieved rapid conversion of high-quality business opportunities, but also significantly enhanced brand influence and contributed to long-term brand asset accumulation.",
    brandImpactP2: "Serving as a high-value practical example of integrated marketing within brand building and management.",
    moreCaseStudiesBrand: "in Full-Case Brand Planning",

    partnerCaseTitle: "Ecosystem Partnership Strategy",
    partnerCaseSub: "The following section showcases 'Ecosystem Partnership' as a key brand campaign case study:",
    partnerChallengeDesc: "As a third-party TIC firm, CTI’s traditional output is the delivery of lab reports. However, in today’s hyper-competitive compliance market, mere transactional cooperation is no longer sufficient. The challenge was how to precisely navigate industry trends within a massive e-commerce ecosystem, capture emerging dividends, and achieve a deep transformation of technical value into commercial marketing power.",
    partnerStrategyIntro: "As a Market PM, I spearheaded the integration of opportunities across the entire industrial value chain through the following core strategies:",
    partnerStrategySynergy: "Establishing Ecosystem Synergy:",
    partnerStrategySynergyDesc: "I facilitated deep strategic alignment with China’s leading e-commerce giants, including JD.com, Kuaishou, Douyin, Baidu Health, and Tmall.",
    partnerStrategyEmpower: "Brand Empowerment & Endorsement:",
    partnerStrategyEmpowerDesc: "Leveraged our technical expertise to provide compliance empowerment for sellers, building high professional barriers to entry.",
    partnerStrategyNarrative: "Multidimensional Business Narratives:",
    partnerStrategyLive: "Live Marketing",
    partnerStrategyLiveDesc: "Collaborated with Tmall Global & JD for 'Quality Certification' live streams.",
    partnerStrategyContentCo: "Content Co-creation",
    partnerStrategyContentCoDesc: "Partnered with Kuaishou for merchant compliance educational videos.",
    partnerResultsPerformance: "Partnership Performance",
    partnerResultsRevenue: "Annual Revenue from E-comm Key Accounts",
    partnerResultsDominance: "Market Dominance in Leading Platforms",
    partnerImpactP1: "I help enterprises transition from isolated operations to ecosystem leadership, achieving resource sharing, technical co-creation, and symbiotic value growth.",
    partnerImpactP2: "By breaking down resource barriers through cross-platform strategic synergy, we ensured that technical testing data was transformed into visible, impactful commercial brand power.",

    marketCaseTitle: "Strategic Roadmap & GTM Strategy",
    marketCaseSub: "The following section showcases the systematic approach to market validation and strategic positioning.",
    marketChallengeDesc: "Addressing vague brand positioning, fragmented media resources, and difficulty in quantifying brand assets in competitive mature markets.",
    marketFrameworkTitle: "Marketing Framework",
    marketFrameworkS1: "Strategic Insights & Market Validation",
    marketFrameworkS2: "Growth Engine & GTM Orchestration",
    marketMetricInsight: "Market Insight",
    marketMetricComp: "Competitive Analysis",
    marketMetricPMF: "PMF Validation",
    marketMetricArch: "Business Architecture",
    marketMetricGTM: "GTM Management",
    marketMetricValue: "Value Translation",
    marketMetricLead: "Lead Incubation",
    marketMetricSynergy: "Cross-functional Synergy",
    marketResultsStrategicMetrics: "Strategic Metrics",
    marketResultsValidationRate: "Market Validation Rate",
    marketResultsStandardization: "Standardization",
    marketResultsAttribution: "Driven Attribution",
    marketResultsLTV: "Enhancement",
    marketImpactP1: "Integrated Operations & Systemic Efficiency: By establishing data feedback loops and SOP standardization, we achieved scalable strategic influence across the entire business lifecycle.",
    marketImpactP2: "This end-to-end logic ensures that marketing activities are not just campaigns, but core growth assets.",
    moreCaseStudiesStrategic: "in Strategic Frameworks",
    carouselStrategicInsights: "Strategic Insights",
    carouselMarketValidation: "Market Validation",
    carouselGTMOrchestration: "GTM Orchestration",
    carouselLifecycleManagement: "Lifecycle Management",
    contentMarketingTitle: "Content Marketing",
    contentProjectStrategy: "Project Strategy",
    contentStrategyDesc: "Built the content marketing system for CTI from 0 to 1, leading the team to achieve growth targets: 1) Content marketing execution; 2) Data-driven persona analysis; 3) Continuous content iteration; 4) Multi-channel growth strategies.",
    contentHighlights: "Performance Highlights",
    contentAnnualPosts: "Annual Posts",
    contentPopularPosts: "Posts > 1K Reads",
    contentTotalViews: "Total Views",
    contentConsultations: "Consultations",
    contentMQLs: "MQLs Generated",
    catPressNews: "Press / Brand News",
    catInteractive: "Interactive Media",
    catHandbooks: "Handbooks",
    catProductDemo: "Product / Demo",
    catIndustryValue: "Industry / Value",
    featFollowerTags: "Follower Tags",
    featFollowerTagsDesc: "Tagging for precise service delivery.",
    featInAppSearch: "In-app Search",
    featInAppSearchDesc: "Integrated modules for centralized traffic.",
    featContentInflow: "Content Lead Gen",
    featContentInflowDesc: "High-value content driving inquiries.",
    featCollectionTags: "Collection Tags",
    featCollectionTagsDesc: "Categorization for search exposure.",
    marketingStrategyHeroTitle: "Marketing Strategy",
    strategicAnalysis: "Market & Strategic Analysis",
    strategicAnalysisDesc: "Deep-dive analysis of market trends, user behavior, and competitive positioning to build a robust growth foundation.",
    competitorBenchmarking: "Competitor Benchmarking",
    marketEntryStrategy: "Market Entry Strategy",
    gtmFramework: "GTM Framework Design",
    mktS1Title: "Validation & Launch",
    mktS1Item1: "Market Insights",
    mktS1Item2: "Qualitative/Quantitative research",
    mktS1Item3: "competitive intelligence",
    mktS1Item4: "MVP Strategy",
    mktS1Item5: "A/B testing",
    mktS1Item6: "Rapid validation via Landing Pages",
    mktS1Item7: "Business Modeling",
    mktS2Title: "Scaling & Growth",
    mktS2Item1: "GTM Orchestration",
    mktS2Item2: "Full-scale launch management",
    mktS2Item3: "terminal execution",
    mktS2Item4: "Conversion Engineering",
    mktS2Item5: "Sales funnels",
    mktS2Item6: "buyer journey mapping",
    mktS2Item7: "FABE models",
    mktS2Item8: "Growth Stack",
    mktS2Item9: "Implementing marketing automation",
    mktS2Item10: "lead nurturing",
    mktS3Title: "Maturity & LTV",
    mktS3Item1: "Retention Strategy",
    mktS3Item2: "LTV optimization",
    mktS3Item3: "RFM modeling",
    mktS3Item4: "loyalty programs",
    mktS3Item5: "Precision Pricing",
    mktS3Item6: "Strategic pricing models",
    mktS3Item7: "commercial incentives",
    mktS3Item8: "Attribution",
    mktS3Item9: "ROI analysis",
    mktS3Item10: "Multi-Touch Attribution (MTA)",
    mktS4Title: "Infrastructure & Synergy",
    mktS4Item1: "Data Intelligence",
    mktS4Item2: "BI dashboards",
    mktS4Item3: "real-time performance visualization",
    mktS4Item4: "Scalable Operations",
    mktS4Item5: "Standard Operating Procedures (SOPs) for replication",
    mktS4Item6: "Strategic Pivot",
    mktS4Item7: "transition from tactical discounting to brand value",
    revenueGrowthHeroTitle: "Digital Revenue Engine",
    revenueGrowthHeroSubtitle: "Scaling B2B businesses through high-efficiency lead generation and conversion optimization.",
    annualSalesGrowth: "Sales Growth",
    salesGrowthDesc: "Significant increase in recurring revenue through channel optimization.",
    organicLeads: "Organic Leads",
    leadsGrowthDesc: "Scaled high-quality inquiry flow without increasing CPA.",
    roiIncrease: "ROI Increase",
    roiImprovementDesc: "Improved marketing efficiency through full-funnel tracking.",
    caseAnalysis: "Case Analysis",
    revenueCaseDesc: "A complete reconstruction of the digital acquisition funnel, implementing automated lead scoring and nurturing systems.",
    brandExposureHeroTitle: "Brand Identity & Impact",
    brandExposureHeroSubtitle: "Transforming brand potential into market leadership through persuasive narratives.",
    brandOrchestration: "Brand Orchestration",
    brandOrchestrationDesc: "Aligning every touchpoint to convey a consistent, premium brand story that drives trust and loyalty.",
    identityDesign: "Identity Design",
    identityDesignDesc: "Visual systems that command attention.",
    narrativeStrategy: "Narrative Strategy",
    narrativeStrategyDesc: "Compelling commercial storytelling.",
    prSystem: "PR & Reputation",
    prSystemDesc: "Building authority in the industry.",
    partnershipsHeroTitle: "Ecosystem Integration",
    partnershipsHeroSubtitle: "Unlocking growth through strategic alliances and technical resource synergy.",
    ecosystemStrategy: "Ecosystem Expansion Strategy",
    ecosystemStrategyDesc: "Connecting industry leaders to create symbiotic value chains and expansive market reach.",
    resourceSourcing: "Resource Sourcing",
    resourceSourcingDesc: "Identifying high-value platform alliances.",
    allianceBuilding: "Alliance Building",
    allianceBuildingDesc: "Forging long-term strategic co-marketing.",
  },
  zh: {
    home: "首页",
    about: "关于",
    works: "作品",
    services: "作品",
    contact: "联系",
    backHome: "返回首页",
    backServices: "返回服务",
    viewShowcase: "查看案例展示",
    getInTouch: "即刻咨询",
    getInTouchAlt: "联系我",
    viewAllWorks: "查看所有作品",
    aboutMe: "关于我",
    professionalJourney: "职业历程",
    downloadResume: "下载简历",
    sendAMessage: "发送消息",
    learnMore: "了解更多",
    backAbout: "返回关于",
    growthLeader: "HI, I'M LEXI LIN",
    professionalServices: "专业服务",
    strategyLedGrowth: "战略引领可规模化的业绩增长",
    detailedExpertise: "专业领域详情",
    viewCaseStudy: "查看案例研究",
    selectedWorksTitle: "精选作品",
    solvingGrowthBottlenecks: "解决增长瓶颈",
    smartMarketExecution: "通过敏捷的市场执行力",
    readFullCaseStudy: "阅读完整案例",
    readyToArchitect: "准备好开启您的下一个增长阶段了吗？",
    startAConversation: "开始对话",
    copyright: "© 2024 Lexi Lin. 保留所有权利。",
    letConnect: "让我们建立联系",
    lookingForward: "准备好探索商业增长的未来了吗？",
    contactDescription: "请填写下方表格，我将尽快回复您。",
    synergySubtitle: "如果您正在寻求一位能够将复杂挑战转化为卓越商业成就的增长顾问，我非常乐意倾听您的需求。无论是关于战略咨询、项目合作还是简单的交流，请随时与我联系。",
    directInquiry: "邮件咨询",
    voiceCall: "电话垂询",
    sendAMessageSubtitle: "请填写下方表格，我会尽快回复您。",
    fullName: "姓名",
    emailAddress: "邮箱地址",
    company: "公司 / 机构",
    yourMessage: "您的留言",
    sendMessage: "发送消息",
    performanceDriven: "效能驱动的营销方案",
    validatingGrowth: "以数据指标验证增长成果。",
    revenueGrowth: "营收增长",
    highQualityLeads: "高意向询盘",
    ecommerceGMV: "电商总成交额",
    socialFollowers: "社媒粉丝",
    contentMarketing: "内容营销",
    ecommerceWebsite: "商城运营",
    liveStreaming: "直播运营",
    socialMediaMatrix: "社交媒体",
    privateDomain: "社群/用户运营",
    emailMarketing: "邮件营销",
    advertisingMarketing: "海外广告投放",
    overseasSocial: "海外社媒",
    overseasAds: "海外广告投放",
    showcase: "案例展示",
    brandCampaigns: "品牌公关活动",
    brandMediaStrategy: "品牌媒介策略",
    brandPROpinion: "品牌公关与舆论",
    brandEquity: "品牌资产管理",
    expertiseMoats: "建立专业护城河",
    crossPlatformStrategic: "跨平台战略联动",
    techValueTransformation: "技术价值转化",
    businessStorytelling: "商业叙事展示",
    strategicInsights: "战略洞察与市场验证",
    growthEngineGTM: "增长引擎与 GTM 协同",
    lifecycleManagement: "全生命周期管理与留存",
    integratedOperations: "整合运营与系统效率",
    myStrengths: "我的核心优势",
    strengthHighTicketTitle: "高客单价行业专家",
    strengthHighTicketDesc: "我深耕高客单价技术解决方案领域。我深知高价值决策并非一蹴而就，需要通过长周期的销售漏斗建立深厚的信任，并展现无可辩驳的专业实力。",
    strengthAdaptabilityTitle: "战略适应力",
    strengthAdaptabilityDesc: "我的职业生涯横跨多元商业版图——从跨国名企和上市公司的严谨体系，到初创企业的极速环境。这种多样性让我能在宏观战略规划与敏捷执行之间游刃有余地切换。",
    strengthProblemSolverTitle: "以增长为导向的问题解决者",
    strengthProblemSolverDesc: "我不仅是营销者，更是增长顾问。我擅长拆解复杂的业务瓶颈，并将“痛点”——如增长停滞或获客效率低下——转化为可规模化、数据驱动的竞争优势。",
    aboutHeroTitle: "你好，我是 Lexi Lin",
    aboutHeroSubtitle: "您一直在寻找的增长策略专家",
    aboutHeroDescPart1: "我拥有 7 年市场营销与品牌管理经验（含 5 年团队管理），深耕高客单价技术解决方案领域。我深知，高价值的商业决策需要通过精心设计的长周期销售漏斗，建立深厚的信任与专业背书，展现专业实力。",
    aboutHeroDescPart2: "我的职业生涯经历全球跨国企业、本土上市集团与高速成长创业型团队。这种多样性让我能在宏观战略规划与敏捷执行之间切换。我擅长拆解业务瓶颈，并将“获客成本高、转化效率低、业务增长停滞”等企业痛点，转化为由数据驱动的营销增长策略，打造业务核心竞争优势。",
    aboutHeroDesc: "我拥有 7 年市场营销与品牌管理经验（含 5 年团队管理），深耕高客单价技术解决方案领域。我深知，高价值的商业决策需要通过精心设计的长周期销售漏斗，建立深厚的信任与专业背书，展现专业实力。\n\n我的职业生涯经历全球跨国企业、本土上市集团与高速成长创业型团队。这种多样性让我能在宏观战略规划与敏捷执行之间切换。我擅长拆解业务瓶颈，并将“获客成本高、转化效率低、业务增长停滞”等企业痛点，转化为由数据驱动的营销增长策略，打造业务核心竞争优势。",
    aboutExperienceSubtitle: "拥有从 0 到 1 建立营销体系的实战经验，在多个产品线中推动全球品牌影响力的提升。",
    exp1RoleLine: "市场品牌主管",
    exp1Highlight1: "统筹13 条业务线的全球品牌整合运营",
    exp1Highlight2: "推动大中华区利润增长11.9%",
    exp2RoleLine: "市场负责人",
    exp2Highlight1: "从0到1负责市场战略规划与实施落地，业绩实现600%规模化增长",
    exp2Highlight2: "",
    exp1Role: "大中华区市场品牌主管",
    exp1Desc: "在全球扁平化的事业群框架下，协同业务总监及高层进行决策，负责消费电子、可再生能源、芯片半导体、医疗器械等产线的品牌推广与跨界合作。通过TOB高阶资源整合，在竞争激烈的存量市场中，帮助头部终端客户实现品牌溢价与销售增长，强化SGS全球化的品牌效应与大客户生命周期价值。",
    exp1Achieve1: "统筹 13 条业务线的全球品牌整合运营",
    exp1Achieve2: "推动大中华区利润增长 11.9%",
    exp2Role: "全国市场负责人",
    exp2Desc: "搭建“全域获客-线索孵化-业务增长-生态整合”的BC端闭环体系，加速业务开拓与商业化进程，与销售与研发紧密协作，为欧莱雅、名创优品、汤臣倍健等头部企业提供跨界营销合作与复杂商业需求，在企业变革与组织协同的关键扩张期，发挥核心中枢作用。",
    exp2Achieve1: "从 0 到 1 负责市场策略规划与落地",
    exp2Achieve2: "业绩增长 600%+ 及体量亿级突破",
    heroTitle: "以业绩指标为导向，数据驱动营销增长",
    heroDesc: "欢迎来到我的个人站，在这里，你将会看到我是如何搭建完整的市场运营体系，实现业务规模化增长、将产品/技术商业化落地，以及指导全球化品牌运营的成功实战案例。",
    aboutSummaryTitle: "您正在寻找的增长策略专家",
    aboutSummaryDesc: "拥有 7 年市场营销与品牌增长领袖经验（含 5 年团队管理经验），我深耕高客单价技术解决方案领域。我深知高价值决策并非一蹴而就，需要通过长周期的销售漏斗建立深厚的信任，并展现无可辩驳的专业实力。",
    worksSummaryDesc: "探索我如何通过定制化战略、有影响力的叙事以及效能驱动的执行力，助力前瞻性品牌开启增长新篇章。",
    project1Title: "20M+ 营收增长",
    project1Desc: "搭建全渠道营销引擎，交付逾 5 万个高意向询盘。",
    project2Title: "100M+ 品牌曝光",
    project2Desc: "全方位的品牌战略、公关以及整合传播方案。",
    project3Title: "80+ 战略合作伙伴",
    project3Desc: "通过与科技及快消巨头的跨界营销，实现千万级流量触达。",
    capabilitiesTitle: "战略主导，\n构建可规模化的增长引擎。",
    capabilitiesDesc: "从战略制定到落地执行，我提供全方位的营销服务，旨在提升品牌价值、获取核心受众，并驱动真实的业务结果。",
    cap1Title: "市场营销策略",
    cap1Desc: "制定贯穿整个业务生命周期的端到端营销战略，验证商业逻辑并降低市场进入风险。",
    cap2Title: "数字化增长引擎",
    cap2Desc: "通过战略性实施全面的数字营销矩阵，使市场活动与业务增长和品牌曝光保持一致。",
    cap3Title: "生态资源整合",
    cap3Desc: "通过扩展供应链资源并建立跨行业协作基准，提升技术领导地位和行业声望。",
    cap4Title: "品牌建设与传播",
    cap4Desc: "定义顶层品牌战略设计，提升品牌溢价并强化捕获商业价值的能力。",
    exploreAllServices: "探索所有服务",
    strategyLedGrowthDesc: "致力于通过营销数据驱动与品牌创意策略的完美结合，为企业创造可持续的商业价值。",
    serv1Details: "在成熟或过度竞争的市场中，企业常常因业务定位模糊、缺乏战略远见，面临增长停滞和高风险的市场挑战。无论是新业务还是已进入疲乏增长的现有业务，我将为企业制定贯穿业务全生命周期的市场营销策略。我提供深度的市场分析与洞察，主导业务新增长曲线开发，完成从MVP验证到市场试跑的全流程闭环。基于市场数据表现，识别转化率、复购率、回款周期及客户满意度瓶颈，制定针对性商业化激励或促销机制，提升大客户的生命周期。通过精细化的市场管理与执行创新探索，进一步帮助企业解决获客效率低、营销效果与增长乏力、品牌影响力不足等难题，打造业务核心竞争优势，将市场不确定性转化为系统性的行业领先地位。",
    serv2Details: "对于高客单、高门槛及高技术的业务，特别是B2B，常常面临获客渠道碎片化、ROI 难以追踪、线索转化率低迷以及获客成本极高的困局。我具备完整的市场获客体系搭建及策略能力，从内容营销、官网商城、直播、新媒体平台矩阵、私域社群、电子邮件营销等线上线下渠道进行全方位的留咨布局，设置每个客户入口触点，引导客户留下线索。而实际证明，这样的全渠道获客得到了完美的数据结果，而且是以极低的成本，实现潜在客户从首次触达到最终询盘的无缝转化。",
    serv3Details: "企业面临几大核心品牌困境：品牌定位模糊、叙事缺乏感染力、媒介资源分散、舆论应对被动，以及品牌资产难以量化。同时，对于如何打造企业或业务的品牌影响力，往往存在“需要花大钱”或者只选择“投流投放”的认知误区。这些问题导致品牌难以建立真正的差异化优势，且与实际的业务场景脱离。我善于通过整合企业技术实力与内部资产资源，同时制定品牌战略顶层设计到执行落地的解决方案，包括品牌心智定位、品牌公关与媒介策略、品牌商业化叙事，系统性地盘点与提升品牌资产。通过我的助力，品牌能够快速建立清晰且高识度的形象，大幅提升市场认知度和情感连接力。最终实现品牌溢价能力增强、客单价和复购率提升，以及长期竞争优势的构建。",
    brandSentimentMonitoring: "品牌舆情监测",
    brandCreativeConcepting: "品牌创意策划",
    mediaRelationsPartnerships: "品牌媒介合作",
    prCommunications: "品牌公关传播",
    imc: "品牌整合营销",
    brandActivations: "品牌传播活动",
    brandIdentityAssets: "品牌形象资产",
    brandMindshare: "品牌心智建设",
    serv4Details: "不少企业明明有独特的技术或业务优势，可以在激烈的竞争市场中脱颖而出，但与商业增长及行业生态脱节，导致企业缺乏行业地位，错失了大量的政企合作或跨界协同机会。我擅长结合业务所占据的产业链生态位，整合上下游的平台、渠道伙伴的联盟与政府资源，包括商会协会的协同，通过参编产业报告、标准制定、学术研讨及社会公益活动，推动品牌从孤立的运营模式进化为生态系统的引领者。将技术优势转化为高价值的商业回报，为企业构建难以逾越的“专业护城河”。",
    marketingStrategyHeroTitle: "市场营销策略",
    govtEnterpriseSynergy: "政企资源打通",
    buildingStrategicMoats: "专业壁垒构建",
    commercialNarrativeCaseStudies: "商业叙事案例",
    techValueMonetization: "技术价值转化",
    industryAlliancePartnerships: "产业联盟合作",
    platformStrategicAlignment: "平台战略联动",
    revenueHeroTitle: "数字化增长引擎",
    revenueHeroDesc: "对于高客单、高门槛及高技术的业务，特别是B2B，常常面临获客渠道碎片化、ROI 难以追踪、线索转化率低迷以及获客成本极高的困局。我具备完整的市场获客体系搭建及策略能力，从内容营销、官网商城、直播、新媒体平台矩阵、私域社群、电子邮件营销等线上线下渠道进行全方位的留咨布局，设置每个客户入口触点，引导客户留下线索。而实际证明，这样的全渠道获客得到了完美的数据结果，而且是以极低的成本，实现潜在客户从首次触达到最终询盘的无缝转化。",
    brandHeroTitle: "品牌建设与传播",
    brandHeroDesc: "企业面临几大核心品牌困境：品牌定位模糊、叙事缺乏感染力、媒介资源分散、舆论应对被动，以及品牌资产难以量化。同时，对于如何打造企业或业务的品牌影响力，往往存在“需要花大钱”或者只选择“投流投放”的认知误区。这些问题导致品牌难以建立真正的差异化优势，且与实际的业务场景脱离。我善于通过整合企业技术实力与内部资产资源，同时制定品牌战略顶层设计到执行落地的解决方案，包括品牌心智定位、品牌公关与媒介策略、品牌商业化叙事，系统性地盘点与提升品牌资产。通过我的助力，品牌能够快速建立清晰且高辨识度的形象，大幅提升市场认知度和情感连接力。最终实现品牌溢价能力增强、客单价和复购率提升，以及长期竞争优势的构建。",
    partnerHeroTitle: "生态资源整合",
    partnerHeroDesc: "不少企业明明有独特的技术或业务优势，可以在激烈的竞争市场中脱颖而出，但与商业增长及行业生态脱节，导致企业缺乏行业地位，错失了大量的政企合作或跨界协同机会。我擅长结合业务所占据的产业链生态位，整合上下游的平台、渠道伙伴的联盟与政府资源，包括商会协会的协同，通过参编产业报告、标准制定、学术研讨及社会公益活动，推动品牌从孤立的运营模式进化为生态系统的引领者。将技术优势转化为高价值的商业回报，为企业构建难以逾越的“专业护城河”。",
    marketingHeroTitle: "市场营销策略",
    marketingHeroDesc: "在成熟或过度竞争的市场中，企业常常因业务定位模糊、缺乏战略远见，面临增长停滞和高风险的市场挑战。无论是新业务还是已进入疲乏增长的现有业务，我将为企业制定贯穿业务全生命周期的市场营销策略。我提供深度的市场分析与洞察，主导业务新增长曲线开发，完成从MVP验证到市场试跑的全流程闭环。基于市场数据表现，识别转化率、复购率、回款周期及客户满意度瓶颈，制定针对性商业化激励或促销机制，提升大客户的生命周期。通过精细化的市场管理与执行创新探索，进一步帮助企业解决获客效率低、营销效果与增长乏力、品牌影响力不足等难题，打造业务核心竞争优势，将市场不确定性转化为系统性的行业领先地位。",
    businessImpact: "业务影响",
    theChallenge: "所面临的挑战",
    myStrategy: "我的策略",
    keyResults: "关键成果",
    theResults: "项目成果",
    operationalEfficiency: "运营效能",
    strategicInfluence: "战略影响力",
    ecosystemValue: "生态价值",
    caseStudy: "案例研究",
    moreCaseStudies: "更多实操案例研究",
    revenueCaseTitle: "海外渠道获客战略",
    revenueCaseSub: "以下展示了“海外渠道运营”作为关键获客案例的研究：",
    revenueChallengeDesc: "领导 SGS 中国 Connectivity & Products 的海外市场运营。在这一高客单价 B2B 解决方案业务中，常见挑战包括获客渠道碎片化、ROI 追踪困难、合格线索不足以及转化率低。",
    revenueStrategyP1: "构建并优化了涵盖线上和线下渠道的全面、全链路获客体系，包括内容营销、官方网站及电商平台、直播营销、社交媒体矩阵、私域社区、邮件营销、网络研讨会以及线下活动/会议。",
    revenueStrategyP2: "利用全球付费搜索、邮件和社交媒体资源，推动 Connectivity & Products 海外社交媒体矩阵的内容创作与发布、绩效数据分析及转化追踪。",
    revenueStrategyP3: "通过利用 Meta Advantage+ Audience 和 LinkedIn Audience Network 扩大付费内容的覆盖范围，成功将全球 CPM 降低了 48.1%，同时显著实现了覆盖面和互动率的最大化。在获客的每个阶段都建立了清晰的客户触点，有效引导潜在客户提交询盘。",
    revenueResultsPerformanceMetrics: "绩效指标",
    revenueResultsTotalInquiries: "总询盘量 (12月)",
    revenueResultsWebsiteTraffic: "网站访问量 (12月)",
    revenueResultsEmailOpens: "邮件打开数 (12月)",
    revenueResultsYoYGrowth: "同比年增长",
    revenueResultsStableEngagement: "参与度稳定",
    revenueResultsChannelBreakdown: "渠道分布 (12月)",
    channelWebsite: "网站",
    channelPaidSearch: "付费搜索",
    channelWebinar: "网络研讨会",
    channelSocialMedia: "社交媒体",
    channelDivision: "Connectivity & Products 相关部门",
    channelNotePrimary: "主要获客渠道",
    channelNoteGrowth: "增长最快的渠道",
    revenueImpactP1: "全渠道获客策略有效解决了高客单价 B2B 线索获取的核心痛点。通过将广覆盖的付费工具与精准的内容 and 互动渠道相结合，此方法以极低的成本交付了稳定、高质量的海外线索。",
    revenueImpactP2: "这一数据驱动的框架在 Connectivity & Products 业务中被证明非常有效，并为未来的国际市场扩张提供了一个可扩展的模式。",
    moreCaseStudiesExpansion: "涉及市场拓展与线索获取",
    brandCaseTitle: "整合营销/IMC 战略",
    brandCaseSub: "以下展示了“整合营销/IMC”作为关键品牌活动案例的研究：",
    brandChallengeDesc: "在从 0 到 1 构建品牌或进行品牌升级转型的过程中，企业往往面临品牌定位模糊、叙事乏力、媒介资源分散、舆情处理被动、品牌资产难以量化等核心挑战。在该项目中，作为技术导向型 B2B 品牌，SGS 电子电气部门也面临类似挑战：产品技术性强、传播与转化难度大、难以触达核心决策圈、市场认知度增长缓慢。",
    brandStrategyP1: "我领导了 SGS 电子电气部门在进博会 (CIIE) 的全案整合营销 (IMC) 活动策划。系统整合了视觉、内容、传播、交互四大模块，并完成了公关、直销、CI、包装及新闻媒体的全流程执行：",
    brandStrategyVisual: "视觉：",
    brandStrategyVisualDesc: "展台视觉创意设计、现场AI听力测试房搭建、与腾讯SSV时光实验室合作、模拟沙盘概念设计",
    brandStrategyContent: "内容：",
    brandStrategyContentDesc: "剧本及文案策划、产品推广视频制作",
    brandStrategyComm: "传播：",
    brandStrategyCommDesc: "线下媒体采访、社媒平台及信息流投放、技术高管宣讲 / 领导力演讲",
    brandStrategyInteract: "交互：",
    brandStrategyInteractDesc: "产品演示区",
    brandStrategyFooter: "通过品牌叙事、品牌活动、媒介策略、公共关系的深度整合，实现了从战略顶层设计到全面落地执行的闭环。",
    brandResultsCIIEPerformance: "进博会活动绩效",
    brandResultsEventAttendance: "活动参与人数",
    brandResultsMediaCoverage: "知名媒体报道",
    brandResultsTransactions: "现场成交额",
    brandResultsFollowers: "新账号粉丝增长",
    brandImpactP1: "该项目为技术类项目的传播与转化树立了新标杆。它不仅实现了高质量商机的快速转化，还显著提升了品牌影响力，并为长期的品牌资产积累做出了贡献。",
    brandImpactP2: "作为品牌建设与管理中整合营销的高价值实践案例。",
    moreCaseStudiesBrand: "涉及全案品牌策划",
    partnerCaseTitle: "生态合作伙伴战略",
    partnerCaseSub: "以下展示了“生态合作伙伴”作为关键品牌活动案例的研究：",
    partnerChallengeDesc: "作为一家第三方 TIC（检验、检测、认证）公司，华测检测 (CTI) 的传统产出是交付实验室报告。然而，在当今竞争激烈的合规市场中，单纯的交易性合作已不再足够。挑战在于如何庞大的电商生态系统中精准把握行业趋势，捕捉新兴红利，并实现技术价值向商业营销能力的深度转化。",
    partnerStrategyIntro: "作为市场 PM，我通过以下核心策略带头整合了整个产业链的机会：",
    partnerStrategySynergy: "建立生态协同：",
    partnerStrategySynergyDesc: "我促进了与中国领先电商巨头（包括京东、快手、抖音、百度健康和天猫）的深度战略对齐。",
    partnerStrategyEmpower: "品牌赋能与背书：",
    partnerStrategyEmpowerDesc: "利用我们的技术专长为卖家提供合规赋能，构建了极高的专业准入门槛。",
    partnerStrategyNarrative: "多维度商业叙事：",
    partnerStrategyLive: "直播营销",
    partnerStrategyLiveDesc: "与天猫国际和京东合作进行“品质认证”直播。",
    partnerStrategyContentCo: "内容共创",
    partnerStrategyContentCoDesc: "与快手合作制作商家合规教育视频。",
    partnerResultsPerformance: "合作伙伴绩效",
    partnerResultsRevenue: "来自电商大客户的年收入",
    partnerResultsDominance: "在领先平台中的市场主导地位",
    partnerImpactP1: "我助力企业从孤立运营转向生态系统领导地位，实现资源共享、技术共创及共生价值增长。",
    partnerImpactP2: "通过跨平台战略协同打破资源壁垒，我们确保了技术检测数据转化为可见、有影响力的商业品牌力。",
    transformBeautyTitle: "TRANSFORM YOUR PERCEPTION OF BEAUTY.",
    marketingContentP1: "在这里，你将会看到我是如何搭建完整的市场运营体系，实现业务规模化增长、将产品/技术商业化落地，以及指导全球化品牌运营的成功实战案例。",
    marketCaseTitle: "战略路线图与 GTM 策略",
    marketCaseSub: "以下展示了市场验证与战略定位的系统化方法。",
    marketChallengeDesc: "解决竞争激烈的成熟市场中品牌定位模糊、媒体资源支离破碎以及品牌资产难以量化的问题。",
    marketFrameworkTitle: "营销框架",
    marketFrameworkS1: "战略洞察与市场验证",
    marketFrameworkS2: "增长引擎与 GTM 统筹",
    marketMetricInsight: "市场洞察",
    marketMetricComp: "竞争分析",
    marketMetricPMF: "PMF 验证",
    marketMetricArch: "业务架构",
    marketMetricGTM: "GTM 管理",
    marketMetricValue: "价值转化",
    marketMetricLead: "线索孵化",
    marketMetricSynergy: "跨职能协同",
    marketResultsStrategicMetrics: "战略指标",
    marketResultsValidationRate: "市场验证率",
    marketResultsStandardization: "标准化",
    marketResultsAttribution: "驱动归归",
    marketResultsLTV: "提升",
    marketImpactP1: "整合运营与系统效率：通过建立数据反馈环和 SOP 标准化，我们在整个业务生命周期中实现了可扩展的战略影响力。",
    marketImpactP2: "这种端到端逻辑确保了营销活动不仅仅是短期活动，而是核心增长资产。",
    moreCaseStudiesStrategic: "涉及战略框架",
    carouselStrategicInsights: "战略洞察",
    carouselMarketValidation: "市场验证",
    carouselGTMOrchestration: "GTM 统筹",
    carouselLifecycleManagement: "全生命周期管理",
    contentMarketingTitle: "内容营销",
    contentProjectStrategy: "项目策略",
    contentStrategyDesc: "个人从0-1阶段完成华测检测内容营销体系的创建运营，在实现增长为目标的基础上主导以下板块工作的达成：1) 平台内容营销方案执行；2) 关注群体数据画像分析；3) 持续性内容创作及优化；4) 不同内容渠道增长策略。",
    contentHighlights: "业绩亮点",
    mktS1Title: "启动与验证期",
    mktS1Item1: "市场定性定量调研、竞争分析",
    mktS1Item2: "MVP、Landing Page 投放",
    mktS1Item3: "A/B Testing、商业模式画布",
    mktS2Title: "爆发与增长期",
    mktS2Item1: "GTM发布到终端的上市操盘、FABE模型",
    mktS2Item2: "线索转化漏斗、客户画像与购买旅程",
    mktS2Item3: "营销自动化",
    mktS3Title: "成熟与存量期",
    mktS3Item1: "定价博弈、促销激励",
    mktS3Item2: "客户满意度与LTV提升策略",
    mktS3Item3: "ROI与MTA多触点归因分析、客户RFM模型",
    mktS4Title: "中台协同体系",
    mktS4Item1: "BI仪表盘、业务数据看板",
    mktS4Item2: "可复制SOP作业",
    mktS4Item3: "营销决策推动（引导从“价格战”转向“价值战”）",
    revenueGrowthHeroTitle: "数字增长引擎",
    revenueGrowthHeroSubtitle: "通过高效的线索获取和转化优化，助力 B2B 业务实现规模化增长。",
    annualSalesGrowth: "销售额增长",
    salesGrowthDesc: "通过渠道优化实现经常性收入显著提升。",
    organicLeads: "自然增长线索",
    leadsGrowthDesc: "在不增加 CPA 的情况下，实现高质量询盘流的规模化增长。",
    roiIncrease: "投资回报率提升",
    roiImprovementDesc: "通过全链路追踪提升营销效率。",
    caseAnalysis: "案例分析",
    revenueCaseDesc: "全面重构数字获客漏斗，实施自动化线索评分和培育系统。",
    brandExposureHeroTitle: "品牌建设与传播",
    brandExposureHeroSubtitle: "通过极具说服力的叙事，将品牌潜力转化为市场领导地位。",
    brandOrchestration: "品牌编排",
    brandOrchestrationDesc: "对每一个触点进行统筹，以传递一致、高端的品牌故事，从而驱动信任和忠诚。",
    identityDesign: "身份设计",
    identityDesignDesc: "极具吸引力的视觉系统。",
    narrativeStrategy: "叙事战略",
    narrativeStrategyDesc: "引人入胜的商业叙事。",
    prSystem: "公关与声誉",
    prSystemDesc: "建立行业权威地位。",
    partnershipsHeroTitle: "生态资源整合",
    partnershipsHeroSubtitle: "通过战略联盟和技术资源协同，解锁增长新境界。",
    ecosystemStrategy: "生态扩展战略",
    ecosystemStrategyDesc: "连接行业领导者，创建互惠互利价值链，拓展市场覆盖范围。",
    resourceSourcing: "资源对接",
    resourceSourcingDesc: "识别高价值平台联盟。",
    allianceBuilding: "联盟建立",
    allianceBuildingDesc: "打造长期战略联合营销。",
  },
};

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const t = (key: string) => translations[lang][key] !== undefined ? translations[lang][key] : key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, theme, setTheme }}>
      {children}
    </LanguageContext.Provider>
  );
};

const Navbar = () => {
  const { lang, setLang, t, theme } = useContext(LanguageContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === "en" ? "zh" : "en");
  };

  return (
    <header className="relative w-full flex justify-between items-center py-6 px-6 md:px-12 lg:px-16 bg-bg-primary z-50">
      <div className="flex items-center">
        <Link to="/" className="text-[15px] font-bold tracking-tight text-text-primary">Lexi‘s Studio®</Link>
      </div>
      
      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center gap-4">
        <button 
          className="p-2 text-text-primary" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1.5 text-[16px] font-medium text-text-secondary">
        <Link to="/" className="hover:text-text-primary transition-colors hover:underline capitalize">{t("home").toLowerCase()},</Link>
        <Link to="/about" className="hover:text-text-primary transition-colors hover:underline capitalize">{t("about").toLowerCase()},</Link>
        <Link to="/services" className="hover:text-text-primary transition-colors hover:underline capitalize font-bold">{t("works").toLowerCase()},</Link>
        <Link to="/contact" className="hover:text-text-primary transition-colors hover:underline capitalize">{t("contact").toLowerCase()},</Link>
      </nav>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-bg-primary border-b border-gray-200 py-6 px-6 md:hidden flex flex-col gap-4 text-[16px] font-medium text-text-secondary">
          <Link to="/" className="hover:text-text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("home").toUpperCase()}</Link>
          <Link to="/about" className="hover:text-text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("about").toUpperCase()}</Link>
          <Link to="/services" className="hover:text-text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("works").toUpperCase()}</Link>
          <Link to="/contact" className="hover:text-text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("contact").toUpperCase()}</Link>
          <button onClick={toggleLanguage} className="w-fit flex items-center gap-1.5 text-[14px] font-bold text-text-primary border-b border-black pb-0.5 hover:opacity-70 transition-opacity">
            <span>EN / CN</span>
          </button>
        </div>
      )}

      <button onClick={toggleLanguage} className="hidden md:flex items-center gap-1.5 text-[14px] font-bold text-text-primary border-b border-black pb-0.5 hover:opacity-70 transition-opacity">
        <span>EN / CN</span>
      </button>
    </header>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};


const ImageLightbox = ({ 
  isOpen, 
  onClose, 
  images = [], 
  alt = "Showcase" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  images: string[]; 
  alt?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedStates, setLoadedStates] = useState<boolean[]>(new Array(images.length).fill(false));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      setIsLoading(true);
      setLoadedStates(new Array(images.length).fill(false));
      
      // Auto-resolve loading after 5 seconds to prevent getting stuck
      const timer = setTimeout(() => setIsLoading(false), 5000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen, onClose, images.length]);

  const handleImageLoad = (index: number) => {
    setLoadedStates(prev => {
      const newState = [...prev];
      newState[index] = true;
      if (newState.every(s => s)) setIsLoading(false);
      return newState;
    });
  };

  const handleImageError = (index: number) => {
    console.error(`Failed to load image at index ${index}: ${images[index]}`);
    setLoadedStates(prev => {
      const newState = [...prev];
      newState[index] = true; // Mark as "done" (even if failed) to resolve loading
      if (newState.every(s => s)) setIsLoading(false);
      return newState;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/98 flex flex-col overflow-hidden"
          onClick={onClose}
        >
          {/* Close hint */}
          <div className="absolute top-6 right-6 z-[10001] pointer-events-none">
             <button className="bg-white/10 backdrop-blur-xl border border-white/10 p-3 rounded-full text-white/50 hover:text-white transition-colors pointer-events-auto">
                <X size={24} />
             </button>
          </div>

          {/* Loading icon */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-[10002] gap-4">
              <Loader2 className="animate-spin text-accent" size={48} strokeWidth={2} />
              <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Optimizing High-Res Assets</p>
            </div>
          )}

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto scrollbar-hide py-12 px-4 flex flex-col items-center cursor-zoom-out"
          >
            <div 
              className="max-w-[1400px] w-full flex flex-col gap-0 shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <img 
                  key={i}
                  src={img} 
                  alt={`${alt} - ${i + 1}`}
                  loading="eager"
                  onLoad={() => handleImageLoad(i)}
                  onError={() => handleImageError(i)}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  className={`w-full h-auto block transition-opacity duration-700 ${loadedStates[i] ? 'opacity-100' : 'opacity-0'}`}
                  style={{ 
                    marginBottom: "-1px",
                    willChange: "transform, opacity"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const Hero = () => {
  const { t, theme } = useContext(LanguageContext);

  return (
    <section 
      id="home" 
      className="bg-bg-primary pt-6 pb-6 px-6 md:px-12 lg:px-16"
    >
      {/* Main Content Grid - Further tightened gaps */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mb-16">
        {/* Column 1: Main Title */}
        <div className="md:col-span-4 flex flex-col pt-8">
          <h1 className="text-[62px] md:text-[80px] lg:text-[104px] font-bold leading-[0.85] tracking-tight text-text-primary">
            Lexi‘s <br />Studio
          </h1>
          <div className="mt-12 md:mt-56 ml-8 md:ml-20">
            <img src="/home2.jpg" alt="Hero Image" className="w-[68%] h-auto object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Column 2: Description + Works */}
        <div className="md:col-span-5 flex flex-col gap-12 pt-6 md:pt-12">
          {/* Description */}
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-[#a1a1a1] mb-4">Description</span>
            <div className="max-w-md">
              <p className="text-[17px] md:text-[18px] leading-[1.4] text-text-primary font-bold mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: t("heroTitle") }} />
              <p className="text-[14px] md:text-[15px] leading-[1.5] text-text-secondary">
                {t("heroDesc")}
              </p>
            </div>
          </div>

          {/* Works + Small Image */}
          <div className="flex gap-12">
             <div className="w-[120px] h-[120px] bg-brand-dark/5 overflow-hidden flex items-center justify-center shrink-0">
                <img src="/home11.jpg" alt="Visual Asset" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             </div>
             <div className="flex flex-col gap-12">
                <div className="mb-0">
                  <span className="block text-[11px] uppercase tracking-widest text-[#a1a1a1] mb-4">Works</span>
                  <ul className="text-[15px] leading-snug text-text-primary font-medium flex flex-col gap-1">
                    <li>{t("cap1Title")}</li>
                    <li>{t("cap2Title")}</li>
                    <li>{t("cap4Title")}</li>
                    <li>{t("cap3Title")}</li>
                  </ul>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-widest text-[#a1a1a1] mb-4">PORTFOLIO</span>
                  <a href="https://www.kdocs.cn/l/ch1sQAHjA9J6" target="_blank" rel="noopener noreferrer" className={`inline-block font-semibold underline ${theme === "dark" ? "text-white hover:text-white/70" : "text-black hover:text-black/70"}`}>
                    View All Showcase
                  </a>
                </div>
             </div>
          </div>
        </div>

        {/* Column 3: Right Image */}
        <div className="md:col-span-3 flex flex-col gap-2 pt-6 md:pt-12">
          <div className="w-full aspect-[2/3] bg-brand-dark/5 overflow-hidden flex items-center justify-center">
            <img src="/home.jpg" alt="Right Visual Asset" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className="text-[11px] font-medium text-[#a1a1a1] leading-none">(02)</span>
          <p className="text-[14px] md:text-[15px] leading-[1.5] text-text-secondary mt-4">
            I’m always open to discussing strategic projects, creative orchestration, or new opportunities that align with your vision.
          </p>
        </div>
      </div>
    </section>
  );
};


const AboutPage = () => {
  const { t, theme } = useContext(LanguageContext);

  const experiences = [
    {
      role: t("exp1Role"),
      company: "SGS (Stock Code: SGSN)",
      url: "https://www.sgs.com",
      period: "2025 – 2025",
      description: t("exp1Desc"),
      imageIds: ["10", "11"],
      achievements: [
        t("exp1Achieve1"),
        t("exp1Achieve2")
      ]
    },
    {
      role: t("exp2Role"),
      company: "CTI (Stock Code: 300012)",
      url: "https://www.cti-cert.com",
      period: "2019 – 2023",
      description: t("exp2Desc"),
      imageIds: ["12", "13"],
      achievements: [
        t("exp2Achieve1"),
        t("exp2Achieve2")
      ]
    }
  ];

  return (
    <div className={`pt-16 pb-4 transition-colors duration-500 ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-bg-primary"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-12 lg:gap-16 items-start">
        {/* Column 1: Heading, Image, Author, Abstract */}
        <div className="flex flex-col gap-8">
          <h1 className={`text-[25px] font-bold leading-tight tracking-tight ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
            {t("aboutHeroTitle")}<br/>
            {t("aboutHeroSubtitle")}
          </h1>
          
          <div className="space-y-4 mt-16 md:mt-48">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f]">ABSTRACT</h2>
            <p className={`text-[14px] leading-relaxed ${theme === "dark" ? "text-white/70" : "text-[#424245]"}`}>
              {t("aboutHeroDescPart1")}
            </p>
          </div>
        </div>

        {/* Column 2: Large Visual */}
        <div className="w-full h-full min-h-[450px]">
          <img src="/about33.jpg" alt="Main Visual Asset" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        {/* Column 3: Headline, Subhead, Text Columns */}
        <div className="flex flex-col gap-6">
          <p className="text-[16px] font-medium leading-snug">
            {t("aboutHeroDescPart2")}
          </p>

          <h3 className="text-[14px] font-bold uppercase tracking-tight">{t("professionalJourney")}</h3>

          <div className="grid grid-cols-2 gap-6 text-[13px] leading-relaxed">
            <p>
              <strong>2024 – 2025</strong><br/>
              <strong><a href="https://www.sgs.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">SGS (Stock Code: SGSN)</a></strong><br/>
              <strong>{t("exp1RoleLine")}</strong><br/>
              {t("exp1Highlight1")}<br/>
              {t("exp1Highlight2")}
            </p>
            <p>
              <strong>2019 – 2024</strong><br/>
              <strong><a href="https://www.cti-cert.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">CTI (Stock Code: 300012)</a></strong><br/>
              <strong>{t("exp2RoleLine")}</strong><br/>
              {t("exp2Highlight1")}
              {t("exp2Highlight2") && <><br/>{t("exp2Highlight2")}</>}
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};




const ServiceVisualization = ({ type, theme }: { type: string, theme: string }) => {
  const gridPattern = (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`grid-pattern-${type}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="0" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-pattern-${type})`} />
    </svg>
  );

  if (type === "01") {
    return (
      <div className="w-full h-full absolute inset-0 overflow-hidden flex items-center justify-center">
        {gridPattern}
        <div className="absolute inset-x-0 bottom-[20%] h-px bg-black/10 dark:bg-white/10" />
        <div className="absolute left-[15%] inset-y-0 w-px bg-black/10 dark:bg-white/10" />
        
        <div className="relative w-[90%] max-w-[360px] aspect-[2/1] flex items-end translate-y-[-10%]">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
            {/* S-curve representing lifecycle */}
            <motion.path 
              d="M 5 45 C 20 45, 30 25, 45 20 C 60 15, 75 5, 95 10"
              fill="none" 
              stroke="#0071e3" 
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {[
              { x: 5, y: 45, label: "Intro", delay: 1.0 }, 
              { x: 45, y: 20, label: "Growth", delay: 1.2 }, 
              { x: 75, y: 5, label: "Peak", delay: 1.4 }
            ].map((pt, i) => (
              <g key={i}>
                <motion.circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r="3.5" 
                  fill={theme === 'dark' ? '#111' : '#fff'} 
                  stroke="#0071e3"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: pt.delay }}
                />
                <motion.text
                  x={pt.x}
                  y={pt.y - 8}
                  fill={theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'}
                  fontSize="4"
                  fontFamily="monospace"
                  textAnchor="middle"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: pt.delay + 0.1 }}
                >
                  {pt.label}
                </motion.text>
              </g>
            ))}
          </svg>
          <motion.div 
            className="absolute right-[0%] top-[0%] bg-white/80 dark:bg-[#222]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/5 rounded-full px-3 py-1.5 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] shadow-[0_0_8px_rgba(0,113,227,0.8)]" />
            <span className="text-[11px] font-mono font-medium text-black/80 dark:text-white/80">Strategy Q4</span>
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === "02") {
    return (
        <div className="w-full h-full absolute inset-0 overflow-hidden flex items-center justify-center">
            {gridPattern}
            <div className="absolute inset-x-0 bottom-[20%] h-px bg-black/10 dark:bg-white/10" />
            <div className="absolute left-[15%] inset-y-0 w-px bg-black/10 dark:bg-white/10" />
            
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Core */}
                <motion.div 
                    className="relative z-10 w-24 h-24 rounded-full border-2 border-white/50 dark:border-[#333]/50 bg-white/30 dark:bg-black/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(0,113,227,0.15)]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <motion.div 
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0071e3] to-[accent] shadow-[0_0_20px_rgba(0,113,227,0.6)]"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <motion.div 
                        className="absolute inset-0 rounded-full border border-[#0071e3]/30"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                </motion.div>

                {/* Orbiting / Floating Labels */}
                {[
                    { angle: -40, radius: 95, label: "MQL", delay: 0.6, val: "+120%" },
                    { angle: 35, radius: 110, label: "SQL", delay: 0.8, val: "+85%" },
                    { angle: 140, radius: 100, label: "ROI", delay: 1.0, val: "3.2x" },
                    { angle: -145, radius: 105, label: "GMV", delay: 1.2, val: "$5M+" }
                ].map((tag, i) => {
                    const rad = tag.angle * (Math.PI / 180);
                    const xOffset = Math.cos(rad) * tag.radius;
                    const yOffset = Math.sin(rad) * tag.radius;
                    
                    return (
                        <motion.div 
                            key={i}
                            className="absolute z-20 flex flex-col items-center justify-center bg-white/95 dark:bg-[#222]/95 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/5 rounded-2xl px-3.5 py-2 min-w-[70px]"
                            initial={{ opacity: 0, scale: 0, x: xOffset * 0.5, y: yOffset * 0.5 }}
                            whileInView={{ opacity: 1, scale: 1, x: xOffset, y: yOffset }}
                            transition={{ duration: 0.6, delay: tag.delay, type: "spring", stiffness: 100 }}
                        >
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-black/50 dark:text-white/50 mb-0.5">{tag.label}</span>
                            <span className="text-[13px] font-mono font-bold text-[#0071e3]">{tag.val}</span>
                        </motion.div>
                    );
                })}
                
                {/* Connecting lines or subtle rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-black/[0.03] dark:border-white/[0.03]"
                        style={{ width: 170 + i * 60, height: 170 + i * 60 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                    />
                ))}
            </div>
        </div>
    );
  }

  if (type === "03") {
      return (
          <div className="w-full h-full absolute inset-0 overflow-hidden flex items-center justify-center">
              {gridPattern}
              <div className="absolute inset-x-0 top-1/2 h-px bg-black/5 dark:bg-white/5" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-black/5 dark:bg-white/5" />
              
              <div className="relative w-full h-full flex items-center justify-center">
                 {[120, 80, 35].map((r, i) => (
                     <motion.div 
                        key={i}
                        className="absolute rounded-full border border-[#0071e3]/20"
                        style={{ width: r*2, height: r*2 }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.2, type: "spring" }}
                     />
                 ))}
                 <motion.div 
                    className="absolute z-10 w-12 h-12 rounded-full border-2 border-[#0071e3] bg-[#0071e3]/10 flex items-center justify-center backdrop-blur-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                 >
                    <Target size={18} className="text-[#0071e3]" />
                 </motion.div>
                 
                 <motion.div 
                    className="absolute top-[10%] left-[10%] bg-white/80 dark:bg-[#222]/80 backdrop-blur-md shadow-sm rounded-full px-3 py-1 flex items-center gap-2 border border-black/5 dark:border-white/5"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                 >
                     <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]/60" />
                     <span className="text-[10px] font-medium text-black/70 dark:text-white/70">Exposure</span>
                 </motion.div>

                 <motion.div 
                    className="absolute bottom-[12%] right-[10%] bg-white/80 dark:bg-[#222]/80 backdrop-blur-md shadow-sm rounded-full px-3 py-1 flex items-center gap-2 border border-black/5 dark:border-white/5"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                 >
                     <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]/60" />
                     <span className="text-[10px] font-medium text-black/70 dark:text-white/70">Conversion</span>
                 </motion.div>
              </div>
          </div>
      )
  }

  if (type === "04") {
      return (
          <div className="w-full h-full absolute inset-0 overflow-hidden flex items-center justify-center">
              {gridPattern}
              <div className="relative w-[80%] h-[80%]">
                 <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-[#222] border-2 border-[#0071e3] rounded-[14px] flex items-center justify-center z-20 shadow-[0_8px_24px_rgba(0,113,227,0.15)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                 >
                     <Layers size={20} className="text-[#0071e3]" />
                 </motion.div>

                 {[
                     { top: '15%', left: '20%', label: 'Tech' },
                     { top: '25%', left: '80%', label: 'FMCG' },
                     { top: '80%', left: '25%', label: 'Media' },
                     { top: '75%', left: '80%', label: 'Retail' },
                 ].map((pos, i) => (
                     <motion.div 
                        key={i}
                        className="absolute flex flex-col items-center gap-1.5 z-10"
                        style={{ top: pos.top, left: pos.left }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + i*0.15 }}
                     >
                        <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center flex-shrink-0">
                           <div className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20" />
                        </div>
                        <span className="text-[9px] font-mono text-black/60 dark:text-white/60 bg-white/50 dark:bg-black/50 px-1.5 rounded">{pos.label}</span>
                     </motion.div>
                 ))}

                 <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    {[
                        [ '50%', '50%', '24%', '20%' ],
                        [ '50%', '50%', '80%', '29%' ],
                        [ '50%', '50%', '28%', '80%' ],
                        [ '50%', '50%', '82%', '75%' ],
                    ].map((coords, i) => (
                        <motion.line
                            key={i} 
                            x1={coords[0]} y1={coords[1]} x2={coords[2]} y2={coords[3]}
                            stroke={theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        />
                    ))}
                 </svg>
              </div>
          </div>
      )
  }

  return null;
}

const ServicesPage = () => {
  const { t, theme } = useContext(LanguageContext);
  const services = [
    {
      id: "01",
      title: t("cap1Title"),
      desc: t("cap1Desc"),
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&sat=-100",
      link: "/services/strategy"
    },
    {
      id: "02",
      title: t("cap2Title"),
      desc: t("cap2Desc"),
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&sat=-100",
      link: "/services/revenue"
    },
    {
      id: "03",
      title: t("cap4Title"),
      desc: t("cap4Desc"),
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800&sat=-100",
      link: "/services/brand"
    },
    {
      id: "04",
      title: t("cap3Title"),
      desc: t("cap3Desc"),
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800&sat=-100",
      link: "/services/partnerships"
    }
  ];

  return (
    <div className={`pt-20 pb-12 transition-colors duration-500 overflow-hidden ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-bg-primary"} selection:bg-black selection:text-white`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_3fr] gap-12 lg:gap-20">
          
          {/* Left Column: Title, Paragraph, and CTA */}
          <div className="flex flex-col pt-8">
            <h1 className={`text-[25px] font-bold leading-[1.1] tracking-tighter whitespace-pre-line mb-12 ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
              {t("capabilitiesTitle")}
            </h1>
            <p className={`text-[15px] md:text-[16px] leading-relaxed max-w-sm ${theme === "dark" ? "text-white/60" : "text-[#424245]"}`}>
              {t("capabilitiesDesc")}
            </p>
            <a href="https://www.kdocs.cn/l/ch1sQAHjA9J6" target="_blank" rel="noopener noreferrer" className={`mt-12 inline-block font-semibold underline ${theme === "dark" ? "text-white hover:text-white/70" : "text-black hover:text-black/70"}`}>
              VIEW ALL SHOWCASE
            </a>
            <div className="mt-16">
              <img src="/works.jpg" alt="Works Visual Asset" className="w-[80%] h-auto object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Right Column: Projects List */}
          <div className="flex flex-col md:pl-16 lg:pl-24 mt-12 md:mt-32">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group"
              >
                {/* Info (Full width remaining) */}
                <Link to={s.link} className={`flex flex-row items-start pb-4 border-t pt-4 ${theme === "dark" ? "border-white" : "border-black"}`}>
                  <div className="flex flex-col gap-0.5">
                    <h3 className={`text-[20px] font-bold leading-tight transition-transform duration-300 group-hover:scale-[1.02] origin-left ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
                      {s.title}
                    </h3>
                    <p className={`text-[15px] font-normal leading-snug max-w-2xl ${theme === "dark" ? "text-white/60" : "text-[#424245]"}`}>
                      {s.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const ServiceSubPageLayout = ({ heroTitle, children }: { 
  heroTitle: string; 
  children: ReactNode 
}) => {
  const { t, theme } = useContext(LanguageContext);
  return (
    <div className={`pt-40 pb-16 min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-white"}`}>
      <div className="apple-container">
        <Link to="/services" className={`inline-flex items-center gap-2 transition-colors mb-12 group ${theme === "dark" ? "text-white/50 hover:text-white" : "text-[#86868b] hover:text-[#1d1d1f]"}`}>
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{t("backServices")}</span>
        </Link>
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div>
              <h1 className={`text-[36px] font-bold tracking-tighter transition-colors leading-[0.9] ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
                {heroTitle}
              </h1>
            </div>
          </motion.div>
        </div>
        {children}
      </div>
    </div>
  );
};

const ArticleItem = ({ category, title, content }: { category: string, title: string, content: string }) => {
  const { theme } = useContext(LanguageContext);
  return (
    <div className="pt-5 pb-6 px-0 md:px-6">
      <div className="flex justify-between items-center mb-4">
        <span className={`text-[11px] font-medium px-3 py-1 rounded-full ${theme === "dark" ? "bg-white/10 text-white" : "bg-black/5 text-[#1d1d1f]"}`}>
          {category}
        </span>
      </div>
      <h3 className={`text-[17px] font-medium leading-[1.4] mb-4 uppercase ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
        {title}
      </h3>
      <p className={`text-[14px] leading-loose text-left ${theme === "dark" ? "text-white/60" : "text-[#666]"}`}>
        {content}
      </p>
    </div>
  );
};

const MarketingStrategySubPage = () => {
  const { t, theme, lang } = useContext(LanguageContext);
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    {
      title: t("mktS1Title"),
      items: lang === "en" 
        ? [t("mktS1Item1"), t("mktS1Item2"), t("mktS1Item3"), t("mktS1Item4"), t("mktS1Item5"), t("mktS1Item6"), t("mktS1Item7")]
        : [t("mktS1Item1"), t("mktS1Item2"), t("mktS1Item3")]
    },
    {
      title: t("mktS2Title"),
      items: lang === "en"
        ? [t("mktS2Item1"), t("mktS2Item2"), t("mktS2Item3"), t("mktS2Item4"), t("mktS2Item5"), t("mktS2Item6"), t("mktS2Item7"), t("mktS2Item8"), t("mktS2Item9"), t("mktS2Item10")]
        : [t("mktS2Item1"), t("mktS2Item2"), t("mktS2Item3")]
    },
    {
      title: t("mktS3Title"),
      items: lang === "en"
        ? [t("mktS3Item1"), t("mktS3Item2"), t("mktS3Item3"), t("mktS3Item4"), t("mktS3Item5"), t("mktS3Item6"), t("mktS3Item7"), t("mktS3Item8"), t("mktS3Item9"), t("mktS3Item10")]
        : [t("mktS3Item1"), t("mktS3Item2"), t("mktS3Item3")]
    },
    {
      title: t("mktS4Title"),
      items: lang === "en"
        ? [t("mktS4Item1"), t("mktS4Item2"), t("mktS4Item3"), t("mktS4Item4"), t("mktS4Item5"), t("mktS4Item6"), t("mktS4Item7")]
        : [t("mktS4Item1"), t("mktS4Item2"), t("mktS4Item3")]
    }
  ];
  
  useEffect(() => {
    if (isShowcaseVisible && previewRef.current) {
      const timer = setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isShowcaseVisible]);

  useEffect(() => {
    if (isShowcaseVisible) {
      setIsPreviewLoading(true);
    }
  }, [isShowcaseVisible]);
  
  return (
    <div className={`pt-12 pb-0 transition-colors duration-500 ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-bg-primary"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header matching screenshot */}
        <div className="flex justify-between items-end mb-6">
          <h1 className={`text-[25px] font-bold leading-[1.1] tracking-tighter ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
            <span className="text-[#c2a382] mr-2">Explore</span>
            {t("marketingStrategyHeroTitle")}
          </h1>
          <Link to="/services" className={`flex items-center gap-1.5 text-[15px] font-bold pb-0.5 border-b hover:opacity-70 transition-opacity ${theme === "dark" ? "text-white border-white" : "text-[#1d1d1f] border-black"}`}>
            <span>← {t("backServices")}</span>
          </Link>
        </div>
        
        {/* The Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-t md:border-b-0 border-black/20 dark:border-white/20 divide-black/20 dark:divide-white/20 mt-2">
          
          {/* Column 1 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Overview" 
              title="STRATEGIC OVERVIEW & BRAND POSITIONING" 
              content={t("serv1Details")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Strategy" 
              title={sections[0].title} 
              content={sections[0].items.join("、")} 
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Planning" 
              title={sections[1].title} 
              content={sections[1].items.join("、")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <div className="py-4 px-0 md:px-6 flex flex-col items-center justify-center text-center flex-grow min-h-[120px]">
              <h2 className={`text-[25px] font-bold leading-[1.1] tracking-tighter mb-4 lowercase ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
                {lang === "en" ? "explore all" : t("viewShowcase")}
              </h2>
              <button 
                onClick={() => setIsShowcaseVisible(!isShowcaseVisible)}
                className={`px-10 py-3 border border-[#c2a382]/60 text-[#c2a382] font-semibold hover:bg-[#c2a382] hover:text-white transition-all text-xs tracking-widest uppercase mb-4`}
              >
                {t("viewShowcase")}
              </button>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Execution" 
              title={sections[2].title} 
              content={sections[2].items.join("、")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Analysis" 
              title={sections[3].title} 
              content={sections[3].items.join("、")} 
            />
          </div>

        </div>

        {/* Showcase Image Area */}
        <AnimatePresence>
          {isShowcaseVisible && (
            <motion.div 
              ref={previewRef}
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{ 
                height: { duration: 0.5, ease: "circOut" },
                opacity: { duration: 0.4, delay: 0.1 }
              }}
              className="w-full mt-8 overflow-hidden flex flex-col items-center"
            >
              <div className="w-full bg-black/5 dark:bg-white/5 p-4 md:p-8 border-y md:border border-black/10 dark:border-white/10 relative min-h-[400px] flex flex-col items-center justify-center md:rounded-[28px]">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
                    <Loader2 className="animate-spin text-[#2563eb]" size={40} />
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Loading Showcase...</span>
                  </div>
                )}
                <div 
                  className={`w-full overflow-hidden rounded-xl group relative transition-opacity duration-700 ${isPreviewLoading ? 'opacity-0' : 'opacity-100'}`} 
                >
                  <div className="min-w-full inline-block align-middle">
                    <img
                      src="/市场策略1.png"
                      alt="Strategy Showcase Preview"
                      loading="eager"
                      decoding="async"
                      onLoad={() => setIsPreviewLoading(false)}
                      className="w-full h-auto block shadow-xl transition-transform duration-700"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const RevenueGrowthSubPage = () => {
  const { t, theme, lang } = useContext(LanguageContext);
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const features = [
    "contentMarketing", 
    "ecommerceWebsite", 
    "liveStreaming", 
    "socialMediaMatrix", 
    "privateDomain", 
    "overseasSocial", 
    "overseasAds", 
    "emailMarketing"
  ];
  
  // Auto-scroll logic when showcased
  useEffect(() => {
    if (isShowcaseVisible && previewRef.current) {
      const timer = setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isShowcaseVisible]);

  useEffect(() => {
    if (isShowcaseVisible) {
      setIsPreviewLoading(true);
    }
  }, [isShowcaseVisible]);

  return (
    <div className={`pt-12 pb-0 transition-colors duration-500 ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-bg-primary"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header matching screenshot */}
        <div className="flex justify-between items-end mb-6">
          <h1 className={`text-[25px] font-bold leading-[1.1] tracking-tighter ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
            <span className="text-[#c2a382] mr-2">Explore</span>
            {t("revenueHeroTitle")}
          </h1>
          <Link to="/services" className={`flex items-center gap-1.5 text-[15px] font-bold pb-0.5 border-b hover:opacity-70 transition-opacity ${theme === "dark" ? "text-white border-white" : "text-[#1d1d1f] border-black"}`}>
            <span>← {t("backServices")}</span>
          </Link>
        </div>
        
        {/* The Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-t md:border-b-0 border-black/20 dark:border-white/20 divide-black/20 dark:divide-white/20 mt-2">
          
          {/* Column 1 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Overview" 
              title="DIGITAL GROWTH ENGINE" 
              content={t("serv2Details")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Platform" 
              title="CONTENT & PLATFORM" 
              content={[t(features[0]), t(features[1])].join("、")} 
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Social" 
              title="SOCIAL & MEDIA" 
              content={[t(features[2]), t(features[3])].join("、")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <div className="py-4 px-0 md:px-6 flex flex-col items-center justify-center text-center flex-grow min-h-[120px]">
              <h2 className={`text-[25px] font-bold leading-[1.1] tracking-tighter mb-4 lowercase ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
                {lang === "en" ? "explore all" : t("viewShowcase")}
              </h2>
              <button 
                onClick={() => setIsShowcaseVisible(!isShowcaseVisible)}
                className={`px-10 py-3 border border-[#c2a382]/60 text-[#c2a382] font-semibold hover:bg-[#c2a382] hover:text-white transition-all text-xs tracking-widest uppercase mb-4`}
              >
                {t("viewShowcase")}
              </button>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Outreach" 
              title="COMMUNITY & OUTREACH" 
              content={[t(features[4]), t(features[5])].join("、")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Conversion" 
              title="ADVERTISING & EMAIL" 
              content={[t(features[6]), t(features[7])].join("、")} 
            />
          </div>

        </div>

        {/* Showcase Image Area */}
        <AnimatePresence>
          {isShowcaseVisible && (
            <motion.div 
              ref={previewRef}
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{ 
                height: { duration: 0.5, ease: "circOut" },
                opacity: { duration: 0.4, delay: 0.1 }
              }}
              className="w-full mt-8 overflow-hidden flex flex-col items-center"
            >
              <div className="w-full bg-black/5 dark:bg-white/5 p-4 md:p-8 border-y md:border border-black/10 dark:border-white/10 relative min-h-[400px] flex flex-col items-center justify-center md:rounded-[28px]">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
                    <Loader2 className="animate-spin text-[#2563eb]" size={40} />
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Loading Showcase...</span>
                  </div>
                )}
                <div 
                  className={`w-full overflow-hidden rounded-xl group relative transition-opacity duration-700 ${isPreviewLoading ? 'opacity-0' : 'opacity-100'}`} 
                >
                  <div className="min-w-full inline-block align-middle">
                    <img
                      src="/revenue-showcase.jpg"
                      alt="Digital Growth Engine Showcase Preview"
                      loading="eager"
                      decoding="async"
                      onLoad={() => setIsPreviewLoading(false)}
                      className="w-full h-auto block shadow-xl transition-transform duration-700"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const BrandExposureSubPage = () => {
  const { t, theme, lang } = useContext(LanguageContext);
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const features = ["brandSentimentMonitoring", "brandCreativeConcepting", "mediaRelationsPartnerships", "prCommunications", "imc", "brandActivations", "brandIdentityAssets", "brandMindshare"];
  
  // Auto-scroll logic when showcased
  useEffect(() => {
    if (isShowcaseVisible && previewRef.current) {
      const timer = setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isShowcaseVisible]);

  useEffect(() => {
    if (isShowcaseVisible) {
      setIsPreviewLoading(true);
    }
  }, [isShowcaseVisible]);

  return (
    <div className={`pt-12 pb-0 transition-colors duration-500 ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-bg-primary"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header matching screenshot */}
        <div className="flex justify-between items-end mb-6">
          <h1 className={`text-[25px] font-bold leading-[1.1] tracking-tighter ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
            <span className="text-[#c2a382] mr-2">Explore</span>
            {t("brandExposureHeroTitle")}
          </h1>
          <Link to="/services" className={`flex items-center gap-1.5 text-[15px] font-bold pb-0.5 border-b hover:opacity-70 transition-opacity ${theme === "dark" ? "text-white border-white" : "text-[#1d1d1f] border-black"}`}>
            <span>← {t("backServices")}</span>
          </Link>
        </div>
        
        {/* The Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-t md:border-b-0 border-black/20 dark:border-white/20 divide-black/20 dark:divide-white/20 mt-2">
          
          {/* Column 1 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Overview" 
              title="BRAND COMMUNICATION" 
              content={t("serv3Details")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Creative" 
              title="SENTIMENT & CREATIVE" 
              content={[t(features[0]), t(features[1])].join("、")} 
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Media" 
              title="MEDIA & PR" 
              content={[t(features[2]), t(features[3])].join("、")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <div className="py-4 px-0 md:px-6 flex flex-col items-center justify-center text-center flex-grow min-h-[120px]">
              <h2 className={`text-[25px] font-bold leading-[1.1] tracking-tighter mb-4 lowercase ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
                {lang === "en" ? "explore all" : t("viewShowcase")}
              </h2>
              <button 
                onClick={() => setIsShowcaseVisible(!isShowcaseVisible)}
                className={`px-10 py-3 border border-[#c2a382]/60 text-[#c2a382] font-semibold hover:bg-[#c2a382] hover:text-white transition-all text-xs tracking-widest uppercase mb-4`}
              >
                {t("viewShowcase")}
              </button>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Campaigns" 
              title="IMC & ACTIVATIONS" 
              content={[t(features[4]), t(features[5])].join("、")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Identity" 
              title="IDENTITY & MINDSHARE" 
              content={[t(features[6]), t(features[7])].join("、")} 
            />
          </div>

        </div>

        {/* Showcase Image Area */}
        <AnimatePresence>
          {isShowcaseVisible && (
            <motion.div 
              ref={previewRef}
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{ 
                height: { duration: 0.5, ease: "circOut" },
                opacity: { duration: 0.4, delay: 0.1 }
              }}
              className="w-full mt-8 overflow-hidden flex flex-col items-center"
            >
              <div className="w-full bg-black/5 dark:bg-white/5 p-4 md:p-8 border-y md:border border-black/10 dark:border-white/10 relative min-h-[400px] flex flex-col items-center justify-center md:rounded-[28px]">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
                    <Loader2 className="animate-spin text-[#2563eb]" size={40} />
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Loading Showcase...</span>
                  </div>
                )}
                <div 
                  className={`w-full overflow-hidden rounded-xl group relative transition-opacity duration-700 ${isPreviewLoading ? 'opacity-0' : 'opacity-100'}`} 
                >
                  <div className="min-w-full inline-block align-middle">
                    <img
                      src="/品牌案例.jpg"
                      alt="Brand Identity Showcase Preview"
                      loading="eager"
                      decoding="async"
                      onLoad={() => setIsPreviewLoading(false)}
                      className="w-full h-auto block shadow-xl transition-transform duration-700"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const StrategicPartnershipsSubPage = () => {
  const { t, theme, lang } = useContext(LanguageContext);
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const features = ["govtEnterpriseSynergy", "buildingStrategicMoats", "commercialNarrativeCaseStudies", "techValueMonetization", "industryAlliancePartnerships", "platformStrategicAlignment"];
  
  useEffect(() => {
    if (isShowcaseVisible && previewRef.current) {
      const timer = setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isShowcaseVisible]);

  useEffect(() => {
    if (isShowcaseVisible) {
      setIsPreviewLoading(true);
    }
  }, [isShowcaseVisible]);

  return (
    <div className={`pt-12 pb-0 transition-colors duration-500 ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-bg-primary"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header matching screenshot */}
        <div className="flex justify-between items-end mb-6">
          <h1 className={`text-[25px] font-bold leading-[1.1] tracking-tighter ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
            <span className="text-[#c2a382] mr-2">Explore</span>
            {t("partnershipsHeroTitle")}
          </h1>
          <Link to="/services" className={`flex items-center gap-1.5 text-[15px] font-bold pb-0.5 border-b hover:opacity-70 transition-opacity ${theme === "dark" ? "text-white border-white" : "text-[#1d1d1f] border-black"}`}>
            <span>← {t("backServices")}</span>
          </Link>
        </div>
        
        {/* The Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-t md:border-b-0 border-black/20 dark:border-white/20 divide-black/20 dark:divide-white/20 mt-2">
          
          {/* Column 1 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Overview" 
              title="RESOURCE EXPANSION" 
              content={t("serv4Details")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Moats" 
              title="GOVT & MOATS" 
              content={[t(features[0]), t(features[1])].join("、")} 
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Monetization" 
              title="NARRATIVE & MONETIZATION" 
              content={[t(features[2]), t(features[3])].join("、")} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <div className="py-4 px-0 md:px-6 flex flex-col items-center justify-center text-center flex-grow min-h-[120px]">
              <h2 className={`text-[25px] font-bold leading-[1.1] tracking-tighter mb-4 lowercase ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
                {lang === "en" ? "explore all" : t("viewShowcase")}
              </h2>
              <button 
                onClick={() => setIsShowcaseVisible(!isShowcaseVisible)}
                className={`px-10 py-3 border border-[#c2a382]/60 text-[#c2a382] font-semibold hover:bg-[#c2a382] hover:text-white transition-all text-xs tracking-widest uppercase mb-4`}
              >
                {t("viewShowcase")}
              </button>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <ArticleItem 
              category="Alliances" 
              title="INDUSTRY ALLIANCES" 
              content={t(features[4])} 
            />
            <hr className="border-black/20 dark:border-white/20 mx-0 md:mx-6" />
            <ArticleItem 
              category="Platform" 
              title="PLATFORM STRATEGY" 
              content={t(features[5])} 
            />
          </div>

        </div>

        {/* Showcase Image Area */}
        <AnimatePresence>
          {isShowcaseVisible && (
            <motion.div 
              ref={previewRef}
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{ 
                height: { duration: 0.5, ease: "circOut" },
                opacity: { duration: 0.4, delay: 0.1 }
              }}
              className="w-full mt-8 overflow-hidden flex flex-col items-center"
            >
              <div className="w-full bg-black/5 dark:bg-white/5 p-4 md:p-8 border-y md:border border-black/10 dark:border-white/10 relative min-h-[400px] flex flex-col items-center justify-center md:rounded-[28px]">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
                    <Loader2 className="animate-spin text-[#2563eb]" size={40} />
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Loading Showcase...</span>
                  </div>
                )}
                <div 
                  className={`w-full overflow-hidden rounded-xl group relative transition-opacity duration-700 ${isPreviewLoading ? 'opacity-0' : 'opacity-100'}`} 
                >
                  <div className="min-w-full inline-block align-middle">
                    <img
                      src="/生态案例.png"
                      alt="Partnerships Showcase Preview"
                      loading="eager"
                      decoding="async"
                      onLoad={() => setIsPreviewLoading(false)}
                      className="w-full h-auto block shadow-xl transition-transform duration-700"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const StatCounter = ({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const { theme } = useContext(LanguageContext);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={nodeRef} className="flex flex-col">
      <div className={`text-4xl md:text-5xl font-bold tracking-tight mb-2 transition-colors ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-widest text-[#86868b]">
        {label}
      </div>
    </div>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayedText(text.slice(0, i));
          i++;
          if (i > text.length) clearInterval(interval);
        }, 20);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);

  return <p ref={nodeRef} className="text-lg md:text-xl text-[#424245] dark:text-white/70 leading-relaxed max-w-2xl font-medium min-h-[4rem]">{displayedText}</p>;
};


const ContactPage = () => {
  const { t, theme } = useContext(LanguageContext);
  return (
    <div className={`pt-20 pb-16 transition-colors duration-500 overflow-hidden ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-bg-primary"}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        
        {/* Top Centered Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h1 className={`text-[25px] font-bold tracking-tighter mb-4 ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
            {t("lookingForward")}
          </h1>
          <p className={`text-[15px] md:text-[16px] leading-relaxed max-w-2xl text-center mx-auto ${theme === "dark" ? "text-white/60" : "text-[#424245]"}`}>
            {t("contactDescription")}
          </p>
        </div>

        {/* Map Image */}
        <div className="w-full h-[75px] md:h-[100px] mb-12 overflow-hidden rounded-sm">
          <img 
            src="/contact2.jpg" 
            alt="Contact banner" 
            className="w-full h-full object-cover object-center" 
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Bottom Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
          
          {/* Left: Contact Form */}
          <div className="flex flex-col">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group w-full">
                <textarea 
                  rows={2}
                  placeholder={t("yourMessage")}
                  className={`w-full bg-transparent border-b py-2 outline-none transition-colors border-black/20 dark:border-white/20 focus:border-[#c2a382] resize-none text-[13px] placeholder:text-[#86868b] placeholder:italic ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder={t("fullName")}
                    required
                    className={`w-full bg-transparent border-b py-2 outline-none transition-colors border-black/20 dark:border-white/20 focus:border-[#c2a382] text-[13px] placeholder:text-[#86868b] placeholder:italic ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder={t("emailAddress")}
                    required
                    className={`w-full bg-transparent border-b py-2 outline-none transition-colors border-black/20 dark:border-white/20 focus:border-[#c2a382] text-[13px] placeholder:text-[#86868b] placeholder:italic ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}
                  />
                </div>
              </div>

              {/* Added company field back as requested by keep text unchanged, though not in screenshot explicitly */}
              <div className="relative group w-full">
                <input 
                  type="text" 
                  placeholder={t("company")}
                  className={`w-full bg-transparent border-b py-2 outline-none transition-colors border-black/20 dark:border-white/20 focus:border-[#c2a382] text-[13px] placeholder:text-[#86868b] placeholder:italic ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}
                />
              </div>

              <div className="pt-6 border-transparent">
                <button 
                  type="submit"
                  className={`px-10 py-3 border border-[#c2a382]/60 text-[#c2a382] font-semibold hover:bg-[#c2a382] hover:text-white transition-all text-xs tracking-widest uppercase mb-12`}
                >
                  {t("sendMessage")}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Reservations / Info */}
          <div className="flex flex-col">
            <h2 className={`text-[20px] font-bold tracking-tighter mb-4 ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
              INFO
            </h2>
            <div className={`space-y-4 text-[15px] md:text-[18px] leading-relaxed font-bold tracking-wide ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
              <a href="mailto:is.xiaopei@gmail.com" className="block hover:underline">is.xiaopei@gmail.com</a>
              <a href="tel:+8618823346149" className="block hover:underline">+86-18823346149</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 2500;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};


const Capabilities = () => {
  const { t, theme } = useContext(LanguageContext);

  const capabilities = [
    {
      id: "01",
      title: t("cap1Title"),
      description: t("cap1Desc"),
      link: "/services/strategy"
    },
    {
      id: "02",
      title: t("cap2Title"),
      description: t("cap2Desc"),
      link: "/services/revenue"
    },
    {
      id: "03",
      title: t("cap4Title"),
      description: t("cap4Desc"),
      link: "/services/brand"
    },
    {
      id: "04",
      title: t("cap3Title"),
      description: t("cap3Desc"),
      link: "/services/partnerships"
    }
  ];

  return (
    <section id="services" className={`py-24 md:py-32 px-4 md:px-6 transition-colors duration-500 overflow-hidden ${theme === "dark" ? "bg-[#0b0b0c]" : "bg-white"}`}>
      <div className="apple-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-[14px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-6">
              {t("professionalServices")}
            </span>
            <h2 
              className={`text-[48px] lg:text-[72px] font-serif font-medium leading-[0.9] tracking-tighter mb-8 transition-colors ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}
              dangerouslySetInnerHTML={{ __html: t("capabilitiesTitle") }}
            />
            <p className={`text-[15.5px] lg:text-[19px] leading-relaxed font-normal mb-12 transition-colors ${theme === "dark" ? "text-white/70" : "text-[#424245]"}`}>
              {t("capabilitiesDesc")}
            </p>

            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-[15.5px] font-bold uppercase tracking-widest text-[#0071e3] group/cta px-6 py-3 rounded-full border border-[#0071e3]/20 hover:bg-[#0071e3] hover:text-white transition-all duration-300"
            >
              {t("viewAllWorks")}
              <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right Column: Dynamic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Link to={cap.link} className="block group h-full">
                  <div className={`h-full min-h-[420px] lg:min-h-[460px] rounded-[24px] border transition-all duration-500 relative overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                    theme === "dark" 
                      ? "bg-[#111111] border-white/5 hover:border-white/10" 
                      : "bg-[#fcfcfd] border-black/5 hover:border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/0 via-[#0071e3]/0 to-[#0071e3]/5 shadow-[inset_0_0_0_1px_rgba(0,113,227,0)] group-hover:shadow-[inset_0_0_0_1px_rgba(0,113,227,0.15)] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0" />
                    
                    {/* Visualization Top Area */}
                    <div className="h-[250px] lg:h-[260px] w-full flex items-center justify-center relative overflow-hidden shrink-0">
                      <ServiceVisualization type={cap.id} theme={theme} />
                    </div>
                    
                    {/* Content Bottom Area */}
                    <div className={`p-6 md:p-8 relative z-10 flex-1 flex flex-col backdrop-blur-xl border-t ${theme === "dark" ? "bg-[#111111]/70 border-white/5" : "bg-white/60 border-black/5"}`}>
                      <div className="flex items-center justify-between mx-auto w-full mb-4 relative">
                        <div className="text-[11px] uppercase font-mono font-bold tracking-widest text-[#0071e3] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                          {`Module ${cap.id}`}
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white dark:bg-[#222] border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:bg-[#0071e3] transition-colors duration-500 shadow-sm">
                          <ArrowUpRight size={16} className={`transition-colors duration-500 ${theme === "dark" ? "text-white/70 group-hover:text-white" : "text-black/60 group-hover:text-white"}`} />
                        </div>
                      </div>
                      <div className="flex-1 mt-1">
                        <h3 className={`text-[20px] md:text-[22px] font-bold tracking-tight mb-3 transition-colors ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"}`}>
                          {cap.title}
                        </h3>
                        <p className={`text-[14px] md:text-[15px] font-normal leading-relaxed transition-colors ${theme === "dark" ? "text-white/60" : "text-[#6e6e73]"}`}>
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-white">
      <div className="apple-container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[15px] font-light tracking-[0.3em] text-[#86868b] uppercase block mb-8">
              {t("contact")}
            </span>
            
            <h2 className="text-[30px] lg:text-[35px] font-bold leading-[1.2] tracking-tight text-[#1d1d1f] mb-16">
              {t("lookingForward")}
            </h2>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-20">
            <a 
              href="mailto:is.xiaopei@gmail.com" 
              className="group flex items-center gap-3 text-[15px] font-medium text-[#424245] hover:text-[#0071e3] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#0071e3]/10 transition-colors">
                <Mail size={18} className="text-[#86868b] group-hover:text-[#0071e3]" />
              </div>
              is.xiaopei@gmail.com
            </a>
            <a 
              href="tel:+8618823346149" 
              className="group flex items-center gap-3 text-[15px] font-medium text-[#424245] hover:text-[#0071e3] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-[#0071e3]/10 transition-colors">
                <Phone size={18} className="text-[#86868b] group-hover:text-[#0071e3]" />
              </div>
              +86-18823346149
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a 
              href="mailto:is.xiaopei@gmail.com" 
              className="inline-block px-10 py-3.5 bg-[#0071e3] text-white rounded-full text-[15.5px] font-bold uppercase tracking-widest hover:bg-[#0077ed] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {t("getInTouch")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer component removed

const AppContent = () => {
  const { theme } = useContext(LanguageContext);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop themeAware />
      <div className={`font-sans transition-colors duration-500 select-none ${theme === "dark" ? "bg-[#0b0b0c] text-white" : "bg-bg-primary text-[#1d1d1f]"}`}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <Hero />
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/strategy" element={<MarketingStrategySubPage />} />
            <Route path="/services/revenue" element={<RevenueGrowthSubPage />} />
            <Route path="/services/brand" element={<BrandExposureSubPage />} />
            <Route path="/services/partnerships" element={<StrategicPartnershipsSubPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
