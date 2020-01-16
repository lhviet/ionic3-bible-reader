import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class Filter implements PipeTransform {
  transform(items: any, filter: any, isOptional = true): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (isOptional) {
        return items.filter(item =>
          filterKeys.reduce(
            (memo, keyName) => {
              const result = (memo || new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '';
              return result;
          }, false));
      }
      else {
        return items.filter(item =>
          filterKeys.reduce((memo, keyName) =>
          (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
      }
    } else {
      return items;
    }
  }
}
