let str1 = "hello";
let str2 = "world";

// concat strings
console.log(str1.concat(" ", str2, "!"));  
// hello world!

// check if str1 contains "world"
console.log(str1.includes("world"));      
// false

// find index of "world" in str2
console.log(str2.indexOf("world"));       
// 0

// substring of str1 from index 0 to 3
console.log(str1.substring(0, 3));       
// hel
