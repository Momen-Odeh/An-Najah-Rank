import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

 class Main {
    int arraysize;
    int[][] data;
    int M = (int) Double.NEGATIVE_INFINITY;

    Main() {
        Scanner input = new Scanner(System.in);
        arraysize = Integer.parseInt(input.nextLine());
        data = new int[arraysize][arraysize];

        for (int i = 0; i < arraysize; i++) {
            String da = input.nextLine();
            String[] qq = da.split(",");

            for (int j = 0; j < qq.length; j++)
                data[i][j] = Integer.parseInt(qq[j]);
        }
    }

    int f(int i, int j) {
        if (i == arraysize - 1 && j == arraysize - 1) return data[i][j];

        int n1 = 0, n2 = 0;
        if (j < arraysize && i < arraysize) {
            n1 = data[i][j] + f(i, j + 1);
            n2 = data[i][j] + f(i + 1, j);
        }

        if (n1 < n2) return n2;
        else return n1;
    }

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Main. */
        Main sol = new Main();
        int Y = sol.f(0, 0);

        for (int i = 0; i < sol.arraysize; i++) {
            for (int j = 0; j < sol.arraysize; j++) {
                int ui = sol.f(i, j);
                if (ui > Y) Y = ui;
            }
        }

        System.out.println(Y);
    }
}