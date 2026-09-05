let currentLang = 'es';
let isDarkMode = false;

const body = document.querySelector('body');
const btnLang = document.querySelector('.lang-toggle');
const btnTheme = document.querySelector('.theme-toggle');
const homeView = document.querySelector('.home-view');
const dynamicView = document.querySelector('.dynamic-view');
const contentArea = document.querySelector('.content-area');
const backBtn = document.querySelector('.back-btn');
const subjectCards = document.querySelectorAll('.subject-card');

function genOpts(correct, w1, w2, w3) {
    return [correct, w1, w2, w3].map(String).sort(() => Math.random() - 0.5);
}

const database = {
    math: {
        title_es: "Matemáticas",
        title_en: "Mathematics",
        desc_es: "Estudio exhaustivo del modelado numérico, desde ecuaciones perceptrónicas hasta integrales.",
        desc_en: "Comprehensive study of numerical modeling, from perceptronic equations to integrals.",
        topics: [
            {
                id: "algebra",
                title_es: "Álgebra y Ecuaciones",
                title_en: "Algebra and Equations",
                desc_es: "Manipulación de variables para arquitecturas lógicas.",
                desc_en: "Variable manipulation for logical architectures.",
                subtopics: [
                    {
                        title_es: "1. Ecuaciones Lineales Básicas",
                        title_en: "1. Basic Linear Equations",
                        lesson_es: "<p>En un modelo computacional, como el perceptrón de una neurona artificial, una variable de entrada se multiplica por un peso y se le suma un sesgo. Resolver una ecuación lineal implica aislar esa variable utilizando operaciones inversas.</p><p>Ejemplo: <i>5x + 10 = 35</i>. Restas 10 en ambos lados obteniendo <i>5x = 25</i>, luego divides entre 5. <i>x = 5</i>.</p>",
                        lesson_en: "<p>In a computational model, like an artificial neuron perceptron, an input variable is multiplied by a weight and a bias is added. Solving a linear equation means isolating that variable using inverse operations.</p>",
                        generateProblem: () => {
                            const w = Math.floor(Math.random() * 8) + 2;
                            const b = Math.floor(Math.random() * 20) + 1;
                            const x = Math.floor(Math.random() * 12) + 2;
                            const res = (w * x) + b;
                            return {
                                q_es: `Resuelve el peso <i>x</i> en la ecuación: <i>${w}x + ${b} = ${res}</i>`,
                                q_en: `Solve for the weight <i>x</i> in the equation: <i>${w}x + ${b} = ${res}</i>`,
                                correct: x,
                                options: genOpts(x, x+1, x-1, x+2)
                            };
                        }
                    },
                    {
                        title_es: "2. Ecuaciones Cuadráticas",
                        title_en: "2. Quadratic Equations",
                        lesson_es: "<p>Las ecuaciones con variables al cuadrado <i>x<sup>2</sup></i> aparecen al optimizar áreas o calcular errores de mínimos cuadrados (Ordinary Least Squares). Si <i>x<sup>2</sup> = c</i>, entonces aplicamos la raíz cuadrada en ambos lados.</p>",
                        lesson_en: "<p>Equations with squared variables <i>x<sup>2</sup></i> appear when optimizing areas or calculating least squares errors (Ordinary Least Squares). If <i>x<sup>2</sup> = c</i>, we apply the square root to both sides.</p>",
                        generateProblem: () => {
                            const r = Math.floor(Math.random() * 12) + 3;
                            const c = r * r;
                            return {
                                q_es: `Encuentra el valor positivo de <i>x</i>: <i>x<sup>2</sup> - ${c} = 0</i>`,
                                q_en: `Find the positive value of <i>x</i>: <i>x<sup>2</sup> - ${c} = 0</i>`,
                                correct: r,
                                options: genOpts(r, r+2, r-1, r+1)
                            };
                        }
                    },
                    {
                        title_es: "3. Sistemas de Ecuaciones",
                        title_en: "3. Systems of Equations",
                        lesson_es: "<p>Cuando un circuito electrónico tiene múltiples componentes desconocidos, requieres múltiples ecuaciones. El método de sustitución despeja una variable y la inserta en la otra ecuación.</p>",
                        lesson_en: "<p>When an electronic circuit has multiple unknown components, you need multiple equations. Substitution clears one variable and inserts it into the other.</p>",
                        generateProblem: () => {
                            const x = Math.floor(Math.random() * 8) + 2;
                            const y = Math.floor(Math.random() * 8) + 2;
                            return {
                                q_es: `Si <i>x + y = ${x+y}</i> y <i>x - y = ${x-y}</i>, ¿cuál es el valor de <i>x</i>?`,
                                q_en: `If <i>x + y = ${x+y}</i> and <i>x - y = ${x-y}</i>, what is the value of <i>x</i>?`,
                                correct: x,
                                options: genOpts(x, x+2, y, x-1)
                            };
                        }
                    },
                    {
                        title_es: "4. Leyes de Exponentes",
                        title_en: "4. Laws of Exponents",
                        lesson_es: "<p>Al procesar grandes volúmenes de datos, multiplicamos términos con bases iguales sumando sus exponentes. <i>x<sup>a</sup> &times; x<sup>b</sup> = x<sup>a+b</sup></i>.</p>",
                        lesson_en: "<p>When processing large volumes of data, we multiply terms with equal bases by adding their exponents. <i>x<sup>a</sup> &times; x<sup>b</sup> = x<sup>a+b</sup></i>.</p>",
                        generateProblem: () => {
                            const a = Math.floor(Math.random() * 5) + 2;
                            const b = Math.floor(Math.random() * 5) + 2;
                            return {
                                q_es: `Simplifica la expresión: <i>x<sup>${a}</sup> &times; x<sup>${b}</sup></i>`,
                                q_en: `Simplify the expression: <i>x<sup>${a}</sup> &times; x<sup>${b}</sup></i>`,
                                correct: `x<sup>${a+b}</sup>`,
                                options: genOpts(`x<sup>${a+b}</sup>`, `x<sup>${a*b}</sup>`, `x<sup>${a+b+1}</sup>`, `x<sup>${a}</sup>`)
                            };
                        }
                    },
                    {
                        title_es: "5. Despeje de Variables Físicas",
                        title_en: "5. Solving for Physical Variables",
                        lesson_es: "<p>Aislar variables en fórmulas complejas. Si <i>F = m &times; a</i>, entonces <i>a = F / m</i>.</p>",
                        lesson_en: "<p>Isolating variables in complex formulas. If <i>F = m &times; a</i>, then <i>a = F / m</i>.</p>",
                        generateProblem: () => {
                            const f = Math.floor(Math.random() * 100) + 50;
                            const m = Math.floor(Math.random() * 10) + 2;
                            const a = f / m;
                            return {
                                q_es: `Despeja la aceleración en <i>F = ma</i> si <i>F = ${f}</i> y <i>m = ${m}</i>.`,
                                q_en: `Solve for acceleration in <i>F = ma</i> if <i>F = ${f}</i> and <i>m = ${m}</i>.`,
                                correct: a.toFixed(1),
                                options: genOpts(a.toFixed(1), (a+2).toFixed(1), (f*m).toFixed(1), (a-1).toFixed(1))
                            };
                        }
                    }
                ]
            },
            {
                id: "geometria",
                title_es: "Geometría y Espacio",
                title_en: "Geometry and Space",
                desc_es: "Medición del entorno para algoritmos de visión por computadora.",
                desc_en: "Environment measurement for computer vision algorithms.",
                subtopics: [
                    {
                        title_es: "6. Teorema de Pitágoras",
                        title_en: "6. Pythagorean Theorem",
                        lesson_es: "<p>Esencial para medir la distancia euclidiana entre dos píxeles. <i>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></i>.</p>",
                        lesson_en: "<p>Essential for measuring the Euclidean distance between two pixels. <i>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup></i>.</p>",
                        generateProblem: () => {
                            const trips = [[3,4,5], [5,12,13], [8,15,17]];
                            const t = trips[Math.floor(Math.random()*trips.length)];
                            return {
                                q_es: `Catetos de ${t[0]} y ${t[1]}. Calcula la hipotenusa.`,
                                q_en: `Legs of ${t[0]} and ${t[1]}. Calculate the hypotenuse.`,
                                correct: t[2],
                                options: genOpts(t[2], t[2]+1, t[2]-2, t[0]+t[1])
                            };
                        }
                    },
                    {
                        title_es: "7. Áreas de Polígonos",
                        title_en: "7. Polygon Areas",
                        lesson_es: "<p>Cuando un modelo como YOLO detecta una persona, dibuja un rectángulo delimitador (bounding box). El área base &times; altura indica el espacio en píxeles que ocupa la detección.</p>",
                        lesson_en: "<p>When a model like YOLO detects a person, it draws a bounding box. The area base &times; height indicates the pixel space occupied.</p>",
                        generateProblem: () => {
                            const b = Math.floor(Math.random() * 50) + 10;
                            const h = Math.floor(Math.random() * 50) + 10;
                            return {
                                q_es: `Un modelo dibuja una caja de detección de base ${b}px y altura ${h}px. Calcula el área total.`,
                                q_en: `A model draws a detection box of base ${b}px and height ${h}px. Calculate total area.`,
                                correct: b*h,
                                options: genOpts(b*h, (b*h)+50, b+h, (b*h)-20)
                            };
                        }
                    },
                    {
                        title_es: "8. Volúmenes",
                        title_en: "8. Volumes",
                        lesson_es: "<p>Cálculo de capacidad espacial. Para un cilindro: <i>V = &pi; &times; r<sup>2</sup> &times; h</i>.</p>",
                        lesson_en: "<p>Spatial capacity calculation. For a cylinder: <i>V = &pi; &times; r<sup>2</sup> &times; h</i>.</p>",
                        generateProblem: () => {
                            const r = Math.floor(Math.random() * 5) + 2;
                            const h = Math.floor(Math.random() * 10) + 2;
                            const v = Math.round(Math.PI * r * r * h);
                            return {
                                q_es: `Calcula el volumen aproximado de un cilindro con radio ${r} y altura ${h}. (Usa &pi; &asymp; 3.1416)`,
                                q_en: `Calculate approximate volume of a cylinder with radius ${r} and height ${h}. (Use &pi; &asymp; 3.1416)`,
                                correct: v,
                                options: genOpts(v, v+10, v-5, Math.round(Math.PI * r * h))
                            };
                        }
                    },
                    {
                        title_es: "9. Funciones Trigonométricas",
                        title_en: "9. Trigonometric Functions",
                        lesson_es: "<p>SOH CAH TOA. Seno = Opuesto / Hipotenusa. Crucial para rotaciones de cámara.</p>",
                        lesson_en: "<p>SOH CAH TOA. Sine = Opposite / Hypotenuse. Crucial for camera rotations.</p>",
                        generateProblem: () => {
                            const op = Math.floor(Math.random() * 6) + 2;
                            const hyp = op + Math.floor(Math.random() * 5) + 2;
                            return {
                                q_es: `Si el cateto opuesto es ${op} y la hipotenusa es ${hyp}, ¿cuál es el valor del Seno del ángulo?`,
                                q_en: `If the opposite leg is ${op} and hypotenuse is ${hyp}, what is the value of the Sine?`,
                                correct: (op/hyp).toFixed(2),
                                options: genOpts((op/hyp).toFixed(2), (hyp/op).toFixed(2), (op/(hyp+1)).toFixed(2), (op/2).toFixed(2))
                            };
                        }
                    },
                    {
                        title_es: "10. Ley de Senos",
                        title_en: "10. Law of Sines",
                        lesson_es: "<p><i>a / sen(A) = b / sen(B)</i>. Se usa para resolver triángulos no rectángulos al mapear geometrías complejas.</p>",
                        lesson_en: "<p><i>a / sin(A) = b / sin(B)</i>. Used to solve non-right triangles mapping complex geometries.</p>",
                        generateProblem: () => {
                            return {
                                q_es: `Si el lado <i>a=10</i>, su ángulo opuesto <i>A=30&deg;</i> (sen 30=0.5), y el ángulo <i>B=90&deg;</i> (sen 90=1). Calcula el lado <i>b</i>.`,
                                q_en: `If side <i>a=10</i>, opposite angle <i>A=30&deg;</i> (sin 30=0.5), and angle <i>B=90&deg;</i> (sin 90=1). Calculate side <i>b</i>.`,
                                correct: "20",
                                options: genOpts("20", "15", "5", "10")
                            };
                        }
                    }
                ]
            },
            {
                id: "analitica",
                title_es: "Funciones y Análisis Numérico",
                title_en: "Functions and Numerical Analysis",
                desc_es: "Modelado de datos en el plano cartesiano.",
                desc_en: "Data modeling on the Cartesian plane.",
                subtopics: [
                    {
                        title_es: "11. Evaluación de Funciones",
                        title_en: "11. Function Evaluation",
                        lesson_es: "<p>Sustituir parámetros en algoritmos matemáticos: <i>f(x) = y</i>.</p>",
                        lesson_en: "<p>Substituting parameters into mathematical algorithms: <i>f(x) = y</i>.</p>",
                        generateProblem: () => {
                            const x = Math.floor(Math.random() * 5) + 1;
                            const c = Math.floor(Math.random() * 10) + 1;
                            return {
                                q_es: `Dada <i>f(x) = 3x<sup>2</sup> + ${c}</i>. Evalúa <i>f(${x})</i>.`,
                                q_en: `Given <i>f(x) = 3x<sup>2</sup> + ${c}</i>. Evaluate <i>f(${x})</i>.`,
                                correct: (3 * x * x) + c,
                                options: genOpts((3 * x * x) + c, (3 * x) + c, (x * x) + c, (3 * x * x) - c)
                            };
                        }
                    },
                    {
                        title_es: "12. Pendiente de una Recta",
                        title_en: "12. Slope of a Line",
                        lesson_es: "<p>La pendiente (m) indica la inclinación. <i>m = (y2 - y1) / (x2 - x1)</i>.</p>",
                        lesson_en: "<p>The slope (m) indicates the incline. <i>m = (y2 - y1) / (x2 - x1)</i>.</p>",
                        generateProblem: () => {
                            const y2 = Math.floor(Math.random() * 10) + 5;
                            const y1 = Math.floor(Math.random() * 5);
                            const x2 = Math.floor(Math.random() * 10) + 5;
                            const x1 = Math.floor(Math.random() * 5);
                            const m = ((y2 - y1) / (x2 - x1)).toFixed(2);
                            return {
                                q_es: `Calcula la pendiente entre los puntos (${x1}, ${y1}) y (${x2}, ${y2}).`,
                                q_en: `Calculate the slope between points (${x1}, ${y1}) and (${x2}, ${y2}).`,
                                correct: m,
                                options: genOpts(m, (parseFloat(m)+1).toFixed(2), ((x2-x1)/(y2-y1)).toFixed(2), (parseFloat(m)-0.5).toFixed(2))
                            };
                        }
                    },
                    {
                        title_es: "13. Distancia entre Puntos",
                        title_en: "13. Distance Between Points",
                        lesson_es: "<p>Raíz cuadrada de la suma de las diferencias al cuadrado. Vital para calcular desviaciones.</p>",
                        lesson_en: "<p>Square root of the sum of squared differences. Vital for calculating deviations.</p>",
                        generateProblem: () => {
                            return {
                                q_es: `Calcula la distancia exacta entre (0, 0) y (3, 4).`,
                                q_en: `Calculate the exact distance between (0, 0) and (3, 4).`,
                                correct: "5",
                                options: genOpts("5", "7", "25", "4")
                            };
                        }
                    },
                    {
                        title_es: "14. Logaritmos Básicos",
                        title_en: "14. Basic Logarithms",
                        lesson_es: "<p>¿A qué potencia debo elevar la base para obtener el número? <i>log<sub>2</sub>(8) = 3</i> porque 2 al cubo es 8.</p>",
                        lesson_en: "<p>To what power must I raise the base to get the number? <i>log<sub>2</sub>(8) = 3</i> because 2 cubed is 8.</p>",
                        generateProblem: () => {
                            return {
                                q_es: `Evalúa <i>log<sub>3</sub>(9)</i>.`,
                                q_en: `Evaluate <i>log<sub>3</sub>(9)</i>.`,
                                correct: "2",
                                options: genOpts("2", "3", "9", "27")
                            };
                        }
                    },
                    {
                        title_es: "15. Sucesiones y Series",
                        title_en: "15. Sequences and Series",
                        lesson_es: "<p>Programar registros de desplazamiento (shift registers) requiere entender patrones numéricos aritméticos.</p>",
                        lesson_en: "<p>Programming shift registers requires understanding arithmetic numerical patterns.</p>",
                        generateProblem: () => {
                            const start = Math.floor(Math.random() * 5);
                            const step = Math.floor(Math.random() * 4) + 2;
                            return {
                                q_es: `Encuentra el siguiente número en la sucesión: ${start}, ${start+step}, ${start+(step*2)}, ?`,
                                q_en: `Find the next number in the sequence: ${start}, ${start+step}, ${start+(step*2)}, ?`,
                                correct: start + (step * 3),
                                options: genOpts(start+(step*3), start+(step*4), start+(step*2)+1, start+(step*3)-1)
                            };
                        }
                    }
                ]
            },
            {
                id: "calculo",
                title_es: "Estadística y Cálculo Diferencial",
                title_en: "Statistics and Differential Calculus",
                desc_es: "Métricas de precisión y tasas de cambio instantáneas.",
                desc_en: "Precision metrics and instantaneous rates of change.",
                subtopics: [
                    {
                        title_es: "16. Probabilidad Computacional",
                        title_en: "16. Computational Probability",
                        lesson_es: "<p>Medida de certeza. Eventos favorables / Eventos totales.</p>",
                        lesson_en: "<p>Measure of certainty. Favorable events / Total events.</p>",
                        generateProblem: () => {
                            return {
                                q_es: `Si una IA tiene 3 predicciones correctas de 10 intentos, ¿cuál es su probabilidad de error (fallo)?`,
                                q_en: `If an AI has 3 correct predictions out of 10 attempts, what is its probability of error (failure)?`,
                                correct: "70%",
                                options: genOpts("70%", "30%", "10%", "50%")
                            };
                        }
                    },
                    {
                        title_es: "17. Media Aritmética",
                        title_en: "17. Arithmetic Mean",
                        lesson_es: "<p>El promedio total. Suma dividida entre la cantidad de elementos.</p>",
                        lesson_en: "<p>The total average. Sum divided by the number of elements.</p>",
                        generateProblem: () => {
                            return {
                                q_es: `Promedia las lecturas de los sensores ultrasónicos: 10, 15, 20.`,
                                q_en: `Average the ultrasonic sensor readings: 10, 15, 20.`,
                                correct: "15",
                                options: genOpts("15", "45", "10", "20")
                            };
                        }
                    },
                    {
                        title_es: "18. Mediana",
                        title_en: "18. Median",
                        lesson_es: "<p>El valor central cuando los datos numéricos están ordenados. Ayuda a evitar el ruido de valores atípicos.</p>",
                        lesson_en: "<p>The central value when numerical data is sorted. Helps avoid outlier noise.</p>",
                        generateProblem: () => {
                            return {
                                q_es: `Encuentra la mediana de: 3, 1, 9, 7, 5.`,
                                q_en: `Find the median of: 3, 1, 9, 7, 5.`,
                                correct: "5",
                                options: genOpts("5", "1", "9", "25")
                            };
                        }
                    },
                    {
                        title_es: "19. Derivadas",
                        title_en: "19. Derivatives",
                        lesson_es: "<p>La derivada indica la tasa de cambio instantánea. Bajas el exponente a multiplicar y le restas 1. Si <i>f(x) = x<sup>n</sup></i>, la derivada es <i>n &times; x<sup>n-1</sup></i>.</p>",
                        lesson_en: "<p>The derivative indicates the instantaneous rate of change. Drop the exponent to multiply and subtract 1.</p>",
                        generateProblem: () => {
                            const p = Math.floor(Math.random() * 5) + 3;
                            return {
                                q_es: `Deriva respecto a x: <i>f(x) = x<sup>${p}</sup></i>`,
                                q_en: `Differentiate with respect to x: <i>f(x) = x<sup>${p}</sup></i>`,
                                correct: `${p}x<sup>${p-1}</sup>`,
                                options: genOpts(`${p}x<sup>${p-1}</sup>`, `x<sup>${p-1}</sup>`, `${p}x<sup>${p}</sup>`, `${p-1}x<sup>${p}</sup>`)
                            };
                        }
                    },
                    {
                        title_es: "20. Integrales Básicas",
                        title_en: "20. Basic Integrals",
                        lesson_es: "<p>La operación inversa a la derivada, calcula el área bajo la curva. Sumas 1 al exponente y divides entre ese nuevo número.</p>",
                        lesson_en: "<p>The inverse operation of the derivative, calculates the area under the curve.</p>",
                        generateProblem: () => {
                            const n = Math.floor(Math.random() * 3) + 2;
                            return {
                                q_es: `Calcula la integral indefinida de: <i>x<sup>${n}</sup></i> (ignora la constante C)`,
                                q_en: `Calculate the indefinite integral of: <i>x<sup>${n}</sup></i> (ignore constant C)`,
                                correct: `(x<sup>${n+1}</sup>)/${n+1}`,
                                options: genOpts(`(x<sup>${n+1}</sup>)/${n+1}`, `${n}x<sup>${n-1}</sup>`, `x<sup>${n+1}</sup>`, `(x<sup>${n-1}</sup>)/${n}`)
                            };
                        }
                    }
                ]
            }
        ]
    },
    physics: {
        title_es: "Física",
        title_en: "Physics",
        desc_es: "Análisis del espacio-tiempo, fuerzas gravitacionales y diseño de hardware lógico basado en el Índice Oficial.",
        desc_en: "Analysis of spacetime, gravitational forces, and logical hardware design based on the Official Index.",
        topics: [
            {
                id: "etapa1",
                title_es: "Etapa 1. Cinemática: Movimiento en 1 dimensión",
                title_en: "Stage 1. Kinematics: 1D Motion",
                desc_es: "Análisis del movimiento rectilíneo.",
                desc_en: "Analysis of rectilinear motion.",
                subtopics: [
                    {
                        title_es: "1.1 Movimiento en una dimensión",
                        title_en: "1.1 Motion in one dimension",
                        lesson_es: "<p>Estudio clásico del desplazamiento en línea recta. Velocidad constante (MRU). Fórmulas: <i>v = d/t</i>.</p>",
                        lesson_en: "<p>Classical study of straight-line displacement. Constant velocity. Formulas: <i>v = d/t</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const d = Math.floor(Math.random() * 100) + 20;
                                const t = Math.floor(Math.random() * 10) + 2;
                                const v = (d / t).toFixed(1);
                                return {
                                    q_es: `Calcula la velocidad constante si viajas ${d}m en ${t}s.`,
                                    q_en: `Calculate constant velocity if you travel ${d}m in ${t}s.`,
                                    correct: `${v} m/s`,
                                    options: genOpts(`${v} m/s`, `${(d*t).toFixed(1)} m/s`, `${(d/t + 5).toFixed(1)} m/s`, `${(t/d).toFixed(1)} m/s`)
                                };
                            },
                            () => {
                                const v = Math.floor(Math.random() * 20) + 5;
                                const t = Math.floor(Math.random() * 15) + 3;
                                const d = v * t;
                                return {
                                    q_es: `¿Qué distancia recorre un objeto a velocidad constante de ${v}m/s durante ${t}s?`,
                                    q_en: `What distance does an object cover at a constant velocity of ${v}m/s during ${t}s?`,
                                    correct: `${d} m`,
                                    options: genOpts(`${d} m`, `${d + 10} m`, `${(v/t).toFixed(1)} m`, `${d - 5} m`)
                                };
                            },
                            () => {
                                const d = Math.floor(Math.random() * 200) + 50;
                                const v = Math.floor(Math.random() * 25) + 5;
                                const t = (d / v).toFixed(1);
                                return {
                                    q_es: `Determina el tiempo necesario para recorrer ${d}m a una velocidad constante de ${v}m/s.`,
                                    q_en: `Determine the time required to cover ${d}m at a constant velocity of ${v}m/s.`,
                                    correct: `${t} s`,
                                    options: genOpts(`${t} s`, `${(d*v).toFixed(1)} s`, `${(parseFloat(t)+2).toFixed(1)} s`, `${(parseFloat(t)-1).toFixed(1)} s`)
                                };
                            },
                            () => ({
                                q_es: `En un movimiento rectilíneo uniforme (MRU), ¿cómo se mantiene la velocidad?`,
                                q_en: `In a uniform rectilinear motion (URM), how is the velocity maintained?`,
                                correct_es: "Constante",
                                correct_en: "Constant",
                                options_es: genOpts("Constante", "Aumentando linealmente", "Cero", "Variable"),
                                options_en: genOpts("Constant", "Increasing linearly", "Zero", "Variable")
                            }),
                            () => ({
                                q_es: `Si la posición de un móvil no cambia a lo largo del tiempo, su velocidad es...`,
                                q_en: `If a mobile's position does not change over time, its velocity is...`,
                                correct_es: "Cero",
                                correct_en: "Zero",
                                options_es: genOpts("Cero", "Infinita", "Constante no nula", "Negativa"),
                                options_en: genOpts("Zero", "Infinite", "Non-zero constant", "Negative")
                            })
                        ]
                    },
                    {
                        title_es: "1.2 Ecuaciones del movimiento rectilíneo",
                        title_en: "1.2 Rectilinear motion equations",
                        lesson_es: "<p>Introducción a la aceleración (MRUA). <i>v<sub>f</sub> = v<sub>i</sub> + at</i>. Aceleración constante.</p>",
                        lesson_en: "<p>Introduction to acceleration. <i>v<sub>f</sub> = v<sub>i</sub> + at</i>. Constant acceleration.</p>",
                        getProblemsPool: () => [
                            () => {
                                const a = Math.floor(Math.random() * 5) + 1;
                                const t = Math.floor(Math.random() * 10) + 2;
                                return {
                                    q_es: `Si partes del reposo y aceleras a ${a}m/s<sup>2</sup> por ${t}s, ¿cuál es tu velocidad final?`,
                                    q_en: `If you start from rest and accelerate at ${a}m/s<sup>2</sup> for ${t}s, what is your final velocity?`,
                                    correct: `${a*t} m/s`,
                                    options: genOpts(`${a*t} m/s`, `${a+t} m/s`, `${(a*t)-2} m/s`, `${(a*t)+5} m/s`)
                                };
                            },
                            () => {
                                const vi = Math.floor(Math.random() * 10) + 2;
                                const vf = vi + Math.floor(Math.random() * 20) + 5;
                                const t = Math.floor(Math.random() * 5) + 2;
                                const a = ((vf - vi) / t).toFixed(1);
                                return {
                                    q_es: `Calcula la aceleración si la velocidad cambia de ${vi}m/s a ${vf}m/s en ${t}s.`,
                                    q_en: `Calculate acceleration if velocity changes from ${vi}m/s to ${vf}m/s in ${t}s.`,
                                    correct: `${a} m/s2`,
                                    options: genOpts(`${a} m/s2`, `${(vf-vi)} m/s2`, `${(parseFloat(a)+1.5).toFixed(1)} m/s2`, `${(vf/t).toFixed(1)} m/s2`)
                                };
                            },
                            () => {
                                const vi = Math.floor(Math.random() * 5) + 1;
                                const a = Math.floor(Math.random() * 4) + 1;
                                const t = Math.floor(Math.random() * 6) + 2;
                                const d = (vi * t + 0.5 * a * t * t).toFixed(1);
                                return {
                                    q_es: `Un objeto con v_i=${vi}m/s acelera a ${a}m/s<sup>2</sup> durante ${t}s. ¿Qué distancia recorre?`,
                                    q_en: `An object with v_i=${vi}m/s accelerates at ${a}m/s<sup>2</sup> for ${t}s. What distance does it cover?`,
                                    correct: `${d} m`,
                                    options: genOpts(`${d} m`, `${vi*t} m`, `${(parseFloat(d)+12).toFixed(1)} m`, `${(0.5*a*t*t).toFixed(1)} m`)
                                };
                            },
                            () => ({
                                q_es: `¿Cuál de las siguientes magnitudes describe la tasa de cambio de la velocidad respecto al tiempo?`,
                                q_en: `Which of the following quantities describes the rate of change of velocity with respect to time?`,
                                correct_es: "Aceleración",
                                correct_en: "Acceleration",
                                options_es: genOpts("Aceleración", "Fuerza", "Desplazamiento", "Trabajo"),
                                options_en: genOpts("Acceleration", "Force", "Displacement", "Work")
                            }),
                            () => {
                                const vi = Math.floor(Math.random() * 15) + 10;
                                const a = Math.floor(Math.random() * 3) + 1;
                                const t = Math.floor(Math.random() * 4) + 2;
                                const vf = vi - a * t;
                                return {
                                    q_es: `Un auto desacelera a razón de ${a}m/s<sup>2</sup> desde una velocidad inicial de ${vi}m/s durante ${t}s. ¿Velocidad final?`,
                                    q_en: `A car decelerates at ${a}m/s<sup>2</sup> from an initial velocity of ${vi}m/s for ${t}s. Final velocity?`,
                                    correct: `${vf} m/s`,
                                    options: genOpts(`${vf} m/s`, `${vi + a*t} m/s`, `${vi} m/s`, `${vf + 3} m/s`)
                                };
                            }
                        ]
                    },
                    {
                        title_es: "1.3 Análisis gráfico del movimiento en una dimensión",
                        title_en: "1.3 Graphical analysis of 1D motion",
                        lesson_es: "<p>La pendiente de una gráfica Posición vs Tiempo determina la Velocidad. La pendiente de Velocidad vs Tiempo determina la Aceleración.</p>",
                        lesson_en: "<p>The slope of a Position vs Time graph determines Velocity. The slope of Velocity vs Time determines Acceleration.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `¿Qué representa la pendiente en una gráfica de Velocidad vs Tiempo?`,
                                q_en: `What does the slope represent in a Velocity vs Time graph?`,
                                correct_es: "Aceleración",
                                correct_en: "Acceleration",
                                options_es: genOpts("Aceleración", "Posición", "Distancia", "Desplazamiento"),
                                options_en: genOpts("Acceleration", "Position", "Distance", "Displacement")
                            }),
                            () => ({
                                q_es: `¿Qué representa la pendiente en una gráfica de Posición vs Tiempo?`,
                                q_en: `What does the slope represent in a Position vs Time graph?`,
                                correct_es: "Velocidad",
                                correct_en: "Velocity",
                                options_es: genOpts("Velocidad", "Aceleración", "Fuerza", "Tiempo"),
                                options_en: genOpts("Velocity", "Acceleration", "Force", "Time")
                            }),
                            () => ({
                                q_es: `¿Qué representa el área bajo la curva en una gráfica de Velocidad vs Tiempo?`,
                                q_en: `What does the area under the curve represent in a Velocity vs Time graph?`,
                                correct_es: "Desplazamiento",
                                correct_en: "Displacement",
                                options_es: genOpts("Desplazamiento", "Aceleración", "Jerk", "Velocidad media"),
                                options_en: genOpts("Displacement", "Acceleration", "Jerk", "Average velocity")
                            }),
                            () => ({
                                q_es: `En una gráfica Posición vs Tiempo, una línea horizontal indica que el objeto está...`,
                                q_en: `In a Position vs Time graph, a horizontal line indicates that the object is...`,
                                correct_es: "En reposo",
                                correct_en: "At rest",
                                options_es: genOpts("En reposo", "Acelerando", "A velocidad constante no nula", "En caída libre"),
                                options_en: genOpts("At rest", "Accelerating", "At non-zero constant velocity", "In free fall")
                            }),
                            () => ({
                                q_es: `Una línea recta inclinada hacia arriba en una gráfica de Velocidad vs Tiempo representa:`,
                                q_en: `A straight line sloping upward in a Velocity vs Time graph represents:`,
                                correct_es: "Aceleración constante positiva",
                                correct_en: "Constant positive acceleration",
                                options_es: genOpts("Aceleración constante positiva", "Velocidad cero", "Posición constante", "Aceleración variable"),
                                options_en: genOpts("Constant positive acceleration", "Zero velocity", "Constant position", "Variable acceleration")
                            })
                        ]
                    },
                    {
                        title_es: "1.4 Análisis del movimiento desde Leyes de Newton",
                        title_en: "1.4 Motion analysis from Newton's Laws",
                        lesson_es: "<p>La Segunda Ley relaciona cinemática con dinámica en 1D: <i>F = m &times; a</i>.</p>",
                        lesson_en: "<p>The Second Law relates kinematics with 1D dynamics: <i>F = m &times; a</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const m = Math.floor(Math.random() * 20) + 5;
                                const a = Math.floor(Math.random() * 5) + 2;
                                return {
                                    q_es: `Calcula la fuerza neta para mover una masa de ${m}kg a ${a}m/s<sup>2</sup>.`,
                                    q_en: `Calculate the net force to move a ${m}kg mass at ${a}m/s<sup>2</sup>.`,
                                    correct: `${m*a} N`,
                                    options: genOpts(`${m*a} N`, `${m+a} N`, `${(m*a)+10} N`, `${m/a} N`)
                                };
                            },
                            () => {
                                const f = Math.floor(Math.random() * 100) + 20;
                                const m = Math.floor(Math.random() * 10) + 2;
                                const a = (f / m).toFixed(1);
                                return {
                                    q_es: `¿Qué aceleración experimenta un cuerpo de ${m}kg al aplicarle una fuerza de ${f}N?`,
                                    q_en: `What acceleration does a ${m}kg body experience when a force of ${f}N is applied?`,
                                    correct: `${a} m/s2`,
                                    options: genOpts(`${a} m/s2`, `${f*m} m/s2`, `${(parseFloat(a)+2).toFixed(1)} m/s2`, `${m/f} m/s2`)
                                };
                            },
                            () => ({
                                q_es: `Según la Primera Ley de Newton, un cuerpo mantendrá su estado de reposo o MRU a menos que...`,
                                q_en: `According to Newton's First Law, a body will maintain its state of rest or URM unless...`,
                                correct_es: "Actúe una fuerza neta sobre él",
                                correct_en: "A net force acts upon it",
                                options_es: genOpts("Actúe una fuerza neta sobre él", "Se le agote la energía", "Cambie su masa", "Aumente la gravedad"),
                                options_en: genOpts("A net force acts upon it", "It runs out of energy", "Its mass changes", "Gravity increases")
                            }),
                            () => ({
                                q_es: `La Tercera Ley de Newton establece que para cada acción existe una reacción...`,
                                q_en: `Newton's Third Law states that for every action there is a reaction that is...`,
                                correct_es: "De igual magnitud y en dirección opuesta",
                                correct_en: "Equal in magnitude and opposite in direction",
                                options_es: genOpts("De igual magnitud y en dirección opuesta", "De mayor magnitud y en misma dirección", "De menor magnitud", "Perpendicular"),
                                options_en: genOpts("Equal in magnitude and opposite in direction", "Greater in magnitude and same direction", "Smaller in magnitude", "Perpendicular")
                            }),
                            () => {
                                const f = Math.floor(Math.random() * 50) + 10;
                                const a = Math.floor(Math.random() * 5) + 1;
                                const m = (f / a).toFixed(1);
                                return {
                                    q_es: `Halla la masa de un cuerpo si una fuerza neta de ${f}N le produce una aceleración de ${a}m/s<sup>2</sup>.`,
                                    q_en: `Find the mass of a body if a net force of ${f}N produces an acceleration of ${a}m/s<sup>2</sup>.`,
                                    correct: `${m} kg`,
                                    options: genOpts(`${m} kg`, `${f*a} kg`, `${(parseFloat(m)+3).toFixed(1)} kg`, `${a/f} kg`)
                                };
                            }
                        ]
                    }
                ]
            },
            {
                id: "etapa2",
                title_es: "Etapa 2. Cinemática: Movimiento en una y dos dimensiones",
                title_en: "Stage 2. Kinematics: 1D and 2D Motion",
                desc_es: "Desde la caída libre hasta el tiro parabólico.",
                desc_en: "From free fall to projectile motion.",
                subtopics: [
                    {
                        title_es: "2.1 Caída de los cuerpos",
                        title_en: "2.1 Free fall of bodies",
                        lesson_es: "<p>Objetos soltados desde el reposo son afectados únicamente por la gravedad. <i>d = (g &times; t<sup>2</sup>) / 2</i>.</p>",
                        lesson_en: "<p>Objects dropped from rest are affected only by gravity. <i>d = (g &times; t<sup>2</sup>) / 2</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const t = Math.floor(Math.random() * 4) + 2;
                                const g = 9.8;
                                const d = ((g * t * t) / 2).toFixed(1);
                                return {
                                    q_es: `Si un sensor cae libremente por ${t}s, ¿qué distancia desciende? (Usa g=9.8)`,
                                    q_en: `If a sensor free-falls for ${t}s, what distance does it drop? (Use g=9.8)`,
                                    correct: `${d} m`,
                                    options: genOpts(`${d} m`, `${(g*t).toFixed(1)} m`, `${(parseFloat(d)+10).toFixed(1)} m`, `${(parseFloat(d)-5).toFixed(1)} m`)
                                };
                            },
                            () => {
                                const t = Math.floor(Math.random() * 5) + 1;
                                const vf = (9.8 * t).toFixed(1);
                                return {
                                    q_es: `Calcula la velocidad final de un objeto que cae libremente desde el reposo tras ${t}s. (g=9.8)`,
                                    q_en: `Calculate final velocity of an object free-falling from rest after ${t}s. (g=9.8)`,
                                    correct: `${vf} m/s`,
                                    options: genOpts(`${vf} m/s`, `${(9.8*t*t).toFixed(1)} m/s`, `${(parseFloat(vf)+5).toFixed(1)} m/s`, `${(9.8/t).toFixed(1)} m/s`)
                                };
                            },
                            () => ({
                                q_es: `Ignorando la resistencia del aire, en el vacío, ¿cuál cae más rápido: una pluma o un martillo?`,
                                q_en: `Ignoring air resistance, in a vacuum, which falls faster: a feather or a hammer?`,
                                correct_es: "Caen exactamente al mismo tiempo",
                                correct_en: "They fall at the exact same time",
                                options_es: genOpts("Caen exactamente al mismo tiempo", "El martillo por tener más masa", "La pluma por flotar", "Depende del volumen"),
                                options_en: genOpts("They fall at the exact same time", "The hammer because it has more mass", "The feather because it floats", "It depends on volume")
                            }),
                            () => {
                                const h = Math.floor(Math.random() * 80) + 20;
                                const t = Math.sqrt((2 * h) / 9.8).toFixed(2);
                                return {
                                    q_es: `¿Cuánto tiempo tarda un objeto en caer libremente desde una altura de ${h}m? (g=9.8)`,
                                    q_en: `How long does it take for an object to free fall from a height of ${h}m? (g=9.8)`,
                                    correct: `${t} s`,
                                    options: genOpts(`${t} s`, `${(h/9.8).toFixed(2)} s`, `${(parseFloat(t)+1.5).toFixed(2)} s`, `${(2*h/9.8).toFixed(2)} s`)
                                };
                            },
                            () => ({
                                q_es: `Al lanzar una pelota verticalmente hacia arriba, en el punto de altura máxima su velocidad es:`,
                                q_en: `When throwing a ball vertically upward, at its peak height its velocity is:`,
                                correct: "0 m/s",
                                options: genOpts("0 m/s", "9.8 m/s", "Máxima", "Igual a la velocidad inicial")
                            })
                        ]
                    },
                    {
                        title_es: "2.2 Aceleración gravitacional",
                        title_en: "2.2 Gravitational acceleration",
                        lesson_es: "<p>La dilatación del espacio-tiempo cerca de una masa masiva, como un agujero negro, genera un campo gravitatorio inmenso. En la Tierra, <i>g &asymp; 9.8 m/s<sup>2</sup></i>.</p>",
                        lesson_en: "<p>Spacetime dilation near a massive mass, like a black hole, generates an immense gravitational field. On Earth, <i>g &asymp; 9.8 m/s<sup>2</sup></i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const m = Math.floor(Math.random() * 50) + 10;
                                return {
                                    q_es: `Calcula el peso terrestre (W) de una masa de ${m}kg. W = m &times; g.`,
                                    q_en: `Calculate the Earth weight (W) of a ${m}kg mass. W = m &times; g.`,
                                    correct: `${(m * 9.8).toFixed(1)} N`,
                                    options: genOpts(`${(m * 9.8).toFixed(1)} N`, `${m} N`, `${(m * 10.8).toFixed(1)} N`, `${(m / 9.8).toFixed(1)} N`)
                                };
                            },
                            () => {
                                const w = Math.floor(Math.random() * 400) + 100;
                                const m = (w / 9.8).toFixed(1);
                                return {
                                    q_es: `Si un objeto pesa ${w}N en la Tierra, ¿cuál es su masa aproximada?`,
                                    q_en: `If an object weighs ${w}N on Earth, what is its approximate mass?`,
                                    correct: `${m} kg`,
                                    options: genOpts(`${m} kg`, `${(w*9.8).toFixed(1)} kg`, `${(parseFloat(m)+5).toFixed(1)} kg`, `${w} kg`)
                                };
                            },
                            () => ({
                                q_es: `En la Luna la gravedad es 1.62 m/s². Si llevas un objeto de 10 kg a la Luna, ¿cuál es su MASA allá?`,
                                q_en: `Moon gravity is 1.62 m/s². If you bring a 10 kg object to the Moon, what is its MASS there?`,
                                correct: "10 kg",
                                options: genOpts("10 kg", "16.2 kg", "1.62 kg", "98 kg")
                            }),
                            () => {
                                const m = Math.floor(Math.random() * 20) + 5;
                                const gMoon = 1.62;
                                return {
                                    q_es: `Calcula el peso en la Luna de un astronauta con masa de ${m}kg (g_luna = 1.62 m/s²).`,
                                    q_en: `Calculate the Moon weight of an astronaut with a mass of ${m}kg (g_moon = 1.62 m/s²).`,
                                    correct: `${(m * gMoon).toFixed(1)} N`,
                                    options: genOpts(`${(m * gMoon).toFixed(1)} N`, `${(m * 9.8).toFixed(1)} N`, `${m} N`, `${(m / gMoon).toFixed(1)} N`)
                                };
                            },
                            () => ({
                                q_es: `¿Cuál es el valor estándar promedio de la aceleración de la gravedad en la superficie terrestre?`,
                                q_en: `What is the average standard value of gravitational acceleration on Earth's surface?`,
                                correct: "9.8 m/s²",
                                options: genOpts("9.8 m/s²", "9.8 m/s", "10 kg", "1.6 m/s²")
                            })
                        ]
                    },
                    {
                        title_es: "2.3 Movimiento en dos dimensiones",
                        title_en: "2.3 Motion in two dimensions",
                        lesson_es: "<p>Descomposición vectorial usando el Teorema de Pitágoras y trigonometría para los ejes X y Y.</p>",
                        lesson_en: "<p>Vector decomposition using Pythagorean Theorem and trigonometry for X and Y axes.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `¿Qué función trigonométrica se usa típicamente para hallar el componente Y de un vector?`,
                                q_en: `What trigonometric function is typically used to find the Y component of a vector?`,
                                correct_es: "Seno",
                                correct_en: "Sine",
                                options_es: genOpts("Seno", "Coseno", "Tangente", "Secante"),
                                options_en: genOpts("Sine", "Cosine", "Tangent", "Secant")
                            }),
                            () => ({
                                q_es: `¿Qué función trigonométrica se usa para hallar el componente X de un vector inclinado un ángulo &theta; con la horizontal?`,
                                q_en: `What trigonometric function is used to find the X component of a vector inclined at an angle &theta; to the horizontal?`,
                                correct_es: "Coseno",
                                correct_en: "Cosine",
                                options_es: genOpts("Coseno", "Seno", "Tangente", "Cotangente"),
                                options_en: genOpts("Cosine", "Sine", "Tangent", "Cotangent")
                            }),
                            () => {
                                const vx = 3;
                                const vy = 4;
                                return {
                                    q_es: `Si un vector tiene componentes V_x=${vx} m/s y V_y=${vy} m/s, ¿cuál es su magnitud total?`,
                                    q_en: `If a vector has components V_x=${vx} m/s and V_y=${vy} m/s, what is its total magnitude?`,
                                    correct: "5 m/s",
                                    options: genOpts("5 m/s", "7 m/s", "1 m/s", "12 m/s")
                                };
                            },
                            () => ({
                                q_es: `En un movimiento 2D, las ecuaciones de movimiento en el eje X y el eje Y se analizan:`,
                                q_en: `In 2D motion, the motion equations along the X axis and Y axis are analyzed:`,
                                correct_es: "De forma independiente",
                                correct_en: "Independently",
                                options_es: genOpts("De forma independiente", "Sumando siempre sus valores", "Solo en el eje Y", "Exclusivamente con la masa"),
                                options_en: genOpts("Independently", "Always adding their values", "Only on the Y axis", "Exclusively with mass")
                            }),
                            () => {
                                const v = 20;
                                return {
                                    q_es: `Un proyectil se lanza a ${v} m/s en un ángulo de 30° (sen 30° = 0.5). Halla V_y inicial.`,
                                    q_en: `A projectile is launched at ${v} m/s at a 30° angle (sin 30° = 0.5). Find initial V_y.`,
                                    correct: "10 m/s",
                                    options: genOpts("10 m/s", "20 m/s", "5 m/s", "15 m/s")
                                };
                            }
                        ]
                    },
                    {
                        title_es: "2.4 Tiro horizontal",
                        title_en: "2.4 Horizontal projectile",
                        lesson_es: "<p>Velocidad inicial en Y es cero. En X la velocidad es constante (MRU). La trayectoria es una semiparábola.</p>",
                        lesson_en: "<p>Initial velocity in Y is zero. In X velocity is constant (URM). The trajectory is a semi-parabola.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `En un tiro horizontal, ¿cómo es la aceleración en el eje X (ignorando el aire)?`,
                                q_en: `In a horizontal projectile, how is the acceleration in the X axis (ignoring air)?`,
                                correct_es: "Cero",
                                correct_en: "Zero",
                                options_es: genOpts("Cero", "9.8 m/s2", "Constante positiva", "Negativa"),
                                options_en: genOpts("Zero", "9.8 m/s2", "Positive constant", "Negative")
                            }),
                            () => ({
                                q_es: `En un tiro horizontal, ¿qué tipo de movimiento se experimenta verticalmente en el eje Y?`,
                                q_en: `In a horizontal projectile, what type of motion is experienced vertically on the Y axis?`,
                                correct_es: "Caída libre",
                                correct_en: "Free fall",
                                options_es: genOpts("Caída libre", "MRU a velocidad constante", "Movimiento circular", "Reposo"),
                                options_en: genOpts("Free fall", "URM at constant velocity", "Circular motion", "At rest")
                            }),
                            () => ({
                                q_es: `¿Cuál es el valor de la velocidad inicial en Y (v_y0) en un tiro puramente horizontal?`,
                                q_en: `What is the initial Y velocity (v_y0) value in a purely horizontal launch?`,
                                correct: "0 m/s",
                                options: genOpts("0 m/s", "9.8 m/s", "Igual a v_x", "Infinita")
                            }),
                            () => {
                                const vx = Math.floor(Math.random() * 15) + 5;
                                const t = Math.floor(Math.random() * 4) + 2;
                                return {
                                    q_es: `Un objeto es lanzado horizontalmente a ${vx}m/s y tarda ${t}s en caer. ¿Qué alcance horizontal (x) logra?`,
                                    q_en: `An object is launched horizontally at ${vx}m/s and takes ${t}s to fall. What horizontal range (x) does it reach?`,
                                    correct: `${vx*t} m`,
                                    options: genOpts(`${vx*t} m`, `${vx+t} m`, `${(vx*t)/2} m`, `${vx} m`)
                                };
                            },
                            () => ({
                                q_es: `La trayectoria geométrica trazada por un objeto en tiro horizontal es una:`,
                                q_en: `The geometric trajectory traced by an object in horizontal launch is a:`,
                                correct_es: "Semiparábola",
                                correct_en: "Semi-parabola",
                                options_es: genOpts("Semiparábola", "Línea recta diagonal", "Circunferencia", "Hipérbola"),
                                options_en: genOpts("Semi-parabola", "Diagonal straight line", "Circumference", "Hyperbola")
                            })
                        ]
                    },
                    {
                        title_es: "2.5 Tiro parabólico",
                        title_en: "2.5 Parabolic projectile",
                        lesson_es: "<p>Movimiento completo proyectado a cierto ángulo. Requiere calcular <i>v<sub>x</sub> = v &times; cos(&theta;)</i> y <i>v<sub>y</sub> = v &times; sen(&theta;)</i>.</p>",
                        lesson_en: "<p>Full motion projected at a certain angle. Requires calculating <i>v<sub>x</sub> = v &times; cos(&theta;)</i> and <i>v<sub>y</sub> = v &times; sin(&theta;)</i>.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `Si lanzas un objeto a 10m/s con ángulo de 0 grados, ¿cuál es su velocidad inicial en Y (v_y)?`,
                                q_en: `If you launch an object at 10m/s with an angle of 0 degrees, what is its initial Y velocity (v_y)?`,
                                correct: "0 m/s",
                                options: genOpts("0 m/s", "10 m/s", "9.8 m/s", "5 m/s")
                            }),
                            () => ({
                                q_es: `En el punto más alto del tiro parabólico, ¿cuánto vale la componente vertical de la velocidad (v_y)?`,
                                q_en: `At the highest point of a parabolic trajectory, what is the value of the vertical velocity component (v_y)?`,
                                correct: "0 m/s",
                                options: genOpts("0 m/s", "Igual a v_x", "Máxima", "-9.8 m/s")
                            }),
                            () => ({
                                q_es: `¿A qué ángulo de lanzamiento se logra el alcance horizontal máximo (ignorando fricción del aire)?`,
                                q_en: `At what launch angle is the maximum horizontal range achieved (ignoring air friction)?`,
                                correct: "45°",
                                options: genOpts("45°", "90°", "30°", "60°")
                            }),
                            () => ({
                                q_es: `Durante todo el vuelo de un tiro parabólico (sin aire), la aceleración total es igual a:`,
                                q_en: `Throughout the flight of a parabolic motion (no air), total acceleration equals:`,
                                correct_es: "La aceleración de la gravedad (g), dirigida hacia abajo",
                                correct_en: "Gravitational acceleration (g), directed downward",
                                options_es: genOpts("La aceleración de la gravedad (g), dirigida hacia abajo", "Cero", "La velocidad inicial multiplicada por el ángulo", "Variable en cada punto"),
                                options_en: genOpts("Gravitational acceleration (g), directed downward", "Zero", "Initial velocity multiplied by angle", "Variable at each point")
                            }),
                            () => ({
                                q_es: `Dos ángulos de lanzamiento complementarios (ej. 30° y 60°) con la misma velocidad inicial producen:`,
                                q_en: `Two complementary launch angles (e.g., 30° and 60°) with the same initial velocity produce:`,
                                correct_es: "El mismo alcance horizontal",
                                correct_en: "The same horizontal range",
                                options_es: genOpts("El mismo alcance horizontal", "La misma altura máxima", "El mismo tiempo de vuelo", "Trayectorias idénticas"),
                                options_en: genOpts("The same horizontal range", "The same peak height", "The same flight time", "Identical trajectories")
                            })
                        ]
                    }
                ]
            },
            {
                id: "etapa3",
                title_es: "Etapa 3. Cinemática: Movimiento circular",
                title_en: "Stage 3. Kinematics: Circular Motion",
                desc_es: "Análisis de aceleración centrípeta y dinámica rotacional.",
                desc_en: "Analysis of centripetal acceleration and rotational dynamics.",
                subtopics: [
                    {
                        title_es: "3.1 Desplazamiento lineal y angular",
                        title_en: "3.1 Linear and angular displacement",
                        lesson_es: "<p>La relación fundamental en radianes. Desplazamiento lineal es igual al radio por el desplazamiento angular: <i>s = r &times; &theta;</i>.</p>",
                        lesson_en: "<p>The fundamental relationship in radians. Linear displacement equals radius times angular displacement: <i>s = r &times; &theta;</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const r = 2;
                                const theta = Math.floor(Math.random() * 5) + 2;
                                return {
                                    q_es: `Halla el desplazamiento lineal (s) si r=${r}m y el ángulo girado es ${theta} radianes.`,
                                    q_en: `Find linear displacement (s) if r=${r}m and rotated angle is ${theta} radians.`,
                                    correct: `${r*theta} m`,
                                    options: genOpts(`${r*theta} m`, `${r+theta} m`, `${(r*theta)/2} m`, `${theta/r} m`)
                                };
                            },
                            () => ({
                                q_es: `¿A cuántos radianes equivale una vuelta completa (360°)?`,
                                q_en: `How many radians correspond to a full turn (360°)?`,
                                correct: "2π rad",
                                options: genOpts("2π rad", "π rad", "π/2 rad", "4π rad")
                            }),
                            () => ({
                                q_es: `¿A cuántos grados sexagesimales equivale un ángulo de π radianes?`,
                                q_en: `How many sexagesimal degrees correspond to an angle of π radians?`,
                                correct: "180°",
                                options: genOpts("180°", "360°", "90°", "45°")
                            }),
                            () => {
                                const r = Math.floor(Math.random() * 5) + 3;
                                const theta = 3;
                                return {
                                    q_es: `Si una rueda de radio r=${r}m gira 3 radianes, ¿cuántos metros de arco recorre un punto en su borde?`,
                                    q_en: `If a wheel of radius r=${r}m rotates 3 radians, how many meters of arc does a point on its rim cover?`,
                                    correct: `${r*3} m`,
                                    options: genOpts(`${r*3} m`, `${r+3} m`, `${r} m`, `${r*6} m`)
                                };
                            },
                            () => ({
                                q_es: `El radián es una unidad adimensional que mide:`,
                                q_en: `The radian is a dimensionless unit measuring:`,
                                correct_es: "Ángulo plano",
                                correct_en: "Plane angle",
                                options_es: genOpts("Ángulo plano", "Fuerza rotacional", "Velocidad lineal", "Tiempo de giro"),
                                options_en: genOpts("Plane angle", "Rotational force", "Linear velocity", "Turn time")
                            })
                        ]
                    },
                    {
                        title_es: "3.2 Velocidad lineal y angular",
                        title_en: "3.2 Linear and angular velocity",
                        lesson_es: "<p>La velocidad angular se denota con &omega; (omega) medida en rad/s.</p>",
                        lesson_en: "<p>Angular velocity is denoted by &omega; (omega) measured in rad/s.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `¿Cuál es la unidad estándar en el sistema internacional para la velocidad angular?`,
                                q_en: `What is the standard international system unit for angular velocity?`,
                                correct: "rad/s",
                                options_es: genOpts("rad/s", "m/s", "RPM", "Grados/s"),
                                options_en: genOpts("rad/s", "m/s", "RPM", "Degrees/s")
                            }),
                            () => {
                                const theta = Math.floor(Math.random() * 20) + 10;
                                const t = Math.floor(Math.random() * 5) + 2;
                                const w = (theta / t).toFixed(1);
                                return {
                                    q_es: `Calcula la velocidad angular ω si se barren ${theta} radianes en ${t} segundos.`,
                                    q_en: `Calculate angular velocity ω if ${theta} radians are swept in ${t} seconds.`,
                                    correct: `${w} rad/s`,
                                    options: genOpts(`${w} rad/s`, `${theta*t} rad/s`, `${(parseFloat(w)+3).toFixed(1)} rad/s`, `${t/theta} rad/s`)
                                };
                            },
                            () => ({
                                q_es: `¿Qué significa la sigla RPM en el contexto de motores y discos?`,
                                q_en: `What does RPM stand for in the context of motors and disks?`,
                                correct_es: "Revoluciones Por Minuto",
                                correct_en: "Revolutions Per Minute",
                                options_es: genOpts("Revoluciones Por Minuto", "Radianes Por Metro", "Radianes Por Minuto", "Rotaciones Por Módulo"),
                                options_en: genOpts("Revolutions Per Minute", "Radians Per Meter", "Radians Per Minute", "Rotations Per Module")
                            }),
                            () => {
                                const w = Math.floor(Math.random() * 10) + 2;
                                const t = Math.floor(Math.random() * 6) + 2;
                                return {
                                    q_es: `Un disco gira a ω=${w} rad/s constantes. ¿Qué ángulo en radianes recorre en ${t} segundos?`,
                                    q_en: `A disk rotates at constant ω=${w} rad/s. What angle in radians does it cover in ${t} seconds?`,
                                    correct: `${w*t} rad`,
                                    options: genOpts(`${w*t} rad`, `${w/t} rad`, `${w+t} rad`, `${w*t*2} rad`)
                                };
                            },
                            () => ({
                                q_es: `En un disco sólido que gira, todos sus puntos tienen la misma:`,
                                q_en: `In a rotating solid disk, all of its points have the same:`,
                                correct_es: "Velocidad angular (ω)",
                                correct_en: "Angular velocity (ω)",
                                options_es: genOpts("Velocidad angular (ω)", "Velocidad tangencial (v)", "Aceleración centrípeta", "Distancia al centro"),
                                options_en: genOpts("Angular velocity (ω)", "Tangential velocity (v)", "Centripetal acceleration", "Distance to center")
                            })
                        ]
                    },
                    {
                        title_es: "3.3 Relación entre velocidad angular y tangencial",
                        title_en: "3.3 Angular and tangential velocity relation",
                        lesson_es: "<p>Conecta el mundo lineal con el circular. <i>v = &omega; &times; r</i>.</p>",
                        lesson_en: "<p>Connects the linear and circular worlds. <i>v = &omega; &times; r</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const w = Math.floor(Math.random() * 10) + 5;
                                const r = Math.floor(Math.random() * 4) + 1;
                                return {
                                    q_es: `Calcula la velocidad tangencial (v) si &omega;=${w} rad/s y r=${r}m.`,
                                    q_en: `Calculate tangential velocity (v) if &omega;=${w} rad/s and r=${r}m.`,
                                    correct: `${w*r} m/s`,
                                    options: genOpts(`${w*r} m/s`, `${w+r} m/s`, `${w/r} m/s`, `${(w*r)+5} m/s`)
                                };
                            },
                            () => {
                                const v = Math.floor(Math.random() * 30) + 10;
                                const r = Math.floor(Math.random() * 5) + 1;
                                const w = (v / r).toFixed(1);
                                return {
                                    q_es: `Encuentra la velocidad angular ω si v=${v}m/s y el radio de rotación es r=${r}m.`,
                                    q_en: `Find angular velocity ω if v=${v}m/s and rotation radius is r=${r}m.`,
                                    correct: `${w} rad/s`,
                                    options: genOpts(`${w} rad/s`, `${v*r} rad/s`, `${(parseFloat(w)+2).toFixed(1)} rad/s`, `${r/v} rad/s`)
                                };
                            },
                            () => ({
                                q_es: `En un carrusel, ¿quién experimenta una mayor velocidad tangencial (v)?`,
                                q_en: `On a carousel, who experiences a greater tangential velocity (v)?`,
                                correct_es: "La persona en el borde exterior",
                                correct_en: "The person on the outer edge",
                                options_es: genOpts("La persona en el borde exterior", "La persona cerca del centro", "Ambas experimentan la misma v", "La persona en reposo"),
                                options_en: genOpts("The person on the outer edge", "The person near the center", "Both experience the same v", "The person at rest")
                            }),
                            () => {
                                const w = 4;
                                const r1 = 2;
                                const r2 = 4;
                                return {
                                    q_es: `A ω=4 rad/s, calcula la velocidad tangencial para un punto a r=${r2}m comparado a uno a r=${r1}m.`,
                                    q_en: `At ω=4 rad/s, calculate tangential velocity for a point at r=${r2}m compared to one at r=${r1}m.`,
                                    correct: "16 m/s vs 8 m/s",
                                    options: genOpts("16 m/s vs 8 m/s", "8 m/s vs 16 m/s", "4 m/s vs 4 m/s", "12 m/s vs 6 m/s")
                                };
                            },
                            () => ({
                                q_es: `La fórmula que relaciona la velocidad tangencial (v), la angular (ω) y el radio (r) es:`,
                                q_en: `The formula relating tangential velocity (v), angular (ω) and radius (r) is:`,
                                correct: "v = ω · r",
                                options: genOpts("v = ω · r", "v = ω / r", "v = ω + r", "v = ω² · r")
                            })
                        ]
                    },
                    {
                        title_es: "3.4 Frecuencia y periodo",
                        title_en: "3.4 Frequency and period",
                        lesson_es: "<p>Periodo (T) es el tiempo en dar una vuelta. Frecuencia (f) es vueltas por segundo. Son inversos: <i>f = 1/T</i>. En microcontroladores, controlas el buzzer modificando esta frecuencia.</p>",
                        lesson_en: "<p>Period (T) is time for one revolution. Frequency (f) is revolutions per second. They are inverse: <i>f = 1/T</i>.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `Si el periodo de oscilación T es 0.5s, ¿cuál es su frecuencia en Hertz (Hz)?`,
                                q_en: `If oscillation period T is 0.5s, what is its frequency in Hertz (Hz)?`,
                                correct: "2 Hz",
                                options: genOpts("2 Hz", "0.5 Hz", "1 Hz", "5 Hz")
                            }),
                            () => {
                                const f = Math.floor(Math.random() * 50) + 10;
                                const t = (1 / f).toFixed(3);
                                return {
                                    q_es: `Si un motor gira a una frecuencia de ${f} Hz, ¿cuál es su periodo T?`,
                                    q_en: `If a motor rotates at a frequency of ${f} Hz, what is its period T?`,
                                    correct: `${t} s`,
                                    options: genOpts(`${t} s`, `${f} s`, `${(1/f + 0.05).toFixed(3)} s`, `${(f/100).toFixed(3)} s`)
                                };
                            },
                            () => ({
                                q_es: `Un objeto realiza 20 vueltas completas en 10 segundos. ¿Cuál es su frecuencia?`,
                                q_en: `An object completes 20 full revolutions in 10 seconds. What is its frequency?`,
                                correct: "2 Hz",
                                options: genOpts("2 Hz", "0.5 Hz", "200 Hz", "10 Hz")
                            }),
                            () => ({
                                q_es: `¿Cuál es la unidad del Periodo (T) en el Sistema Internacional de Unidades?`,
                                q_en: `What is the SI unit for Period (T)?`,
                                correct_es: "Segundo (s)",
                                correct_en: "Second (s)",
                                options_es: genOpts("Segundo (s)", "Hertz (Hz)", "Radianes", "Metros"),
                                options_en: genOpts("Second (s)", "Hertz (Hz)", "Radians", "Meters")
                            }),
                            () => ({
                                q_es: `Relación matemática correcta entre frecuencia (f) y periodo (T):`,
                                q_en: `Correct mathematical relationship between frequency (f) and period (T):`,
                                correct: "f = 1 / T",
                                options: genOpts("f = 1 / T", "f = T²", "f = 2π / T", "f = T + 1")
                            })
                        ]
                    },
                    {
                        title_es: "3.5 Fuerza y aceleración centrípeta",
                        title_en: "3.5 Centripetal force and acceleration",
                        lesson_es: "<p>La fuerza que mantiene a un objeto en órbita (jalando hacia el centro). <i>a<sub>c</sub> = v<sup>2</sup> / r</i>.</p>",
                        lesson_en: "<p>The force keeping an object in orbit (pulling to the center). <i>a<sub>c</sub> = v<sup>2</sup> / r</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const v = 4;
                                const r = 2;
                                return {
                                    q_es: `Halla la aceleración centrípeta si v=${v}m/s y el radio r=${r}m.`,
                                    q_en: `Find centripetal acceleration if v=${v}m/s and radius r=${r}m.`,
                                    correct: `${(v*v)/r} m/s2`,
                                    options: genOpts(`${(v*v)/r} m/s2`, `${v*r} m/s2`, `${v/r} m/s2`, `${(v*v)*r} m/s2`)
                                };
                            },
                            () => ({
                                q_es: `¿Hacia dónde apunta siempre la aceleración centrípeta en un movimiento circular?`,
                                q_en: `Where does centripetal acceleration always point in circular motion?`,
                                correct_es: "Hacia el centro de la trayectoria",
                                correct_en: "Towards the center of the path",
                                options_es: genOpts("Hacia el centro de la trayectoria", "Tangencial al movimiento", "Hacia afuera del círculo", "Paralela a la velocidad"),
                                options_en: genOpts("Towards the center of the path", "Tangential to motion", "Outwards from circle", "Parallel to velocity")
                            }),
                            () => {
                                const m = 2;
                                const ac = 5;
                                return {
                                    q_es: `Calcula la fuerza centrípeta requerida para mantener una masa de ${m}kg con a_c=${ac}m/s². (F_c = m·a_c)`,
                                    q_en: `Calculate centripetal force required to keep a ${m}kg mass with a_c=${ac}m/s². (F_c = m·a_c)`,
                                    correct: `${m*ac} N`,
                                    options: genOpts(`${m*ac} N`, `${m+ac} N`, `${ac/m} N`, `${m*ac*2} N`)
                                };
                            },
                            () => ({
                                q_es: `Si duplicas la velocidad tangencial (v) manteniendo el radio constante, la aceleración centrípeta:`,
                                q_en: `If you double tangential velocity (v) while keeping radius constant, centripetal acceleration:`,
                                correct_es: "Se cuadruplica (4x)",
                                correct_en: "Quadruples (4x)",
                                options_es: genOpts("Se cuadruplica (4x)", "Se duplica (2x)", "Se mantiene igual", "Se reduce a la mitad"),
                                options_en: genOpts("Quadruples (4x)", "Doubles (2x)", "Stays the same", "Halves")
                            }),
                            () => ({
                                q_es: `Si la fuerza centrípeta desaparece repentinamente mientras un objeto gira en círculo, el objeto:`,
                                q_en: `If centripetal force suddenly vanishes while an object rotates in a circle, the object:`,
                                correct_es: "Sale disparado en línea recta tangencial a la curva",
                                correct_en: "Flies off in a straight line tangential to the curve",
                                options_es: genOpts("Sale disparado en línea recta tangencial a la curva", "Cae directo al centro", "Se detiene al instante", "Sigue girando en círculo"),
                                options_en: genOpts("Flies off in a straight line tangential to the curve", "Falls straight to center", "Stops instantly", "Keeps rotating in a circle")
                            })
                        ]
                    },
                    {
                        title_es: "3.6 Dinámica rotacional. Momento de torsión",
                        title_en: "3.6 Rotational dynamics. Torque",
                        lesson_es: "<p>El Torque (&tau;) mide la capacidad de una fuerza para producir rotación. <i>&tau; = Fuerza &times; Brazo de palanca</i>.</p>",
                        lesson_en: "<p>Torque (&tau;) measures a force's ability to produce rotation. <i>&tau; = Force &times; Lever arm</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const f = Math.floor(Math.random() * 40) + 10;
                                const d = Math.floor(Math.random() * 3) + 1;
                                return {
                                    q_es: `Aplica una fuerza perpendicular de ${f}N a una distancia de ${d}m del pivote. Halla el torque.`,
                                    q_en: `Apply a perpendicular force of ${f}N at ${d}m from pivot. Find torque.`,
                                    correct: `${f*d} Nm`,
                                    options: genOpts(`${f*d} Nm`, `${f+d} Nm`, `${f/d} Nm`, `${(f*d)+10} Nm`)
                                };
                            },
                            () => ({
                                q_es: `¿Con qué ángulo de aplicación de la fuerza respecto al brazo de palanca se obtiene el torque máximo?`,
                                q_en: `At what angle of force application with respect to the lever arm is maximum torque achieved?`,
                                correct: "90°",
                                options: genOpts("90°", "0°", "180°", "45°")
                            }),
                            () => ({
                                q_es: `Unidad de medida del Torque o Momento de Fuerza en el Sistema Internacional:`,
                                q_en: `Unit of measure for Torque or Moment of Force in SI:`,
                                correct: "N·m",
                                options: genOpts("N·m", "N/m", "Joule/s", "N·m²")
                            }),
                            () => ({
                                q_es: `Si aplicas la fuerza directamente sobre el eje de giro (brazo de palanca d = 0), el torque resultante es:`,
                                q_en: `If you apply force directly on the pivot axis (lever arm d = 0), the resulting torque is:`,
                                correct: "0 N·m",
                                options: genOpts("0 N·m", "Máximo", "Igual a la fuerza", "Indeterminado")
                            }),
                            () => {
                                const tau = 50;
                                const d = 2;
                                return {
                                    q_es: `Para obtener un torque de 50 N·m a una distancia d=2m del pivote, ¿cuánta fuerza perpendicular se debe aplicar?`,
                                    q_en: `To get a torque of 50 N·m at a distance d=2m from pivot, how much perpendicular force must be applied?`,
                                    correct: "25 N",
                                    options: genOpts("25 N", "100 N", "50 N", "10 N")
                                };
                            }
                        ]
                    }
                ]
            },
            {
                id: "etapa4",
                title_es: "Etapa 4. Dinámica: Aplicaciones de Leyes de Newton",
                title_en: "Stage 4. Dynamics: Newton's Laws Applications",
                desc_es: "Fricción, diagramas de cuerpo libre y estática estructural.",
                desc_en: "Friction, free body diagrams, and structural statics.",
                subtopics: [
                    {
                        title_es: "4.1 Diagrama del cuerpo libre",
                        title_en: "4.1 Free body diagram",
                        lesson_es: "<p>Representación visual vectorial de todas las fuerzas actuando sobre un cuerpo (Peso, Normal, Tensión, Fricción).</p>",
                        lesson_en: "<p>Visual vector representation of all forces acting on a body (Weight, Normal, Tension, Friction).</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `En un DCL, ¿hacia dónde apunta siempre el vector del Peso (W)?`,
                                q_en: `In a FBD, where does the Weight (W) vector always point?`,
                                correct_es: "Directamente hacia abajo",
                                correct_en: "Directly downward",
                                options_es: genOpts("Directamente hacia abajo", "Perpendicular a la superficie", "En dirección del movimiento", "Hacia arriba"),
                                options_en: genOpts("Directly downward", "Perpendicular to the surface", "In direction of motion", "Upward")
                            }),
                            () => ({
                                q_es: `En un DCL, ¿hacia dónde se dibuja la Fuerza Normal?`,
                                q_en: `In a FBD, where is the Normal Force drawn?`,
                                correct_es: "Perpendicular a la superficie de contacto",
                                correct_en: "Perpendicular to contact surface",
                                options_es: genOpts("Perpendicular a la superficie de contacto", "Paralela al plano", "Siempre hacia abajo", "Opuesta a la gravedad independientemente del plano"),
                                options_en: genOpts("Perpendicular to contact surface", "Parallel to plane", "Always downward", "Opposite gravity regardless of plane")
                            }),
                            () => ({
                                q_es: `¿En qué dirección actúa la fuerza de fricción sobre una superficie horizontal?`,
                                q_en: `In what direction does friction force act on a horizontal surface?`,
                                correct_es: "Opuesta a la dirección del movimiento o del deslizamiento inminente",
                                correct_en: "Opposite to direction of motion or impending slide",
                                options_es: genOpts("Opuesta a la dirección del movimiento o del deslizamiento inminente", "Hacia el centro de la tierra", "Perpendicular al plano", "A favor del movimiento"),
                                options_en: genOpts("Opposite to direction of motion or impending slide", "Towards earth center", "Perpendicular to plane", "In favor of motion")
                            }),
                            () => ({
                                q_es: `Si tiras de un bloque suspendido mediante una cuerda, ¿cómo se denomina la fuerza transmitida a lo largo de la cuerda?`,
                                q_en: `If you pull a suspended block using a rope, what is the force transmitted along the rope called?`,
                                correct_es: "Tensión",
                                correct_en: "Tension",
                                options_es: genOpts("Tensión", "Fuerza Normal", "Fricción", "Torque"),
                                options_en: genOpts("Tension", "Normal Force", "Friction", "Torque")
                            }),
                            () => ({
                                q_es: `Al aislar un cuerpo para construir su DCL, ¿cuál de las siguientes fuerzas NO debe incluirse?`,
                                q_en: `When isolating a body to build its FBD, which of the following forces MUST NOT be included?`,
                                correct_es: "Las fuerzas que el objeto ejerce sobre otros cuerpos",
                                correct_en: "Forces exerted by the object onto other bodies",
                                options_es: genOpts("Las fuerzas que el objeto ejerce sobre otros cuerpos", "Su propio peso", "La fuerza de fricción con la superficie", "Las tensiones de las cuerdas unidas a él"),
                                options_en: genOpts("Forces exerted by the object onto other bodies", "Its own weight", "Friction force with surface", "Tensions of ropes attached to it")
                            })
                        ]
                    },
                    {
                        title_es: "4.2 Sumatorias de fuerzas en x y y",
                        title_en: "4.2 Force summation in x and y",
                        lesson_es: "<p>Las fuerzas oblicuas se dividen usando senos y cosenos para sumarse independientemente en ejes paralelos y perpendiculares.</p>",
                        lesson_en: "<p>Oblique forces are split using sines and cosines to be added independently on parallel and perpendicular axes.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `Si la fuerza neta en el eje X es cero (&sum;F<sub>x</sub> = 0), ¿qué estado describe?`,
                                q_en: `If net force on X axis is zero (&sum;F<sub>x</sub> = 0), what state does it describe?`,
                                correct_es: "Equilibrio u MRU en X",
                                correct_en: "Equilibrium or URM in X",
                                options_es: genOpts("Equilibrio u MRU en X", "Aceleración máxima", "Caída libre", "Fricción nula"),
                                options_en: genOpts("Equilibrium or URM in X", "Maximum acceleration", "Free fall", "Zero friction")
                            }),
                            () => {
                                const f1 = Math.floor(Math.random() * 30) + 10;
                                const f2 = Math.floor(Math.random() * 30) + 10;
                                return {
                                    q_es: `Dos fuerzas horizontales actúan sobre un cuerpo en direcciones opuestas: F1=${f1}N a la derecha y F2=${f2}N a la izquierda. Calcula la fuerza neta.`,
                                    q_en: `Two horizontal forces act on a body in opposite directions: F1=${f1}N right and F2=${f2}N left. Calculate net force magnitude.`,
                                    correct: `${Math.abs(f1 - f2)} N`,
                                    options: genOpts(`${Math.abs(f1 - f2)} N`, `${f1 + f2} N`, `${f1 * f2} N`, `${Math.abs(f1 - f2) + 5} N`)
                                };
                            },
                            () => ({
                                q_es: `Al analizar un plano inclinado, ¿cuál es el componente del peso que tiende a hacer deslizar al objeto plano abajo?`,
                                q_en: `When analyzing an inclined plane, what component of weight tends to slide the object down the plane?`,
                                correct_es: "W · sen(θ)",
                                correct_en: "W · sin(θ)",
                                options_es: genOpts("W · sen(θ)", "W · cos(θ)", "W / tan(θ)", "W · g"),
                                options_en: genOpts("W · sin(θ)", "W · cos(θ)", "W / tan(θ)", "W · g")
                            }),
                            () => ({
                                q_es: `En un plano inclinado, ¿cuál componente del peso se equilibra directamente con la fuerza Normal (sin otras fuerzas externas)?`,
                                q_en: `On an inclined plane, which weight component balances directly with Normal force (no other external forces)?`,
                                correct_es: "W · cos(θ)",
                                correct_en: "W · cos(θ)",
                                options_es: genOpts("W · cos(θ)", "W · sen(θ)", "W · tan(θ)", "W"),
                                options_en: genOpts("W · cos(θ)", "W · sin(θ)", "W · tan(θ)", "W")
                            }),
                            () => {
                                const f1 = 10;
                                const f2 = 15;
                                const f3 = 5;
                                return {
                                    q_es: `Tres fuerzas tiran a la derecha: 10N, 15N y 5N. ¿Qué fuerza única hacia la izquierda mantendrá el sistema en equilibrio (&sum;F_x=0)?`,
                                    q_en: `Three forces pull right: 10N, 15N, and 5N. What single leftward force keeps the system in equilibrium (&sum;F_x=0)?`,
                                    correct: "30 N",
                                    options: genOpts("30 N", "15 N", "10 N", "50 N")
                                };
                            }
                        ]
                    },
                    {
                        title_es: "4.3 Aplicación al análisis del movimiento",
                        title_en: "4.3 Application to motion analysis",
                        lesson_es: "<p>Interconecta <i>F=ma</i> con las fórmulas de cinemática para descubrir velocidades finales a través del análisis de tensiones y fuerzas normales.</p>",
                        lesson_en: "<p>Interconnects <i>F=ma</i> with kinematics formulas to discover final velocities through normal forces and tension analysis.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `¿A qué es igual la Fuerza Normal de un objeto plano en reposo horizontal que no sufre otras fuerzas en Y?`,
                                q_en: `What is the Normal Force equal to for a flat object at horizontal rest suffering no other Y forces?`,
                                correct_es: "A su Peso (mg)",
                                correct_en: "To its Weight (mg)",
                                options_es: genOpts("A su Peso (mg)", "A cero", "A su aceleración", "A la fricción"),
                                options_en: genOpts("To its Weight (mg)", "To zero", "To its acceleration", "To friction")
                            }),
                            () => {
                                const m = Math.floor(Math.random() * 10) + 2;
                                const f = Math.floor(Math.random() * 40) + 10;
                                const a = f / m;
                                const t = 2;
                                const vf = (a * t).toFixed(1);
                                return {
                                    q_es: `Una fuerza horizontal de ${f}N acelera una masa de ${m}kg desde el reposo en una superficie lisa. ¿Qué velocidad alcanza tras ${t}s?`,
                                    q_en: `A horizontal force of ${f}N accelerates a ${m}kg mass from rest on a smooth surface. What velocity does it reach after ${t}s?`,
                                    correct: `${vf} m/s`,
                                    options: genOpts(`${vf} m/s`, `${(f/m).toFixed(1)} m/s`, `${(parseFloat(vf)+4).toFixed(1)} m/s`, `${f*t} m/s`)
                                };
                            },
                            () => ({
                                q_es: `Si la fuerza neta sobre un objeto disminuye a la mitad manteniendo la masa constante, su aceleración...`,
                                q_en: `If the net force on an object is halved while keeping mass constant, its acceleration...`,
                                correct_es: "Se reduce a la mitad",
                                correct_en: "Is halved",
                                options_es: genOpts("Se reduce a la mitad", "Se duplica", "Se mantiene constante", "Cae a cero"),
                                options_en: genOpts("Is halved", "Doubles", "Remains constant", "Drops to zero")
                            }),
                            () => {
                                const m = 5;
                                const fPull = 30;
                                const fFric = 10;
                                const a = (fPull - fFric) / m;
                                return {
                                    q_es: `Jalas un bloque de 5kg con F_empuje=30N sufriendo F_fricción=10N. ¿Cuál es su aceleración neta?`,
                                    q_en: `You pull a 5kg block with F_pull=30N experiencing F_friction=10N. What is its net acceleration?`,
                                    correct: `${a} m/s2`,
                                    options: genOpts(`${a} m/s2`, "6 m/s2", "2 m/s2", "8 m/s2")
                                };
                            },
                            () => ({
                                q_es: `Un ascensor sube a velocidad constante. La fuerza ejercida por el cable (tensión T) comparada con el peso (W) es:`,
                                q_en: `An elevator ascends at constant velocity. The force exerted by the cable (tension T) compared to weight (W) is:`,
                                correct_es: "T es exactamente igual a W",
                                correct_en: "T is exactly equal to W",
                                options_es: genOpts("T es exactamente igual a W", "T es mayor que W", "T es menor que W", "T es cero"),
                                options_en: genOpts("T is exactly equal to W", "T is greater than W", "T is less than W", "T is zero")
                            })
                        ]
                    },
                    {
                        title_es: "4.4 Fuerza de fricción",
                        title_en: "4.4 Friction force",
                        lesson_es: "<p>Fuerza opositora generada por la rugosidad de las superficies. <i>F<sub>k</sub> = &mu;<sub>k</sub> &times; Normal</i>.</p>",
                        lesson_en: "<p>Opposing force generated by surface roughness. <i>F<sub>k</sub> = &mu;<sub>k</sub> &times; Normal</i>.</p>",
                        getProblemsPool: () => [
                            () => {
                                const mu = 0.5;
                                const n = Math.floor(Math.random() * 100) + 50;
                                return {
                                    q_es: `Calcula la fricción cinética si el coeficiente &mu;<sub>k</sub>=${mu} y la Fuerza Normal es ${n}N.`,
                                    q_en: `Calculate kinetic friction if coefficient &mu;<sub>k</sub>=${mu} and Normal Force is ${n}N.`,
                                    correct: `${mu*n} N`,
                                    options: genOpts(`${mu*n} N`, `${n} N`, `${(mu*n)+10} N`, `${n/mu} N`)
                                };
                            },
                            () => ({
                                q_es: `¿Cómo se compara generalmente el coeficiente de fricción estática (μ_s) con el coeficiente de fricción cinética (μ_k) para el mismo par de materiales?`,
                                q_en: `How does the static friction coefficient (μ_s) generally compare to the kinetic friction coefficient (μ_k) for the same materials?`,
                                correct_es: "μ_s es mayor que μ_k",
                                correct_en: "μ_s is greater than μ_k",
                                options_es: genOpts("μ_s es mayor que μ_k", "μ_s es menor que μ_k", "Son exactamente iguales", "μ_k siempre es el doble de μ_s"),
                                options_en: genOpts("μ_s is greater than μ_k", "μ_s is less than μ_k", "They are exactly equal", "μ_k is always double μ_s")
                            }),
                            () => {
                                const n = Math.floor(Math.random() * 80) + 20;
                                const fk = Math.floor(Math.random() * 15) + 5;
                                const mu = (fk / n).toFixed(2);
                                return {
                                    q_es: `Si una fuerza de fricción cinética de ${fk}N actúa con una Normal de ${n}N, halla el coeficiente &mu;<sub>k</sub>.`,
                                    q_en: `If a kinetic friction force of ${fk}N acts with a Normal of ${n}N, find the coefficient &mu;<sub>k</sub>.`,
                                    correct: mu,
                                    options: genOpts(mu, (parseFloat(mu)+0.15).toFixed(2), (n/fk).toFixed(2), (parseFloat(mu)-0.05).toFixed(2))
                                };
                            },
                            () => ({
                                q_es: `La fuerza de fricción estática actúa cuando un objeto sobre una superficie:`,
                                q_en: `Static friction force acts when an object on a surface is:`,
                                correct_es: "En reposo, oponiéndose al inicio del movimiento",
                                correct_en: "At rest, opposing the start of motion",
                                options_es: genOpts("En reposo, oponiéndose al inicio del movimiento", "Ya se está deslizando a alta velocidad", "Volando libremente por el aire", "Acelerando uniformemente en el vacío"),
                                options_en: genOpts("At rest, opposing the start of motion", "Already sliding at high speed", "Flying freely through air", "Accelerating uniformly in vacuum")
                            }),
                            () => ({
                                q_es: `Si aumentas el área de contacto entre dos bloques de igual masa y material sobre una mesa, la fuerza de fricción:`,
                                q_en: `If you increase the contact area between two blocks of equal mass and material on a table, friction force:`,
                                correct_es: "Se mantiene prácticamente independiente del área de contacto",
                                correct_en: "Remains practically independent of contact area",
                                options_es: genOpts("Se mantiene prácticamente independiente del área de contacto", "Aumenta proporcionalmente al área", "Disminuye a la mitad", "Cae a cero"),
                                options_en: genOpts("Remains practically independent of contact area", "Increases proportionally to area", "Halves", "Drops to zero")
                            })
                        ]
                    },
                    {
                        title_es: "4.5 Estática",
                        title_en: "4.5 Statics",
                        lesson_es: "<p>Estudio de los cuerpos en reposo absoluto. Primera Condición de Equilibrio: La suma de todas las fuerzas debe ser rigurosamente igual a cero vectorial.</p>",
                        lesson_en: "<p>Study of bodies in absolute rest. First Condition of Equilibrium: The sum of all forces must be rigorously equal to zero vectorially.</p>",
                        getProblemsPool: () => [
                            () => ({
                                q_es: `Según la estática, si un puente está colgando sin moverse, la sumatoria de fuerzas verticales es...`,
                                q_en: `According to statics, if a bridge is hanging without moving, the sum of vertical forces is...`,
                                correct_es: "Exactamente cero",
                                correct_en: "Exactly zero",
                                options_es: genOpts("Exactamente cero", "Positiva hacia arriba", "Igual a la gravedad", "Negativa"),
                                options_en: genOpts("Exactly zero", "Positive upward", "Equal to gravity", "Negative")
                            }),
                            () => ({
                                q_es: `Para que un objeto rígido se encuentre en equilibrio traslacional Y rotacional completo, se debe cumplir que:`,
                                q_en: `For a rigid object to be in full translational AND rotational equilibrium, it must satisfy:`,
                                correct_es: "∑F = 0 y ∑τ = 0",
                                correct_en: "∑F = 0 and ∑τ = 0",
                                options_es: genOpts("∑F = 0 y ∑τ = 0", "Solo ∑F = 0", "Solo ∑τ = 0", "∑F = m·a y ∑τ = I·α"),
                                options_en: genOpts("∑F = 0 and ∑τ = 0", "Only ∑F = 0", "Only ∑τ = 0", "∑F = m·a and ∑τ = I·α")
                            }),
                            () => {
                                const w = Math.floor(Math.random() * 500) + 100;
                                return {
                                    q_es: `Un objeto de ${w}N cuelga en reposo mediante dos cuerdas verticales simétricas. ¿Cuál es la tensión en cada cuerda?`,
                                    q_en: `An object weighing ${w}N hangs at rest from two symmetrical vertical ropes. What is the tension in each rope?`,
                                    correct: `${w/2} N`,
                                    options: genOpts(`${w/2} N`, `${w} N`, `${w*2} N`, `${w/4} N`)
                                };
                            },
                            () => ({
                                q_es: `La primera condición de equilibrio garantiza que un objeto no tenga:`,
                                q_en: `The first condition of equilibrium guarantees that an object has no:`,
                                correct_es: "Aceleración traslacional",
                                correct_en: "Translational acceleration",
                                options_es: genOpts("Aceleración traslacional", "Masa", "Velocidad angular", "Fuerzas actuando sobre él"),
                                options_en: genOpts("Translational acceleration", "Mass", "Angular velocity", "Forces acting on it")
                            }),
                            () => ({
                                q_es: `Un sube y baja está equilibrado horizontalmente con un niño de 30kg a 2m del centro. ¿A qué distancia debe sentarse un niño de 20kg del otro lado?`,
                                q_en: `A seesaw is balanced horizontally with a 30kg child 2m from center. How far must a 20kg child sit on the other side?`,
                                correct: "3 m",
                                options: genOpts("3 m", "2 m", "4 m", "1.5 m")
                            })
                        ]
                    }
                ]
            }
        ]
    }
};


btnLang.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    updateLanguageDisplay();
});

function updateLanguageDisplay() {
    const esElements = document.querySelectorAll('[class*="-es"]');
    const enElements = document.querySelectorAll('[class*="-en"]');
    const esTexts = document.querySelectorAll('.es-text');
    const enTexts = document.querySelectorAll('.en-text');

    if (currentLang === 'es') {
        esElements.forEach(el => el.classList.remove('hidden'));
        enElements.forEach(el => el.classList.add('hidden'));
        esTexts.forEach(el => el.classList.remove('hidden'));
        enTexts.forEach(el => el.classList.add('hidden'));
    } else {
        esElements.forEach(el => el.classList.add('hidden'));
        enElements.forEach(el => el.classList.remove('hidden'));
        esTexts.forEach(el => el.classList.add('hidden'));
        enTexts.forEach(el => el.classList.remove('hidden'));
    }

    if(!dynamicView.classList.contains('hidden')) {
        renderCurrentDynamicContent();
    }
}

btnTheme.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        btnTheme.textContent = currentLang === 'es' ? 'Modo Claro' : 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        btnTheme.textContent = currentLang === 'es' ? 'Modo Oscuro' : 'Dark Mode';
    }
});

let currentSubjectData = null;
let currentRenderType = null;
let currentSubtopicData = null;

subjectCards.forEach(card => {
    card.addEventListener('click', () => {
        const subjectKey = card.getAttribute('data-subject');
        openSubjectView(subjectKey);
    });
});

backBtn.addEventListener('click', () => {
    if (currentRenderType === 'lesson') {
        currentRenderType = 'topics';
        renderCurrentDynamicContent();
    } else {
        homeView.classList.remove('hidden');
        dynamicView.classList.add('hidden');
        currentRenderType = null;
    }
});

function openSubjectView(subjectKey) {
    currentSubjectData = database[subjectKey];
    homeView.classList.add('hidden');
    dynamicView.classList.remove('hidden');
    currentRenderType = 'topics';
    renderCurrentDynamicContent();
}

function renderCurrentDynamicContent() {
    contentArea.innerHTML = '';

    if (currentRenderType === 'topics') {
        backBtn.textContent = currentLang === 'es' ? 'Volver al Menú' : 'Back to Menu';

        const title = document.createElement('h2');
        title.className = 'center-text';
        title.style.fontSize = '2.5rem';
        title.textContent = currentLang === 'es' ? currentSubjectData.title_es : currentSubjectData.title_en;
        contentArea.appendChild(title);

        const desc = document.createElement('p');
        desc.className = 'center-text';
        desc.style.fontSize = '1.2rem';
        desc.style.marginBottom = '3rem';
        desc.textContent = currentLang === 'es' ? currentSubjectData.desc_es : currentSubjectData.desc_en;
        contentArea.appendChild(desc);

        const topicList = document.createElement('div');
        topicList.className = 'topic-list';

        currentSubjectData.topics.forEach(topic => {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';

            const topicTitle = document.createElement('h3');
            topicTitle.className = 'topic-title';
            topicTitle.textContent = currentLang === 'es' ? topic.title_es : topic.title_en;

            const topicDesc = document.createElement('p');
            topicDesc.textContent = currentLang === 'es' ? topic.desc_es : topic.desc_en;

            topicItem.appendChild(topicTitle);
            topicItem.appendChild(topicDesc);

            const subtopicList = document.createElement('div');
            subtopicList.className = 'subtopic-list';

            topic.subtopics.forEach(sub => {
                const subItem = document.createElement('div');
                subItem.className = 'subtopic-item';
                subItem.textContent = currentLang === 'es' ? sub.title_es : sub.title_en;
                subItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLesson(sub);
                });
                subtopicList.appendChild(subItem);
            });

            topicItem.appendChild(subtopicList);
            topicList.appendChild(topicItem);
        });

        contentArea.appendChild(topicList);
    }
    else if (currentRenderType === 'lesson') {
        backBtn.textContent = currentLang === 'es' ? 'Volver al Índice' : 'Back to Index';
        renderLessonView();
    }
}

let activeLessonsData = {};

function resetSubtopicProblems(subtopicData) {
    const subId = subtopicData.title_en;
    const problems = [];

    if (subtopicData.getProblemsPool) {
        const pool = subtopicData.getProblemsPool();
        const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 5; i++) {
            const generator = shuffledPool[i % shuffledPool.length];
            problems.push({
                data: generator(),
                userAnswer: null
            });
        }
    } else {
        for (let i = 0; i < 5; i++) {
            problems.push({
                data: subtopicData.generateProblem(),
                userAnswer: null
            });
        }
    }

    activeLessonsData[subId] = problems;
}

function openLesson(subtopicData) {
    currentSubtopicData = subtopicData;
    const subId = subtopicData.title_en;
    if (!activeLessonsData[subId]) {
        resetSubtopicProblems(subtopicData);
    }
    currentRenderType = 'lesson';
    renderCurrentDynamicContent();
    window.scrollTo(0, 0);
}

function renderLessonView() {
    const title = document.createElement('h2');
    title.className = 'lesson-title center-text';
    title.textContent = currentLang === 'es' ? currentSubtopicData.title_es : currentSubtopicData.title_en;

    const lessonBox = document.createElement('div');
    lessonBox.className = 'lesson-box';
    lessonBox.innerHTML = currentLang === 'es' ? currentSubtopicData.lesson_es : currentSubtopicData.lesson_en;

    contentArea.appendChild(title);
    contentArea.appendChild(lessonBox);

    const exerciseHeader = document.createElement('h3');
    exerciseHeader.className = 'center-text';
    exerciseHeader.style.marginTop = '4rem';
    exerciseHeader.style.fontSize = '1.8rem';
    exerciseHeader.textContent = currentLang === 'es' ? 'Test de Comprensión (5 Ejercicios Generativos)' : 'Comprehension Test (5 Generative Exercises)';
    contentArea.appendChild(exerciseHeader);

    const resetContainer = document.createElement('div');
    resetContainer.style.textAlign = 'center';
    resetContainer.style.marginBottom = '2rem';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn';
    resetBtn.textContent = currentLang === 'es' ? 'Reiniciar Ejercicios' : 'Reset Exercises';
    resetBtn.addEventListener('click', () => {
        resetSubtopicProblems(currentSubtopicData);
        renderCurrentDynamicContent();
    });
    resetContainer.appendChild(resetBtn);
    contentArea.appendChild(resetContainer);

    const subId = currentSubtopicData.title_en;
    const problems = activeLessonsData[subId];

    problems.forEach((probState, i) => {
        renderProblem(probState, i + 1);
    });
}

function renderProblem(probState, index) {
    const probData = probState.data;
    const container = document.createElement('div');
    container.className = 'problem-container';

    const qText = document.createElement('div');
    qText.className = 'problem-text';
    qText.innerHTML = `${index}. ` + (currentLang === 'es' ? probData.q_es : probData.q_en);
    container.appendChild(qText);

    const grid = document.createElement('div');
    grid.className = 'options-grid';

    const feedback = document.createElement('div');
    feedback.className = 'feedback';

    const hasLangOptions = !!probData.options_es;
    const options = hasLangOptions
        ? (currentLang === 'es' ? probData.options_es : probData.options_en)
        : probData.options;
    const correct = hasLangOptions
        ? (currentLang === 'es' ? probData.correct_es : probData.correct_en)
        : probData.correct;

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt;

        if (probState.userAnswer !== null) {
            btn.disabled = true;
            if (String(opt) === String(probState.userAnswer)) {
                if (String(opt) === String(correct)) {
                    btn.classList.add('correct-ans');
                } else {
                    btn.classList.add('incorrect-ans');
                }
            } else if (String(opt) === String(correct)) {
                btn.classList.add('correct-ans');
            }
        }

        btn.addEventListener('click', () => {
            probState.userAnswer = opt;
            const allBtns = grid.querySelectorAll('.option-btn');
            allBtns.forEach(b => b.disabled = true);

            if (String(opt) === String(correct)) {
                btn.classList.add('correct-ans');
                feedback.textContent = currentLang === 'es' ? '¡Correcto!' : 'Correct!';
                feedback.style.color = 'var(--correct)';
            } else {
                btn.classList.add('incorrect-ans');
                feedback.innerHTML = currentLang === 'es' ? `Incorrecto. Solución analítica: <strong>${correct}</strong>` : `Incorrect. Analytical solution: <strong>${correct}</strong>`;
                feedback.style.color = 'var(--incorrect)';
                allBtns.forEach(b => {
                    if(String(b.innerHTML) === String(correct)) b.classList.add('correct-ans');
                });
            }
        });
        grid.appendChild(btn);
    });

    if (probState.userAnswer !== null) {
        if (String(probState.userAnswer) === String(correct)) {
            feedback.textContent = currentLang === 'es' ? '¡Correcto!' : 'Correct!';
            feedback.style.color = 'var(--correct)';
        } else {
            feedback.innerHTML = currentLang === 'es' ? `Incorrecto. Solución analítica: <strong>${correct}</strong>` : `Incorrect. Analytical solution: <strong>${correct}</strong>`;
            feedback.style.color = 'var(--incorrect)';
        }
    }

    container.appendChild(grid);
    container.appendChild(feedback);
    contentArea.appendChild(container);
}