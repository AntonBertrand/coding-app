const languages = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "javascript",
    progress: 65,
    topics: [
      {
        id: "js-basics",
        title: "JavaScript Basics",
        description: "Learn the fundamental concepts of JavaScript programming",
        completed: false,
        questions: [
          {
            id: "js-basics-q1",
            text: "Which of the following is NOT a primitive data type in JavaScript?",
            options: [
              { id: "o1", text: "String" },
              { id: "o2", text: "Boolean" },
              { id: "o3", text: "Array" },
              { id: "o4", text: "Number" },
            ],
            correctOptionId: "o3",
          },
          {
            id: "js-basics-q2",
            text: "What will the following code output?",
            code: "console.log(typeof null);",
            options: [
              { id: "o1", text: "null" },
              { id: "o2", text: "object" },
              { id: "o3", text: "undefined" },
              { id: "o4", text: "string" },
            ],
            correctOptionId: "o2",
          },
          {
            id: "js-basics-q3",
            text: "Which operator is used for strict equality comparison in JavaScript?",
            options: [
              { id: "o1", text: "==" },
              { id: "o2", text: "===" },
              { id: "o3", text: "=" },
              { id: "o4", text: "!=" },
            ],
            correctOptionId: "o2",
          },
        ],
      },
      {
        id: "js-functions",
        title: "Functions & Scope",
        description:
          "Master JavaScript functions and understand variable scope",
        completed: true,
        questions: [
          {
            id: "js-functions-q1",
            text: "What is a closure in JavaScript?",
            options: [
              {
                id: "o1",
                text: "A function that has access to variables in its outer scope",
              },
              { id: "o2", text: "A way to close a browser window" },
              { id: "o3", text: "A method to terminate a loop" },
              { id: "o4", text: "A technique to hide HTML elements" },
            ],
            correctOptionId: "o1",
          },
          {
            id: "js-functions-q2",
            text: "What's the output of this code?",
            code: "const add = (a, b) => a + b;\nconsole.log(add(2, 3));",
            options: [
              { id: "o1", text: "5" },
              { id: "o2", text: "23" },
              { id: "o3", text: "undefined" },
              { id: "o4", text: "Error" },
            ],
            correctOptionId: "o1",
          },
        ],
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    icon: "python",
    progress: 30,
    topics: [
      {
        id: "py-basics",
        title: "Python Basics",
        description: "Get started with Python's syntax and core concepts",
        completed: true,
        questions: [
          {
            id: "py-basics-q1",
            text: "What is the correct way to create a variable in Python?",
            options: [
              { id: "o1", text: "var x = 5" },
              { id: "o2", text: "x := 5" },
              { id: "o3", text: "x = 5" },
              { id: "o4", text: "let x = 5" },
            ],
            correctOptionId: "o3",
          },
        ],
      },
    ],
  },
];

module.exports = { languages };
