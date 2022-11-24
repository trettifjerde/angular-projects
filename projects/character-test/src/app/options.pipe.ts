import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'filterOptions'})
export class OptionsFilterPipe implements PipeTransform {
    transform(options: {name: string, id: number}[], results: number[]) {
        return options.filter(o => results.includes(o.id))
    }
}