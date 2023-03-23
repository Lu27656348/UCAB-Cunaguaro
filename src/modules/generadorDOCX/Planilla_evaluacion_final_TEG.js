import * as docx from 'docx';
import file_saver from 'file-saver'
const { saveAs } = file_saver
// Load the full build.
import lodash from 'lodash';
const { _ } =  lodash;
const { TableRow,BorderStyle } = docx;
const { WidthType,Paragraph } = docx;
const { VerticalAlign, Document } = docx;
const { TextRun, AlignmentType } = docx;
const { SectionType, Header } = docx;
const { HeightRule,TableCell } = docx;
const { Footer, LineRuleType } = docx;
const { Table, PageBreak } = docx;
const { HeadingLevel,Packer } = docx;
const arrayPrueba = [
    {nombres: "Luis Carlos"},
]
const generarTablaDeNotas = () => {
    const tabla = new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
    })
}
const generarFilaAlumno = (nombre_alumno) => {
    const fila = new TableRow({
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: nombre_alumno
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
        ]
    })

    return fila
}
const generarTablaPonderacion = () => {
    const tabla = new Table({
        width: {
            size: 10000,
            type: WidthType.DXA,
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Alumno 1"
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "<<Presidente Jurado>> (TOTAL A+B1)"
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 2500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "<<Jurado 2>> (TOTAL A+B1)"
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "<<Tutor>> (TOTAL A+B+C1)"
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Total sobre 300"
                                    })
                                ]
                            })
                        ]
                    }),
                ]
            }),
            generarFilaAlumno("Luis Carlos")
        ]
    })
    return tabla
}
const generarLinea = () => {
    const linea = new TableRow({
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
        ]
    })
    return linea;
}
export const planilla_evaluacion_final_TEG = (notificacion) => {
    console.log(notificacion)
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir San Vicente",
        title: "Carta de notificacion de Jurado - Dirigida a profesor jurado",
        description: "Carta de designación - Tutor de propuesta de trabajo de grado experimental",
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 30,
                        bold: true,
                        italics: true,
                        color: "FF0000",
                    },
                    paragraph: {
                        spacing: {
                            after: 200,
                        },
                    },
                },
            },
            paragraphStyles: [
                {
                    id: "aside",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 20,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                },
                {
                    id: "despedida",
                    name: "Despedida",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 26,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                }
            ]
        },
        sections: [{
            properties: {
                type:  SectionType.CONTINUOUS,
                margin: {
                    top: 150,
                    right: 150,
                    bottom: 150,
                    left: 150,
                }
            },
            headers: {
                default: new  Header({
                    children: [new  Paragraph({
                        children: [
                            /*
                            new  ImageRun({
                                data: fs.readFileSync('logo.png'),
                                transformation: {
                                    width: 400,
                                    height: 100,
                                },
                            }),
                            */
                        ],
                        alignment:  AlignmentType.LEFT
                    })],
                }),
            },
            footers: {
                default: new  Footer({
                    children: [
                        new  Paragraph({
                            children: [
                                /*
                                new  ImageRun({
                                    data: fs.readFileSync('Untitled.png'),
                                    transformation: {
                                        width: 600,
                                        height: 15,
                                    },
                                    alignment:  AlignmentType.CENTER
                                }),
                                */
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "UNIVERSIDAD CATÓLICA ANDRÉS BELLO – Extensión Guayana",
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "Avenida Atlántico, Ciudad Guayana 8050",
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "Bolívar, Venezuela. Teléfono: +58-286-6000111"
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "URL: http://www.guayanaweb.ucab.edu.ve/escuela-de-ingenieria-informatica.html"
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        })
                    ],
                }),
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Planilla de Evaluación Final de Trabajo Experimental de Grado (TEG)"
                        })
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Table({
                    columnWidths: [3000, 7000],
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 3000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Titulo TIG"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 7000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "[Inserte el titulo del trabajo de grado aqui]"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        })
                    ]
                }),
                generarTablaPonderacion(),
                generarTablaPonderacion(),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Nota Definitiva (base 20 según tabla anexa)"
                        })
                    ]
                }),
                /*Inserte la linea de alumnos aqui */
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Mención Honorífica Justificación:"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Nota 19 ó 20 y acuerdo unánime del jurado"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        //Espacio

                    ]
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Mención Publicación Justificación:"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Nota 20 y acuerdo unánime del jurado"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        //Espacio
                    ]
                }),
                //Insertar tabla de ponderacion

            ]
        }]
    });
    const nombre_archivo = "Planilla de evaluacion final (TEG)"
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}

