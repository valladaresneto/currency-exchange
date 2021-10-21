export class CurrencyEntity {
    code: string;
    codein: string;
    name: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string
}

export class CurrencyOption {
    code: string;
    name: string;

    public constructor(init?:Partial<CurrencyOption>) {
        Object.assign(this, init);
    }
}