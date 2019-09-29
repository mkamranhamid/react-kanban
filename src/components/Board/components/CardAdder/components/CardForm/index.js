import React from 'react'
import styled from 'styled-components'
import { when } from '@services/utils'

const StyledCardForm = styled.div`
  min-width: 230px;

  form {
    display: flex;
    justify-content: space-between;
  }
`

function CardForm({ onConfirm, onCancel }) {
    const inputCardTitle = React.createRef()
    const inputCardDescription = React.createRef()

    function addCard(event) {
        event.preventDefault()

        when({ title: inputCardTitle.current.value, description: inputCardDescription.current.value })(onConfirm)
    }

    return (
        <StyledCardForm>
            <form onSubmit={addCard}>
                <input type='text' placeholder="title" ref={inputCardTitle} autoFocus />
                <input type='text' placeholder="description" ref={inputCardDescription} />
                <button type='submit'>Add</button>
                <button type='button' onClick={onCancel}>Cancel</button>
            </form>
        </StyledCardForm>
    )
}

export default CardForm
