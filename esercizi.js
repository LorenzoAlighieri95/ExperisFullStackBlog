var s = "abcac";
var n = 10;
var counter = 0;
do {
  s = s+s
} while (s.length<n)
firstchar = s[0];
for (i=0; i<s.length; i++){
  if(s[i] === firstchar){
    counter++;
  }
}
console.log(counter)

var s = "abcac";
var n = 10;
var firstchar = s[0];
var m = Math.floor(n/s.length)
var counter = 0

for (var i = 0; i < s.length; i++){
  if (s[i]===firstchar){
    counter ++
  }
}

var result = counter * m
console.log(result)

var c = [0,0,1,0,0,0,0,1,0,0];
var currentStep = 1;
var jumps = 0;
for (var i = 0; i<c.length; i++){
  if (c[i]===0){
    if(i===currentStep+2){
      currentStep=i;
      jumps++;
    }
    if(i===currentStep+1){
      currentStep=i;
      jumps++;
    }
  }
}
console.log(jumps);