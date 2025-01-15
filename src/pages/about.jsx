function About() {
    return (
        <div className="container mx-auto bg-gray-900">
            <div className="w-full mx-auto gap-4">
                <div className="p-4 w-3/4 mx-auto">

                    <h1 className="text-xl font-bold text-white mb-4 mt-4"
                        id="about">About</h1>

                    <p className="text-white">
                        ValoList is a web application that displays information about Valorant weapons and weapon skins. The application allows users to view weapon statistics, weapon skins, and weapon skin levels. Users can also view other weapon skins in the same theme.
                    </p>

                    <h1 className="text-xl font-bold text-white mb-4 mt-4"
                        id="why">Why Author Chose This Project</h1>

                    <p className="text-white">
                        The author chose this project to learn more about React and Tailwind CSS. The author also wanted to create a project that would be useful for Valorant players who want to view weapon statistics and weapon skins.
                    </p>

                    <h1 className="text-xl font-bold text-white mb-4 mt-4"
                        id="features">Features</h1>

                    <ul className="list-disc list-inside text-white">
                        <li>View weapon statistics</li>
                        <li>View weapon skins</li>
                        <li>View weapon skin levels</li>
                        <li>View other weapon skins in the same theme</li>
                    </ul>

                    <h1 className="text-xl font-bold text-white mb-4 mt-4"
                        id="technologies">Technologies</h1>

                    <ul className="list-disc list-inside text-white">
                        <li>React</li>
                        <li>JavaScript</li>
                        <li>Tailwind CSS</li>
                        <li>Jikan API</li>
                    </ul>

                    <h1 className="text-xl font-bold text-white mb-4 mt-4"
                        id="author">Author</h1>

                    <p className="text-white">
                        This project was created by <a href="https://www.linkedin.com/in/rafli-rizalfa" target="_blank" rel="noreferrer"
                            className="text-blue-500 hover:underline">Nino</a>.
                    </p>

                    <h1 className="text-xl font-bold text-white mb-4 mt-4"
                        id="source">Source Code</h1>

                    <p className="text-white">
                        The source code for this project is available on <a href="https://www.github.com/EnvRfli/ninolist" target="_blank" rel="noreferrer"
                            className="text-blue-500 hover:underline">GitHub</a>.
                    </p>
                </div>
            </div>
        </div >
    );
}

export default About;