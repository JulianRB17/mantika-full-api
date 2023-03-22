import React from 'react';

export default function Preloader(props) {
  const { isLoading } = props;

  return (
    <div
      className={`prealoader__container ${
        isLoading ? '' : 'prealoader__container_hidden '
      }`}
    >
      <i className="preloader" />
    </div>
  );
}
