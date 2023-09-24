const Data = {
  descrition: `
  Sarutobi is a monkey. He likes eating banana. He is looking at a grid of NxN cells. In each cell there is a certain number of bananas. Different cells have different amounts. Some cells have negative number of Bananas as well!

Sarutobi can start from any cell he wants and then move in the grid in a series of jumps. In each jump he moves one cell, either down or to the right. In each jump he collects the value of bananas in the cell he visits. Everything ends when he goes off any of the edges of the gird.

Your job is to help Sarutobi collect the maximum number of bananas. Print this value as the output.

(hint: one way to solve this is by finding which cell among the NxN cells would result in Sarutobi gaining the maximum number of bananans over all)..
  `,
  inputFormat: `N (number of rows/cols for the grid) values of the grid cells row-wise seperated by commas`,
  Constraints: `No constraints`,
  outputFormat: "Max_Sum (maximum possible number of collected bananas)",
  //   sample Input
};
