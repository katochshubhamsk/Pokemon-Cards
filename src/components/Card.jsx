import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Card({ data }) {
  let [selected, setSelected] = useState("");

  const selectedItem = (event) => {
    setSelected(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.abilities.includes(selected)
  );

  return (
    <div className="container">
      <select name="" id="" onChange={selectedItem}>
        <option value="">Select Ability</option>
        <option value="overgrow">overgrow</option>
        <option value="torrent">torrent</option>
        <option value="blaze">blaze</option>
        <option value="swarm">swarm</option>
      </select>
      <div className="card-container">
        {filteredData.map((item) => (
          <div className="card" key={uuidv4()} style={{ width: '18rem', margin: '1rem' }}>
            <img src={item.image} className="card-img-top" alt={item.name} />
            <div className="card-body">
              <center><h5 className="card-title">{item.name}</h5></center>
              <p className="card-text"><strong>Abilities:</strong> {item.abilities.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
