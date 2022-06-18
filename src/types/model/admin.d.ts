declare type DiscountType = {
  CouponId: string;
  CouponName: string;
  PercentOff: number;
  Duration: string;
  DurationInMonths: number;
  MaxRedemptions: number;
  TimesRedeemed: number;
  Created: string;
};

declare type CouponType = {
  UID: string;
  Name: string;
  Duration: string;
  DurationInMonths: number;
  PercentOff: number;
  Valid: true;
  Created: string;
};

declare type PromotionType = {
  UID: string;
  CouponId: string;
  CouponName: string;
  Code: string;
  PercentOff: number;
  Duration: string;
  DurationInMonths: number;
  AssignedCustomer: string;
  Active: false;
  MaxRedemptions: number;
  TimesRedeemed: number;
  Created: string;
};

declare type SubscriptionType = {
  UID: string;
  CompanyId: string;
  CompanyName: string;
  PlanName: string;
  Status: string;
  Created: string;
  CurrentPeriodStart: string;
  CurrentPeriodEnd: string;
  Amount: number;
  Currency: string;
  PaymentMethod: string;
  NextInvoiceDate: string;
  Discount: DiscountType;
};
