type OverviewSupportedService =
  | 'Amazon Elastic Compute Cloud'
  | 'Amazon Relational Database Service'
  | 'Amazon Simple Storage Service'
  | 'Others';

declare type OverviewSummary = {
  MonthlyPossibleSavingCost: number;
  TotalPossiblSavingCost: number;
  TotalPossibleSavingActions: number;
};

declare type CostOverviewResponse = {
  date: Date;
} & Record<OverviewSupportedService, number>;

declare type CostComparisonResponse = {
  From?: CostOverviewResponse;
  To?: CostOverviewResponse;
};

declare type CostComparisonExtra = {
  MarketPlaceItems: Array<string>;
  Services: Array<string>;
};

declare type MonthToDateResponse = {
  LastUsageResults: Array<{ Date: Date; Cost: number }>;
  UsageResults: Array<{ Date: Date; Cost: number }>;
  ForecastResults: Array<{ Date: Date; Cost: number }>;
};

declare type MonthToDateExtra = {
  LastMonth: Date;
  Now: Date;
};

declare type PossibleSavingsKey =
  | 'Total'
  | 'Utilization'
  | 'PurchasingOptions'
  | 'UnusedResources'
  | 'Others';

declare type PossibleSavings = Record<
  PossibleSavingsKey,
  ReadonlyArray<IntelligenceItem>
>;

declare type PossibleSavingsExtra = {
  LatestUpdate: Date;
  Others: number;
  PurchasingOptions: number;
  Total: number;
  UnusedResources: number;
  Utilization: number;
};

declare interface ActionRequiredItem extends IntelligenceItem {
  CaseId: ActionCaseId;
}

declare interface GeneralAlertItem extends IntelligenceItem {
  CaseId: GeneralCaseId;
}

declare type Notifications = {
  ActionRequired: Array<ActionRequiredItem>;
  GeneralAlert: Array<GeneralAlertItem>;
};
