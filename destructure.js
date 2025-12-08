// destructure

const num =[1,2,3,4,4];
const [a,b,c,d,f] =num;
console.log(a,b,c,d,f)

const [x,y,...rest]=num;
console.log(x,y)
console.log(rest)