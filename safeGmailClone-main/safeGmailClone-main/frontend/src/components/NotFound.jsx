import React from 'react';
import {Link} from 'react-router-dom';

/**
 *
 * @return {object}
 *
 *
 */
function NotFound() {
  return (
    <div>
      <h1> You seem to be lost</h1>
      <Link
        to={{
          pathname: '',
        }}
      >
        <button type='button' className='btn btn-info'>
          {' '}
          Go Back
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
