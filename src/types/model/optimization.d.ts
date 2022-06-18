declare type APMSource = 'cloudwatch' | 'newrelic' | 'datadog';

declare interface AutoCompleteData {
  [key: string]: ReadonlyArray<string | Record<string, string>>;
}

declare type IntelligenceCategory =
  | 'Utilization'
  | 'PurchasingOptions'
  | 'UnusedResources'
  | 'Other';

declare interface IntelligenceItem {
  AWSAccountId: string;
  Ack: boolean;
  Acknowledged: Date;
  CaseId:
    | EC2CaseId
    | RDSCaseId
    | EBSCaseId
    | S3CaseId
    | MiscellaneousCaseId
    | NotificationCaseId;
  Category: IntelligenceCategory;
  Created: Date;
  Description: string;
  Details: string;
  DetailsValue: Record<string, string | number>;
  MonthlyCostSaving: number;
  ResourceId: string;
  ResourcesList: ReadonlyArray<string>;
  ServiceName: string;
  Title: string;
  UID: string;
}

declare type OptimizationAPMInfo = {
  cloudwatch?: number | null;
  newrelic?: number | null;
  datadog?: number | null;
};

declare type RecommendedRIPrice = {
  '3_Convertible_NoUpfront'?: string;
  '3_Standard_AllUpfront'?: string;
  '3_Convertible_PartialUpfront'?: string;
  '3_Standard_NoUpfront'?: string;
  '1_Convertible_AllUpfront'?: string;
  '3_Standard_PartialUpfront'?: string;
  '1_Standard_AllUpfront'?: string;
  '1_Convertible_NoUpfront'?: string;
  '1_Standard_NoUpfront'?: string;
  '1_Standard_PartialUpfront'?: string;
  '1_Convertible_PartialUpfront'?: string;
  '3_Convertible_AllUpfront'?: string;
};

declare type CostData = {
  timestamp: Date;
  trend: number;
  expected_upper: number;
  expected_lower: number;
  value: number;
};

declare type OptimizationRecommendDetail = {
  onDemand_price?: number;
  enhancedNetworkingSupported?: string;
  intelTurboAvailable?: string;
  memory?: number;
  dedicatedEbsThroughput?: string;
  vcpu?: number;
  capacitystatus?: string;
  locationType?: string;
  storage?: string;
  instanceFamily?: string;
  operatingSystem?: string;
  intelAvx2Available?: string;
  physicalProcessor?: string;
  clockSpeed?: string;
  ecu?: string;
  networkPerformance?: string;
  servicename?: string;
  instanceType?: string;
  tenancy?: string;
  usagetype?: string;
  normalizationSizeFactor?: string;
  intelAvxAvailable?: string;
  processorFeatures?: string;
  servicecode?: string;
  licenseModel?: string;
  currentGeneration?: string;
  preInstalledSw?: string;
  location?: string;
  processorArchitecture?: string;
  operation?: string;
  monthly_saving?: number;
  PerformanceRisk?: string;
  reserved_price?: RecommendedRIPrice;
};

declare type OptimizationRecommendItem = {
  RecommendType: string | null;
  PossibleSavings: number | null;
  Details?: OptimizationRecommendDetail;
};

declare type OptimizationRecommendType = Record<
  RecommendPeriod,
  Record<APMSource, Record<RecommendCategory, OptimizationRecommendItem>>
>;

declare type OptimizationEC2Info = {
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
  RecommendType?: ReadonlyArray<OptimizationRecommendDetail>;
  Tag?: ReadonlyArray<Record<string, unknown>>;
  CPUAverage?: ReadonlyArray<OptimizationAPMInfo>;
  CPUMax?: ReadonlyArray<OptimizationAPMInfo>;
  MemAverage?: ReadonlyArray<OptimizationAPMInfo>;
  MemMax?: ReadonlyArray<OptimizationAPMInfo>;
  MonthlyCost?: number;
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

declare type OptimizationEC2Coverage = {
  AccountId: string;
  CompanyId: string;
  Date: string;
  Details: string;
  InstanceId: string;
  InstanceType: string;
  LastMonthOnDemandCost: number;
  LastMonthOnDemandHours: number;
  LastMonthRICoverage: number;
  LastMonthReservedHours: number;
  LastMonthSavingsPlanCoverage: number;
  LastMonthSavingsPlanHours: number;
  LastUpdate: string;
  OnDemandCost: number;
  OnDemandHours: number;
  OperatingSystem: string;
  OrganizationId: null;
  RICoverage: number;
  Region: string;
  ReservedHours: number;
  SavingsPlanCoverage: number;
  SavingsPlanHours: number;
  Tag: ReadonlyArray<any>;
  Tenancy: string;
  TotalNormalizedUsage: number;
  TotalUsageHours: number;
  UID: string;
  UsageType: string;
};

declare type OptimizationEC2Utilization = {
  AccountId: string;
  CompanyId: string;
  Date: string;
  Details: string;
  InstanceId: string;
  InstanceType: string;
  LastMonthOnDemandCost: number;
  LastMonthOnDemandHours: number;
  LastMonthRICoverage: number;
  LastMonthReservedHours: number;
  LastMonthSavingsPlanCoverage: number;
  LastMonthSavingsPlanHours: number;
  LastUpdate: string;
  OnDemandCost: number;
  OnDemandHours: number;
  OperatingSystem: string;
  OrganizationId: null;
  RICoverage: number;
  Region: string;
  ReservedHours: number;
  SavingsPlanCoverage: number;
  SavingsPlanHours: number;
  Tag: ReadonlyArray<any>;
  Tenancy: string;
  TotalNormalizedUsage: number;
  TotalUsageHours: number;
  UID: string;
  UsageType: string;
};

declare type OptimizationDatatransfer = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  ProductName: string;
  FromLocation: string;
  ToLocation: string;
  TransferType: string;
  CurrentCost: number;
  Traffic: number;
};

declare type OptimizationRDSInfo = {
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
  RecommendType?: ReadonlyArray<OptimizationRecommendDetail>;
  Tag?: ReadonlyArray<Record<string, unknown>>;
  CPUAverage?: ReadonlyArray<OptimizationAPMInfo>;
  CPUMax?: ReadonlyArray<OptimizationAPMInfo>;
  MemAverage?: ReadonlyArray<OptimizationAPMInfo>;
  MemMax?: ReadonlyArray<OptimizationAPMInfo>;
  MonthlyCost?: number;
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

declare type OptimizationRDSCoverage = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  Date: string;
  Region: string;
  ResourceId: string;
  InstanceId: string;
  Tag: ReadonlyArray<any>;
  DatabaseEngine: string;
  InstanceType: string;
  DeploymentOption: string;
  SubscriptionId: string;
  LastMonthReservedHours: string;
  LastMonthOnDemandHours: string;
  LastMonthOnDemandCost: string;
  LastMonthCoverage: string;
  ReservedHours: number;
  OnDemandHours: number;
  OnDemandCost: number;
  Coverage: number;
  TotalUsageHours: number;
  TotalNormalizedUsage: number;
  Details: string;
};

declare type OptimizationRDSUtilization = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  Region: string;
  Date: string;
  InstanceType: string;
  DatabaseEngine: string;
  UsedNormalizedAmount: number;
  NormalizedPurchase: number;
  LastMonthUsedNormalizedAmount: number;
  LastMonthNormalizedPurchase: number;
  Utilization: number;
  LastUpdate: string;
};

declare type OptimizationRDSStorage = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  Tag: ReadonlyArray<any>;
  Region: string;
  InstanceId: string;
  ClusterId: string;
  DatabaseEngine: string;
  IOPS: number;
  AllocateStorage: number;
  StorageType: string;
  IOPSAverage: ReadonlyArray<OptimizationAPMInfo>;
  StorageSpaceAverage: ReadonlyArray<OptimizationAPMInfo>;
  IOPSMax: ReadonlyArray<OptimizationAPMInfo>;
  StorageSpaceMax: ReadonlyArray<OptimizationAPMInfo>;
  InstanceType: string;
  MonthlyCost: number;
  Hide: false;
  LastUpdate: string;
};

declare type OptimizationS3Information = {
  UID: string;
  Ages: {};
  LastModified: string;
  StorageClass: {};
  CostInfo: {};
  Under128KB: number;
  CompanyId: string;
  LastUpdate: string;
  MonthlySaving: number;
  BucketName: string;
  NumberOfObjects: number;
  Size: number;
  AccountId: number;
  Hide: boolean;
  SavingDetail: ReadonlyArray<any>;
};

declare type OptimizationEBSInfo = {
  UID: string;
  CompanyId: string;
  VolumeId: string;
  Tag: ReadonlyArray<any>;
  AccountName: string;
  AccountId: string;
  CurrentType: string;
  Size: number;
  State: string;
  IOPS: number;
  Throughput: number;
  MonthlyCost: number;
  IOPSAverage: ReadonlyArray<OptimizationAPMInfo>;
  IOPSMax: ReadonlyArray<OptimizationAPMInfo>;
  BandWidthAverage: ReadonlyArray<OptimizationAPMInfo>;
  BandWidthMax: ReadonlyArray<OptimizationAPMInfo>;
  UtilizationAverage: ReadonlyArray<OptimizationAPMInfo>;
  UtilizationMax: ReadonlyArray<OptimizationAPMInfo>;
  RecommendType: string;
  MonthlySaving: number;
  Recommend: ReadonlyArray<any>;
  ChangeType: string;
  ChangeSize: number;
  Hide: false;
  LastUpdate: string;
};

declare type OptimizationAnomaly = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  AccountName: string;
  Service: string;
  ResourceId: string;
  Region: string;
  Usage: string;
  AnomalySpend: number;
  DetectedDate: string;
  CostData: Array<CostData>;
  LastUpdate: string;
  EmailList: EmailList[];
  Duration: number;
};

declare type OptimizationAnomalyThreshold = {
  UID: string;
  CompanyId: string;
  AccountId: string;
  AccountName: string;
  Region: string;
  Threshold: number;
  Service: string;
  EmailList: AnomalyRecipient[];
  LastUpdate: Date;
  Threshold: number;
  Duration: number;
  Slack: boolean;
};

declare interface OptimizationAnomalyThresholdAutoComplete
  extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Service: ReadonlyArray<string>;
}

declare type OptimizationAnomalyOverview = {
  DetectedCount: number;
  AnomaliesSpend: number;
  Services: Record<
    string,
    {
      Cost: number;
      Duration: number;
    }
  >;
  TotalSpend: number;
};

declare type OptimizationAnomalyOverviewExtras = {
  Services: any[];
  TotalCases: number;
  TotalCost: number;
};

declare interface OptimizationAnomalyNotificationAutoComplete
  extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  AccountName: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  Service: ReadonlyArray<string>;
  Usage: ReadonlyArray<string>;
}

declare type AnomalyRecipient = {
  Name: string;
  Email: string;
};
