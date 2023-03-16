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
const generarFilaDatosAlumno = (alumno) => {
    if( alumno != undefined && alumno != null ){
        let filaAlumno = new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "hola"
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
                                    text: "hola"
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
                                    text: "hola"
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
                                    text: "hola"
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
                                    text: "hola"
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
                                    text: "hola"
                                })
                            ]
                        })
                    ]
                }),
            ]
        });
        return filaAlumno
    }
    return;
}
const generarTablaDatosAlumno = (alumno) => {
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
                                        text: "Estudiante"
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
                                        text: "Cedula"
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
                                        text: "Titulo trabajo de grado"
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
                                        text: "Tutor"
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
                                        text: "Jurado 1 "
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
                                        text: "Jurado 2"
                                    })
                                ]
                            })
                        ]
                    }),
                ]
            }),
            generarFilaDatosAlumno(arrayPrueba[0]),
        ]
    })
    return tabla
}
export const notificacion_designacion_j = (notificacion) => {
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
                            text: "Inserte la fecha aqui"
                        })
                    ],
                    alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Profesor: [Inserte datos de profesor aqui]"
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Me es grato dirigirme a Usted en oportunidad de informarle que en Consejo de Escuela N° [Inserte consejo de escuela aqui] de [Inserte fecha de CDE aqui], ha sido designado como jurado del siguiente Trabajo de Grado:`
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED
                }),
                generarTablaDatosAlumno(),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Para la revisión y evaluación de este Trabajo de Grado se anexan los siguientes documentos:"
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "Informe del Trabajo de Grado"
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "Guía para el Jurador Examinador, el cual contiene un extracto del Reglamento de Trabajos de Grado de la Facultad de Ingeniería relativo a evaluación y criterios a ser evaluados."
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "Planillas de evaluación del trabajo de grado editable, prellenadas con los datos del TG y del(los) estudiante(s)"
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "Planilla de evaluación del final editable, prellenada con los datos de la propuesta y del(los) estudiante(s) (solo a utilizar por el presidente del jurado)"
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Las Planillas de evaluación estarán impresas y disponibles para ser retiradas en La Escuela de Ingeniería Informática, cuando usted guste. "
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "La presentación oral será fijada para la segunda semana del mes de noviembre 2022, de acuerdo a la disponibilidad de los participantes. Posteriormente se le informará el lugar, fecha y hora de la misma."
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "De antemano la Escuela de Ingeniería Informática desea expresarle un especial agradecimiento por su colaboración en la evaluación de este Trabajo de Grado."
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Saludándole cordialmente"
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Atentamente,"
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Luz E. Medina C"
                        })
                    ]
                }),
            ]
        }]
    });
    const nombre_archivo = "Notificacion de designacion de jurado"
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}

