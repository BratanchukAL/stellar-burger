import {clx} from './clx'

describe('maker classes', ()=>{
    test('one argument', ()=>{
        expect(clx('first'))
            .toBe('first')
    })

    test('two arguments', ()=>{
        expect(clx('first', ['two', 'any_class']))
            .toBe('first two any_class')
    })

    test('three arguments', ()=>{
        expect(clx('first', ['two'], {
            'close': false,
            'pending': true})
        )
            .toBe('first two pending')
    })
})
