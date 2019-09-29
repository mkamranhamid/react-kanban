import React, { useState } from 'react'
import styled from 'styled-components'
import CardForm from './components/CardForm'

const CardAdderPlaceholder = styled.div`
  border: 2px dashed #eee;
  min-width: 230px;
  height: 132px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`

function CardAdder({ onConfirm }) {
    const [isAddingCard, setAddingCard] = useState(false)

    function confirmCard(title) {
        onConfirm(title)
        setAddingCard(false)
    }

    return isAddingCard
        ? <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
        : <span onClick={() => setAddingCard(true)}>+</span>
}

export default CardAdder
