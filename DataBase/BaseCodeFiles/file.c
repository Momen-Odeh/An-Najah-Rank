#include <stdio.h>
  #include <string.h>
  #include <math.h>
  #include <stdlib.h>

  Node* insertNode(struct Node* head, int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->val = data;
    newNode->next = NULL;

    if (head == NULL) {
        return newNode;
    }

    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }

    current->next = newNode;
    return head;
  }

  int main() {
  
      /* Enter your code here. Read input from STDIN. Print output to STDOUT */    
      return 0;
  }