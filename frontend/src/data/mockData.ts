
export interface Language {
  id: string;
  name: string;
  icon: string;
  progress: number; // 0-100
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  code?: string;
  options: Option[];
  correctOptionId: string;
}

export interface Option {
  id: string;
  text: string;
}

export const languages: Language[] = [
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
            id: "q1",
            text: "Which of the following is NOT a primitive data type in JavaScript?",
            options: [
              { id: "o1", text: "String" },
              { id: "o2", text: "Boolean" },
              { id: "o3", text: "Array" },
              { id: "o4", text: "Number" }
            ],
            correctOptionId: "o3"
          },
          {
            id: "q2",
            text: "What will the following code output?",
            code: "console.log(typeof null);",
            options: [
              { id: "o1", text: "null" },
              { id: "o2", text: "object" },
              { id: "o3", text: "undefined" },
              { id: "o4", text: "string" }
            ],
            correctOptionId: "o2"
          },
          {
            id: "q3",
            text: "Which operator is used for strict equality comparison in JavaScript?",
            options: [
              { id: "o1", text: "==" },
              { id: "o2", text: "===" },
              { id: "o3", text: "=" },
              { id: "o4", text: "!=" }
            ],
            correctOptionId: "o2"
          }
        ]
      },
      {
        id: "js-functions",
        title: "Functions & Scope",
        description: "Master JavaScript functions and understand variable scope",
        completed: true,
        questions: [
          {
            id: "q1",
            text: "What is a closure in JavaScript?",
            options: [
              { id: "o1", text: "A function that has access to variables in its outer scope" },
              { id: "o2", text: "A way to close a browser window" },
              { id: "o3", text: "A method to terminate a loop" },
              { id: "o4", text: "A technique to hide HTML elements" }
            ],
            correctOptionId: "o1"
          },
          {
            id: "q2",
            text: "What's the output of this code?",
            code: "const add = (a, b) => a + b;\nconsole.log(add(2, 3));",
            options: [
              { id: "o1", text: "5" },
              { id: "o2", text: "23" },
              { id: "o3", text: "undefined" },
              { id: "o4", text: "Error" }
            ],
            correctOptionId: "o1"
          }
        ]
      },
      {
        id: "js-objects",
        title: "Objects & Classes",
        description: "Work with JavaScript objects and learn OOP principles",
        completed: false,
        questions: [
          {
            id: "q1",
            text: "Which keyword is used to create a new object in JavaScript?",
            options: [
              { id: "o1", text: "create" },
              { id: "o2", text: "object" },
              { id: "o3", text: "new" },
              { id: "o4", text: "instance" }
            ],
            correctOptionId: "o3"
          },
          {
            id: "q2",
            text: "What does the following code create?",
            code: "class Person {\n  constructor(name) {\n    this.name = name;\n  }\n}",
            options: [
              { id: "o1", text: "A function" },
              { id: "o2", text: "A class definition" },
              { id: "o3", text: "An object instance" },
              { id: "o4", text: "A Person variable" }
            ],
            correctOptionId: "o2"
          },
          {
            id: "q3",
            text: "Which of the following correctly creates an object in JavaScript?",
            options: [
              { id: "o1", text: "const obj = Object.create();" },
              { id: "o2", text: "const obj = {name: 'John', age: 30};" },
              { id: "o3", text: "const obj = [name: 'John', age: 30];" },
              { id: "o4", text: "const obj = makeObject(name: 'John', age: 30);" }
            ],
            correctOptionId: "o2"
          },
          {
            id: "q4",
            text: "What is the output of this code?",
            code: "const person = {\n  name: 'Alice',\n  greet() {\n    return `Hello, ${this.name}`;\n  }\n};\nconsole.log(person.greet());",
            options: [
              { id: "o1", text: "Hello, Alice" },
              { id: "o2", text: "Hello, undefined" },
              { id: "o3", text: "Hello, ${this.name}" },
              { id: "o4", text: "Error: this is not defined" }
            ],
            correctOptionId: "o1"
          },
          {
            id: "q5",
            text: "Which method is used to get all keys of an object?",
            options: [
              { id: "o1", text: "Object.keys()" },
              { id: "o2", text: "Object.values()" },
              { id: "o3", text: "Object.entries()" },
              { id: "o4", text: "Object.getKeys()" }
            ],
            correctOptionId: "o1"
          },
          {
            id: "q6",
            text: "What is the correct way to access the property 'age' of an object 'person'?",
            options: [
              { id: "o1", text: "person[age]" },
              { id: "o2", text: "person->age" },
              { id: "o3", text: "person.age" },
              { id: "o4", text: "person::age" }
            ],
            correctOptionId: "o3"
          },
          {
            id: "q7",
            text: "Which of the following is NOT a valid way to create a class instance?",
            options: [
              { id: "o1", text: "const obj = new MyClass();" },
              { id: "o2", text: "let obj = Object.create(MyClass.prototype);" },
              { id: "o3", text: "var obj = MyClass.constructor();" },
              { id: "o4", text: "const obj = MyClass();" }
            ],
            correctOptionId: "o3"
          },
          {
            id: "q8",
            text: "What keyword is used to inherit from a class in JavaScript?",
            options: [
              { id: "o1", text: "inherits" },
              { id: "o2", text: "extends" },
              { id: "o3", text: "implements" },
              { id: "o4", text: "prototype" }
            ],
            correctOptionId: "o2"
          },
          {
            id: "q9",
            text: "What does this code output?",
            code: "class Animal {\n  speak() {\n    return 'Animal speaks';\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    return 'Dog barks';\n  }\n}\n\nconst dog = new Dog();\nconsole.log(dog.speak());",
            options: [
              { id: "o1", text: "Animal speaks" },
              { id: "o2", text: "Dog barks" },
              { id: "o3", text: "undefined" },
              { id: "o4", text: "Error" }
            ],
            correctOptionId: "o2"
          },
          {
            id: "q10",
            text: "Which statement about JavaScript prototypes is correct?",
            options: [
              { id: "o1", text: "Prototypes can only be used with ES6 classes" },
              { id: "o2", text: "Prototypes are used for implementing inheritance" },
              { id: "o3", text: "Every object can have only one prototype" },
              { id: "o4", text: "Prototypes cannot be modified after object creation" }
            ],
            correctOptionId: "o2"
          }
        ]
      }
    ]
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
            id: "q1",
            text: "What is the correct way to create a variable in Python?",
            options: [
              { id: "o1", text: "var x = 5" },
              { id: "o2", text: "x := 5" },
              { id: "o3", text: "x = 5" },
              { id: "o4", text: "let x = 5" }
            ],
            correctOptionId: "o3"
          }
        ]
      },
      {
        id: "py-data-structures",
        title: "Data Structures",
        description: "Learn about Python lists, dictionaries, tuples, and sets",
        completed: false,
        questions: [
          {
            id: "q1",
            text: "Which of these is a mutable data structure in Python?",
            options: [
              { id: "o1", text: "Tuple" },
              { id: "o2", text: "String" },
              { id: "o3", text: "List" },
              { id: "o4", text: "Frozen Set" }
            ],
            correctOptionId: "o3"
          }
        ]
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    icon: "java",
    progress: 10,
    topics: [
      {
        id: "java-basics",
        title: "Java Fundamentals",
        description: "Learn Java syntax, data types, and control structures",
        completed: true,
        questions: [
          {
            id: "q1",
            text: "Which keyword is used to define a class in Java?",
            options: [
              { id: "o1", text: "class" },
              { id: "o2", text: "struct" },
              { id: "o3", text: "define" },
              { id: "o4", text: "object" }
            ],
            correctOptionId: "o1"
          }
        ]
      },
      {
        id: "java-oop",
        title: "Object-Oriented Programming",
        description: "Master Java's OOP features including inheritance and polymorphism",
        completed: false,
        questions: [
          {
            id: "q1",
            text: "Which access modifier makes a method accessible only within its own class?",
            options: [
              { id: "o1", text: "public" },
              { id: "o2", text: "protected" },
              { id: "o3", text: "private" },
              { id: "o4", text: "default" }
            ],
            correctOptionId: "o3"
          }
        ]
      }
    ]
  },
  {
    id: "react",
    name: "React",
    icon: "react",
    progress: 45,
    topics: [
      {
        id: "react-basics",
        title: "React Fundamentals",
        description: "Learn the basic concepts of React and component structure",
        completed: true,
        questions: [
          {
            id: "q1",
            text: "What function is used to update state in functional components?",
            options: [
              { id: "o1", text: "this.setState()" },
              { id: "o2", text: "useState()" },
              { id: "o3", text: "setState()" },
              { id: "o4", text: "updateState()" }
            ],
            correctOptionId: "o2"
          }
        ]
      },
      {
        id: "react-hooks",
        title: "React Hooks",
        description: "Understand and implement React's built-in hooks",
        completed: false,
        questions: [
          {
            id: "q1",
            text: "Which hook would you use to perform side effects in a component?",
            options: [
              { id: "o1", text: "useContext" },
              { id: "o2", text: "useState" },
              { id: "o3", text: "useEffect" },
              { id: "o4", text: "useReducer" }
            ],
            correctOptionId: "o3"
          }
        ]
      }
    ]
  }
];

// Function to get a single language by ID
export const getLanguage = (id: string): Language | undefined => {
  return languages.find(lang => lang.id === id);
};

// Function to get a single topic by ID
export const getTopic = (languageId: string, topicId: string): Topic | undefined => {
  const language = getLanguage(languageId);
  if (!language) return undefined;
  return language.topics.find(topic => topic.id === topicId);
};
