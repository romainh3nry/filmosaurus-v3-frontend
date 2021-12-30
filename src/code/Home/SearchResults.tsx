import React from "react";


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
            <li>{item.title}</li>
        )
    })
});