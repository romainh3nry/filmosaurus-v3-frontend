import React from "react";
import {Item} from "./Item"
import { A, Row } from "../Style";

type SearchResultsProps = {
    list: {
        id: number,
        title: string,
        year: number,
        directors: string[]
    }[]
}

export const SearchResults = React.memo<any>(({list}: SearchResultsProps) => {
    return list.map(item => {
        return (
            <A key={item.id} to={`movie/${item.id}`}>
                <Row>
                    <Item item={item} />
                </Row>
            </A>
        )
    })
});