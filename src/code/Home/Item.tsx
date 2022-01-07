import { TableItem, TableDiv } from '../Style';

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
        <TableDiv>
            <TableItem>{item.title}</TableItem>
            <TableItem>({item.year})</TableItem>
            <TableItem> | directed by {item.directors}</TableItem>
        </TableDiv>
    )
};
