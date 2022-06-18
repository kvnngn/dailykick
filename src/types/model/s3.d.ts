declare type S3StdObjectDays = '7days' | '30days' | '60days' | '90days';

declare type S3Information = {
  AccountId: string;
  Ages: Record<S3StdObjectDays, Record<string, { size: number; cost: number }>>;
  BucketName: string;
  CompanyId: string;
  CostInfo: Record<string, unknown>;
  Hide: boolean;
  LastModified: Date;
  LastUpdate: Date;
  MonthlySaving: number;
  NumberOfObjects: number;
  SavingDetail: ReadonlyArray<{
    count: number;
    savingCost: number;
    size: number;
    term: S3StdObjectDays;
  }>;
  Size: number;
  StorageClass: Record<string, number>;
  UID: string;
  Under128KB: number;
};

declare type S3Chart = {
  Date: Date;
  StorageCost: number;
  TransferCost: number;
};

declare interface S3AutoComplete extends AutoCompleteData {
  AccountId: ReadonlyArray<string>;
  BucketName: ReadonlyArray<string>;
  Status: ReadonlyArray<string>;
}

declare type S3DetailsGeneral = {
  AccountId: string;
  BucketName: string;
  Cost: number;
  LastModified: string;
  Objects: number;
  Size: number;
};

declare type S3DetailsAnnualCost = {
  'API Request': number;
  'Data Transfer': number;
  Date: string;
  Storage: number;
};

declare type S3DetailsStandardAges = {
  '30days': {
    size: number;
    count: number;
  };
  '90days': {
    size: number;
    count: number;
  };
};

declare interface S3Intelligence extends IntelligenceItem {
  CaseId: S3CaseId;
}

declare type S3DetailsSummary = {
  AnnualCost: S3DetailsAnnualCost[];
  RecommendActions: Array<S3Intelligence>;
  StandardAges: ReadonlyArray<S3DetailsStandardAges>;
};

declare type S3DetailsSummaryExtras = {
  ThisMonth: {
    'API Request': number;
    'Data Transfer': number;
    'S3 Lambda': number;
    Management: number;
    Replication: number;
    Total: number;
    Storage: number;
  };
};
