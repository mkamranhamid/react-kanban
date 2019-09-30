import React, { useState } from 'react'
import styled from 'styled-components'
import CardForm from './components/CardForm'

export const IconSpan = styled.span`
    font-family: fantasy;
    border: 1px dashed #eee;
    display: inline-block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: #fff;
    margin: 0 5px;
`

function CardAdder({ onConfirm }) {
    const [isAddingCard, setAddingCard] = useState(false)

    function confirmCard(title) {
        onConfirm(title)
        setAddingCard(false)
    }

    return isAddingCard
        ? <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
        : <IconSpan onClick={() => setAddingCard(true)}>+</IconSpan>
}

export default CardAdder
