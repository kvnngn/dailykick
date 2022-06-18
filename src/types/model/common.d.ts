declare enum UserRole {
  ROOT = 1,
  ADMIN = 2,
  USER = 3
}

declare enum NotificationLevel {
  All = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
  None = 10000
}

declare type AWSAccount = {
  accessKey: string;
  arn: string | null;
  assignedManagers: ReadonlyArray<any>;
  bucketName: string | null;
  companyId: string;
  curAccessKey: string | null;
  curSecretKey: string | null;
  dataType: 'GZIP';
  externalId: string | null;
  id: string;
  isPayer: boolean;
  linkedAccounts: ReadonlyArray<string>;
  needMoreLinked: boolean;
  name: string;
  options: { CloudWatch: boolean; CostExplorer: boolean };
  parentAccount: string | null;
  reportName: string | null;
  reportPrefix: string | null;
  secretKey: string | null;
  id: string;
  willDeleteAt: Date | null;
};

declare type User = {
  avatar: string;
  date: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  roles: string[];
  _id: string;
};

declare type Company = {
  anomalyNotificationLevel: number;
  apm: ReadonlyArray<APMSource>;
  creationDate: Date;
  curExists: boolean;
  deactivate: boolean;
  email: string;
  emailVerified: boolean;
  id: string;
  isDiagnosticRunning: boolean;
  isTrial: boolean;
  name: string;
  notificationLevel: NotificationLevel;
  paymentExtra: Record<string, unknown>;
  phone: string;
  pipeDriveOrganizationId: string | null;
  plan: string;
  runDiagnostic: boolean;
  stripeCustomerId: string | null;
  trialRemainingDays: number;
};

declare type LoginResponse = {
  userId: string;
  token: string;
  expiresPrettyPrint: string;
  expires: number;
};

declare type AssignedUser = {
  email: string;
  firstname: string;
  lastname: string;
  readOnly: boolean;
  isAdmin: boolean;
  id: string;
};
