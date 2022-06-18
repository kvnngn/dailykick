declare type PricingTier =
  | 'Startup'
  | 'Growth'
  | 'Business'
  | 'Custom'
  | 'Free';

declare type PurchaseStatus = {
  Amount: number;
  Created: Date;
  Currency: string;
  CurrentPeriodEnd: Date;
  CurrentPeriodStart: Date;
  LatestInvoiceNumber: string;
  LatestInvoiceUrl: string;
  NextInvoiceDate: Date;
  PaymentMethod: string;
  PlanName: string;
  Status: string;
  UID: string;
};

declare type RecommendedTier = {
  IncommingFee: number;
  IncommingFeeWithTax: ReadonlyArray<{
    Country: string;
    IncommingFee: number;
    Percentage: number;
    TaxName: string;
    TaxUID: string;
  }>;
  LastMonthUsage: number;
  PlanDetails: {
    Amount: number;
    Created: Date;
    Currency: string;
    Description: string;
    Images: ReadonlyArray<string>;
    Interval: string;
    Metadata: { limit: string };
    Name: string;
    PriceId: string;
    StatementDescriptor: any;
    UID: string;
    UnitLabel: any;
    Updated: Date;
  };
  RecommendPlan: string;
};

declare type PromotionValidation = {
  Active: boolean;
  AssignedCustomer: any;
  CouponId: string;
  CouponName: string;
  Created: Date;
  Duration: string;
  DurationInMonths: any;
  MaxRedemptions: any;
  PercentOff: number;
  TimesRedeemed: number;
  UID: string;
};

declare type PaymentMethod = {
  UID: string;
  Brand: string;
  ExpireMonth: number;
  ExpireYear: number;
  IsDefault: boolean;
  Last4Digits: string;
  Name?: string;
  Created: Date;
};

declare type PaymentHistory = {
  UID: string;
  Amount: number;
  CardBrand: string;
  CardLast4Digits: string;
  Currency: string;
  InvoiceNumber: string;
  PaymentDate: Date;
  PaymentMethod: string;
  ReceiptUrl: string | null;
  Status: string;
};

declare type PaymentSubscription = {
  UID: string;
  Name: string;
  Amount: number;
  Currency: string;
  Interval: string;
  Description: string;
  PriceId: string;
  Created: Date;
  Updated: Date;
};
