export class Ingredient {
    public name: string;
    public amount: number;
    public unit: string;
    public id: string;

    constructor(info?: {name?: string, amount?: number, unit?: string, id?: string}) {
        this.amount = info?.amount? info.amount : null;
        this.id = info?.id? info.id : null;
        const nameTrimmed = info?.name?.trim();
        const unitTrimmed = info?.unit?.trim();
        this.name = nameTrimmed ? nameTrimmed : null;
        this.unit = unitTrimmed ? unitTrimmed : null;
    }
}

export class IngredientRaw {
    public name: string;
    public amount: number;
    public unit: string;

    constructor(info?: {name?: string, amount?: number, unit?: string}) {
        const nameTrimmed = info?.name?.trim();
        const unitTrimmed = info?.unit?.trim();
        this.name = nameTrimmed ? nameTrimmed : null;
        this.amount = info?.amount? info.amount : null;
        this.unit = unitTrimmed ? unitTrimmed : null;
    }

}