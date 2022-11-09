import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'stringMethod'})
export class StringPipe implements PipeTransform {
    transform(str: string, method: string) {
        if (str.length === 0)
            return str;
        else {
            let result = '';
            switch(method) {
                case 'sort':
                    result = Array.from(str).sort().join('');
                    break;
                case 'reverse':
                    result = Array.from(str).reverse().join('');
                    break;
                default:
                    result = str;
            }
            return result;
        }
    }
}