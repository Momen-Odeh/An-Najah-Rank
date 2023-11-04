#include <stdio.h>
 int main() { 
 char input[256]; 
 printf("Enter some text: "); 
 fgets(input, sizeof(input), stdin); 
 printf("You entered: %s", input); 
 return 0;}
