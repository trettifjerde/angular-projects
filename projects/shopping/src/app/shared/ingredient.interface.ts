export class Ingredient {
    public name: string;
    public amount: number;
    public unit: string;
    public id: string;

    constructor(info?: {name?: string, amount?: number, unit?: string, id?: string}) {
        this.name = info?.name? info.name : null;
        this.amount = info?.amount? info.amount : null;
        this.unit = info?.unit? info.unit : null;
        this.id = info?.id? info.id : null;
    }
}

export class IngredientRaw {
    public name: string;
    public amount: number;
    public unit: string;

    constructor(info?: {name?: string, amount?: number, unit?: string}) {
        this.name = info?.name? info.name : null;
        this.amount = info?.amount? info.amount : null;
        this.unit = info?.unit? info.unit : null;
    }

}