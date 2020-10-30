import {Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderFilter' })
export class OrderFilter implements PipeTransform {
    transform(items: any[], sortBy: string): any[] {
        if (!items) {
            return [];
        }
        if (!sortBy) {
            return items;
        }
        sortBy = sortBy.toLocaleLowerCase();

        switch (sortBy) {
            case 'today':
                return items.filter(it => {
                    console.log(new Date())
                    let date1 = new Date(it.orderDate)
                    return date1  == new Date()
                });
            case 'week':
                return items.filter(it => {
                    return it.orderDate == new Date().getDate()
                });
            case 'month':
                return items.filter(it => {
                    return it.orderDate == new Date().getMonth()
                });
            case 'year':
                return items.filter(it => {
                    return it.orderDate == new Date().getFullYear
                });
            default:
                return items
        }
    }

}