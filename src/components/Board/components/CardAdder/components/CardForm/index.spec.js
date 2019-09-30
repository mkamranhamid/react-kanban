import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CardForm from './'

describe('<CardForm />', () => {
    let subject, onConfirm, onCancel

    function mount() {
        onConfirm = jest.fn()
        onCancel = jest.fn()

        subject = render(<CardForm onConfirm={onConfirm} onCancel={onCancel} />)
    }

    beforeEach(mount)
    afterEach(() => { subject = onConfirm = onCancel = undefined })

    it('renders an input asking for a card title', () => {
        expect(subject.container.querySelectorAll('input')[0]).toBeInTheDocument()
    })

    it('renders an input asking for a card description', () => {
        expect(subject.container.querySelectorAll('input')[1]).toBeInTheDocument()
    })

    it('focus on the title input', () => {
        expect(subject.container.querySelectorAll('input')[0]).toHaveFocus()
    })

    /* it('focus on the description input', () => {
        expect(subject.container.querySelectorAll('input')[1]).toHaveFocus()
    }) */

    describe('when the user clicks confirm the inputs', () => {
        describe('when the user has typed a card title', () => {
            beforeEach(() => {
                fireEvent.change(subject.container.querySelectorAll('input')[0], { target: { value: 'Card title' } })
                fireEvent.change(subject.container.querySelectorAll('input')[1], { target: { value: 'Card content' } })
                fireEvent.click(subject.queryByText('Add'))
            })

            it('calls the onConfirm prop passing the card title and description', () => {
                expect(onConfirm).toHaveBeenCalledTimes(1)
                expect(onConfirm).toHaveBeenCalledWith({ title: 'Card Title', description: 'Card content' })
            })

            it('does not call the onCancel prop', () => {
                expect(onCancel).not.toHaveBeenCalled()
            })
        })

        describe('when the user has not typed a card title', () => {
            beforeEach(() => {
                fireEvent.click(subject.queryByText('Add'))
            })

            it('does not call the onConfirm prop', () => {
                expect(onConfirm).not.toHaveBeenCalled()
            })

            it('does not call the onCancel prop', () => {
                expect(onCancel).not.toHaveBeenCalled()
            })
        })

        describe('when the user has not typed a card description', () => {
            beforeEach(() => {
                fireEvent.click(subject.queryByText('Add'))
            })

            it('does not call the onConfirm prop', () => {
                expect(onConfirm).not.toHaveBeenCalled()
            })

            it('does not call the onCancel prop', () => {
                expect(onCancel).not.toHaveBeenCalled()
            })
        })
    })

    describe('when the user cancels the input', () => {
        beforeEach(() => {
            fireEvent.click(subject.queryByText('Cancel'))
        })

        it('calls the onCancel prop', () => {
            expect(onCancel).toHaveBeenCalledTimes(1)
        })

        it('does not call the onConfirm prop', () => {
            expect(onConfirm).not.toHaveBeenCalled()
        })
    })
})
