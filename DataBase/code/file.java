  import java.io.*;
  import java.util.*;
  
  class Main {
  
      public static void main(String[] args) {
          /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
          Scanner scanner = new Scanner(System.in);
          int x = scanner.nextInt();
          int result = (int)Math.sqrt(x);
          System.out.print(result);
      }
  }