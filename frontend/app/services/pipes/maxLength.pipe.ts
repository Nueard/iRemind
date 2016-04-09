import {Pipe} from 'angular2/core';
 
@Pipe({
    name: 'maxLength'
})
export class MaxLengthPipe {
    transform(val, args) {
        let length = 30;
        if(args.length == 1) {
            length = args[0];
        }
        if (val && val.length > length){
            return val.substring(0, length)+'...';    
        }else{
            return val;
        }
    }
}