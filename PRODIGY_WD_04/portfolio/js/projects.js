const projects = [
    {
        title: "Shop-App",
        description: "A responsive shopping web app built using Java, HTML, CSS, JavaScript with cart and checkout functionalities.",
        link: "https://github.com/AMEY360/Shop-App"
    },
    {
        title: "C# Project",
        description: "A C# Windows Form Application demonstrating core concepts of desktop-based software development.",
        link: "https://github.com/AMEY360/Csharp-project"
    },
    {
        title: "EaseBanking - Online Banking System",
        description: "Java, JSP, MySQL | Features: Login, Transactions, Profile Management",
        link: "https://github.com/AMEY360/EaseBanking"
    },
    {
        title: "Tic-Tac-Toe Web App",
        description: "JavaScript, HTML, CSS | Modes: Player vs Player, Player vs AI",
        link: "https://github.com/AMEY360/TicTacToe"
    }
];

const container = document.getElementById('projects-container');

projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View on GitHub</a>
    `;

    container.appendChild(card);
});
