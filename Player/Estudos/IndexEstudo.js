import React from 'react';
import {Container, Title, SubTitle} from './styles'

export default class IndexEstudo extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container>
                <Title color={'red'} >Canal Estudos</Title>
                <SubTitle fontSize={'22'}>Seu lugar de estudos</SubTitle>
            </Container>
        )
    }

}