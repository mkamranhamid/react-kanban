import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CardAdder from './'

describe('<CardAdder />', () => {
    let subject, onConfirm

    function mount() {
        onConfirm = jest.fn()

        subject = render(<CardAdder onConfirm={onConfirm} />)
    }

    beforeEach(mount)
    afterEach(() => { subject = onConfirm = undefined })

    it('renders the card placeholder to add a new card', () => {
        expect(subject.queryByText('+')).toBeInTheDocument()
    })

    describe('when the user clicks to add a new card', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('+')))

        it('hides the card placeholder', () => {
            expect(subject.queryByText('+')).not.toBeInTheDocument()
        })

        it('renders the input asking for a card title', () => {
            expect(subject.container.querySelectorAll('input')[0]).toBeInTheDocument()
        })

        it('renders the input asking for a card description', () => {
            expect(subject.container.querySelectorAll('input')[1]).toBeInTheDocument()
        })

        describe('when the user confirms the new card', () => {
            beforeEach(() => {
                fireEvent.change(subject.container.querySelectorAll('input')[0], { target: { value: 'card TITLE Added by user' } })
                fireEvent.change(subject.container.querySelectorAll('input')[1], { target: { value: 'card DESCRIPTION Added by user' } })
                fireEvent.click(subject.queryByText('Add'))
            })

            it('calls the "onConfirm" prop passing the card title and description', () => {
                expect(onConfirm).toHaveBeenCalledTimes(1)
                expect(onConfirm).toHaveBeenCalledWith({ title: "card TITLE Added by user", description: "card DESCRIPTION Added by user" })
            })

            it('hides the input', () => {
                expect(subject.container.querySelector('input')).not.toBeInTheDocument()
            })

            it('renders the card placeholder to add a new card', () => {
                expect(subject.queryByText('+')).toBeInTheDocument()
            })
        })

        describe('when the user cancels the new card', () => {
            beforeEach(() => {
                fireEvent.click(subject.queryByText('Cancel'))
            })

            it('does not call the "onConfirm" prop', () => {
                expect(onConfirm).not.toHaveBeenCalled()
            })

            it('hides the input', () => {
                expect(subject.container.querySelector('input')).not.toBeInTheDocument()
            })

            it('renders the card placeholder to add a new card', () => {
                expect(subject.queryByText('+')).toBeInTheDocument()
            })
        })
    })
})
