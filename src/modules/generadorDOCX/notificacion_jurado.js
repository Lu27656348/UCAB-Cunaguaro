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
export const notificacion_jurado = (notificacion) => {
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
                /*Generar funcion para imprimir estudiantes aqui*/
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
                            text: `Me es grato dirigirme a Usted en oportunidad de informarle que en Consejo de Escuela N° [Inserte consejo de escuela aqui] de [Inserte fecha de CDE aqui], han sido designados los siguientes jurados para la revisión y evaluación de su Trabajo de Grado:`
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED
                }),
                generarTablaDatosAlumno(),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "El jurado ya dispone del Informe del Trabajo de Grado para su revisión, así como de las planillas relativas a la evaluación del Trabajo de Grado. "
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "La presentación oral será fijada para la segunda semana del mes de noviembre 2022, de acuerdo a la disponibilidad de los participantes. Posteriormente se le informará el lugar, fecha y hora de la misma. "
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "A continuación, le indico un resumen de la dinámica de actividades y responsabilidades para la presentación oral de su trabajo de grado"
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "Debe tener listo el material de apoyo de la presentación de su Trabajo de Grado, debidamente revisada por su tutor académico."
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "El Artículo 12 del Reglamento del Trabajo de Grado de la Facultad de Ingeniería (No. 9.01.08, del 19 de julio de 2018), establece que “La presentación oral del TG será un acto privado; si alguna persona ajena al Jurado Examinador desea presenciar el acto, deberá solicitar ante él su aprobación”, en caso de que el(los) tesista(s) desee tener invitados debe solicitarlo a través del correo lmedinac@ucab.edu.ve: indicando nombre completo, número de cédula y filiación o motivo de su presencia en la presentación del Trabajo de Grado."
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "El día de la presentación oral:"
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "Estar preparados al menos una hora antes de la hora de inicio de la Presentación."
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "Verificar el correcto funcionamiento de los equipos de apoyo de la Presentación y tener un plan alternativo de apoyo, en caso de que falle el principal en el momento de la exposición."
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "Se recomienda para la presentación vestir ropa formal."
                        })
                    ]
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "El Coordinador de Trabajos de Grado o el Presidente del Jurado, indicará verbalmente a los asistentes las normas respectivas, en cuanto a la no participación ni interrupción de la Presentación por parte de familiares y amigos, y que su presencia estará limitada a presenciar la presentación Oral, no en la sesión de preguntas ni en la parte del acto correspondiente a la deliberación, en la cual todos los presentes, incluyendo los alumnos que realizan la presentación, deben salir del recinto para que el Jurado pueda dar inicio al proceso de deliberación y evaluación del Trabajo de Grado. "
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

