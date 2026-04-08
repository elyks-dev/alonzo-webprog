const articles = [
  {
    name: "getting-started-with-react",
    title: "Getting Started with React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop",
    content: [
      "React is a JavaScript library for building user interfaces, developed by Meta.",
      "It uses a component-based architecture, making UI development modular and reusable.",
      "Example:\nfunction App() {\n  return <h1>Hello, React!</h1>;\n}",
      "React's virtual DOM efficiently updates only the parts of the UI that change."
    ]
  },
  {
    name: "understanding-tailwind-css",
    title: "Understanding Tailwind CSS",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&auto=format&fit=crop",
    content: [
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.",
      "Instead of writing custom CSS, you apply pre-defined classes directly in your HTML.",
      "Example: <div className=\"flex items-center justify-center bg-blue-500 p-4\">",
      "Tailwind promotes consistency and speeds up development significantly."
    ]
  },
  {
    name: "javascript-es6-features",
    title: "JavaScript ES6 Features",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop",
    content: [
      "ES6 introduced many powerful features to modern JavaScript development.",
      "Arrow functions, destructuring, and template literals simplify code greatly.",
      "Example:\nconst greet = (name) => `Hello, ${name}!`;",
      "Modules (import/export) allow cleaner code organization across files."
    ]
  },
  {
    name: "intro-to-nodejs",
    title: "Introduction to Node.js",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop",
    content: [
      "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
      "It allows developers to run JavaScript on the server side.",
      "Example:\nconst http = require('http');\nhttp.createServer((req, res) => res.end('Hello!')).listen(3000);",
      "Node.js is non-blocking and event-driven, making it great for scalable applications."
    ]
  },
  {
    name: "git-and-version-control",
    title: "Git and Version Control",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop",
    content: [
      "Git is a distributed version control system for tracking changes in code.",
      "It allows teams to collaborate, branch, and merge code efficiently.",
      "Example:\ngit init\ngit add .\ngit commit -m 'Initial commit'",
      "Platforms like GitHub and GitLab host repositories and enable team workflows."
    ]
  }
];

export default articles;