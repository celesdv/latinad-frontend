function LandingPage() {
    return (
        <div className="p-4 h-[calc(100vh-70px)]">
            <h3 className="text-4xl text-center text-sky-700 tracking-wide">
                <span className="text-neutral-800">LATIN<span className="font-bold">AD</span></span> Challenge
            </h3>
            <div className="md:flex p-6 gap-4">
                <article className="w-full md:grow bg-sky-800 text-neutral-100 shadow p-6 rounded-lg max-h-[13rem] md:max-h-[28rem] overflow-y-auto">
                    <div className="flex flex-col space-y-2 text-justify">
                        <p>
                            El desafío consiste en desarrollar una pequeña aplicación web para
                            administrar las pantallas publicitarias de la plataforma LatinAd.
                            La aplicación debe cumplir con una serie de requisitos funcionales
                            y no funcionales:
                        </p>
                        <h4 className="text-lg font-semibold text-sky-300">
                            Requisitos Funcionales:
                        </h4>
                        <ul className="list-disc list-outside ps-8">
                            <li>
                                Listar Pantallas: La aplicación debe permitir listar las
                                pantallas publicitarias con funcionalidad de paginado y filtrado
                                por nombre y tipo (interior/exterior).
                            </li>
                            <li>
                                Ver Detalles: Debe ser posible visualizar los detalles de una
                                pantalla específica.
                            </li>
                            <li>
                                Eliminar Pantallas: Se requiere la capacidad de eliminar
                                pantallas existentes.
                            </li>
                            <li>
                                Crear Nuevas Pantallas: La aplicación debe permitir la creación
                                de nuevas pantallas.
                            </li>
                            <li>
                                Editar Pantallas: Se debe ofrecer la funcionalidad para editar
                                las pantallas existentes.
                            </li>
                        </ul>
                        <h4 className="text-lg font-semibold text-sky-300">
                            Requisitos No Funcionales:
                        </h4>
                        <p>
                            <span className="font-semibold">Control de Acceso:</span> Se
                            necesita una página de inicio de sesión con acceso controlado por
                            usuario y contraseña.
                        </p>
                        <p>
                            <span className="font-semibold">Tecnología Frontend:</span> La
                            solución debe ser desarrollada utilizando un framework de
                            frontend. Se prefiere AngularJS, seguido de React, Vue o cualquier
                            otro framework seleccionado por el candidato.
                        </p>
                        <p>
                            <span className="font-semibold">
                                Buenas Prácticas de Desarrollo:
                            </span>{" "}
                            Se espera que el código siga buenas prácticas de desarrollo,
                            incluyendo organización, modularidad y legibilidad.
                        </p>
                        <p>
                            <span className="font-semibold">Buenas Prácticas con GIT:</span>{" "}
                            Se espera que el candidato utilice GIT de manera adecuada,
                            incluyendo commits descriptivos y ramificación cuando sea
                            necesario.
                        </p>
                        <p>
                            <span className="font-semibold">Usabilidad y Estética:</span> Se
                            valora la usabilidad y estética de la aplicación, incluyendo la
                            experiencia de usuario (UX) y la interfaz de usuario (UI).
                        </p>
                        <p>
                            <span className="font-semibold">
                                Performance y Uso de Recursos:
                            </span>{" "}
                            Se espera que la aplicación sea eficiente en términos de
                            rendimiento y uso de recursos.
                        </p>
                        <p>
                            <span className="font-semibold">Responsiveness:</span> La
                            aplicación debe ser responsive y funcionar correctamente en
                            dispositivos de escritorio y móviles.
                        </p>
                        <p>
                            <span className="font-semibold">Creatividad y Wow Effect:</span>{" "}
                            Se valora la creatividad y el "wow effect" en el diseño y la
                            funcionalidad de la aplicación.
                        </p>
                    </div>
                </article>

                <aside className="w-full md:w-2/5 max-h-[13rem] md:max-h-[28rem] flex flex-col gap-4">
                    <div className="bg-sky-950 h-20 md:h-24 mt-4 md:mt-0 rounded-lg p-6 text-neutral-100 shadow flex flex-col justify-center">
                        <h4 className="text-lg font-semibold">
                            <span className="uppercase">Postulante:</span> Celeste D'Angelo
                        </h4>
                        <p>FullStack Developer</p>
                    </div>
                    <div className="bg-sky-600 h-[21rem] space-y-4 rounded-lg p-6 text-neutral-100 shadow overflow-y-auto text-justify">
                        <p>
                            Soy un desarrollador Full Stack con una sólida formación en
                            diversas tecnologías y Arquitecta con 9 años de experiencia. Mi
                            enfoque se centra en la excelencia técnica y la entrega de
                            soluciones eficientes. Tengo una pasión por el diseño y la
                            programación, y siempre estoy en busca de oportunidades para
                            aprender y mantenerme actualizado en las últimas tendencias
                            tecnológicas.
                        </p>
                        <p>
                            Actualmente, mi objetivo es emplear mis habilidades técnicas y mi
                            experiencia en un entorno que promueva el crecimiento profesional
                            y la colaboración. Estoy comprometido con la mejora continua y
                            creo firmemente en el potencial transformador de la tecnología
                            para elevar la calidad de vida de las personas. Me entusiasma la
                            posibilidad de contribuir a su equipo y ser parte de una empresa
                            que comparte estos valores y perspectivas.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default LandingPage;
