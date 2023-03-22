import React from 'react';
import pic from '../../images/graffiti.jpg';

const proyects = [
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    _id: 1,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    _id: 2,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    _id: 3,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    _id: 4,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    _id: 5,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    _id: 6,
  },
  {
    name: 'Obscenos de Silere/Vórtex',
    discipline: 'teatro',
    year: '2023',
    colaborators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    img: pic,
    _id: 7,
  },
];

export default function ProyectsContainer() {
  return (
    <section className="proyects">
      {proyects.map((proyect) => {
        return (
          <div className="proyects__proyect" key={proyect._id}>
            <img
              className="proyects__img"
              src={proyect.img}
              alt={proyect.name}
            />
            <h3 className="proyects__name">{proyect.name}</h3>
            <div className="proyects__info-container">
              <div className="proyects__info">
                <h4 className="proyects__key">Discipline;</h4>
                <p className="proyects__value">{proyect.discipline}</p>
              </div>
              <div className="proyects__info">
                <h4 className="proyects__key">Creator:</h4>
                <p className="proyects__value">El Julián</p>
              </div>
              <div className="proyects__info">
                <h4 className="proyects__key">Year:</h4>
                <p className="proyects__value">{proyect.year}</p>
              </div>
              <div className="proyects__info">
                <h4 className="proyects__key">Colaborators:</h4>
                <p className="proyects__value">{proyect.colaborators.length}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
