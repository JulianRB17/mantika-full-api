import React from 'react';
import { Link } from 'react-router-dom';
import Proyect from '../Proyect/Proyect';
import { paginate } from './../../utils/paginate';
import Pagination from '../Pagination/Pagination';
import { TextContext } from '../../contexts/TextContext';
import addBtn from '../../images/crear-iconoBlanco.png';

export default function Main(props) {
  const { proyects, openPopupWithConfirmation, setSelectedProyect, getUser } =
    props;
  const text = React.useContext(TextContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 8;

  const paginatedProyects = paginate(proyects, currentPage, pageSize);
  const totalCount = proyects.length;

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  if (paginatedProyects.length >= 1)
    return (
      <section className="main">
        <div className="main__proyects">
          {paginatedProyects.map((proyectData) => {
            return (
              <Proyect
                proyectData={proyectData}
                getUser={getUser}
                key={proyectData._id}
                openPopupWithConfirmation={openPopupWithConfirmation}
                setSelectedProyect={setSelectedProyect}
              />
            );
          })}
          <div className="main__btn-container">
            <Link to="/proyect/create">
              <img src={addBtn} className="main__btn" alt="Add button icon" />
            </Link>
          </div>
        </div>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    );
  else {
    return <h1>{text.proyectsNotFound}</h1>;
  }
}
