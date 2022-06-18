declare type EBSInformation = {
  AccountId: string;
  AccountName: string;
  BandWidthAverage: readonly [{ cloudwatch: number | null }];
  BandWidthMax: readonly [{ cloudwatch: number | null }];
  ChangeSize: string;
  ChangeType: string;
  CompanyId: string;
  CurrentType: string;
  Hide: boolean;
  IOPS: number;
  IOPSAverage: readonly [{ cloudwatch: number | null }];
  IOPSMax: readonly [{ cloudwatch: number | null }];
  InstanceId: string;
  LastUpdate: Date;
  MonthlyCost: number;
  MonthlySaving: string;
  Recommend: ReadonlyArray<any>;
  RecommendType: string;
  Region: string;
  Size: number;
  State: string;
  Tag: ReadonlyArray<Record<string, string>>;
  Throughput: number;
  UID: string;
  UtilizationAverage: readonly [{ cloudwatch: number | null }];
  UtilizationMax: readonly [{ cloudwatch: number | null }];
  VolumeId: string;
};

declare type EBSChart = {
  Date: Date;
  gp2?: number;
  gp3?: number;
  io2?: number;
} & Record<string, number>;

declare interface EBSAutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  Region: ReadonlyArray<string>;
  CurrentType: ReadonlyArray<string>;
  InstanceId: ReadonlyArray<string>;
  State: ReadonlyArray<string>;
  Tag: ReadonlyArray<Record<string, string>>;
  VolumeId: ReadonlyArray<string>;
}

declare type EBSDetailsGeneral = {
  AccountId: string;
  AccountName: string;
  Ack: boolean;
  AutoScale: boolean;
  CPUAverage: Array<Record<APMSource, number | null>>;
  CPUMax: Array<Record<APMSource, number | null>>;
  ChangeType: string;
  CompanyId: string;
  VolumeType: string;
  Hide: boolean;
  InstanceFamily: string;
  VolumeId: string;
  State: string;
  Size: number;
  PorvisionedIOPS: number;
  Cost: number;
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

declare type EBSDetailsAnnualUsage = {
  Date: string;
  Cost: number;
};

declare type EBSDetailsStandardAges = {
  '30days': {
    size: number;
    count: number;
  };
  '90days': {
    size: number;
    count: number;
  };
};

declare interface EBSIntelligence extends IntelligenceItem {
  CaseId: EBSCaseId;
}

declare type EBSDetailsSummary = {
  AnnualUsage: EBSDetailsAnnualUsage[];
  RecommendActions: Array<EBSIntelligence>;
  UsageDetails: {
    BandWidthAverage: number;
    BandWidthMax: number;
    IOPSAverage: number;
    IOPSMax: number;
    UtilizationAverage: number;
    UtilizationMax: number;
  };
};
