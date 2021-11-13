export type LoginFormValues = {
    email: string;
    password: string;
};

export type StoveFormValues = {
    purchasePrice: number;
    stove: string;
    stoveBrand: string;
    purchasedAt: string;
};

export type SupplyFormValues = {
    deliveredQuantity: number;
    unitPrice: number;
    deliveryPrice: number;
    pelletBrand: string;
    purchasedAt: string;
};

export type ConsumptionFormValues = {
    quantity: number;
    comment?: string;
    supply: string;
};
