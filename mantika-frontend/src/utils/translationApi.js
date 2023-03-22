class TanslationApi {
  constructor(trLanguage = 'en') {
    this._url = 'https://ai-translate.p.rapidapi.com/translate';
    this._options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'ai-translate.p.rapidapi.com',
      },
    };

    this._trLanguague = trLanguage;
    this._srcLanguage = 'es';

    this.spanishObject = {
      landingSubtitle: 'Un espacio para compartir tu experiencia artística',
      landingParagraphFirst:
        'Todas las artes son bienvenidas: desde el diseño hasta la danza, de la música al dibujo, del teatro a artes interdisciplinarias',
      landingParagraphSecond:
        'Estamos ansiosos por escuchar tu voz, tus pensamientos y preguntas. Tus ambiciones. No estamos solos.',
      aboutUsTitle: 'Acerca de nosotros',
      aboutUsSubtitle: 'Mantika es una plataforma de creadores para creadores',
      aboutUsParagraphTitleFirst: '¿Qué es Mantika?',
      aboutUsParagraphZero:
        'Somos Mantika, un espacio para solidificar y crear relaciones entre la comunidad artística global.',
      aboutUsParagraphFirst:
        'El filósofo italiano Giorgio Colli revisita la famosa dualidad planteada por Nietzsche: Apolo y Dionisio como las divinidades orígen del pensamiento creativo. Para Colli, ambos dioses, ambas formas aparentemente contrarias de acercarnos al acto creativo son, en realidad, muy similares: para conectar con la divinidad, uno necesita entrar en un estado de éxtasis, las bacantes dionisiacas y la pitonisa apolinea son los grandes ejemplos.',
      aboutUsParagraphSecond:
        'Para llegar a este estado de éxtasis, las mujeres seguidoras de ambos dioses consumían sustancias psicotrópicas. Con esto se anulaba parte de su identidad para así permitir que la divinidad ingresara en sus cuerpos. Estos estados eran llamados: manía para las bacantes y mántica para la pitonisa. Colli ve en estos dos estados de éxtasis la prueba de una profunda relación dialéctica entre ambos orígenes del pensamiento creativo.',
      aboutUsParagraphTitleSecond: '¿Por qué Mántika',
      aboutUsParagraphThird:
        'Pensamos en lo divino como la relación de lo humano con aquello perteneciente a la realidad que escapa a la estructuración del lenguaje y el pensamiento racional. El acto creativo tiene su origen en este vínculo. Al finalizar su texto, Colli concreta la dualidad de los dioses en un mito/construcción concreta: el laberinto de Creta, el minotauro en su interior, el hilo de Ariadna.',
      aboutUsParagraphFourth:
        'Pareciera que el acto creativo es uno donde nos lanzamos al laberinto, a la introspección de enfrentarnos a una bestia personal. Sin embargo, finalmente, este encuentro se abre a un otro, a un espectador. El arte es en tanto se abre a un diálogo. Muchas veces este diálogo surge mucho antes de la apertura al público, por ejemplo: no se puede hacer teatro o cine en soledad, se necesita de un equipo.',
      aboutUsParagraphFifth:
        'Cada vez es más evidente que el acto creativo se enriquece profundamente si dialogamos, si recorremos el laberinto en conjunto, en compañía. La época de los genios individuales y destruidos quedó atrás. Mantika es la posibilidad de generar equipo. De abrir nuevas relaciones creativas, nuevas posibilidades de trabajo en diálogo, en colaboración.',
      aboutUsParagraphSixth:
        'Perdamonos en el laberinto del otro o en el propio acompañados. Dignifiquemos el quehacer creativo.',
      registerTitle: 'Regístrate',
      username: 'Nombre de usuario: ',
      password: 'Contraseña',
      description: 'Descripción: ',
      city: 'Ciudad: ',
      createdProyects: 'Proyectos creados: ',
      colaboratingIn: 'Colaborando en: ',
      proyectsCountText: ' proyectos',
      createBtn: 'Crear',
      registerBtn: 'Regístrate',
      loginBtn: 'Login',
      discipline: 'Disciplina: ',
      creator: 'Creador: ',
      colaborators: 'Colaboradores: ',
      colaborateBtn: 'Colaborar',
      proyect: 'Proyecto: ',
      editBtn: 'Editar',
      deleteBtn: 'Borrar',
      newProyectTitle: 'Crear un nuevo proyecto',
      myProyectsBtn: 'Mis proyectos',
      proyectsNotFound: 'No se encontraron proyectos',
      proyectImage: 'Imagen',
      proyectNameErrorMessage:
        'Nombre de proyecto incorrecto, verifica que tenga entre 3 y 20 caracteres.',
      proyectPicErrorMessage: 'Ingresa la URL válida de una imagen, por favor.',
      descriptionErrorMessage:
        'Ingresa una descripción de entre 15 y 200 caracteres',
      cityErrorMessage:
        'Ingresa el nombre de la localidad donde el proyecto se realizará, debe tener entre 3 y 20 caracteres.',
      usernameErrorMessage:
        'Nombre de usuario incorrecto, verifica que tenga entre 3 y 20 caracteres y que no use caracteres especiales.',
      emailErrorMessage: 'Por favor ingresa un email válido.',
      passwordErrorMessage:
        'Ingresa una contraseña entre 6 y 20 caracteres con al menos una letra minúscula, una mayúscula y un número.',
      disciplineErrorMessage: 'Selecciona una disciplina',
    };

    this.disciplines = [
      'teatro',
      'danza contemporanea',
      'danzas tradicionales',
      'ballet',
      'pintura',
      'escultura',
      'grabado',
      'ceramica',
      'diseño gráfico',
      'dibujo',
      'cinematografía',
      'fotografía',
      'cuento',
      'novela',
      'poesía',
      'literatura dramática',
      'música',
      'performance art',
      'artes interdisciplinarias y multidisciplinarias',
      'arquitectura',
      'ilustración',
      'instalación y arte conceptual',
      'joyería',
      'artes digitales',
      'platería y orfebrería',
      'diseño de modas',
      'diseño espacial',
      'diseño editorial',
      'diseño textil',
      'ebanistería',
      'artes circenses',
      'comic',
      'diseño industrial',
    ];

    this._keysArray = Object.keys(this.spanishObject);
    this.translatedObject = {};
    this._getApiKey();
  }

  _createTextBody() {
    console.log(this);
    this._options.body = JSON.stringify({
      texts: Object.values(this.spanishObject),
      tl: this._trLanguague,
      sl: this._srcLanguage,
    });
  }

  _createDisciplinesBody() {
    this._options.body = JSON.stringify({
      texts: this.disciplines,
      tl: this._trLanguague,
      sl: this._srcLanguage,
    });
  }

  async _getApiKey() {
    try {
      const res = await fetch('http://127.0.0.1:3001/apikey');
      const data = await res.json();
      this._options.headers['X-RapidAPI-Key'] = data.API_KEY;
    } catch (err) {
      console.error(err);
    }
  }

  async _translation(createBody) {
    createBody();
    try {
      const res = await fetch(this._url, this._options);
      const data = await res.json();
      return data;
    } catch (err) {
      throw new Error('Algo salió mal en el servidor');
    }
  }

  async createTranslatedDisciplines() {
    this.translatedDisciplines = await this._translation(
      this._createDisciplinesBody.bind(this)
    );
    return this.translatedDisciplines.texts;
  }

  async createTranslatedObject() {
    const translatedArray = await this._translation(
      this._createTextBody.bind(this)
    );
    this._keysArray.forEach((key, i) => {
      this.translatedObject[key] = translatedArray.texts[i];
    });
    return this.translatedObject;
  }
}

const translationApi = new TanslationApi();
export { translationApi };
