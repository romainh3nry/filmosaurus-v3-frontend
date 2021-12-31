import styled from 'styled-components';

const StyledItem = styled.div `
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  margin-top:10px;
`;

const StyledColumn = styled.span `
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    color: inherite;
  }
`;

type ItemProps = {
    item: {
        id:number,
        title: string,
        year: number,
        directors: string[]
    }
}

export const Item = ({item}: ItemProps) => {
    return (
        <StyledItem>
            <StyledColumn>{item.title}</StyledColumn>
            <StyledColumn>({item.year})</StyledColumn>
            <StyledColumn> | directed by {item.directors}</StyledColumn>
        </StyledItem>
    )
};