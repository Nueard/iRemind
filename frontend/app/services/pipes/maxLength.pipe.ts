import {Pipe} from 'angular2/core';
 
@Pipe({
    name: 'maxLength'
})
export class MaxLengthPipe {
    transform(val, args) {
        if (val.length > 30){
            return val.substring(0, 30)+'...';    
        }else{
            return val;
        }
    }
}