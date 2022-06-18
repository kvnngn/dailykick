declare type OnboardCheckListKey =
  | 'Login'
  | 'S3'
  | 'EC2'
  | 'CUR'
  | 'EBS'
  | 'DLM'
  | 'RDS'
  | 'CloudWatch'
  | 'RI'
  | 'SP';

declare type FromCliResponse = {
  Arn: string;
  Created: Date;
  LastUpdated: Date;
  UserId: string;
};

declare type DiagnosticResultKey =
  | 'EC2RightSizing'
  | 'EC2PricingPlan'
  | 'EC2Generation'
  | 'RDSRightSizing'
  | 'RDSPricingPlan'
  | 'RDSGeneration'
  | 'RDSStorage'
  | 'EBSUnusedVolume'
  | 'EBSVolumeType'
  | 'MiscUnusedResource';

declare type DiagnosticResponse = Record<
  DiagnosticResultKey,
  {
    IsDone: boolean;
    ActionItems: number;
    PossibleSavings: number;
    ScannedResources: number;
  }
>;
