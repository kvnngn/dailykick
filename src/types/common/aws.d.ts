declare type SupportedAWSRegion =
  | 'us-east-1'
  | 'us-east-2'
  | 'us-west-1'
  | 'us-west-2'
  | 'af-south-1'
  | 'ap-east-1'
  | 'ap-southeast-3'
  | 'ap-south-1'
  | 'ap-northeast-3'
  | 'ap-northeast-2'
  | 'ap-southeast-1'
  | 'ap-southeast-2'
  | 'ap-northeast-1'
  | 'ca-central-1'
  | 'eu-central-1'
  | 'eu-west-1'
  | 'eu-west-2'
  | 'eu-south-1'
  | 'eu-west-3'
  | 'eu-north-1'
  | 'me-south-1'
  | 'sa-east-1';

declare type EC2CaseId =
  | 'AWS-EC2-0002'
  | 'AWS-EC2-0003'
  | 'AWS-EC2-0009'
  | 'AWS-EC2-0019';

declare type RDSCaseId = 'AWS-RDS-0001' | 'AWS-RDS-0002' | 'AWS-RDS-0004';

declare type EBSCaseId =
  | 'AWS-EC2-EBS-0001'
  | 'AWS-EC2-EBS-0002'
  | 'AWS-EC2-EBS-0003'
  | 'AWS-EC2-EBS-0004'
  | 'AWS-EC2-EBS-0005'
  | 'AWS-EC2-EBS-0007'
  | 'AWS-EC2-EBS-0008'
  | 'AWS-EC2-EBS-0009';

declare type S3CaseId = 'AWS-S3-0001' | 'AWS-S3-0002';

declare type MiscellaneousCaseId =
  | 'AWS-EC2-0006'
  | 'AWS-EC2-0007'
  | 'AWS-EC2-0008'
  | 'AWS-EC2-0016'
  | 'AWS-EC2-0018'
  | 'AWS-GENERAL-0002';

declare type ActionCaseId =
  | 'AWS-EC2-0001'
  | 'AWS-EC2-0010'
  | 'AWS-EC2-0013'
  | 'AWS-EC2-0014'
  | 'AWS-EC2-0015'
  | 'AWS-EC2-0020'
  | 'AWS-EC2-0023'
  | 'AWS-EC2-0024'
  | 'AWS-Billing-0001'
  | 'AWS-Billing-0007'
  | 'AWS-Billing-0008';

declare type GeneralCaseId =
  | 'AWS-EC2-0011'
  | 'AWS-EC2-0012'
  | 'AWS-EC2-0021'
  | 'AWS-EC2-0022'
  | 'AWS-GENERAL-0001'
  | 'AWS-GENERAL-0003'
  | 'AWS-GENERAL-0004';

declare type NotificationCaseId = ActionCaseId | GeneralCaseId;

declare type RecommendPeriod = 'Days14' | 'Days30' | 'Days60';
declare type RecommendCategory = 'SavingsFirst' | 'StabilityFirst' | 'Chipset';
declare type EC2RecommendOption = 'SavingsFirst' | 'StabilityFirst' | 'Chipset';
