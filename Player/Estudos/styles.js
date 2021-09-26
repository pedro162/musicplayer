import styled from 'styled-components/native';
export const Container = styled.View`
    flex: auto;
    justify-content: center;
    align-items: center;
    background-color: #34495e;
`
export const Title = styled.Text`
    color: ${props=>props.color};
    font-weight: bold;
    font-size: 26;
    text-align: center;
`

export const SubTitle = styled.Text`
    color: #fff;
    font-weight:bold;
    font-size:${props=>`${props.fontSize}px`};
    text-align: center;
`