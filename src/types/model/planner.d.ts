declare type PaymentOption = 'All Upfront' | 'Partial Upfront' | 'No Upfront';

type DefaultCoverageItem = {
  NormalizedOndemandUsage: number;
  NormalizedReservedUsage: number;
  NoramlizedSavingsPlanUsage: number;
};

declare type RICoverageItem = DefaultCoverageItem & {
  NormalizedReservedOverUse: number;
};

declare type SPCoverageItem = DefaultCoverageItem & {
  NormalizedSavingsPlanOverUse: number;
};

declare type PurchasingType = 'ReservedInstance' | 'SavingsPlan';

declare type RIRecommend = {
  Type: 'ReservedInstance';
  Cost: number;
  Coverage: RICoverageItem;
  ChangedMonthlyCost: number;
  CostSaving: number;
  NumberOfRI: number;
  PurchaseOption: {
    InstanceType: string;
    DurationSeconds: 94608000 | 31536000;
    UpfrontFee: number;
    OfferingClass: 'standard' | 'convertible';
    PaymentOption: PaymentOption;
    Rate: number;
    NumberOfRI: number;
  };
};

declare type SPRecommend = {
  Type: 'SavingsPlan';
  Commitment: number;
  Coverage: SPCoverageItem;
  ChangedMonthlyCost: number;
  CostSaving: number;
  PurchaseOption: {
    PlanType: 'EC2Instance' | 'Compute';
    DurationSeconds: 94608000 | 31536000;
    PaymentOption: PaymentOption;
    Rate: number;
    MultiplyFactor: number;
    UpFrontFee: number;
  };
};

declare type RecommendPricingPlan = Record<
  'Aggressive' | 'Passive',
  RIRecommend | SPRecommend
>;

declare type RIGuide = {
  ChangedMonthlyCost: number;
  Cost: number;
  CostPerUnit: number;
  CostSaving: number;
  Coverage: RICoverageItem;
  Duration: 1 | 3;
  InstanceType: string;
  NumberOfRI: number;
  OfferingClass: 'standard' | 'convertible';
  PaymentOption: PaymentOption;
  Rate: number;
  UpFrontFee: number;
};

declare type SPGuide = {
  ChangedMonthlyCost: number;
  Commitment: number;
  CostPerUnit: number;
  CostSaving: number;
  Coverage: SPCoverageItem;
  Duration: 1 | 3;
  MultiplyFactor: number;
  PaymentOption: PaymentOption;
  PlanType: 'EC2Instance' | 'Compute';
  Rate: number;
  UpFrontFee: number;
};

declare type SimulationGeneral = {
  AccountId: string;
  FamilyCoverage: Array<{
    Date: Date;
    Ondemand: number;
    Reserved: number;
    SavingsPlan: number;
    TotalUsage: number;
  }>;
  InstanceCoverage: {
    NormalizedOndemandUsage: number;
    NormalizedReservedUsage: number;
    NormalizedSavingsPlanUsage: number;
    Ondemand: number;
    OndemandCost: number;
    OndemandCostPerHour: number;
    OndemandUnitPerHour: number;
    Reserved: number;
    ReservedCost: number;
    ReservedCostPerHour: number;
    ReservedUnitPerHour: number;
    SavingsPlan: number;
    SavingsPlanCost: number;
    SavingsPlanCostPerHour: number;
    SavingsPlanUnitPerHour: number;
    TotalCost: number;
    TotalNormalizedUsage: number;
    TotalUsage: number;
  };
  Recommendation: RecommendPricingPlan;
  SelectedInstance: {
    InstanceFamily: string;
    Platform: string;
    Region: string;
    Tenancy: string;
    TotalComputeHours: number;
    TotalInstanceCount: number;
  };
  UncoveredInstances: Record<
    string,
    {
      Cost: number;
      CostPerHour: number;
      Count: number;
      UsageAmount: number;
      Utilization: number;
    }
  >;
};

declare type SimulationRecommend = {
  ReservedInstance: Array<RIGuide>;
  SavingsPlan: Array<SPGuide>;
};

declare type RIDiscountProgram = {
  DiscountProgram: 'reserved';
  Type: 'standard' | 'convertible';
  NumberValue: number;
  PaymentOption: PaymentOption;
  Duration: 1 | 3;
  SimulateInstanceType: string;
};

declare type SPDiscountProgram = {
  DiscountProgram: 'savingsplan';
  Type: 'EC2Instance' | 'Compute';
  NumberValue: number;
  PaymentOption: PaymentOption;
  Duration: 1 | 3;
};

declare type SimulationRequest = {
  InstanceId: string;
  DiscountProgram: RIDiscountProgram | SPDiscountProgram;
};

declare type RISimulated = {
  TotalUsage: number;
  OndemandCost: number;
  ReservedCost: number;
  SavingsPlanCost: number;
  TotalCost: number;
  NormalizedOndemandUsage: number;
  NormalizedReservedUsage: number;
  NormalizedSavingsPlanUsage: number;
  TotalNormalizedUsage: number;
  NormalizedOverUse: number;
  OverUseCost: number;
  SimulatedRate: number;
  SimulatedUnits: number;
  SimulatedInstanceType: string;
  NeedUnits: number;
  UpfrontFee: number;
};

declare type SPSimulated = {
  Ondemand: number;
  Reserved: number;
  SavingsPlan: number;
  TotalUsage: number;
  OndemandCost: number;
  ReservedCost: number;
  SavingsPlanCost: number;
  TotalCost: number;
  NormalizedOndemandUsage: number;
  NormalizedReservedUsage: number;
  NormalizedSavingsPlanUsage: number;
  TotalNormalizedUsage: number;
  OverUseUsageAmount: number;
  NormalizedOverUse: number;
  OverUseCost: number;
  NeedCommitment: number;
  SimulatedCommitment: number;
  UpfrontFee: number;
};

declare type SimulationResult = {
  CurrentUsage: {
    Ondemand: number;
    Reserved: number;
    SavingsPlan: number;
    TotalUsage: number;
    OndemandCost: number;
    ReservedCost: number;
    SavingsPlanCost: number;
    TotalCost: number;
    NormalizedOndemandUsage: number;
    NormalizedReservedUsage: number;
    NormalizedSavingsPlanUsage: number;
    TotalNormalizedUsage: number;
  };
  SimulatedUsage: RISimulated | SPSimulated;
};

declare type PurchaseRIRequest = {
  InstanceType: string;
  OperatingSystem: string;
  Term: 1 | 3;
  Tenancy: string;
  OfferingClass: 'standard' | 'convertible';
  PaymentOption: PaymentOption;
  NumberOfRI: number;
};

declare type PurchaseSPRequest = {
  SPType: 'EC2Instance' | 'Compute';
  Term: 1 | 3;
  Region: string;
  Tenancy: string;
  PaymentOption: PaymentOption;
  OperatingSystem: string;
  InstanceFamily: string;
  Commitment: number;
  UpfrontFee: number;
};

declare type PurchaseRIResponse = {
  CurrencyCode: 'USD';
  Duration: number;
  FixedPrice: number;
  InstanceType: string;
  NumberOfRI: number;
  OfferingClass: 'standard' | 'convertible';
  PurchaseResult: {
    ReservedInstancesId: string;
  };
  RecurringCharges: number;
  ReservedInstancesOfferingId: string;
};

declare type PurchaseSPResponse = {
  Commitment: number;
  OfferingId: string;
  PaymentOption: PaymentOption;
  PurchaseResult: {
    savingsPlanId: string;
  };
};

declare type PlannerChartInfo = {
  InstanceFamily: string;
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

declare type PlannerChart = {
  Coverage: {
    Ondemand: number;
    Reserved: number;
    SavingsPlan: number;
    Total: number;
  };
  ReservedIntance: Array<PlannerChartInfo>;
  SavingsPlan: Array<PlannerChartInfo>;
  UncoveredInstance: Array<PlannerChartInfo>;
};
