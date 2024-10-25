class Stack {
    constructor(){
        this.items = [];
    }

    push(element){
        this.items.push(element);
    }

    pop(){
        if(this.isEmpty()){
            return 'Stack is empty';
        }
        return this.items.pop();
    }

    peek(){
        if(this.isEmpty()){
            return 'Stack is empty';
        }
        return this.items[this.items.length-1];
    }

    isEmpty(){
        return this.items.length === 0;
    }

    size(){
        return this.items.length;
    }

    clear(){
        this.items = [];
    }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek());
console.log(stack.pop());
console.log(stack.size());
console.log(stack.isEmpty());
stack.clear();
console.log(stack.isEmpty());


// Decimal to Binary conversion using Stack
function divideBy2(decNumber){
    var remStack = new Stack(), rem, binaryString = '';
    
    while (decNumber > 0){
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }

    while(!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}

console.log(divideBy2(1244));

// The Base Converter
// It work as a converter from decimal to any base. Instead of dividing the decimal number by 2, we can pass the desired base as
// an argument to the method and use it in the divisions,

function baseConverter(decNumber, base){
    var remStack = new Stack(), rem, baseString = '';
    digits = '0123456789ABCDEF';

    while (decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }

    while(!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    return baseString;
}

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));