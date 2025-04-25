export const projects = [
  {
    id: 1,
    title: "Automated Attendance System",
    description: "A comprehensive facial recognition-based attendance system designed to streamline the attendance tracking process in educational institutions and corporate environments. The system combines advanced computer vision technology with a user-friendly interface to provide an efficient and accurate attendance management solution.",
    problem: "Traditional attendance systems are time-consuming, prone to errors, and vulnerable to proxy attendance. Manual attendance tracking in large organizations leads to significant time wastage and administrative overhead. Additionally, paper-based systems are environmentally unfriendly and difficult to maintain long-term records.",
    solution: "Implemented a sophisticated facial recognition system using Python and OpenCV, integrated with a Flask backend and React frontend. The system captures real-time video feed, processes facial features using deep learning models, and automatically marks attendance in a secure database. Features include automated email notifications, attendance reports generation, and a dashboard for analytics.",
    experience: "The system has significantly reduced the time spent on attendance management by 85% and eliminated proxy attendance issues. Users appreciate the intuitive interface and real-time tracking capabilities. The solution has been successfully deployed in multiple institutions, serving over 1000 users daily with a 99.9% accuracy rate.",
    image: "/images/attendance.png",
    tags: ["Python", "OpenCV", "Flask", "React", "Deep Learning", "MongoDB"],
    source: "https://github.com/harshpatel-r/Automated-Attendance-System",
    demo: "https://attendance-system-demo.vercel.app"
  },
  {
    id: 2,
    title: "Task Management System",
    description: "A modern, feature-rich task management application built to help individuals and teams organize, track, and complete their projects efficiently. The system offers a comprehensive suite of project management tools while maintaining a clean and intuitive user interface.",
    problem: "Existing task management solutions often overwhelm users with complex features while lacking essential functionality for effective team collaboration. Many systems don't provide real-time updates and lack proper integration capabilities with other tools, leading to fragmented workflows.",
    solution: "Developed a full-stack application using the MERN stack (MongoDB, Express.js, React, Node.js) with real-time updates using Socket.IO. Implemented features like task categorization, priority levels, deadline tracking, team collaboration tools, and customizable project boards. The system includes robust authentication, role-based access control, and API integration capabilities.",
    experience: "The application has been well-received by users for its clean interface and powerful features. Teams report a 40% increase in productivity and better project visibility. The system currently serves over 500 active users and has processed more than 10,000 tasks successfully.",
    image: "/images/task.png",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Socket.IO", "Redux"],
    source: "https://github.com/harshpatel-r/Task-Management-System",
    demo: "https://task-system-demo.vercel.app"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform that provides a seamless shopping experience for both customers and administrators. The platform incorporates modern design principles and robust functionality to create an engaging online shopping environment.",
    problem: "Small and medium-sized businesses struggle with expensive, complex e-commerce solutions that often require significant technical expertise to maintain. Many existing platforms lack customization options and have limited integration capabilities with inventory management systems.",
    solution: "Created a scalable e-commerce solution using Next.js for the frontend and Node.js for the backend, with MongoDB as the database. Implemented features including product categorization, search functionality, shopping cart management, secure payment processing, order tracking, and an admin dashboard for inventory management. The platform includes analytics tools and automated email notifications.",
    experience: "The platform has enabled multiple businesses to establish their online presence effectively. Users praise the platform's speed, reliability, and ease of use. The system handles an average of 1000+ transactions monthly with a cart abandonment rate 30% lower than industry standards.",
    image: "/images/ecommerce.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux", "AWS"],
    source: "https://github.com/harshpatel-r/E-Commerce-Platform",
    demo: "https://ecommerce-platform-demo.vercel.app"
  }
]; 