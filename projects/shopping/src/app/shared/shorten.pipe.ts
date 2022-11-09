import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number=70) {
        if (value.length > 100)
            return value.substr(0, limit) + '...';
        else
            return value;
    }
}