import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        int[][] arr = new int[n][n];
        int[] arr1 = new int[n * n];
        int h = 0;

        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                arr[i][j] = arr1[h];
                h++;
            }

        int max = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                max = Math.max(max, f(i, j));
            }

        System.out.println(max);
    }

    static int f(int i, int j) {
        // Your implementation of f function here
        return 0;
    }
}