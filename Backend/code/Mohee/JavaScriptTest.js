function processData(input) { 
  const [num1, num2] = input.split(' ').map(Number); 
  const sum = num1 + num2; 
  console.log(sum); 
} 
 process.stdin.resume(); 
process.stdin.setEncoding('ascii'); 
 _input = '';
 process.stdin.on('data', function (input) {
 _input += input;
 });
 process.stdin.on('end', function () {
 processData(_input.trim());
});