//¿juntamos estas 4 en un unico contexto? ¿Se podria meter el de la PPS centro de estudiantes y el del intercambio en el js de feli?
export const SYSTEM_PROMPT = `
Eres un chatbot especializado en brindar información detallada y concreta sobre la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA). Estás diseñado para responder con precisión sobre:

- Planes de estudio completos, materias por cuatrimestre, duración de carreras.
- Inscripciones, calendario académico y trámites estudiantiles.
- Funciones del Centro de Estudiantes y contacto institucional.
- Servicios como WiFi, comedor, biblioteca, intercambios internacionales, etc.

⚠️ Si se inyecta un contexto específico (por ejemplo, un plan de estudios de una carrera), DEBES usar esa información y responder de forma directa y detallada, **sin redirigir al usuario a consultar la web oficial**, a menos que te lo pidan expresamente.

👉 Si el usuario pide el plan de estudios completo de una carrera, y se ha detectado esa carrera con su contexto correspondiente, debes entregarle el contenido directamente, respetando el orden y el formato provisto (años, cuatrimestres, materias, optativas, etc.).

📋 INFORMACIÓN ESPECÍFICA DE LA UNNOBA:

🏛️ SEDES Y UBICACIONES:
- Sede Principal: Junín (Jorge Newbery 348)
- Sede Pergamino: Monteagudo 2772
- Biblioteca Junín: Jorge Newbery 375
- Biblioteca Pergamino: Edificio del Rectorado, Monteagudo 2772
- Comedor: Jorge Newbery 348, Junín

💻 SISTEMAS Y PLATAFORMAS:
- SIU-Guaraní: https://g3w3.unnoba.edu.ar/g3w3/ (inscripciones, finales, plan de estudios)
- Plataforma Virtual: https://plataformaed.unnoba.edu.ar (cursadas virtuales)
- Comedor: https://comedor.unnoba.edu.ar (reservas de almuerzo)
- Calendario Académico: https://elegi.unnoba.edu.ar/calendario-academico/
- Web Oficial: https://www.unnoba.edu.ar/

📅 CALENDARIO ACADÉMICO Y FECHAS IMPORTANTES:
- El calendario académico oficial se publica cada año en https://elegi.unnoba.edu.ar/calendario-academico/
- Incluye fechas de inicio y fin de cuatrimestres, inscripciones, recesos, feriados nacionales y universitarios, mesas de exámenes, vacaciones de invierno y verano.
- Las inscripciones a materias y finales se realizan en los períodos indicados en el calendario.
- Los feriados nacionales y días no laborables están detallados en el calendario académico.
- El receso administrativo suele ser en julio y enero.
- Las mesas de finales se concentran en la segunda semana de cada mes (excepto enero y octubre).

🎓 CARRERAS DISPONIBLES:
- Ingeniería en Informática (5 años)
- Analista en Sistemas (3 años)
- Licenciatura en Sistemas (5 años)
- Tecnicatura en Diseño y Desarrollo de Apps (3 años)
- Ingeniería Industrial (5 años)
- Ingeniería Mecánica (5 años)
- Tecnicatura en Mantenimiento Industrial (3 años)
- Abogacía (4 años)
- Contador Público (4 años)
- Licenciatura en Administración (4 años)
- Tecnicatura en Gestión de PyMEs (2.5 años)
- Tecnicatura en Gestión Pública (2.5 años)
- Diseño Gráfico (4 años)
- Diseño Industrial (4 años)
- Diseño de Indumentaria y Textil (4 años)
- Ingeniería Agronómica (5 años)
- Licenciatura en Genética (5 años)
- Licenciatura en Enfermería (5 años)
- Enfermería Universitaria (3 años)

📞 CONTACTOS IMPORTANTES:
- Centro de Estudiantes Junín: @franjaunnobajunin
- Centro de Estudiantes Pergamino: @franjamoradaunnoba
- Alumnos Junín: alumnosjunin@unnoba.edu.ar
- Alumnos Pergamino: alumnospergamino@unnoba.edu.ar
- Estudiantes general: estudiantes@unnoba.edu.ar
- Relaciones Internacionales: rrii@unnoba.edu.ar

⏰ HORARIOS Y SERVICIOS:
- Biblioteca: Lunes a viernes 08:00-19:00
- Comedor: Lunes a viernes 8-21hs, Sábados 8-14hs
- Reserva comedor: hasta 8am del mismo día
- Mesas de finales: segunda semana de cada mes (excepto enero y octubre)
- Receso administrativo: consultar calendario académico

📚 PROCEDIMIENTOS ACADÉMICOS:
- Regularidad: 4 puntos anuales (1 por materia cursada, 2 por final)
- Finales: hasta 5 oportunidades por materia
- Correlativas: se consultan en SIU-Guaraní → Reportes → Plan de Estudios
- Reválidas: prórroga de 1 año para rendir finales
- PPS: 200 horas mínimo, obligatoria en algunas carreras
- Título: 120 días de trámite desde última materia aprobada

🎯 CUANDO RESPONDAS SOBRE LA UNNOBA:
- Sé específico y directo
- Menciona los sistemas y plataformas oficiales
- Si no estás seguro de información muy específica (horarios exactos, direcciones), sugiere consultar la web oficial
- Para preguntas sobre distribución de aulas, sugiere usar el sistema específico de la UNNOBA
- Si la pregunta es muy general sobre universidades argentinas, contextualiza con la UNNOBA
- Siempre menciona que es información de la UNNOBA específicamente

❌ SI LA PREGUNTA NO ESTÁ RELACIONADA CON LA UNNOBA, RESPONDE:
"Lo siento, solo puedo ayudarte con temas relacionados con la UNNOBA."

✅ EJEMPLOS DE RESPUESTAS ÚTILES:

📅 CALENDARIO ACADÉMICO:
"El calendario académico de la UNNOBA se publica en https://elegi.unnoba.edu.ar/calendario/. Allí encontrás todas las fechas importantes: inicio y fin de cuatrimestres, inscripciones, recesos, feriados y mesas de exámenes."

📖 CORRELATIVAS:
"En la UNNOBA, las correlativas son materias que tenés que aprobar antes de cursar otras. Se consultan en SIU-Guaraní → Reportes → Plan de Estudios. No podés cursar una materia si no tenés aprobada su correlativa."

📝 FINALES:
"Los finales en la UNNOBA se rinden durante la segunda semana de cada mes, excepto enero y octubre. Te inscribís en SIU-Guaraní hasta 48 horas hábiles antes. Tenés hasta 5 oportunidades por materia."

📊 REGULARIDAD:
"En la UNNOBA necesitás 4 puntos anuales: 1 por materia cursada aprobada, 2 por final aprobado. Se verifica en marzo de cada año. Si no llegás, podés reinscribirte hasta 3 veces."

🏢 EDIFICIOS:
"La UNNOBA tiene sedes en Junín (Jorge Newbery 348) y Pergamino (Monteagudo 2772). Para ver la distribución específica de aulas, consultá el sistema de distribución semanal."

🍽️ COMEDOR:
"El comedor de la UNNOBA está en Jorge Newbery 348, Junín. Reservás en comedor.unnoba.edu.ar hasta las 8am del mismo día. Abre de lunes a viernes 8-21hs y sábados 8-14hs."

📚 BIBLIOTECA:
"La biblioteca de la UNNOBA está en Jorge Newbery 375 (Junín) y Monteagudo 2772 (Pergamino). Abre de lunes a viernes 08:00-19:00. El préstamo es por 2 semanas."

🎓 INSCRIPCIONES:
"Para inscribirte a materias en la UNNOBA usás SIU-Guaraní (g3w3.unnoba.edu.ar). Necesitás ser alumno regular. Las fechas están en el calendario académico oficial."

📋 TRÁMITES:
"Para certificados de alumno regular, contactá a alumnosjunin@unnoba.edu.ar o alumnospergamino@unnoba.edu.ar. Para el título, iniciás el trámite desde tu login institucional en 'Dossier - Mesa de Entrada Virtual'."

🌍 INTERCAMBIO:
"La UNNOBA ofrece intercambios internacionales (PILA, AUGM). Dura un semestre, necesitás ser regular y tener 40% de la carrera aprobada. Contacto: rrii@unnoba.edu.ar"

💼 PPS:
"La PPS en la UNNOBA son 200 horas mínimo en empresas. Es obligatoria en algunas carreras. Se coordina con un supervisor docente y tutor de empresa."

📄 TESIS:
"La tesis en la UNNOBA es un trabajo final supervisado. Su obligatoriedad depende de cada carrera. Se realiza bajo la dirección de un profesor."

🎯 RECORDATORIO: Siempre contextualiza las respuestas específicamente para la UNNOBA y menciona los sistemas oficiales cuando sea relevante.`;

export const PPS_PROMPT = `Te voy a poner en contexto sobre las Prácticas Profesionales y posibles dudas que te puedan preguntar.Resolución CD.ET 258/2015
Fecha: 9 de diciembre de 2015

Objeto: Aprobación del nuevo reglamento de PPS para carreras de Ingeniería.

Reglamento PPS (resumen de puntos clave)
🔸 Requisitos Generales
Mínimo de 200 horas en sectores productivos y/o de servicios.

Pueden realizarse en una o más instituciones.

Participan: Alumno, Supervisor Docente, Coordinador de PPS, Coordinador de Carrera, Empresa/Institución/Organización, Tutor de Empresa y Secretario Académico.

🔸 Responsabilidades
Alumno:

Solicita PPS mediante nota (Anexo I-A o I-B).

Elabora un plan de trabajo con Supervisor y Tutor (Anexo II).

Presenta informes cada 50 hs (Anexo V).

Presenta informe final (Anexo VI).

Rinde un examen final ante tribunal.

Supervisor Docente:

Guía al alumno, aprueba el informe final.

Participa del tribunal evaluador.

Visita la empresa y comunica avances.

Coordinador de PPS:

Coordina convenios.

Aprueba proyectos.

Lleva registro documental.

Coordinador de Carrera:

Aprueba proyectos.

Integra el tribunal de examen.

Empresa/Institución:

Firma convenios marco y específicos.

Asigna un tutor.

Participa en el diseño del plan de trabajo.

Tutor de Empresa:

Supervisa al alumno.

Informa sobre desempeño.

Secretario Académico:

Verifica situación académica.

Certifica actas de examen.

Documentación Requerida
Convenio Marco

Convenio Particular

Formulario A – Solicitud PPS

Formulario B – Plan de Trabajo

Formulario C – Informe del Tutor

Formulario D – Informe del Supervisor

Formulario E – Informe de Avance

Formulario F – Informe Final

Anexos
Anexo VII – Estructura del Informe Final

Introducción

Objetivos

Plan de Trabajo y Carga Horaria

Descripción de la Práctica

Conclusiones

Bibliografía

Anexos

Agradecimientos 
Posibles preguntas:¿Cuántas horas hay que realizar en total?¿Cómo son las supervisiones o seguimientos?`;

export const PROMPT_CENTRO_ESTUDIANTES = `
El Centro de Estudiantes de la UNNOBA se llama Franja Morada. Es una agrupación estudiantil que colabora activamente brindando información y acompañamiento sobre:

- Inscripciones a materias y finales
- Calendario académico actualizado
- Distribución semanal de aulas (links incluidos)
- Becas disponibles y cómo postularse
- Cambios de carrera, plan o equivalencias
- Paros, comunicados y novedades institucionales

Tienen contacto directo con la comunidad estudiantil y actúan como nexo con la institución.`;

export const PROMPT_INSCRIPCIONES = `
La inscripción a materias y carreras en la UNNOBA se realiza siguiendo estos pasos:

1. Completar formulario de preinscripción (disponible durante el período habilitado)
2. Cargar la documentación requerida en PDF en la Mesa de Entrada Virtual
3. Alternativamente, se puede presentar en forma física en Junín o Pergamino
4. Recibir confirmación por correo institucional

🔗 Fuente oficial: https://elegi.unnoba.edu.ar/inscripcion/
Nota: Durante el receso administrativo (21 al 26 de julio), no se procesan inscripciones.`;

export const PROMPT_INSCRIPCION_MATERIAS = `
MÓDULO DE INSCRIPCIÓN A MATERIAS - UNNOBA

INFORMACIÓN GENERAL:
- La inscripción a materias se realiza a través del sistema SIU-Guaraní (https://g3w3.unnoba.edu.ar/g3w3/)
- Es necesario tener condición de alumno regular para inscribirse a materias
- Las fechas de inscripción están disponibles en el calendario académico oficial

RESPUESTAS CONSTANTES:

1. ¿Cómo me inscribo a las materias?
La inscripción a las materias se realiza desde SIU-Guaraní, dentro del período establecido en el calendario académico. Allí podrás seleccionar las materias que querés cursar este cuatrimestre.
🔗 Acceso a SIU-Guaraní: https://g3w3.unnoba.edu.ar/g3w3/

2. ¿Dónde veo mi calendario académico?
El calendario académico oficial de la UNNOBA está disponible en:
🔗 https://elegi.unnoba.edu.ar/calendario/

3. ¿Necesito ser alumno regular para inscribirme a materias?
Sí, para poder inscribirte a materias es necesario tener la condición de alumno regular.

4. ¿Cuándo y cómo se verifica la regularidad?
La regularidad se verifica a fines de marzo de cada año. Por ejemplo, la regularidad 2025 se evalúa considerando el período comprendido entre marzo de 2024 y marzo de 2025. Para mantener la regularidad, es necesario sumar al menos 4 puntos durante ese período.

5. ¿Cómo se suman puntos para mantener la regularidad?
Podés sumar puntos de las siguientes maneras:
• Cada materia cursada y aprobada suma 1 punto
• Cada examen final aprobado suma 2 puntos
• Se pueden combinar cursadas y finales, siempre que se llegue a 4 puntos como mínimo

Ejemplos:
• Cursar y aprobar 4 materias = 4 puntos
• Cursar 2 materias (2 puntos) y aprobar 1 final (2 puntos) = 4 puntos
• Aprobar 2 exámenes finales = 4 puntos

6. ¿Qué pasa si no llego a los 4 puntos?
Si no alcanzás los 4 puntos requeridos en el período correspondiente, perdés la condición de alumno regular.

7. ¿Puedo seguir cursando si pierdo la regularidad?
Sí, podés seguir cursando. Para eso debés reinscribirte a la carrera. En ese caso, mantenés todas las materias cursadas y aprobadas anteriormente.

8. ¿Cuántas veces puedo reinscribirme?
Podés reinscribirte hasta 3 veces. Si superas ese límite, perdés todas las materias aprobadas y tenés que inscribirte nuevamente desde cero.

PREGUNTAS DINÁMICAS (requieren consulta al calendario):
- ¿Cuándo abren las inscripciones a cursadas?
- ¿Hasta qué día tengo para inscribirme a las materias?
- ¿Qué feriados hay este año?
- ¿Cuándo es la mesa de finales del mes de [mes]?
- ¿Cuándo empieza el primer cuatrimestre?
- ¿Cuándo empieza el segundo cuatrimestre?
- ¿Cuándo es la fecha límite para confirmar la inscripción a la carrera?
- ¿Cuándo terminan las clases del primer cuatrimestre?
- ¿Cuándo terminan las clases del segundo cuatrimestre?
- ¿Cuándo son las vacaciones de invierno?
`;

export const PREGUNTAS_FRECUENTES = [
  {
    pregunta: "¿Qué función cumple el centro de estudiantes?",
    respuesta:
      "Ayuda e informa sobre inscripción, calendario, distribución de aulas, becas y paros.",
  },
  {
    pregunta: "¿Dónde cursan las materias en Junín?",
    respuesta:
      "Podés verlo en la distribución de aulas de Junín: https://unnoba.edu.ar/distribucion-aulas/junin",
  },
  {
    pregunta: "¿Cómo conectarse al WiFi institucional?",
    respuesta:
      "Podés usar el WiFi público, pero para mejor conexión, ingresá con tu cuenta institucional.",
  },
  {
    pregunta: "¿Dónde estudiar o hacer trabajos grupales?",
    respuesta:
      "Tenés el Comedor Universitario, el Aula Parlante y otros espacios comunes.",
  },
  {
    pregunta: "¿Cómo me inscribo a las materias?",
    respuesta:
      "La inscripción a las materias se realiza desde <a href='https://g3w3.unnoba.edu.ar/g3w3/' target='_blank' style='color:#005B96; font-weight:bold;'>SIU-Guaraní</a>, dentro del período establecido en el calendario académico. Allí podrás seleccionar las materias que querés cursar este cuatrimestre.",
  },
  {
    pregunta: "¿Dónde veo mi calendario académico?",
    respuesta:
      "El calendario académico oficial de la UNNOBA está disponible en: <a href='https://elegi.unnoba.edu.ar/calendario/' target='_blank' style='color:#005B96; font-weight:bold;'>Calendario Académico UNNOBA</a>",
  },
  {
    pregunta: "¿Necesito ser alumno regular para inscribirme a materias?",
    respuesta:
      "Sí, para poder inscribirte a materias es necesario tener la condición de alumno regular.",
  },
  {
    pregunta: "¿Cómo se suman puntos para mantener la regularidad?",
    respuesta:
      "Podés sumar puntos de las siguientes maneras:<br/>• Cada materia cursada y aprobada suma 1 punto<br/>• Cada examen final aprobado suma 2 puntos<br/>• Se pueden combinar cursadas y finales, siempre que se llegue a 4 puntos como mínimo",
  },
  {
    pregunta: "¿Puedo seguir cursando si pierdo la regularidad?",
    respuesta:
      "Sí, podés seguir cursando. Para eso debés reinscribirte a la carrera. En ese caso, mantenés todas las materias cursadas y aprobadas anteriormente.",
  },
];

export const INTERCAMBIO_PROMPT = `
🔹 CONTEXTO:
La UNNOBA ofrece programas de intercambio internacional a través de PILA, AUGM y convenios específicos. La duración del intercambio suele ser un semestre (5 meses) y se cursan al menos 3 materias en universidades extranjeras. Los programas están destinados a estudiantes de grado.

🔹 REQUISITOS:
- Ser alumno regular
- Tener aprobado al menos el 40% de la carrera (preferente)
- Ser menor de 30 años (preferente)
- Estar cursando al momento del intercambio

🔹 BENEFICIOS:
- Hospedaje y comida cubiertos por la universidad anfitriona (en la mayoría de los casos)
- El estudiante debe costear el viaje, seguro y gastos personales

🔹 POSTULACIÓN:
- Se postula vía formulario + documentación: certificado analítico, aval académico, pasaporte o DNI
- Más información y contacto: rrii@unnoba.edu.ar

🔹 POSIBLES RESPUESTAS:
Q: ¿Qué universidades están disponibles?
A: Algunas opciones incluyen universidades en Brasil, Uruguay, Chile, Paraguay, México, etc.

Q: ¿Cuánto dura el intercambio?
A: Dura un semestre académico (aproximadamente 5 meses).

Q: ¿La universidad cubre los gastos?
A: La universidad anfitriona suele cubrir hospedaje y comida, pero el estudiante paga pasajes, seguro y visa.

Q: ¿Dónde me inscribo?
A: Completando este formulario: [URL DINÁMICO]
`;

export const PREDEFINED_RESPONSES = {
  "¿Dónde puedo contactar a la universidad o cuáles son sus redes sociales?":
    "**Redes de la Universidad**\nInstagram: @elegiunnoba o @unnobanoticias\nFacebook: NoticiasUNNOBA\nWeb: www.unnoba.edu.ar\n\n**Centro de estudiantes**\nVía Instagram:\nFranja Morada Junín: @franjaunnobajunin\nFranja Morada Pergamino: @franjamoradaunnoba\n\n**Contactos institucionales📧**\nestudiantes@unnoba.edu.ar\nTambién podés acercarte a Bienestar Estudiantil en tu sede.",
  "¿Cómo y cuándo me inscribo a materias o finales?":
    "Las inscripciones a materias y finales se realizan desde el sistema **SIU-Guaraní** (https://g3w3.unnoba.edu.ar/g3w3/), ingresando con tu cuenta institucional.\n\n📅 Las fechas exactas para inscripciones, cursadas y finales están publicadas en el **Calendario Académico** (https://elegi.unnoba.edu.ar/calendarioacademico/) de la UNNOBA. Te recomendamos revisarlo con frecuencia.\n\n⚠️ Recordá que algunas materias o finales requieren tener otras materias aprobadas (correlatividades). Para conocerlas, revisá el plan de estudios de tu carrera en el **Sitio Oficial de la UNNOBA** (https://unnoba.edu.ar/).",
  "¿Como utilizo la plataforma virtual o campus?":
    "Al acceder a la **plataforma virtual** (https://plataformaed.unnoba.edu.ar) vas a encontrar todas las materias que estés cursando actualmente o que hayas cursado previamente.\n\n📩 Para ingresar necesitás tu cuenta institucional de la UNNOBA. Si no podés acceder, consultá con la Dirección de Alumnos o el área de soporte académico.",
  "¿Cómo funciona el comedor?":
    "Para utilizar el comedor universitario debés ingresar a **comedor.unnoba.edu.ar** (https://comedor.unnoba.edu.ar/) con tu cuenta institucional y realizar la reserva.\n\n🍽️ Cada día se ofrecen dos menús, y al acceder con tu cuenta UNNOBA obtenés un descuento especial.\n\n📍 **Dirección del comedor:** Jorge Newbery 348, Junín, Buenos Aires (CP 6000).",
  "¿Cómo me inscribo a las materias?":
    "La inscripción a las materias se realiza desde **SIU-Guaraní** (https://g3w3.unnoba.edu.ar/g3w3/), dentro del período establecido en el calendario académico. Allí podrás seleccionar las materias que querés cursar este cuatrimestre.\n\n📅 Consultá las fechas exactas en el **Calendario Académico** (https://elegi.unnoba.edu.ar/calendario/)",
  "¿Dónde veo mi calendario académico?":
    "El calendario académico oficial de la UNNOBA está disponible en: **🔗 Calendario Académico UNNOBA** (https://elegi.unnoba.edu.ar/calendario/)\n\nAllí encontrarás todas las fechas importantes: inscripciones, inicio de clases, fechas de examen, feriados y más.",
  "¿Necesito ser alumno regular para inscribirme a materias?":
    "Sí, para poder inscribirte a materias es necesario tener la condición de **alumno regular**.\n\n📊 La regularidad se verifica a fines de marzo de cada año y requiere sumar al menos **4 puntos** durante el período anterior (combinando materias cursadas y finales aprobados).",
  "¿Cómo se suman puntos para mantener la regularidad?":
    "Para mantener la regularidad necesitás **4 puntos mínimo**:\n\n📌 **Cada materia cursada y aprobada = 1 punto**\n📌 **Cada examen final aprobado = 2 puntos**\n\n**Ejemplos:**\n• Cursar y aprobar 4 materias = 4 puntos ✅\n• Cursar 2 materias + aprobar 1 final = 4 puntos ✅\n• Aprobar 2 exámenes finales = 4 puntos ✅",
  "¿Puedo seguir cursando si pierdo la regularidad?":
    "Sí, podés seguir cursando. Para eso debés **reinscribirte a la carrera**.\n\n✅ **Buenas noticias:** Mantenés todas las materias cursadas y aprobadas anteriormente.\n\n⚠️ **Límite:** Podés reinscribirte hasta 3 veces. Si superas ese límite, perdés todas las materias aprobadas y tenés que inscribirte nuevamente desde cero.",
};

// Respuestas constantes sobre la biblioteca
export const BIBLIOTECA_RESPONSES = {
  "¿Dónde está la biblioteca?":
    "📍 **UBICACIÓN DE LA BIBLIOTECA - UNNOBA**\n\n🏢 **Junín:**\n• **Biblioteca UNNOBA:** Jorge Newbery 375\n• **Google Maps:** https://maps.app.goo.gl/BmMCDAZ3FdckELos7\n\n🏢 **Pergamino:**\n• **Edificio del Rectorado:** Monteagudo 2772\n• **Google Maps:** https://maps.app.goo.gl/R5RSsceNyvwConAK8",

  "¿Qué horario tiene la biblioteca?":
    "🕐 **HORARIOS DE LA BIBLIOTECA - UNNOBA**\n\n📅 **Horario regular:**\n• **Lunes a Viernes:** 08:00 a 19:00 horas (horario corrido)\n\n⚠️ **Horarios especiales:**\n• Durante el receso invernal o de verano, los horarios pueden modificarse\n• Se recomienda consultar directamente con el personal bibliotecario para confirmar horarios durante períodos especiales",

  "¿Cómo accedo a la biblioteca digital?":
    "💻 **BIBLIOTECA DIGITAL - UNNOBA**\n\n• Para acceder a la biblioteca digital, podés ingresar desde el sitio oficial de la UNNOBA\n• En caso de necesitar ayuda, el personal de biblioteca puede asistirte en el proceso\n\n🔗 **Acceso directo:**\n• **BiDi - Biblioteca Digital:** https://www.bidi.la/",

  "¿Cómo hago para pedir un libro prestado?":
    "📚 **PRÉSTAMO DE LIBROS - BIBLIOTECA UNNOBA**\n\n• Debés acercarte a alguna de las sedes de la biblioteca\n• El bibliotecario te solicitará algunos datos para registrarte en el sistema\n• A partir de ahí podrás solicitar libros en préstamo\n• Algunos títulos muy demandados pueden no estar disponibles de forma inmediata",

  "¿Cuánto tiempo puedo tener un libro en préstamo?":
    "⏰ **TIEMPO DE PRÉSTAMO - BIBLIOTECA UNNOBA**\n\n• El préstamo habitual es por **dos semanas**\n• Este plazo puede variar según el tipo de material\n• Es recomendable confirmar con el bibliotecario en cada caso",

  "¿Puedo renovar el préstamo de un libro?":
    "🔄 **RENOVACIÓN DE PRÉSTAMOS - BIBLIOTECA UNNOBA**\n\n• Sí, siempre y cuando el libro no tenga demasiada demanda\n• No debe estar reservado por otro estudiante\n• La renovación debe gestionarse con antelación\n• Puede hacerse directamente en la biblioteca",

  "¿Qué pasa si me atraso en la devolución?":
    "⚠️ **ATRASO EN DEVOLUCIÓN - BIBLIOTECA UNNOBA**\n\n• Se aplicará una sanción que te impedirá realizar nuevos préstamos por un período determinado\n• El personal de biblioteca se pondrá en contacto para conocer los motivos del retraso\n• La situación debe resolverse para poder acceder a nuevos préstamos",

  "¿Necesito registrarme para acceder a la biblioteca?":
    "📝 **REGISTRO EN BIBLIOTECA - UNNOBA**\n\n• **No es necesario** realizar un registro previo para ingresar\n• Si sos estudiante o docente de la UNNOBA, podés utilizar las instalaciones libremente\n• Solo se pide completar un registro de asistencia al ingresar\n• Este registro es para fines de control interno de la biblioteca",
};

// Respuestas constantes sobre distribución de aulas
export const DISTRIBUCION_AULAS_RESPONSES = {
  "¿Dónde se cursa cada materia?":
    "🏢 **DISTRIBUCIÓN DE AULAS - UNNOBA**\n\nLa distribución de aulas puede consultarse a través de los siguientes enlaces:\n\n**📚 Junín:**\n• **Distribución de aulas - Junín:** https://unnoba.edu.ar/distribucion-aulas/junin\n\n**📚 Pergamino:**\n• **Distribución de aulas - Pergamino:** https://unnoba.edu.ar/distribucion-aulas/pergamino",
};

// Respuestas constantes sobre finales
export const FINALES_RESPONSES = {
  "¿Cuándo son las mesas de finales?": `📝 **MESAS DE FINALES - UNNOBA**

Las mesas de exámenes finales están programadas según las fechas establecidas en el calendario académico oficial de la UNNOBA. Generalmente, se realizan durante la segunda semana de cada mes. Sin embargo, es importante tener en cuenta que en los meses de enero y octubre no se habilita la inscripción a mesas de finales. Para conocer las fechas exactas y actualizadas, se recomienda consultar el calendario académico disponible en el sitio web de la universidad.

**📋 Para fechas exactas consultá:**
• **Calendario académico:** https://elegi.unnoba.edu.ar/calendario/
• **SIU-Guaraní:** https://g3w3.unnoba.edu.ar/g3w3/`,

  "¿Qué es un exámen final?": `
Un examen final es la evaluación que se realiza al concluir el cursado de una materia para acreditar los conocimientos adquiridos y obtener la **aprobación definitiva** de la asignatura.

**📋 Características importantes:**
• **Requisito:** Debes tener la materia **regular** para rendir
• **Modalidad:** Puede ser oral, escrito o mixto según la cátedra
• **Nota mínima:** Generalmente 4 (cuatro) para aprobar
• **Validez:** Una vez aprobado, queda registrado definitivamente

**🎯 Importancia:**
• **Avance académico:** Permite continuar con materias correlativas
• **Título:** Es requisito para la obtención del título de grado
• **Promedio:** Influye en tu promedio general de la carrera

💡 **Tip:** Consultá con la cátedra sobre el formato y contenidos del examen.`,

  "¿Cómo me inscribo a un examen?": `📝 **INSCRIPCIÓN A EXÁMENES FINALES - UNNOBA**

**¿Cómo me inscribo a un final?**

**🖥️ Sistema de inscripción:**
• **Plataforma:** SIU-Guaraní 3W
• **Enlace:** https://g3w3.unnoba.edu.ar/g3w3/

**📅 Plazos importantes:**
• **Inscripción:** Hasta **48 horas antes** del examen
• **Horario:** Respetá los horarios de inscripción establecidos
• **Confirmación:** Verificá que la inscripción se haya registrado correctamente

**✅ Requisitos:**
• Tener la materia **regular**
• Estar dentro del período de inscripción
• No tener materias correlativas pendientes (si aplica)

**⚠️ Importante:**
• Si no te inscribís en tiempo y forma, **no podrás rendir**
• Verificá siempre la fecha, hora y aula del examen

💡 **Recomendación:** Inscribite con anticipación para evitar inconvenientes.`,

  "¿Qué pasa si falto a un final?": `
**📋 Consecuencias:**
• **Ausente:** Quedarás registrado como "ausente" en el acta
• **Sin calificación:** No obtenés calificación en esa oportunidad
• **Pérdida de turno:** Perdés esa oportunidad de examen
• **Nueva inscripción:** Deberás inscribirte nuevamente en otro turno

**🔄 ¿Puedo recuperar la oportunidad?**
• **No hay recuperación automática** de la oportunidad perdida
• Deberás esperar al **próximo turno disponible**
• **Conservás** las oportunidades restantes para rendir

**⚠️ Excepciones:**
• **Causas justificadas** pueden ser evaluadas por la coordinación
• Consultá con **Departamento de Alumnos** si tenés una situación especial

💡 **Recomendación:** Si sabés que no podrás asistir, **date de baja** antes del examen.`,

  "¿Hasta cuándo tengo tiempo de darme de baja a un final?": `⏰ **BAJA DE EXAMEN FINAL - UNNOBA**

**¿Hasta cuándo puedo cancelar mi inscripción?**

**📅 Plazo para darse de baja:**
• **Hasta 48 horas antes** del examen
• Mismo plazo que para inscribirse
• **No se permiten bajas** el día del examen

**🖥️ ¿Cómo me doy de baja?**
• **SIU-Guaraní 3W:** https://g3w3.unnoba.edu.ar/g3w3/
• Accedé a "Exámenes Finales"
• Seleccioná la opción "Dar de baja"

**✅ Ventajas de darse de baja:**
• **No figurás como ausente** en el acta
• **Conservás todas** las oportunidades de examen
• **No afecta** tu registro académico

**⚠️ Importante:**
• Una vez vencido el plazo, **no podrás darte de baja**
• Si faltás sin darte de baja, quedarás como "ausente"

💡 **Recomendación:** Si tenés dudas sobre rendir, es mejor darse de baja a tiempo.`,

  "¿Qué pasa si no apruebo un examen final?": `📚 **DESAPROBACIÓN DE EXAMEN FINAL - UNNOBA**

**¿Qué sucede si no apruebo el final?**

**📋 Consecuencias:**
• **Nota menor a 4:** El examen queda **desaprobado**
• **Oportunidad utilizada:** Se consume una de tus oportunidades
• **Nueva inscripción:** Podrás inscribirte en el próximo turno disponible

**🔄 ¿Puedo volver a rendir?**
• **Sí, podés volver a rendir** en los próximos turnos
• **Conservás** las oportunidades restantes
• **Sin límite de tiempo** entre intentos (dentro del período de regularidad)

**📊 Registro académico:**
• La nota desaprobatoria **queda registrada**
• **No afecta** otras materias ya aprobadas
• Solo la **última nota aprobatoria** cuenta para el promedio

**💡 Consejos para el próximo intento:**
• **Revisá** los temas que más dificultad te presentaron
• **Consultá** con la cátedra sobre áreas de mejora
• **Preparate** con tiempo suficiente

⚠️ **Recordá:** Tenés **5 oportunidades** en total para aprobar cada materia.`,

  "¿Cuántas veces puedo rendir un examen final?": `🔢 **OPORTUNIDADES DE EXAMEN FINAL - UNNOBA**

**¿Cuántas chances tengo para aprobar?**

**📊 Límite de oportunidades:**
• **5 oportunidades** por materia
• **3 años** desde la pérdida de regularidad para utilizarlas
• **Se cuentan:** Ausencias y desaprobaciones

**⚠️ ¿Qué pasa si agoto las 5 oportunidades?**
• **Deberás recursar** la materia completa
• **Nuevo cursado:** Clases, trabajos prácticos y parciales
• **Nuevas 5 oportunidades** una vez que vuelvas a estar regular

**📅 Tiempo límite:**
• **3 años** desde que perdés la regularidad
• Si no rendís en ese período, **deberás recursar**
• El tiempo corre independientemente de si rendís o no

**💡 Estrategias recomendadas:**
• **No desperdicies** oportunidades sin preparación adecuada
• **Consultá** con la cátedra antes de cada intento
• **Planificá** bien tus intentos dentro del plazo de 3 años

🎯 **Objetivo:** Aprobar antes de agotar las oportunidades disponibles.`,

  "¿Qué son las materias correlativas?": `🔗 **MATERIAS CORRELATIVAS - UNNOBA**

**¿Qué significa "correlatividad"?**

**📚 Definición:**
Las materias correlativas son **asignaturas previas** que debés tener aprobadas para poder cursar o rendir una materia específica. Establecen un orden lógico de aprendizaje.

**🎯 Tipos de correlatividades:**
• **Para cursar:** Materias que debés tener aprobadas para inscribirte al cursado
• **Para rendir:** Materias que debés tener aprobadas para rendir el final

**📋 Ejemplos típicos:**
• **Análisis Matemático II** requiere **Análisis Matemático I**
• **Programación Orientada a Objetos** requiere **Programación Imperativa**
• **Base de Datos II** requiere **Base de Datos I**

**⚠️ ¿Qué pasa si no cumplís correlatividades?**
• **No podrás inscribirte** al cursado
• **No podrás rendir** el examen final
• El sistema **bloqueará** automáticamente la inscripción

**💡 Importancia:**
• **Garantizan** que tengas los conocimientos previos necesarios
• **Organizan** el plan de estudios de manera progresiva

🔍 **Consultá** siempre el plan de estudios para conocer las correlativas.`,

  "¿Dónde reviso las correlativas?": `🔍 **CONSULTAR CORRELATIVIDADES - UNNOBA**

**¿Dónde puedo ver qué correlativas necesito?**

**🖥️ SIU-Guaraní 3W:**
• **Enlace:** https://g3w3.unnoba.edu.ar/g3w3/
• **Sección:** "Plan de Estudios"
• **Información:** Correlativas de cada materia de tu carrera

**📋 Plan de estudios oficial:**
• **Sitio web:** https://planesdeestudio.unnoba.edu.ar/
• **Búsqueda:** Por carrera y plan específico
• **Detalle:** Correlatividades para cursar y para rendir

**🏫 Coordinación de carrera:**
• **Consulta presencial** con el coordinador
• **Información específica** sobre casos particulares
• **Orientación** para planificar tu cursado

**📱 ¿Cómo interpretar la información?**
• **Para cursar:** Materias que necesitás aprobar antes de inscribirte
• **Para rendir:** Materias que necesitás aprobar antes del final
• **Código de materias:** Cada asignatura tiene un código único

**💡 Recomendación:**
• **Planificá** tu cursado considerando las correlatividades
• **Consultá** ante cualquier duda con la coordinación

🎯 **Objetivo:** Tener claro el camino académico a seguir.`,

  "¿Qué son las reválidas?": `🔄 **REVÁLIDAS - UNNOBA**

**¿Qué es una reválida de regularidad?**

**📚 Definición:**
La reválida es una **prórroga de la regularidad** de una materia que ya perdió su vigencia. Te permite extender el tiempo para rendir el examen final sin tener que recursar.

**⏰ ¿Cuándo la necesito?**
• Cuando **perdiste la regularidad** de una materia
• Han pasado **más de 3 años** desde que la cursaste
• **Antes** de que venzan definitivamente tus oportunidades

**📋 ¿Cómo funciona?**
• **Examen adicional** sobre contenidos de la materia
• **Recuperás la condición** de alumno regular
• **Nuevas oportunidades** para rendir el final

**✅ Ventajas:**
• **Evitás recursar** la materia completa
• **Ahorrás tiempo** en tu carrera
• **Mantenés** el avance académico

**⚠️ Requisitos:**
• **Solicitud** dentro del plazo establecido
• **Cumplir** con los requisitos específicos de cada carrera
• **Aprobar** el examen de reválida

💡 **Importante:** No todas las carreras ofrecen reválidas. Consultá con tu coordinación.`,

  "¿Cómo solicito una reválida?": `📝 **SOLICITUD DE REVÁLIDA - UNNOBA**

**¿Cómo tramito una reválida?**

**🖥️ Proceso de solicitud:**
• **SIU-Guaraní 3W:** https://g3w3.unnoba.edu.ar/g3w3/
• **Sección:** "Trámites" o "Solicitudes"
• **Completar:** Formulario de solicitud de reválida

**📋 Documentación requerida:**
• **Certificado analítico** actualizado
• **Justificación** de la solicitud (si corresponde)
• **Programa** de la materia (en algunos casos)

**📅 Plazos:**
• **Antes** del vencimiento final de la regularidad
• **Verificá** fechas límite en el calendario académico
• **No hay solicitudes** fuera de término

**🎯 Proceso de evaluación:**
• **Revisión** por parte de la coordinación de carrera
• **Examen** o evaluación específica (si corresponde)
• **Respuesta** en tiempo determinado

**💰 Costo:**
• Puede tener un **costo administrativo**
• Consultá aranceles vigentes

💡 **Recomendación:** Iniciá el trámite con tiempo suficiente antes del vencimiento.`,

  "¿Qué pasa si no soy regular?¿Puedo inscribirme a un final?": `❌ **SIN REGULARIDAD - UNNOBA**

**¿Puedo rendir sin ser regular?**

**🚫 Regla general:**
• **NO podés inscribirte** a examen final sin regularidad
• La regularidad es **requisito obligatorio**
• El sistema **bloqueará** automáticamente la inscripción

**🔄 ¿Qué opciones tengo?**

**1. Recursar la materia:**
• **Inscribirte** nuevamente al cursado
• **Cumplir** con todos los requisitos (clases, TP, parciales)
• **Recuperar** la condición de regular

**2. Solicitar reválida (si está disponible):**
• **Tramitar** prórroga de regularidad
• **Aprobar** examen de reválida
• **Recuperar** el derecho a rendir

**3. Consultar casos especiales:**
• **Coordinación** de carrera para situaciones particulares
• **Departamento de Alumnos** para orientación

**⚠️ Importante:**
• **No hay excepciones** a la regla de regularidad
• **Planificá** bien tus materias para mantener regularidad

💡 **Prevención:** Rendí los finales dentro del plazo de regularidad.`,

  "¿Puedo rendir un final libre?": `📚 **EXAMEN LIBRE - UNNOBA**

**¿Existe la modalidad de examen libre?**

**❓ ¿Qué es un examen libre?**
Un examen libre permite rendir una materia **sin haberla cursado**, demostrando conocimiento autónomo de todos los contenidos.

**⚠️ En la UNNOBA:**
• **No todas las carreras** permiten exámenes libres
• **Limitaciones** en materias prácticas o de laboratorio
• **Consultar** con el jefe de cátedra es **obligatorio**

**📋 Si está permitido:**
• **Programa completo:** Debés conocer todos los contenidos
• **Examen más extenso:** Generalmente más exigente que un final regular
• **Autorización previa:** Del profesor responsable

**🎯 ¿Cuándo conviene?**
• **Conocimiento previo** sólido en el tema
• **Imposibilidad** de cursar en horarios disponibles
• **Aceleración** del plan de estudios

**💡 Recomendación:**
• **Consultá** con la coordinación de tu carrera
• **Hablá** con el jefe de cátedra antes de decidir
• **Evaluá** si realmente tenés el nivel requerido

🔍 **Verificá** en el reglamento de tu carrera si está permitido.`,
};

// Nuevas constantes para TESIS y TÍTULOS
export const TESIS_RESPONSES = {
  "¿Qué es la tesis de grado?": `🎓 **TESIS DE GRADO - UNNOBA**

**¿Qué es la tesis de grado?**

La tesis de grado es un **trabajo académico** que permite al estudiante integrar y aplicar los conocimientos adquiridos durante su carrera.

**📋 Características:**
• **Informe escrito** sobre un tema específico
• **Supervisión** de un director de tesis
• **Integración** de conocimientos de la carrera
• **Investigación** teórica, práctica o aplicada

**🎯 Tipos de investigación:**
• **Teórica:** Análisis conceptual y revisión bibliográfica
• **Práctica:** Implementación y desarrollo de proyectos
• **Aplicada:** Solución de problemas específicos del área

**💡 Objetivo:**
• **Demostrar** capacidad de investigación
• **Aplicar** metodología científica
• **Contribuir** al conocimiento en tu área de estudio

📚 **Es tu oportunidad** de profundizar en un tema que te apasione de tu carrera.`,

  "¿La tesis es obligatoria para recibirme?": `📝 **OBLIGATORIEDAD DE LA TESIS - UNNOBA**

**¿Es obligatoria la tesis para graduarme?**

**📋 Depende del plan de estudios:**
• **Algunas carreras:** Tesis es **requisito obligatorio**
• **Otras carreras:** Puede ser **opcional**
• **Alternativas:** Práctica Profesional Supervisada u otro trabajo final

**🔍 ¿Cómo verificar?**
• **Plan de estudios:** https://planesdeestudio.unnoba.edu.ar/
• **Coordinación de carrera:** Consulta directa
• **SIU-Guaraní:** Revisá los requisitos de tu plan

**📚 Ejemplos típicos:**
• **Licenciaturas:** Generalmente requieren tesis
• **Ingenierías:** Pueden tener proyecto final
• **Tecnicaturas:** Suelen tener trabajo final aplicado

**⚠️ Importante:**
• **Revisá** específicamente tu plan de estudios
• **No asumas** que es igual en todas las carreras
• **Consultá** con la coordinación ante dudas

💡 **Recomendación:** Verificá este requisito temprano en tu carrera para planificar adecuadamente.`,

  "¿En qué año se hace la tesis?": `📅 **CRONOGRAMA DE TESIS - UNNOBA**

**¿Cuándo debo hacer la tesis?**

**🎓 Etapa de realización:**
• **Etapa final** de la carrera
• **Mayoría de materias aprobadas** del plan de estudios
• **Base sólida** de conocimientos adquirida

**📋 Requisitos previos típicos:**
• **Porcentaje determinado** de materias aprobadas (ej: 80%)
• **Materias específicas** relacionadas con metodología
• **Condición de estudiante regular**

**⏰ Planificación recomendada:**
• **Último año:** Inicio formal del proceso
• **Penúltimo año:** Exploración de temas y directores
• **Tiempo suficiente:** Para desarrollo e investigación

**💡 Consejos:**
• **No esperes** al último momento
• **Identificá** áreas de interés temprano
• **Relacionate** con docentes de tu área

🎯 **Objetivo:** Tener tiempo suficiente para un trabajo de calidad sin presión excesiva.`,

  "¿Cómo se inscribe uno a la tesis?": `📝 **INSCRIPCIÓN A TESIS - UNNOBA**

**¿Cómo me inscribo a la tesis?**

**🏢 Lugar de inscripción:**
• **Departamento de Alumnos** de la UNNOBA
• Presentación **presencial** con documentación completa

**📋 Documentación requerida:**
• **Formulario de inscripción** a la tesis
• **Propuesta de tema** y plan de trabajo
• **Designación del director** y codirector (si corresponde)
• **Certificado analítico** actualizado

**📝 Proceso:**
1. **Preparar** la propuesta de tema
2. **Conseguir** director de tesis
3. **Completar** formulario oficial
4. **Presentar** en Departamento de Alumnos
5. **Aguardar** aprobación de la propuesta

**💡 Recomendación:**
• **Consultá** con la coordinación de tu carrera
• **Solicitá** los formularios específicos necesarios
• **Verificá** requisitos particulares de tu carrera

📞 **Importante:** Cada carrera puede tener procedimientos específicos, consultá para información detallada.`,

  "¿Cuáles son los requisitos para comenzar la tesis?": `✅ **REQUISITOS PARA TESIS - UNNOBA**

**¿Qué necesito para empezar la tesis?**

**📚 Requisitos académicos:**
• **Estudiante regular** de la carrera
• **Porcentaje determinado** de materias aprobadas
• **Materias correlativas** específicas (si aplica)

**👨‍🏫 Requisitos de dirección:**
• **Director de tesis** aprobado por la unidad académica
• **Codirector** (si es necesario según el reglamento)
• **Aceptación formal** del director

**📋 Requisitos de propuesta:**
• **Tema de investigación** definido
• **Plan de trabajo** detallado
• **Cronograma** de actividades
• **Metodología** a utilizar

**📄 Documentación:**
• **Propuesta formal** presentada
• **Aprobación** de la propuesta por la unidad académica
• **Inscripción** en Departamento de Alumnos

**⚠️ Importante:**
• **Revisá** el reglamento específico de tu carrera
• **Los requisitos** pueden variar entre carreras

🔍 **Verificá** todos los requisitos antes de iniciar el proceso.`,

  "¿Cuánto tiempo tengo para hacer la tesis?": `⏰ **TIEMPO PARA TESIS - UNNOBA**

**¿Cuál es el plazo para completar la tesis?**

**📅 Duración típica:**
• **Plazo máximo** establecido por cada carrera
• **Desde la aprobación** del plan de trabajo
• **Hasta la presentación** del informe final

**🕒 Factores que influyen:**
• **Complejidad** del tema de investigación
• **Tipo de tesis** (teórica, práctica, aplicada)
• **Disponibilidad** de recursos y datos
• **Dedicación** del estudiante

**📋 Planificación recomendada:**
• **Cronograma detallado** desde el inicio
• **Hitos intermedios** con el director
• **Comunicación constante** con el director de tesis
• **Revisiones periódicas** del avance

**⚠️ Importante:**
• **Respetá** los plazos establecidos
• **Mantenete** en contacto regular con tu director
• **Solicitá extensiones** con justificación si es necesario

💡 **Tip:** Una buena planificación inicial evita problemas de tiempo al final.`,

  "¿Dónde encuentro el reglamento de tesis de mi carrera?": `📖 **REGLAMENTO DE TESIS - UNNOBA**

**¿Dónde está el reglamento de mi carrera?**

**🌐 Sitio web oficial:**
• **UNNOBA:** https://unnoba.edu.ar/
• **Sección:** Académico o Carreras
• **Documentación:** Reglamentos por carrera

**🏢 Coordinación de carrera:**
• **Consulta presencial** con el coordinador
• **Copia física** del reglamento
• **Explicación** de procedimientos específicos

**📚 Biblioteca universitaria:**
• **Consulta** de reglamentos académicos
• **Material** de apoyo sobre metodología

**📱 SIU-Guaraní:**
• **Documentos** relacionados con tu carrera
• **Información** académica actualizada

**📋 ¿Qué incluye el reglamento?**
• **Requisitos** para la tesis
• **Procedimientos** de inscripción
• **Criterios de evaluación**
• **Plazos** y cronogramas
• **Formato** de presentación

💡 **Recomendación:** Leé el reglamento completo antes de comenzar tu tesis.`,

  "¿Dónde se entrega el informe final de tesis?": `📥 **ENTREGA DE TESIS - UNNOBA**

**¿Dónde presento mi tesis terminada?**

**🏢 Lugar de entrega:**
• **Departamento de Alumnos** de la UNNOBA
• **Formato establecido** por la unidad académica

**📋 Formato de entrega:**
• **Copia impresa** (cantidad según reglamento)
• **Formato digital** (PDF)
• **Repositorio institucional** de la universidad

**📄 Documentación adicional:**
• **Formulario** de presentación
• **Aval del director** de tesis
• **Certificación** de cumplimiento de requisitos

**💾 Formato digital:**
• **Subida** al repositorio UNNOBA
• **Acceso público** (salvo restricciones)
• **Preservación** del trabajo académico

**⏰ Proceso posterior:**
• **Asignación** de tribunal evaluador
• **Defensa** oral (si corresponde)
• **Calificación** final

💡 **Importante:** Verificá todos los formatos y requisitos antes de la entrega final.`,

  "¿Quién me puede orientar sobre cómo iniciar una tesis?": `🤝 **ORIENTACIÓN PARA TESIS - UNNOBA**

**¿Con quién puedo consultar sobre mi tesis?**

**👨‍🏫 Coordinador de carrera:**
• **Información específica** sobre requisitos
• **Procedimientos** de tu carrera
• **Orientación** sobre directores disponibles

**🔬 Docentes del área:**
• **Definición** de temas de investigación
• **Posibles directores** de tesis
• **Metodología** específica del área
• **Líneas de investigación** actuales

**🏢 Departamento de Alumnos:**
• **Información administrativa**
• **Formularios** necesarios
• **Trámites** de inscripción

**📚 Talleres y charlas:**
• **Capacitación** en metodología de investigación
• **Técnicas** de escritura académica
• **Gestión** de proyectos de investigación

**💡 Recursos adicionales:**
• **Biblioteca:** Material metodológico
• **Otros estudiantes:** Experiencias compartidas
• **Egresados:** Consejos prácticos

🎯 **Recomendación:** Aprovechá todas las instancias de orientación disponibles para asegurar el éxito de tu tesis.`,
};

export const TITULO_RESPONSES = {
  "¿Qué se necesita para empezar a tramitar el título universitario?": `🎓 **TRÁMITE DE TÍTULO UNIVERSITARIO - UNNOBA**

**¿Cómo inicio el trámite de mi título?**

**✅ Requisito previo:**
• **Última materia aprobada** y registrada en SIU-Guaraní
• **Aproximadamente 20 días** después de rendir la última asignatura

**💻 Proceso virtual:**
• **Servicio:** "Dossier - Mesa de Entrada Virtual"
• **Acceso:** Tu cuenta institucional (Login UNNOBA)
• **Trámite personal:** Debe ser iniciado por el interesado

**📋 Documentación requerida (PDF):**
• **DNI** (frente y dorso)
• **Partida de nacimiento**

**📏 Especificaciones técnicas:**
• **Formato:** PDF únicamente
• **Tamaño máximo:** 15 MB por archivo
• **Hoja:** Tamaño A4

**⚠️ Importante:**
• **Trámite personal** obligatorio
• **Documentación completa** desde el inicio
• **Seguí** las instrucciones del sistema

🎯 **Objetivo:** Completar correctamente el trámite para evitar demoras en la expedición.`,

  "¿Cómo tramito mi título universitario?": `💻 **PROCESO DE TRÁMITE DE TÍTULO - UNNOBA**

**¿Cuál es el procedimiento paso a paso?**

**🔐 Acceso al sistema:**
• **Login institucional:** Tu cuenta UNNOBA
• **Servicio:** "Dossier - Mesa de Entrada Virtual"

**📝 Completar trámite:**
1. **Ingresar** al servicio correspondiente
2. **Completar** formulario de trámite
3. **Adjuntar** documentación requerida
4. **Verificar** datos ingresados
5. **Enviar** solicitud

**📄 Formulario incluye:**
• **Datos personales**
• **Información académica**
• **Documentación** adjunta

**⏰ Disponibilidad:**
• **20 días aproximadamente** después de la última materia
• **Verificá** que el servicio esté habilitado

**📧 Seguimiento:**
• **Notificaciones** por correo electrónico
• **Consulta de estado** en SIU-Guaraní 3W

💡 **Tip:** Guardá el comprobante de iniciación del trámite para tu seguimiento.`,

  "¿Qué tipo de títulos ofrece la UNNOBA?": `🏆 **TIPOS DE TÍTULOS UNNOBA**

**¿Qué títulos otorga la universidad?**

**🎓 Nivel Pregrado:**
• **Tecnicaturas universitarias**
• Duración típica: 2-3 años
• Orientación práctica y técnica

**📚 Nivel Grado:**
• **Licenciaturas:** Formación académica amplia
• **Ingenierías:** Formación técnica-científica
• Duración típica: 4-6 años

**🔬 Nivel Posgrado:**
• **Especializaciones:** Profundización en área específica
• **Maestrías:** Formación avanzada en investigación
• **Doctorados:** Máximo nivel académico

**🏅 Títulos honorarios:**
• **Doctor Honoris Causa**
• Otorgado a personalidades destacadas
• Reconocimiento a trayectoria excepcional

**🌟 Características:**
• **Reconocimiento oficial** del Ministerio de Educación
• **Validez nacional** e internacional
• **Habilitación profesional** según corresponda

📋 **Cada título** tiene sus requisitos específicos y alcances profesionales definidos.`,

  "¿Cuánto demora obtener el título?": `⏰ **TIEMPO DE EXPEDICIÓN DE TÍTULO - UNNOBA**

**¿Cuánto tardo en recibir mi título?**

**📅 Duración del proceso:**
• **120 días aproximadamente**
• Desde el **inicio del expediente**
• Hasta la **expedición final**

**🔄 Factores que pueden influir:**
• **Tiempos ministeriales**
• **Situaciones imprevistas**
• **Completitud** de la documentación
• **Época del año** (mayor demanda en ciertos períodos)

**📧 Seguimiento del proceso:**
• **Notificaciones** por correo electrónico
• **Consulta de estado** en SIU-Guaraní 3W
• **Actualizaciones** automáticas del sistema

**📱 ¿Qué puedo consultar?**
• **Estado actual** del trámite
• **Etapa** en la que se encuentra
• **Tiempo estimado** restante

**⚠️ Importante:**
• **Plazos orientativos** - pueden variar
• **Mantenete atento** a las notificaciones
• **No hay forma** de acelerar el proceso administrativo

💡 **Mientras esperás:** Podés solicitar certificado de título en trámite si lo necesitás.`,

  "¿Dónde retiro el título?": `📍 **RETIRO DE TÍTULO - UNNOBA**

**¿Dónde recojo mi título una vez listo?**

**🏢 Lugar de retiro:**
• **Oficina de Títulos** de la UNNOBA
• **Campus:** Verificá ubicación específica según tu carrera

**📧 Notificación:**
• **Correo electrónico** cuando esté disponible
• **Mensaje** con instrucciones de retiro
• **Documentación** requerida para el retiro

**📋 Requisitos para retirar:**
• **DNI original** del titulado
• **Documento** de identificación vigente
• **Comprobante** del trámite (recomendado)

**👥 Retiro por terceros:**
• **Autorización** notarial del titulado
• **DNI** del autorizado
• **Copia** del DNI del titulado

**⏰ Horarios:**
• **Consultá** horarios de atención específicos
• **Confirmá** disponibilidad antes de ir

💡 **Recomendación:** Confirmá previamente con la oficina correspondiente para evitar viajes innecesarios.`,

  "¿Hay plazo para retirar el título?": `📅 **PLAZO PARA RETIRO DE TÍTULO - UNNOBA**

**¿Tengo tiempo límite para retirar mi título?**

**⏰ Política de la UNNOBA:**
• **No hay plazo específico** establecido
• **Disponible** mientras esté en la oficina
• **Sin vencimiento** del derecho al retiro

**🔍 Experiencias de otras universidades:**
• **Títulos retirados** décadas después de emitidos
• **Conservación** en archivos universitarios
• **Sin pérdida** del derecho al título

**💡 Recomendación:**
• **Retirá** en tiempo razonable
• **Evitá** demoras innecesarias
• **Considerá** posibles cambios administrativos futuros

**⚠️ Consideraciones prácticas:**
• **Cambios** en oficinas o procedimientos
• **Reorganización** de archivos
• **Facilidad** de localización del documento

**🎯 ¿Por qué retirar pronto?**
• **Documento importante** para tu carrera profesional
• **Evitar** posibles complicaciones futuras
• **Tranquilidad** de tenerlo en tu poder

📋 **Aunque no hay prisa legal, es conveniente retirarlo dentro de un tiempo razonable.**`,
};

export const COMEDOR_RESPONSES = {
  "¿Dónde queda el comedor?": `🍽️ **UBICACIÓN DEL COMEDOR - UNNOBA**

**📍 Ubicación:**
• **Nombre:** Taller Comedor
• **Dirección:** Jorge Newbery 348, Junín
• **Campus:** Solo funciona en Junín (no hay en Pergamino)

**🗺️ Ubicación en Google Maps:**
https://www.google.com.ar/maps/place/%22El+Taller%22,+Comedor+Universitario+UNNOBA/@-34.5839102,-60.9452032,14z/data=!4m6!3m5!1s0x95b8eb007518dfc7:0x2498bb3e4b4e54dc!8m2!3d-34.5825581!4d-60.9438588!16s%2Fg%2F11f7hh89ph?hl=es&entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D

**🚌 Acceso:**
• **Transporte público:** Consultar líneas de colectivo
• **A pie:** Desde el campus principal de Junín
• **En vehículo:** Estacionamiento disponible en la zona

💡 **Importante:** El comedor universitario es exclusivo del campus Junín. Los estudiantes de Pergamino no cuentan con este servicio.`,

  "¿Cuándo abre el comedor universitario?": `⏰ **HORARIOS DEL COMEDOR - UNNOBA**
  
**📅 Días de funcionamiento:**
• **Lunes a Viernes:** 8:00 a 21:00 hs
• **Sábados:** 8:00 a 14:00 hs
• **Domingos:** Cerrado

**🍽️ Horarios de comidas:**
• **Desayuno/Merienda:** Durante todo el horario
• **Almuerzo:** Generalmente de 12:00 a 15:00 hs
• **Consultar horarios específicos** en la plataforma

**📱 Información actualizada:**
• **Plataforma:** https://comedor.unnoba.edu.ar/
• **WhatsApp:** https://api.whatsapp.com/send?phone=5492364608019

**⚠️ Importante:**
• **Solo en Junín** - No disponible en Pergamino
• **Horarios sujetos a cambios** por feriados o eventos especiales
• **Verificá** siempre en la plataforma antes de ir

🎯 **Recomendación:** Consultá los horarios específicos de cada comida en la plataforma oficial.`,

  "¿Cómo reservar el almuerzo?": `📱 **RESERVAS EN EL COMEDOR - UNNOBA**

**✅ Requisitos:**
• **Cuenta institucional** UNNOBA activa
• **Acceso a internet** para usar la plataforma

**💻 Proceso de reserva:**
1. **Ingresá** a: https://comedor.unnoba.edu.ar/
2. **Iniciá sesión** con tu cuenta institucional (@unnoba.edu.ar)
3. **Seleccioná** el día que querés reservar
4. **Elegí** el menú disponible
5. **Confirmá** tu reserva

**🍽️ Opciones disponibles:**
• **Menús del día** con diferentes opciones
• **Precios accesibles** para estudiantes
• **Opciones vegetarianas** disponibles

**📧 Cuenta institucional:**
• **Formato:** tu.nombre@unnoba.edu.ar
• **Misma cuenta** que usás para el SIU-Guaraní
• **Si no tenés cuenta:** Consultá con Sistemas

**📞 Ayuda:**
• **WhatsApp:** https://api.whatsapp.com/send?phone=5492364608019

💡 **Importante:** Solo estudiantes con cuenta institucional pueden reservar.`,

  "¿Hasta qué hora puedo reservar el almuerzo?": `⏰ **LÍMITE PARA RESERVAS - UNNOBA**

**🕒 Plazo límite:**
• **Hasta las 8:00 AM** del mismo día
• **No se permiten reservas** después de esa hora
• **Planificá** con anticipación

**📅 Recomendaciones:**
• **Reservá la noche anterior** para asegurar tu lugar
• **Verificá disponibilidad** temprano en la mañana
• **No dejes** para último momento

**⚠️ ¿Qué pasa si no reservo a tiempo?**
• **No podrás** acceder al menú del día
• **Deberás esperar** al día siguiente
• **Posible disponibilidad** para consumo sin reserva (consultar)

**📱 Proceso rápido:**
1. **Ingresá** temprano a: https://comedor.unnoba.edu.ar/
2. **Revisá** los menús disponibles
3. **Confirmá** antes de las 8:00 AM

**💡 Consejos:**
• **Configurá** una alarma para recordar
• **Reservá** apenas sepas que vas a almorzar
• **Consultá** el menú del día siguiente

🎯 **Objetivo:** Garantizar la organización y preparación adecuada de las comidas.`,

  "¿Puedo cancelar una reserva ya hecha?": `❌ **CANCELACIÓN DE RESERVAS - UNNOBA**

**✅ Sí, podés cancelar siguiendo estos pasos:**

**💻 Proceso de cancelación:**
1. **Ingresá** a: https://comedor.unnoba.edu.ar/
2. **Iniciá sesión** con tu cuenta institucional
3. **Hacé click** en tu **Usuario**
4. **Seleccioná** "Mis reservas"
5. **Buscá** la reserva que querés cancelar
6. **Hacé click** en "Eliminar"

**⏰ ¿Hasta cuándo puedo cancelar?**
• **Recomendable** cancelar con anticipación
• **Verificá** si hay límites de tiempo específicos
• **Consultá** en la plataforma o por WhatsApp

**🎯 ¿Por qué cancelar?**
• **Libera** el cupo para otros estudiantes
• **Evita** desperdicios de comida
• **Mantiene** el sistema organizado

**📱 Ayuda adicional:**
• **WhatsApp:** https://api.whatsapp.com/send?phone=5492364608019
• **Soporte técnico:** Si tenés problemas con la plataforma

**💡 Importante:**
• **Sé responsable** con tus reservas
• **Cancelá** si sabés que no vas a ir
• **Ayudás** a otros estudiantes que necesitan el servicio

🤝 **Solidaridad universitaria:** Tu cancelación a tiempo permite que otro estudiante pueda acceder al comedor.`,

  "¿Cuál es el contacto del comedor?": `📞 **CONTACTO DEL COMEDOR - UNNOBA**

**📱 WhatsApp Oficial:**
• **Número:** +54 9 236 460-8019
• **Enlace directo:** https://api.whatsapp.com/send?phone=5492364608019
• **Horarios de atención:** Consultar en WhatsApp

**💻 Plataforma Online:**
• **Sitio web:** https://comedor.unnoba.edu.ar/
• **Reservas y consultas** disponibles 24/7
• **Información actualizada** de menús y precios

**🏢 Ubicación física:**
• **Dirección:** Jorge Newbery 348, Junín
• **Nombre:** Taller Comedor
• **Atención presencial** en horarios de funcionamiento

**❓ ¿Para qué contactar?**
• **Consultas** sobre menús y precios
• **Problemas** con reservas
• **Información** sobre horarios especiales
• **Sugerencias** y reclamos
• **Dudas** sobre el funcionamiento

**⚠️ Importante:**
• **Solo en Junín** - No hay comedor en Pergamino
• **Respuesta más rápida** por WhatsApp
• **Para emergencias:** Contactar durante horarios de funcionamiento

💡 **Recomendación:** Guardá el contacto de WhatsApp para consultas rápidas sobre el comedor.`,
};

export const WELCOME_MESSAGE =
  "¡Hola! soy el asistente virtual de la unnoba, ¿En que puedo ayudarte?";

export const API_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
  model: "gemini-1.5-flash",
};

export const TYPING_SPEED = 50;
export const RESPONSE_TYPING_SPEED = 20;
export const MAX_WORD_COUNT = 2000;
