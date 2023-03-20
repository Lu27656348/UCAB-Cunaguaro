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
const { HorizontalPositionAlign,VerticalPositionAlign } = docx;
const { TextDirection } = docx;
const arrayPrueba = [
    {nombres: "Luis Carlos"},
]
const spacing = {
    after: 200,
    line: 255,
    lineRule: LineRuleType.AUTO,
};


const sin_bordes = {
    top: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    bottom: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    left: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    right: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    }
}

const celdaCuadrito = new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Table({
                                            columnWidths: [300,300],
                                            rows: [
                                                new TableRow({
                                                    children: [
                                                        new TableCell({
                                                            width: {
                                                                size: 300,
                                                                type: WidthType.DXA,
                                                            },
                                                            children: [
                                                                new Paragraph({
                                                                    children: [
                                                                        new TextRun({
                                                                            text: ""
                                                                        })
                                                                    ]
                                                                })
                                                            ],
                                                            verticalAlign: VerticalAlign.CENTER
                                                        })
                                                    ],
                                                    height: {
                                                        value: 300,
                                                        rule: HeightRule.EXACT
                                                    }
                                                })
                                            ]
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ],
                            height: {
                                value: 1200,
                                rule: HeightRule.EXACT
                            }
                        })
const generarFilaNotaBase20 = () => {
    const lista = [];
    let columna = 0;
    while (columna < 20){
        let columna_generada = new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: (columna + 1).toString()
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        }),
                                    ],
                                    width: {
                                        size: 400,
                                        type: WidthType.DXA
                                    },
                                    //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                                    verticalAlign: VerticalAlign.CENTER
                                })
        lista.push(columna_generada)
        columna++;
    }
    const mensaje = new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Puntos en base 20"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                            ],
                            width: {
                                size: 400,
                                type: WidthType.DXA
                            },
                            //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                            verticalAlign: VerticalAlign.CENTER
                        })
    lista.push(mensaje)
    let resultado = new TableRow({
        children: lista,
        height: {
            value: 1200,
            rule: HeightRule.EXACT
        }
    });
    return resultado;
}
const generarFilasDeNotas = (ponderacion_inicial, ponderacion_final) => {
    const lista = [];
    const columna_inicial = new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "10"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        }),
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: " - "
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        }),
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "22"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    width: {
                                        size: 400,
                                        type: WidthType.DXA
                                    },
                                    //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                                    verticalAlign: VerticalAlign.CENTER
                                })
    lista.push(columna_inicial)
    while (ponderacion_final <= 300){
        let columna = new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: ponderacion_inicial.toString()
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: " - "
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: ponderacion_final.toString()
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                })
                            ],
                            //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                            verticalAlign: VerticalAlign.CENTER,
                            width: {
                                size: 400,
                                type: WidthType.DXA
                            }
                        })
        lista.push(columna);
        ponderacion_inicial = ponderacion_final + 1;
        ponderacion_final = ponderacion_inicial + 14;
    }
    const columna_final = new TableCell({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "293"
                    })
                ],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: " - "
                    })
                ],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "300"
                    })
                ],
                alignment: AlignmentType.CENTER
            }),
        ],
        //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
        verticalAlign: VerticalAlign.CENTER,
        width: {
            size: 400,
            type: WidthType.DXA
        }
    });
    const ponderacion = new TableCell({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Punto en base a 300"
                    })
                ],
                alignment: AlignmentType.CENTER
            })
        ],
        verticalAlign: VerticalAlign.CENTER,
        width: {
            size: 400,
            type: WidthType.DXA
        }
    });
    lista.push(columna_final);
    lista.push(ponderacion);
    let resultado = new TableRow({
        children: lista,
        height: {
            value: 1200,
            rule: HeightRule.EXACT
        }
    });
    console.log(resultado)
    return resultado;
}
const generarTablaDeNotas = (ponderacion_final) => {
    const tabla = new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Alumno"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
    })
}
const generarFilaAlumno = (alumno) => {
    const fila = new TableRow({
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: alumno.apellidos + ', ' + alumno.nombres
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
const generarTablaPonderacion = (alumno) => {
    if( alumno != undefined && alumno != null){
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
                                            text: ""
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
                generarFilaAlumno(alumno)
            ]
        })
        return tabla
    }

    const tabla = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: sin_bordes,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Hola"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    })
    
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
                            text: "Planilla de Evaluación Final de Trabajo Experimental de Grado (TEG)",
                            bold: true
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
                                                    text: "Titulo TEG"
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
                                                    text: notificacion.tg.titulo
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        })
                    ]
                }),
                generarTablaPonderacion(notificacion.alumnos[0]),
                generarTablaPonderacion(notificacion.alumnos[1]),
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
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 200,
                        before: 200
                    }
                }),
                new Table({
                    columnWidths: [200,400],
                    rows:[
                        generarFilasDeNotas(23,37),
                        generarFilaNotaBase20(),
                        celdaCuadrito
                    ]
                })
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

