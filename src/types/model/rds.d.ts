declare type RDSRecommendedType = {
  clockSpeed: string;
  currentGeneration: string;
  databaseEngine: string;
  deploymentOption: string;
  engineCode: string;
  instanceFamily: string;
  instanceType: string;
  instanceTypeFamily: string;
  licenseModel: string;
  location: string;
  locationType: string;
  memory: number;
  monthly_saving: number;
  networkPerformance: string;
  normalizationSizeFactor: string;
  onDemand_price: number;
  operation: string;
  physicalProcessor: string;
  processorArchitecture: string;
  processorFeatures: string;
  reserved_price: number;
  servicecode: string;
  servicename: string;
  storage: string;
  usagetype: string;
  vcpu: number;
};

declare type RDSRecommendType = Record<
  RecommendPeriod,
  Record<RecommendCategory, OptimizationRecommendItem>
>;

declare type RDSInformation = {
  AccountId: string;
  CPUAverage: number;
  CPUMax: number;
  ClusterId: string;
  CompanyId: string;
  DatabaseEngine: string;
  Hide: boolean;
  InstanceId: string;
  InstanceType: string;
  LastUpdate: Date;
  MemAverage: number;
  MemMax: number;
  MonthlyCost: number;
  MonthlySaving: number;
  MultiAZ: string;
  RecommendType: RDSRecommendType;
  Region: string;
  Tag: ReadonlyArray<Record<string, string>>;
  UID: string;
};

declare type RDSCoverage = {
  AccountId: string;
  CompanyId: string;
  Coverage: number;
  DatabaseEngine: string;
  Date: Date;
  DeploymentOption: string;
  Details: string;
  InstanceId: string;
  InstanceType: string;
  LastMonthCoverage: number;
  LastMonthOnDemandCost: number;
  LastMonthOnDemandHours: number;
  LastMonthReservedHours: number;
  LastUpdate: Date;
  OnDemandCost: number;
  OnDemandHours: number;
  Region: string;
  ReservedHours: number;
  ResourceId: string;
  SubscriptionId: string;
  Tag: ReadonlyArray<Record<string, string>>;
  TotalNormalizedUsage: number;
  TotalUsageHours: number;
  UID: string;
};

declare type RDSRIUtilization = {
  AccountId: string;
  CompanyId: string;
  DatabaseEngine: string;
  Date: Date;
  InstanceType: string;
  LastMonthNormalizedPurchase: number;
  LastMonthPurchaseHours: number;
  LastMonthUsedHours: number;
  LastMonthUsedNormalizedAmount: number;
  LastMonthUtilizatoin: number;
  LastUpdate: Date;
  NormalizedPurchase: number;
  PurchaseHours: number;
  Region: string;
  UID: string;
  UsedHours: number;
  UsedNormalizedAmount: number;
  Utilization: number;
};

declare type RDSStorage = {
  AccountId: string;
  AllocateStorage: number;
  ClusterId: string;
  CompanyId: string;
  DatabaseEngine: string;
  Hide: boolean;
  IOPS: number;
  IOPSAverage: readonly [{ cloudwatch: number | null }];
  IOPSMax: readonly [{ cloudwatch: number | null }];
  InstanceId: string;
  InstanceType: string;
  LastUpdate: Date;
  MonthlyCost: number;
  Region: string;
  StorageSpaceAverage: readonly [{ cloudwatch: number | null }];
  StorageSpaceMax: readonly [{ cloudwatch: number | null }];
  StorageType: string;
  Tag: ReadonlyArray<Record<string, string>>;
  UID: string;
};

declare type RDSUtilizationChart = {
  ClusterId: string;
  DatabaseEngine: string;
  InstanceId: string;
  InstanceType: string;
  CPUAverage: number | null;
  CPUMax: number | null;
  MemAverage: number | null;
  MemMax: number | null;
};

declare type RDSPurchasingCoverageChart = {
  Date: Date;
  Ondemand: number;
  OndemandCost: number;
  Reserved: number;
  ReservedCost: number;
  ReservedCoverage: number;
};

declare type RDSPurchasingUtilizationChart = {
  Date: Date;
  ReservedPurchase: number;
  ReservedUtilization: number;
};

declare type RDSStorageChart = {
  Date: Date;
  GeneralPurpose: number;
  ProvisionedIOPS: number;
};

declare interface RDSAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  ClusterId: ReadonlyArray<string>;
  DatabaseEngine: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  InstanceType: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Tag: ReadonlyArray<Record<string, string>>;
}

declare interface RDSCoverageAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  DatabaseEngine: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  InstanceType: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Tag: ReadonlyArray<Record<string, string>>;
}

declare interface RDSRIUtilizationAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  DatabaseEngine: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  InstanceType: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
}

declare interface RDSStorageAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  ClusterId: ReadonlyArray<string>;
  DatabaseEngine: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  InstanceType: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  StorageType: ReadonlyArray<string>;
}

declare type RDSDetailsGeneral = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  Tag: ReadonlyArray<Record<string, string>>;
  Region: string;
  InstanceId: string;
  ClusterId: string;
  DatabaseEngine: string;
  MultiAZ: string;
  CPUAverage: readonly [{ cloudwatch: number | null }];
  MemAverage: readonly [{ cloudwatch: number | null }];
  CPUMax: readonly [{ cloudwatch: number | null }];
  MemMax: readonly [{ cloudwatch: number | null }];
  MonthlyCost: number;
  InstanceType: string;
  RecommendType: [
    {
      onDemand_price: number;
      reserved_price: number;
      engineCode: string;
      instanceTypeFamily: string;
      memory: number;
      vcpu: number;
      instanceType: string;
      usagetype: string;
      locationType: string;
      storage: string;
      normalizationSizeFactor: string;
      instanceFamily: string;
      databaseEngine: string;
      processorFeatures: string;
      regionCode: string;
      servicecode: string;
      physicalProcessor: string;
      clockSpeed: string;
      licenseModel: string;
      currentGeneration: string;
      networkPerformance: string;
      deploymentOption: string;
      location: string;
      servicename: string;
      processorArchitecture: string;
      operation: string;
      monthly_saving: number;
    },
  ];
  MonthlySaving: number;
  Hide: false;
  LastUpdate: string;
};

declare type RDSDetailsPricingPlan = {
  InstanceUsage: Array<{
    Date: string;
    Ondemand: number;
    Reserved: number;
    Coverage: number;
    TotalUsage: number;
  }>;
  FamilyCoverage: Array<{
    Date: string;
    Ondemand: number;
    Reserved: number;
    Coverage: number;
    TotalUsage: number;
  }>;
  ThisMonthUsage: [
    {
      Ondemand: number;
      Reserved: number;
      Coverage: number;
      TotalUsage: number;
    },
  ];
  NeedMoreRI: true;
};

declare type RDSDetailsUtilizationChart = {
  Date: Date;
  Average: number;
  Maximum: number;
};

declare type RDSDetailsUtilization = {
  CPUUtilization: Array<RDSDetailsUtilizationChart>;
  MemoryUtilization: Array<RDSDetailsUtilizationChart>;
};

declare type RDSDetailsUtilizationExtras = {
  CurrentType: string;
  RecommendType: RDSRecommendType;
};

declare type RDSDetailStorageSummary = {
  Date: Date;
  GeneralPurpose: number;
  ProvisionedIOPS: number;
  Total: number;
};

declare interface RDSIntelligence extends IntelligenceItem {
  CaseId: RDSCaseId;
}

declare type RDSDetailsStorage = {
  RecommendActions: Array<RDSIntelligence>;
  Summary: RDSDetailStorageSummary[];
  UsageDetails: {
    AllocateStorage: number;
    MaximumUtilization: number;
    AverageUtilization: number;
    ProvisionedIOPS: number;
    MaximumIOPS: number;
    AverageIOPS: number;
    Cost: number;
    VolumeType: string;
  };
};
