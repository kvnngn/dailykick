declare type APMSource = 'cloudwatch' | 'newrelic' | 'datadog';

declare type EC2Information = {
  UID?: string;
  AccountId?: string;
  AccountName?: string;
  CompanyId?: string;
  InstanceId?: string;
  InstanceFamily?: string;
  OperatingSystem?: string;
  Region?: string;
  Status?: string;
  Tenancy?: string;
  CurrentType?: string;
  RecommendType?: OptimizationRecommendType;
  Tag?: ReadonlyArray<Record<string, unknown>>;
  CPUAverage?: ReadonlyArray<OptimizationAPMInfo>;
  CPUMax?: ReadonlyArray<OptimizationAPMInfo>;
  MemAverage?: ReadonlyArray<OptimizationAPMInfo>;
  MemMax?: ReadonlyArray<OptimizationAPMInfo>;
  MonthlyCost?: number;
  MonthlyOndemandCost?: number;
  MonthlySaving?: number;
  OnDemandPrice?: number;
  AutoScale?: boolean;
  ChangeType?: any;
  Terminate?: boolean;
  Hide?: boolean;
  LastUpdate?: Date;
  Ack?: boolean;
  storage?: string;
  vcpu?: number;
  memory?: number;
  networkPerformance?: string;
};

declare type EC2Coverage = {
  AccountId: string;
  CompanyId: string;
  Date: Date;
  Details: string;
  InstanceFamily: string;
  InstanceId: string;
  InstanceType: string;
  LastMonthOnDemandCost: number;
  LastMonthOnDemandHours: number;
  LastMonthRICoverage: number;
  LastMonthReservedHours: number;
  LastMonthSavingsPlanCoverage: number;
  LastMonthSavingsPlanHours: number;
  LastUpdate: Date;
  OnDemandCost: number;
  OnDemandHours: number;
  OperatingSystem: string;
  RICoverage: number;
  RecommendPricingPlan: RecommendPricingPlan;
  Region: string;
  ReservedHours: number;
  SavingsPlanCoverage: number;
  SavingsPlanHours: number;
  Tag: ReadonlyArray<Record<string, string>>;
  Tenancy: string;
  TotalNormalizedUsage: number;
  TotalUsageHours: number;
  UID: string;
  UsageType: string;
};

declare type EC2RIUtilization = {
  AccountId: string;
  Class: 'standard' | 'convertible';
  CompanyId: string;
  ExpiredOn: Date;
  InstanceFamily: string;
  InstanceFamilyUsage: {
    NormalizedOndemandUsage: number;
    NormalizedReservedUsage: number;
    NormalizedSavingsPlanUsage: number;
    Ondemand: number;
    OndemandCost: number;
    OndemandCoverage: number;
    Reserved: number;
    ReservedCost: number;
    ReservedCoverage: number;
    ReservedUtilization: number;
    SavingsPlan: number;
    SavingsPlanCost: number;
    SavingsPlanCoverage: number;
    SavingsPlanUtilization: number;
    TotalCost: number;
    TotalUsage: number;
  };
  InstanceType: string;
  LastMonthMonthlyCost: number;
  LastMonthPurchaseHours: number;
  LastMonthUsedCost: number;
  LastMonthUsedHours: number;
  LastMonthUtilization: number;
  LastUpdate: string;
  MonthlyCost: number;
  NumberOfRI: number;
  OfferingType: PaymentOption;
  OperatingSystem: string;
  OrganizationId?: string;
  PurchaseHours: number;
  RecommendPricingPlan: RecommendPricingPlan;
  Region: string;
  Tenancy: string;
  Terms: '1-yr' | '3-yr';
  UID: string;
  UsedCost: number;
  UsedHours: number;
  Utilization: number;
};

declare type EC2SPUtilization = {
  AccountId: string;
  CommitmentCost: number;
  CommitmentHours: number;
  CompanyId: string;
  Date: Date;
  ExpiredOn: Date;
  InstanceFamily: string;
  InstanceFamilyUsage: {
    NormalizedOndemandUsage: number;
    NormalizedReservedUsage: number;
    NormalizedSavingsPlanUsage: number;
    Ondemand: number;
    OndemandCost: number;
    OndemandCoverage: number;
    Reserved: number;
    ReservedCost: number;
    ReservedCoverage: number;
    ReservedUtilization: number;
    SavingsPlan: number;
    SavingsPlanCost: number;
    SavingsPlanCoverage: number;
    SavingsPlanUtilization: number;
    TotalCost: number;
    TotalUsage: number;
  };
  LastMonthCommitmentCost: number;
  LastMonthCommitmentHours: number;
  LastMonthUnusedCost: number;
  LastMonthUnusedHours: number;
  LastMonthUtilization: number;
  LastUpdate: Date;
  PurchaseOption: PaymentOption;
  RecommendPricingPlan: RecommendPricingPlan;
  Region: string;
  Term: '1-yr' | '3-yr';
  Type: 'EC2Instance' | 'Compute';
  UID: string;
  UnusedCost: number;
  UnusedHours: number;
  Utilization: number;
};

declare type EC2DataTransferSummary = {
  CostsWaste: number;
  TotalCost: number;
  TotalTraffic: number;
  TransferTypeSummary: Record<string, { Traffic: number; Cost: number }>;
};

declare type EC2DataTransfer = {
  AccountId: string;
  CompanyId: string;
  CurrentCost: number;
  Deatils: string;
  FromLocation: string;
  InstanceId: string;
  LastUpdate: string;
  MonthlySaving: number;
  ToLocation: string;
  Traffic: number;
  TransferType: string;
  UID: string;
};

declare type EC2Others = IntelligenceItem;

declare type EC2OthersExtra = {
  CategoryCost: Record<EC2CaseId, { Cost: number; Items: number }>;
  TotalCost: number;
  LatestUpdate: Date;
};

declare type EC2DetailsGeneral = {
  AccountId: string;
  AccountName: string;
  Ack: boolean;
  AutoScale: boolean;
  CPUAverage: Array<Record<APMSource, number | null>>;
  CPUMax: Array<Record<APMSource, number | null>>;
  ChangeType: string;
  CompanyId: string;
  CurrentType: string;
  Hide: boolean;
  InstanceFamily: string;
  InstanceId: string;
  LastUpdate: string;
  MemAverage: Array<Record<APMSource, number | null>>;
  MemMax: Array<Record<APMSource, number | null>>;
  MonthlyCost: number;
  MonthlySaving: number;
  OnDemandPrice: number;
  OperatingSystem: string;
  RecommendType: Array<Record<APMSource, number | null>>;
  Region: string;
  Status: string;
  Tag: Array<Record<string, string>>;
  Tenancy: string;
  Terminate: boolean;
  UID: string;
  UsageType: string;
  memory: number;
  networkPerformance: string;
  storage: string;
  vcpu: number;
};

declare type EC2DetailsUtilization = {
  Utilization: Array<{
    CPUUtilization: Array<any>;
    DataSource: string;
    InstanceId: string;
    MemUtilization: Array<any>;
    NetworkIn: Array<any>;
    NetworkOut: Array<any>;
  }>;
};

declare type EC2Usage = {
  Date: Date;
  Ondemand: number;
  Reserved: number;
  SavingsPlan: number;
  TotalUsage: number;
};

declare type EC2DetailsPurchasing = {
  FamilyUsage: Array<EC2Usage>;
  InstanceUsage: Array<EC2Usage>;
  LastMonthUsage: EC2Usage;
  RecommendPricingPlan: {
    Recommend: RecommendPricingPlan;
    Usage: any;
  };
};

declare type EC2TransferKeys =
  | 'IntraRegion'
  | 'InterRegion Inbound'
  | 'InterRegion Outbound'
  | 'AWS Inbound'
  | 'AWS Outbound'
  | 'Others';

declare type EC2DetailsTransferSummary = {
  Type: EC2TransferKeys;
  Traffic: number;
  Cost: number;
};

declare type EC2DetailsTransferExtras = {
  TotalCost: number;
  WasteCost: number;
};

declare type EC2DetailsTransferDetails = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  InstanceId: string;
  FromLocation: string;
  ToLocation: string;
  TransferType: string;
  CurrentCost: number;
  Traffic: number;
  LastUpdate: string;
  OrganizationId: null;
};

declare interface EC2DetailsOthers extends IntelligenceItem {
  CaseId: EC2CaseId;
}

declare interface EC2Miscellaneous extends IntelligenceItem {
  CaseId: MiscellaneousCaseId;
}

declare type EC2UtilizationChart = {
  InstanceId: string;
  CPUAverage: Array<Record<APMSource, number | null>>;
  CPUMax: Array<Record<APMSource, number | null>>;
  MemAverage: Array<Record<APMSource, number | null>>;
  MemMax: Array<Record<APMSource, number | null>>;
  MonthlySaving: number;
  Tag: Array<Record<string, string>>;
};

declare type EC2PurchasingChart = {
  Date: Date;
  Ondemand: number;
  OndemandCost: number;
  Reserved: number;
  ReservedCoverage: number;
  ReservedPurchase: number;
  ReservedUtilization: number;
  SavingsPlan: number;
  SavingsPlanCost: number;
  SavingsPlanCoverage: number;
  SavingsPlanPurchase: number;
  SavingsPlanUtilization: number;
};

declare type EC2DataTransferChart = {
  Date: Date;
  Cost: number;
};

declare interface EC2AutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  AccountName: ReadonlyArray<string>;
  CurrentType: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  OperatingSystem: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Status: ReadonlyArray<string>;
  Tag: ReadonlyArray<Record<string, string>>;
}

declare interface EC2CoverageAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  InstanceType: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Tag: ReadonlyArray<Record<string, string>>;
}

declare interface EC2RIUtilizationAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  Class: ReadonlyArray<string>;
  InstanceType: ReadonlyArray<string>;
  OfferingType: ReadonlyArray<string>;
  OperatingSystem: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Tenancy: ReadonlyArray<string>;
  Terms: ReadonlyArray<string>;
}

declare interface EC2SPUtilizationAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  InstanceFamily: ReadonlyArray<string>;
  PurchaseOption: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Type: ReadonlyArray<string>;
}

declare interface EC2DataTransferAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  FromLocation: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  ToLocation: ReadonlyArray<string>;
  TransferType: ReadonlyArray<string>;
}

declare interface EC2OtherAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  Category: ReadonlyArray<string>;
}
