import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.scss';

import copyIcon from '../../assets/icons/copy-solid.svg';
import editIcon from '../../assets/icons/edit-solid.svg';
import trashIcon from '../../assets/icons/trash-solid.svg';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center mb-5">
        <h1>Lista de tempaltes</h1>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="template">
            <img className="template-image" src="https://images4.alphacoders.com/936/936378.jpg"></img>
            <div className="template-body">
              <h3 className="template-name">teste</h3>
              <div className="template-footer">
                <a href="">
                  <img src={copyIcon}></img>
                </a>
                <a href="">
                  <img src={editIcon}></img>
                </a>
                <a href="">
                  <img src={trashIcon}></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}