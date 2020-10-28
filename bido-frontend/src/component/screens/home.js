import React from 'react'

export default function home() {
  console.log(localStorage.getItem("jwt"));
    return (
      <div>
        <h1>This is home page</h1>
      </div>
    );
}
